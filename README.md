# Task Manager Frontend

Aplicación frontend para gestión de tareas construida con React y TypeScript.  
Consume una API REST propia para manejar un CRUD completo de tareas.

## Demo

- Frontend: https://task-manager-frontend-three-eta.vercel.app
- Backend: https://task-manager-backend-f0uz.onrender.com

## Tecnologías

- React
- TypeScript
- Vite
- CSS

## Funcionalidades

- Listar tareas desde API
- Crear nuevas tareas
- Marcar tareas como completadas
- Eliminar tareas
- Filtrar tareas (todas, pendientes, completadas)
- Tema dark/light
- Manejo de estados de carga y error

## Arquitectura básica

- `components/` → componentes reutilizables (`TaskItem`, `TaskList`)
- `pages/` → lógica principal de la vista (`TasksPage`)
- `services/` → consumo de API (`fetch`)
- `types/` → tipado de datos (`Task`)
- `styles/` → estilos globales

## Variables de entorno

Crear un archivo `.env`:

```env
VITE_API_URL=http://localhost:3001
```
## Cómo ejecutar en local

```env
npm install
npm run dev
```