# Guía de inicialización del proyecto

Este proyecto es una app Expo + React Native para un gestor musical local.

## 1. Abrir la carpeta del proyecto

Abre la carpeta raíz del repositorio en VS Code:

```bash
c:\Users\IPF-2026\Desktop\Nueva carpeta\actividad-aulica-1-gestor-de-musica
```

## 2. Instalar dependencias

Desde la terminal dentro de la carpeta del proyecto, ejecuta:

```bash
npm install
```

Si aparece algún error de dependencias, prueba:

```bash
rm -rf node_modules package-lock.json
npm install
```

En Windows PowerShell, la limpieza se hace con:

```powershell
Remove-Item -Recurse -Force node_modules, package-lock.json -ErrorAction SilentlyContinue
npm install
```

## 3. Iniciar la app

### Opción A: versión web

```bash
npm run web
```

Esto abre la app en el navegador.

### Opción B: servidor Expo general

```bash
npm start
```

Después puedes elegir una de estas opciones:

- `w` para abrir en navegador web
- `a` para Android
- `i` para iOS
- escanear el QR con Expo Go en tu móvil

## 4. Si usas Expo Go en móvil

1. Instala Expo Go en tu teléfono.
2. Ejecuta:

```bash
npm start
```

3. Escanea el código QR que aparece en la terminal o en el navegador.

## 5. Si quieres limpiar el proyecto

```bash
npm run reset-project
```

## 6. Verificar que funciona

Puedes comprobar que la app compila con:

```bash
npx tsc --noEmit
```

Y pruebas unitarias:

```bash
npx jest --runInBand
```

## 7. Estructura importante

- `app/` → pantallas de la app con Expo Router
- `src/` → lógica de negocio, tipos, mocks, componentes
- `src/data/` → catálogo mockeado
- `src/components/` → componentes reutilizables
- `specs/001-gestor-musical/` → especificación y tareas del proyecto

## 8. Solución rápida a errores comunes

### Error de Jest / ts-jest

```bash
npm install -D jest@29.7.0 ts-jest@29.1.2 @types/jest@29.5.14
```

### Error de compilación TypeScript

```bash
npx tsc --noEmit
```

Y revisa si hay rutas o archivos no esperados como `app-example` o carpetas viejas del starter.

## 9. Siguiente paso recomendado

Cuando ya esté arrancado, puedes abrir la app en navegador con:

```bash
npm run web
```

y comenzar a probar la pantalla principal del gestor musical.
