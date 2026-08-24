# Tripleten web_project_around_express
API REST desarrollada con **Node.js**, **Express** y **MongoDB** para la gestión de usuarios y tarjetas.

## Tecnologías

- Node.js
- Express
- MongoDB
- Mongoose

## Clona el repositorio:

```bash
git clone https://github.com/tu_usuario/web_project_around_express.git
```

## Ingresa al proyecto:

```bash
cd web_project_around_express
```

## Instala las dependencias:

```bash
npm install
```

---

Configuración

Asegúrate de tener MongoDB instalado y ejecutándose.

## La aplicación se conecta a:

```text
mongodb://localhost:27017/aroundb
```

# Ejecutar el proyecto:

```bash
npm run dev
```

## El servidor iniciará en:

```
http://localhost:3000
```

## Endpoints principales

### Usuarios
- `GET /users`
- `GET /users/:userId`
- `POST /users`
- `PATCH /users/me`
- `PATCH /users/me/avatar`

### Tarjetas
- `GET /cards`
- `POST /cards`
- `DELETE /cards/:cardId`
- `PUT /cards/:cardId/likes`
- `DELETE /cards/:cardId/likes`

## Características

- CRUD de usuarios y tarjetas.
- Actualización de perfil y avatar.
- Sistema de "Me gusta" para tarjetas.
- Validación de datos con Mongoose.
- Manejo de errores mediante códigos HTTP.

---

**Autor:** Sebastián Castrillón Osorio
