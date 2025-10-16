import { MD3LightTheme } from 'react-native-paper';

// FundFlow color palette
// Primary Blue: #4169E1, Success Green: #10B981, Warning Orange: #F59E0B, Error Red: #EF4444, Info Blue: #3B82F6
// Neutrals and backgrounds adjusted to spec
export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#4169E1',
    primaryContainer: '#E6ECFF',
    secondary: '#2952CC',
    secondaryContainer: '#DDE6FF',
    tertiary: '#6B8FFF',
    tertiaryContainer: '#ECF1FF',
    surface: '#FFFFFF',
    surfaceVariant: '#F3F4F6',
    background: '#F9FAFB',
    error: '#EF4444',
    errorContainer: '#FEE2E2',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onTertiary: '#FFFFFF',
    onSurface: '#111827',
    onSurfaceVariant: '#6B7280',
    onBackground: '#111827',
    onError: '#FFFFFF',
    outline: '#E5E7EB',
    outlineVariant: '#E5E7EB',
    inverseSurface: '#1F2937',
    inverseOnSurface: '#FFFFFF',
    inversePrimary: '#93C5FD',
    shadow: '#000000',
    scrim: '#000000',
    surfaceDisabled: 'rgba(17, 24, 39, 0.12)',
    onSurfaceDisabled: 'rgba(17, 24, 39, 0.38)',
    backdrop: 'rgba(17, 24, 39, 0.4)',
    // Semantic accents
    success: '#10B981' as any,
    warning: '#F59E0B' as any,
    info: '#3B82F6' as any,
  },
};
