import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';

export default function TasksScreen() {
  const [place, setPlace] = useState(null);

  async function handleCheckIn() {
    try {
      const result = await getCurrentPlace();
      if (!result) {
        Alert.alert(
          'Permissão negada',
          'Sem acesso à localização não é possível fazer o check-in.'
        );
        return;
      }
      setPlace(result);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível obter a localização.');
    }
  }

  async function handleReminder() {
    try {
      const id = await scheduleReminder('Hora de estudar!', 10);
      if (!id) {
        Alert.alert('Permissão negada', 'Ative as notificações para receber o lembrete.');
        return;
      }
      Alert.alert('Lembrete agendado', 'Você será avisado em 10 segundos.');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível agendar o lembrete.');
    }
  }

  async function handleComplete() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (err) {
      // sem vibração (emulador): segue sem quebrar
    }
    Alert.alert('Tarefa concluída');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Tarefas</Text>

      <View style={styles.block}>
        <Button title="Nova tarefa" onPress={() => router.push('/new-task')} />
      </View>

      <View style={styles.block}>
        <Link href="/task/42" style={styles.link}>
          Abrir tarefa 42
        </Link>
      </View>

      <View style={styles.block}>
        <Button title="Estudei aqui" onPress={handleCheckIn} />
        {place && <Text style={styles.place}>{place.label}</Text>}
      </View>

      <View style={styles.block}>
        <Button title="Lembrar em 10 s" onPress={handleReminder} />
      </View>

      <View style={styles.block}>
        <Button title="Concluir" onPress={handleComplete} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 8 },
  heading: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  block: { marginBottom: 12 },
  link: { color: '#2563eb', fontSize: 16, paddingVertical: 8 },
  place: { marginTop: 8, color: '#374151' },
});
