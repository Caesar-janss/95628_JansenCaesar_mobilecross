import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

export default function Index() {
  // Camera permission (API baru)
  const [permission, requestPermission] = useCameraPermissions();

  // Media permission
  const [mediaPermission, setMediaPermission] = useState<boolean | null>(null);

  // Photo state
  const [photo, setPhoto] = useState<any>(null);

  // Camera ref
  const cameraRef = useRef<any>(null);

  // Request media permission
  useEffect(() => {
    (async () => {
      const media = await MediaLibrary.requestPermissionsAsync();
      setMediaPermission(media.status === 'granted');
    })();
  }, []);

  // Ambil Gambar
  const takePicture = async () => {
    try {
      if (cameraRef.current) {
        const result = await cameraRef.current.takePictureAsync();
        setPhoto(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Save Image
  const saveImage = async () => {
    try {
      if (!photo) {
        alert("No image to save!");
        return;
      }

      if (!mediaPermission) {
        alert("Media permission not granted!");
        return;
      }

      const fileName = photo.uri.split('/').pop();
      const newPath = (FileSystem as any).documentDirectory + fileName;

      // Copy ke local storage
      await FileSystem.copyAsync({
        from: photo.uri,
        to: newPath,
      });

      // Save ke gallery
      await MediaLibrary.saveToLibraryAsync(newPath);

      alert("Image saved to gallery!");
    } catch (error) {
      console.log(error);
    }
  };

  // Loading permission
  if (!permission) {
    return <Text>Requesting camera permission...</Text>;
  }

  // Belum diizinkan
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>No access to camera</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!photo ? (
        <CameraView style={styles.camera} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <Button title="Take Photo" onPress={takePicture} />
          </View>
        </CameraView>
      ) : (
        <View style={styles.preview}>
          <Image source={{ uri: photo.uri }} style={styles.image} />

          <View style={styles.row}>
            <Button title="Retake" onPress={() => setPhoto(null)} />
            <Button title="SAVE IMAGE" onPress={saveImage} />
          </View>
        </View>
      )}
    </View>
  );
}

// STYLE
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '70%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});