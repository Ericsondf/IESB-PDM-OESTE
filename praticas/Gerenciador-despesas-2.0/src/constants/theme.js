import { Platform } from 'react-native';

export const themes = {
  light: {
    background: '#F4F6FB',
    card: '#FFFFFF',
    text: '#1B1F3B',
    textMuted: '#6B7280',
    primary: '#4F46E5',
    onPrimary: '#FFFFFF',
    border: '#D1D5DB',
    error: '#DC2626',
    input: '#FFFFFF',
    chip: '#E5E7EB',
    overlay: 'rgba(0, 0, 0, 0.4)',
  },
  dark: {
    background: '#0F1220',
    card: '#1C2038',
    text: '#F3F4F6',
    textMuted: '#9CA3AF',
    primary: '#818CF8',
    onPrimary: '#0F1220',
    border: '#3B4064',
    error: '#F87171',
    input: '#1C2038',
    chip: '#2A2F4F',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },
};

export function getTheme(colorScheme) {
  return colorScheme === 'dark' ? themes.dark : themes.light;
}

export const cardShadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  android: { elevation: 4 },
  default: { boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)' },
});
