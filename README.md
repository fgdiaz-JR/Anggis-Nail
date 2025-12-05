# Anggis Nails — Web (repo-ready)

Proyecto React mínimo con Vite. Contiene la versión modularizada de la UI en `src/` lista para subir a GitHub.

Quick start

1. Instala dependencias:

```powershell
cd "c:\Users\fgdia\Downloads\Anggis Nails\repo-ready"
npm install
```

2. Ejecuta en desarrollo:

```powershell
npm run dev
```

Nota sobre Tailwind

Este proyecto ya viene configurado con Tailwind CSS (archivo `tailwind.config.cjs` y `postcss.config.cjs`). Después de `npm install` Tailwind estará disponible y las clases del proyecto se compilarán automáticamente con Vite.

Estructura importante

- `src/App.jsx` — componente principal (importa componentes modulares).
- `src/components/` — componentes reutilizables (Button, ServiceCard, TestimonialCard).
- `src/data.js` — imágenes, servicios y gift cards.

Nota

He creado este directorio sin borrar tu archivo original `app.jsx`. Revisa `repo-ready/src` y ajusta rutas o estilos según necesites.
