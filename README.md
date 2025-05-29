# 💳 Credit Card Manager — Monorepo (Frontend + Backend)

Este proyecto contiene una arquitectura monorepo que incluye:

- 🖥️ **Frontend**: Aplicación en React con Vite + ShadcnUI
- ⚙️ **Backend**: API REST en Node.js + Express conectada a Firebase Firestore

---

## 🚀 Requisitos Previos

- Node.js (v16 o superior recomendado)
- Tener configurado Firebase y el archivo `firebase-service-account.json` en la raíz del backend (excluido en `.gitignore`)

---

## 📦 Instalación de Dependencias

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/credit-card-manager.git
   cd credit-card-manager
   ```
   
2. Instala las dependencias del root:
   ```bash
   npm install
   ```
  
3. Instala las dependencias del frontend y backend con un solo comando:
   ```bash
   npm run install:all
   ```
   
---

## ▶️ Ejecutar el Proyecto

Para levantar tanto el frontend como el backend al mismo tiempo:

   ```bash
   npm run start:all
   ```


## 🌐 Acceso

🔌 API Backend:
http://localhost:3000/api/cards

💻 Frontend (Vite):
http://localhost:5174

### 📋 Requisitos cumplidos

#### 🧩 Primer Bloque – Frontend

Se desarrolló la maquetación e interacción del formulario de tarjeta de crédito cumpliendo con todos los criterios:

1. ✅ Todos los campos son requeridos y se validan correctamente:
   - El número de tarjeta acepta únicamente valores numéricos y debe tener exactamente 16 caracteres.
   - La fecha de vencimiento sigue el formato `mm/yy` y se valida que el mes esté entre `01` y `12`, y el año entre `22` y el actual + 5.
   - El nombre del titular solo acepta letras (con tildes) y un máximo de 20 caracteres.
2. ✅ Las validaciones incorrectas se muestran como texto en rojo debajo del campo correspondiente.
3. ✅ Al editar los campos (número, fecha y nombre), se actualiza el diseño visual de la tarjeta.
4. ✅ Al pulsar el botón **Agregar tarjeta**:
   - Se valida que el formulario esté completo y correcto.
   - Se agrega la tarjeta a una lista visible con nombre, fecha y número enmascarado (`12**********1234`).
   - Se asigna un identificador único a cada tarjeta.
5. ✅ Al pulsar el botón **Cancelar**, se limpian todos los campos del formulario.
6. ✅ Se añadió una funcionalidad adicional que permite ver todas las tarjetas de crédito almacenadas (**GET all**).

---

#### 🛠️ Segundo Bloque – Backend

El backend fue implementado en **Node.js + Express** utilizando **Firebase Firestore** como base de datos, cumpliendo con:

1. ✅ Creación de una **API RESTful completa** con las operaciones:
   - `GET /api/cards` – Obtener todas las tarjetas
   - `GET /api/cards/:id` – Obtener una tarjeta por ID
   - `POST /api/cards` – Crear una tarjeta (con todas las validaciones del primer bloque)
   - `PUT /api/cards/:id` – Actualizar una tarjeta
   - `DELETE /api/cards/:id` – Eliminar una tarjeta
2. ✅ No se utilizó ningún mecanismo de autenticación, como fue solicitado.
3. ✅ Los datos se almacenan correctamente en **Firebase Firestore**.
4. ✅ Todos los endpoints devuelven **respuestas HTTP adecuadas**:
   - `200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `409 Conflict`, `500 Internal Server Error`, según corresponda.
5. ✅ El frontend se conecta correctamente con la API, enviando y recibiendo datos en tiempo real.

