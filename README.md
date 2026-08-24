# Regalo de cumpleaños para Momo ❤️

Proyecto separado en **Frontend** y **Backend**, usando React + Vite, Node + Express y MongoDB/Mongoose.

## Estructura

```text
regalo_momo/
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── .env.example
├── Frontend/
│   ├── public/photos/
│   └── src/
└── package.json
```

## 1. MongoDB

Copia `Backend/.env.example` a `Backend/.env`.

Para MongoDB local:

```env
MONGODB_URI=mongodb://localhost:27017/momo
PORT=3001
FRONTEND_URL=http://localhost:3000
```

Para MongoDB Atlas, reemplaza `MONGODB_URI` por tu URI de Atlas.

**No publiques el archivo `.env`.**

## 2. Instalar

Desde la carpeta raíz:

```bash
npm install
npm run install:all
```

## 3. Ejecutar

```bash
npm run dev
```

Frontend: http://localhost:3000  
Backend: http://localhost:3001  
Health check: http://localhost:3001/api/health

## API

- `GET /api/gift/momo` obtiene el regalo.
- `PUT /api/gift/momo` actualiza el regalo.
- `GET /api/health` comprueba Backend + MongoDB.

Al iniciar el Backend, el regalo se crea/actualiza automáticamente en MongoDB con la carta proporcionada y los seis recuerdos de ejemplo.

## Fotos

Reemplaza las seis imágenes en:

`Frontend/public/photos/`

Mantén los nombres `foto-1.jpg` a `foto-6.jpg`, o cambia las rutas de las fotos en MongoDB.

