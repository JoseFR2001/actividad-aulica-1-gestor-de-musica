# SoundWave - Reglas del Proyecto & Constitución del Agente (AGENTS.md)

## 1. Stack Tecnológico Fijo
- **Framework**: React Native con Expo (SDK ~54.0.0).
- **Enrutamiento**: Expo Router (`expo-router` v6 / basados en el sistema de archivos dentro de `app/`).
- **Lenguaje**: TypeScript en modo estricto.
- **Estilos**: `StyleSheet` nativo de React Native con un sistema de tokens y temas centralizado en `src/constants/theme.ts`.
- **Iconografía**: `@expo/vector-icons` (`Ionicons`, `MaterialIcons`).
- **Estado y Servicios**: Sin backend real. Servicios asíncronos en `src/services/` utilizando `Promise` + `setTimeout` (latencia simulada de 500ms - 1000ms) y persistencia opcional con `AsyncStorage`.

## 2. Convenciones de Código y Nomenclatura
- **Idioma**: 
  - Código, nombres de variables, interfaces y funciones: **Inglés** (ej: `Song`, `Playlist`, `getPlaylists()`, `useMusicPlayer()`).
  - Textos de interfaz de usuario (UI), mensajes y comentarios explicativos: **Español**.
- **Componentes**: Componentes funcionales con tipado explícito (`React.FC` o funciones tipadas con TypeScript).
- **Manejo de Estados**: Toda pantalla o lista conectada a servicios debe contemplar obligatoriamente:
  1. Estado de carga (`isLoading` con `<ActivityIndicator />` o Skeleton).
  2. Estado vacío (`isEmpty` con vista visual informativa).
  3. Estado de error (`error` con mensaje amigable).
- **Estilos**: Prohibido el uso de estilos inline arbitrarios; utilizar `StyleSheet.create` al final de cada archivo o componentes estilizados del design system.

## 3. Reglas de Metodología SDD (Spec-Driven Development)
1. **La Spec manda**: No se programa ninguna funcionalidad que no esté descrita en una tarea de `tasks.md`.
2. **Desarrollo Atómico**: Se implementa una sola tarea por vez.
3. **Explicabilidad**: Todo código generado debe ser claro, legible y explicable línea por línea para la defensa oral individual.
4. **Validación**: Cada tarea debe probarse en el emulador / teléfono antes de considerarse completa y registrarse en `PROCESO.md`.
