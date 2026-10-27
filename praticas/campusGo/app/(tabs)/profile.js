import { useEffect, useState } from 'react';
import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { pickImage, takePhoto } from '../../services/media';

const PHOTO_KEY = '@profile-photo';

export default function ProfileScreen() {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem(PHOTO_KEY)
      .then((uri) => {
        if (uri) setPhoto(uri);
      })
      .catch(() => {});
  }, []);

  async function updatePhoto(uri) {
    if (!uri) return;
    setPhoto(uri);
    try {
      await AsyncStorage.setItem(PHOTO_KEY, uri);
    } catch (err) {
      // a foto continua na tela mesmo se não salvar
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={async () => updatePhoto(await pickImage())}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Ionicons name="person" size={64} color="#9ca3af" />
          </View>
        )}
      </Pressable>
      <Text style={styles.hint}>Toque na foto para escolher da galeria</Text>
      <Button title="Tirar foto" onPress={async () => updatePhoto(await takePhoto())} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  avatar: { width: 140, height: 140, borderRadius: 70 },
  placeholder: {
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: { color: '#6b7280' },
});
