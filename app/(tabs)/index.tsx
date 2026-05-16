import React, {
  useState,
  useRef,
  useEffect
} from 'react'

import {
  View,
  Button,
  Alert,
  StyleSheet,
  Image,
  Text
} from 'react-native'

import {
  CameraView,
  useCameraPermissions
} from 'expo-camera'

import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync
} from 'expo-location'

import { readAsStringAsync }
from 'expo-file-system/legacy'
import { decode }
from 'base64-arraybuffer'
import { supabase }
from '../../services/supabase'
import * as Notifications
from 'expo-notifications'
import * as Device
from 'expo-device'
import { Platform }
from 'react-native'
import {
  incrementSuccess,
  incrementFailed,
} from '../../redux/slices/counter.slice'
import {
  useAppDispatch,
  useAppSelector,
} from '../../redux/hooks'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } =
        await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      Alert.alert(
        'Gagal mendapatkan permission notification'
      )
      return
    }
  }
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(
      'default',
      {
        name: 'default',
        importance:
          Notifications.AndroidImportance.MAX,
      }
    )
  }
}

async function sendNotification(
  title: string,
  body: string
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: null,
  })
}

export default function Index() {
  const dispatch = useAppDispatch()
  const {
    success,
    failed
  } = useAppSelector(
    (state) => state.counter
  )

  const [permission, requestPermission] =
    useCameraPermissions()
  const [photoUri, setPhotoUri] =
    useState<string | null>(null)
  const cameraRef = useRef<any>(null)

  useEffect(() => {
    registerForPushNotificationsAsync()
  }, [])

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo =
        await cameraRef.current.takePictureAsync()
      setPhotoUri(photo.uri)
    }
  }

  const uploadData = async () => {
    if (!photoUri) return
    try {
      // Lokasi
      let { status } =
        await requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Izin lokasi dibutuhkan'
        )
        return
      }
      const location =
        await getCurrentPositionAsync({})

        // Upload foto
      const fileName =
        'photo-' + Date.now() + '.jpg'
      const base64 =
        await readAsStringAsync(
          photoUri,
          {
            encoding: 'base64'
          }
        )
      const {
        error: uploadError
      } = await supabase.storage
        .from('camera')
        .upload(
          fileName,
          decode(base64),
          {
            contentType: 'image/jpeg'
          }
        )

      if (uploadError) {
        dispatch(incrementFailed())
        await sendNotification(
          'Upload Gagal',
          `Success: ${success}
Failed: ${failed + 1}`
        )
        throw uploadError
      }

      // Public URL
      const { data: urlData } =
        supabase.storage
          .from('camera')
          .getPublicUrl(fileName)

      const publicUrl =
        urlData.publicUrl

      // Insert database
      const { error: dbError } =
        await supabase
          .from('photo')
          .insert([
            {
              latitude:
                location.coords.latitude.toString(),
              longitude:
                location.coords.longitude.toString(),
              image_url: publicUrl
            }
          ])

      if (dbError) {
        dispatch(incrementFailed())
        await sendNotification(
          'Database Gagal',
          `Success: ${success}
Failed: ${failed + 1}
Latitude:
${location.coords.latitude}
Longitude:
${location.coords.longitude}`
        )
        throw dbError
      }

      // SUCCESS
      dispatch(incrementSuccess())
      await sendNotification(
        'Data Berhasil Masuk',
        `Success: ${success + 1}
Failed: ${failed}
Latitude:
${location.coords.latitude}
Longitude:
${location.coords.longitude}`
      )

      Alert.alert(
        'Sukses',
        'Foto dan lokasi berhasil disimpan'
      )
      setPhotoUri(null)
    } catch (error: any) {
      dispatch(incrementFailed())
      await sendNotification(
        'Terjadi Error',
        `Success: ${success}
Failed: ${failed + 1}
${error.message}`
      )
      Alert.alert(
        'Error',
        error.message
      )
    }
  }

  if (!permission) return <View />

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Button
          title='Izinkan Kamera'
          onPress={requestPermission}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>
        Success: {success}
      </Text>
      <Text style={styles.counter}>
        Failed: {failed}
      </Text>

      {photoUri ? (
        <View style={styles.preview}>
          <Image
            source={{ uri: photoUri }}
            style={styles.image}
          />
          <Button
            title='Simpan ke Supabase'
            onPress={uploadData}
          />
          <Button
            title='Ambil Ulang'
            onPress={() => setPhotoUri(null)}
          />
        </View>
      ) : (
        <CameraView
          style={styles.camera}
          ref={cameraRef}
        >
          <View style={styles.buttonContainer}>
            <Button
              title='Ambil Foto'
              onPress={takePicture}
            />
          </View>
        </CameraView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: 'transparent'
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 300,
    height: 400,
    marginBottom: 20
  },
  counter: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold'
  }
})