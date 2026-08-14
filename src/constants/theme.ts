/**
 * SoundWave - Sistema de Tokens y Tema Visual
 * Centraliza la paleta de colores, tipografías, espaciados y radios de borde
 * para mantener consistencia en toda la aplicación.
 */

export const COLORS = {
  // Fondos y Superficies
  background: '#0D1117',        // Fondo principal oscuro
  backgroundElevated: '#161B22',// Fondo de tarjetas y listas
  surface: '#1F242D',           // Superficie interactiva / inputs
  surfaceHighlight: '#2A303C',  // Hover o estado presionado
  border: '#30363D',            // Bordes sutiles

  // Colores de Marca y Acento
  primary: '#007AFF',           // Azul eléctrico principal
  primaryLight: '#3894FF',      // Azul hover / activo
  primaryDark: '#0056B3',       // Azul botón presionado
  secondary: '#53E076',         // Verde acento (shuffle / status)
  secondaryLight: '#7DF09A',    // Verde claro
  tertiary: '#FFB800',          // Amarillo dorado (rating / tags)

  // Estados
  favorite: '#FF4B72',          // Rosa/Rojo para corazones de "Me Gusta"
  error: '#FF5252',             // Rojo de validación y errores
  success: '#53E076',           // Verde de éxito
  warning: '#FFB800',           // Advertencias

  // Textos
  text: '#FFFFFF',              // Texto blanco principal
  textSecondary: '#9CA3AF',     // Texto gris secundario / subtítulos
  textMuted: '#6B7280',         // Texto gris apagado / métricas
  textInverse: '#0D1117',       // Texto oscuro para botones claros
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

export const FONT_SIZES = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 18,
  xl: 22,
  xxl: 28,
  title: 32,
} as const;

export const BORDER_RADIUS = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 5,
  },
  glowPrimary: {
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
};
