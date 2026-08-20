# Spolofy

Spolofy es una aplicacion movil para gestionar una biblioteca musical. Permite explorar canciones, albumes, artistas y playlists, consultar el detalle de cada elemento y marcar canciones como favoritas.

El proyecto esta desarrollado con React Native y Expo SDK 54. Utiliza Expo Router para la navegacion basada en archivos, TypeScript para el tipado y datos locales simulados para representar el catalogo musical. Tambien puede ejecutarse en el navegador mediante React Native Web.

## Requisitos

- Node.js LTS
- npm
- Git
- Expo Go en un dispositivo movil, si se desea probar la aplicacion en Android o iOS
- Android Studio, para usar un emulador Android
- Xcode, para usar un simulador iOS en macOS

## Instalacion

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/JoseFR2001/actividad-aulica-1-gestor-de-musica.git
   ```

2. Entrar en la carpeta del proyecto:

   ```bash
   cd actividad-aulica-1-gestor-de-musica
   ```

3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Iniciar el servidor de desarrollo:

   ```bash
   npx expo start
   ```

5. Abrir la aplicacion usando una de las opciones que muestra Expo:
   - Presionar `w` para abrirla en el navegador.
   - Presionar `a` para abrirla en un emulador Android.
   - Presionar `i` para abrirla en un simulador iOS.
   - Escanear el codigo QR con Expo Go desde un dispositivo movil.

## Comandos disponibles

Ejecutar la aplicacion en web:

```bash
npm run web
```

Ejecutar la aplicacion en Android:

```bash
npm run android
```

Ejecutar la aplicacion en iOS:

```bash
npm run ios
```

Revisar el codigo con ESLint:

```bash
npm run lint
```

Ejecutar las pruebas unitarias:

```bash
npx jest --runInBand --ci --verbose
```

## Estructura principal

- `app/`: pantallas y rutas de la aplicacion.
- `src/components/`: componentes reutilizables de la interfaz.
- `src/data/`: catalogo musical y fuente de datos simulada.
- `src/domain/`: tipos y selectores del dominio musical.
- `src/hooks/`: hooks personalizados, como la gestion de favoritos.
- `src/theme/`: colores, espaciados y tokens visuales.
- `tests/`: pruebas unitarias del proyecto.

## Notas

La aplicacion utiliza datos locales simulados, por lo que puede ejecutarse sin configurar un backend. En el navegador se priorizan esos datos locales para evitar problemas de CORS con servicios externos.
