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
