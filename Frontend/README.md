# Regalo de cumpleaños ♡

Este proyecto adapta la estructura original de Around a un regalo de cumpleaños privado, sin login ni backend.

## Personalizarlo

### 1. Fotos
Reemplaza los archivos de `public/photos/` manteniendo estos nombres:
- `foto-1.jpg`
- `foto-2.jpg`
- `foto-3.jpg`
- `foto-4.jpg`
- `foto-5.jpg`
- `foto-6.jpg`

Puedes usar JPG, PNG o WebP; si cambias la extensión, actualiza las rutas en `src/components/App.jsx`.

### 2. Carta
En `src/components/App.jsx`, busca `const letter = { ... }` y cambia:
- `greeting`
- los textos de `paragraphs`
- `signature`

### 3. Textos de las fotos
En el arreglo `photos` puedes cambiar el título y la pequeña historia de cada foto.

## Ejecutar

```bash
npm install
npm run dev
```

Para producción:

```bash
npm run build
```

La carpeta `dist/` será el sitio listo para publicar.
