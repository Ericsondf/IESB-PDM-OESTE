import * as Location from 'expo-location';

export async function getCurrentPlace() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;

  const position = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = position.coords;

  let label = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
  try {
    const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (address) {
      const text = [address.street, address.district || address.subregion, address.city]
        .filter(Boolean)
        .join(', ');
      if (text) label = text;
    }
  } catch (err) {
    // mantém as coordenadas como rótulo
  }

  return { latitude, longitude, label };
}
