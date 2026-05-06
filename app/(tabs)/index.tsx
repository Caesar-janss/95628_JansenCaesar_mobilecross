import React, { useState, useRef } from 'react'
import { View, Button, Alert, StyleSheet, Image } from 'react-native'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { readAsStringAsync } from 'expo-file-system/legacy'
import { decode } from 'base64-arraybuffer'
import { supabase } from '../../lib/supabase'

export default function Index() {
  const [permission, requestPermission] = useCameraPermissions()
  const [photoUri, setPhotoUri] = useState<string | null>(null)
  const cameraRef = useRef<any>(null)

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync()
      setPhotoUri(photo.uri)
    }
  }

  const uploadData = async () => {
    if (!photoUri) return
    try {
      //  Ambil Geolokasi
      let { status } = await requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Izin lokasi dibutuhkan')
        return
      }
      const location = await getCurrentPositionAsync({})

      //  Upload Foto ke Supabase Storage
      const fileName = "photo-" + Date.now() + ".jpg"
      const base64 = await readAsStringAsync(photoUri, { encoding: 'base64' })

      const { data: uploadData, error: uploadError } = await supabase.storage.from('camera').upload(fileName, decode(base64), { contentType: 'image/jpeg' })

      if (uploadError) throw uploadError

      //  Ambil Public URL Foto
      const { data: urlData } = supabase.storage.from('camera').getPublicUrl(fileName)
      const publicUrl = urlData.publicUrl

      //  Simpan Metadata ke Tabel photo
      const { error: dbError } = await supabase.from('photo').insert([
        {
          latitude: location.coords.latitude.toString(),
          longitude: location.coords.longitude.toString(),
          image_url: publicUrl
        }
      ])

      if (dbError) throw dbError

      Alert.alert('Sukses', 'Foto dan lokasi berhasil disimpan ke Supabase')
      setPhotoUri(null)
    } catch (error: any) {
      Alert.alert('Error', error.message)
    }
  }

  if (!permission) return <View />
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Button title="Izinkan Kamera" onPress={requestPermission} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {photoUri ? (
        <View style={styles.preview}>
          <Image source={{ uri: photoUri }} style={styles.image} />
          <Button title="Simpan ke Supabase" onPress={uploadData} />
          <Button title="Ambil Ulang" onPress={() => setPhotoUri(null)} />
        </View>
      ) : (
        <CameraView style={styles.camera} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <Button title="Ambil Foto" onPress={takePicture} />
          </View>
        </CameraView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  camera: { flex: 1, justifyContent: 'flex-end' },
  buttonContainer: { padding: 20, backgroundColor: 'transparent' },
  preview: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: 300, height: 400, marginBottom: 20 }
})