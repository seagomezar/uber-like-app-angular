# Uber Like App (Angular 22) 🚗🗺️

Este proyecto es una aplicación web interactiva que replica la interfaz y el flujo de solicitud de conductor de la aplicación de **Uber**, sirviendo como laboratorio y comparativa práctica de las diferentes estrategias para integrar y consumir **Google Maps** en **Angular**.

---

## 🌟 Características Principales

* **Actualizado a Angular 22**: Arquitectura 100% moderna basada en **Standalone Components**, sin `NgModule` obsoletos.
* **Control Flow Moderno**: Uso de las directivas declarativas integradas de Angular (`@if`, `@for`).
* **Angular Signals**: Gestión reactiva de estado en tiempo de ejecución (`signal`, `computed`).
* **Compilación Ultrarrápida**: Motor `@angular/build:application` potenciado por **esbuild** y **Vite**.
* **Simulación en Tiempo Real Resiliente**: Si no dispones de credenciales de Firebase Firestore, la aplicación activa automáticamente una simulación matemática local fluida donde el vehículo se traslada a tu destino en tiempo real. Si configuras Firebase, se conecta directamente a Firestore.
* **Selector Visual de Versiones**: Barra superior interactiva que permite alternar entre las diferentes implementaciones de mapas al instante con un solo clic.

---

## 🗺️ Implementaciones de Google Maps Comparadas

| Versión | Ruta | Tecnología / Enfoque | Descripción |
| :--- | :--- | :--- | :--- |
| **v1** | `/v1` | `@angular/google-maps` | Componente oficial y nativo mantenido por el equipo de Google Angular (`<google-map>`, `<map-marker>`, `<map-polyline>`). Enfoque declarativo recomendado para la mayoría de proyectos Angular modernos. |
| **v2** | `/v2` | **Google Maps JS API Directa** | Uso imperativo directo de la librería JavaScript de Google (`google.maps.Map`, `google.maps.Marker`, `google.maps.Polyline`). Ideal para proyectos que requieran acceso de bajo nivel a todas las APIs nativas de Maps. |
| **v3** | `/v3` | **Signals & Reactivo** (`@angular/google-maps`) | Enfoque reactivo moderno utilizando **Angular Signals** (`signal()`, `computed()`) y el componente oficial de Angular. Reemplaza la antigua y descontinuada librería `@agm/core`. |

> [!NOTE]
> **Nota de Migración sobre `@agm/core` (Angular Google Maps):**
> En versiones anteriores de este repositorio se incluía una tercera opción con `@agm/core`. Esta librería fue descontinuada y abandonada por su comunidad hace varios años (sin soporte para Angular 13 en adelante). En esta modernización ha sido removida y sustituida en la versión **v3** por la arquitectura reactiva basada en Signals sobre el componente oficial de Angular.

---

## 🚀 Comenzando

### Pre-requisitos 📋

1. **Node.js**: Versión `22.x` o `24.x` (LTS recomendada).
   * Descarga: [nodejs.org](https://nodejs.org/)
2. **NPM**: Versión `10.x` u `11.x` (incluida con Node).

### Instalación 🔧

Clona el repositorio e instala las dependencias actualizadas:

```bash
git clone https://github.com/seagomezar/uber-like-app-angular.git
cd uber-like-app-angular
npm install
```

### Ejecución en Desarrollo ⚙️

Inicia el servidor de desarrollo con:

```bash
npm start
```

Abre tu navegador en [http://localhost:4200/](http://localhost:4200/). La aplicación se recargará automáticamente ante cualquier cambio gracias a Vite y esbuild.

### Compilación para Producción 📦

Para compilar la aplicación optimizada para despliegue:

```bash
npm run build
```

Los artefactos listos para producción se generarán en `dist/uber-like-app/browser`.

### Pruebas Unitarias 🧪

Ejecuta la suite de pruebas unitarias automatizadas con Karma y Chrome Headless:

```bash
npm test
```

Para ejecutar las pruebas en modo observador continuo interactivo:

```bash
npm run test:watch
```

---

## ⚙️ Configuración Opcional: Google Maps y Firebase

El proyecto está diseñado para funcionar **inmediatamente tras clonar**, sin necesidad obligatoria de configurar claves para visualizar la simulación y las rutas. Sin embargo, si deseas usar tus propias credenciales en vivo:

### 1. Google Maps API Key
Edita [src/index.html](file:///c:/Users/Usuario/Documents/projects/uber-like-app-angular/src/index.html) y reemplaza el parámetro `key`:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=TU_API_KEY&libraries=places,geometry&loading=async" async defer></script>
```

### 2. Firebase Firestore
Edita [src/environments/environment.ts](file:///c:/Users/Usuario/Documents/projects/uber-like-app-angular/src/environments/environment.ts) y añade la configuración de tu proyecto Firebase:
```typescript
export const environment = {
  production: false,
  mapsApiKey: 'TU_API_KEY_AQUI',
  firebaseConfig: {
    apiKey: '...',
    authDomain: '...',
    databaseURL: '...',
    projectId: 'tu-proyecto-id',
    storageBucket: '...',
    messagingSenderId: '...',
    appId: '...'
  }
};
```
*Si `projectId` se deja vacío, la aplicación funcionará en modo simulación automática sin errores de consola.*

---

## 🏗️ Estructura del Código

```text
src/
├── app/
│   ├── bottom-bar/            # Barra de navegación inferior
│   ├── top-bar/               # Cabecera con selector interactivo de versiones (v1, v2, v3)
│   ├── realtime-map/          # v1: @angular/google-maps nativo
│   ├── realtime-map-v2/       # v2: Vanilla Google Maps JS API + map_styles oscuros
│   ├── realtime-map-v3/       # v3: Angular Signals + @angular/google-maps
│   ├── services/
│   │   └── driver.service.ts  # Servicio en tiempo real (Firestore + simulación matemática)
│   ├── app.component.*        # Shell principal de la aplicación
│   └── app.routes.ts          # Rutas con lazy loading
├── assets/                    # Iconos (car.png, photo.jpg)
├── environments/              # Variables de entorno
├── index.html                 # HTML raíz con fuentes Roboto, Material Icons y Maps
├── main.ts                    # Bootstrap standalone moderno
└── styles.scss                # Estilos globales
```

---

## 🛠️ Tecnologías y Librerías Utilizadas

* [Angular 22](https://angular.dev/) - Framework web reactivo y escalable.
* [@angular/google-maps](https://github.com/angular/components/tree/main/src/google-maps) - Librería oficial de componentes Google Maps para Angular.
* [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript) - API nativa de mapas de Google.
* [Firebase](https://firebase.google.com/) - SDK v12 modular para Firestore en tiempo real.
* [RxJS](https://rxjs.dev/) - Programación reactiva con Observables.
* [Vite & esbuild](https://vite.dev/) - Motor de empaquetado de última generación.

---

## 📚 Material Complementario

* [Presentación del Proyecto en Google Slides](https://docs.google.com/presentation/d/1OZoKo0sEhyZOarV82jQjPtcR41kAbdIj4GntNVUbvo0)

---

## ✒️ Autores y Reconocimientos

* **Sebastian Gomez** - *Autor Original* - [@seagomezar](https://github.com/seagomezar) / [@sebasgojs](https://twitter.com/sebasgojs)
* **Actualización y Modernización**: Migración integral a Angular 22, arquitectura Standalone, Signals, remoción de dependencias obsoletas y resiliencia en tiempo real.

---

⌨️ con ❤️ y pasión por el desarrollo web moderno 😊
