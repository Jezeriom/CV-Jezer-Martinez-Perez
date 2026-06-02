# CV Jezer Martinez Perez

Sitio web de hoja de vida migrado a React con Vite. Incluye un espacio administrativo para gestionar experiencias profesionales mediante CRUD consumiendo la API de la unidad 3.

## Requisitos

- Node.js con npm instalado
- MongoDB Atlas o una cadena `MONGO_URI` valida

## Instalacion

```bash
npm install
npm install --prefix backend
```

## Ejecutar el proyecto

En una terminal, inicia la API:

```bash
npm run backend
```

En otra terminal, inicia React:

```bash
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:3000/api/experiences`

## Variables de entorno

Frontend:

```bash
VITE_API_URL=http://localhost:3000/api/experiences
```

Backend:

```bash
PORT=3000
MONGO_URI=tu_cadena_de_mongodb
```

## Funcionalidad implementada

- Migracion del sitio a React.
- Navegacion SPA entre Inicio, Acerca de mi, Educacion, Experiencias, Contacto y Admin.
- CRUD de experiencias profesionales consumiendo `/api/experiences`.
- Listado publico de experiencias desde la API.
- Mejoras responsive para layouts de inicio, contacto, educacion, tarjetas y administracion.
- Animaciones del navbar y panel social ajustadas a `0.3s`.
