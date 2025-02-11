# 📌 Sistema de Gestión Financiera

Este proyecto es un **sistema de gestión financiera** que permite a los usuarios registrar y gestionar ingresos, egresos, métodos de pago y categorías. Además, cuenta con integración con un sistema externo de tickets para reportar y gestionar problemas.

---

## 🚀 Características Principales

- 📊 **Dashboard** con gráficos dinámicos de ingresos y egresos.
- 🏦 **Gestión de Ingresos y Egresos** con categorías y métodos de pago.
- 🎫 **Gestión de Tickets** para reportar y visualizar el estado de los problemas.
- 🔐 **Autenticación JWT** (usuarios y administradores).
- ⚙️ **Panel de Administración** para gestionar usuarios, métodos de pago y categorías.
- 🌍 **Despliegue en DuckDNS** con integración en EC2 y Docker Compose.

---

## 📂 Estructura del Proyecto

```
backend/
│── app.py                # Archivo principal Flask
│── config.py             # Configuración global del sistema
│── extensions.py         # Extensiones de Flask (DB, JWT, CORS)
│── models.py             # Modelos de la base de datos
│── routes/
│   ├── auth.py           # Rutas de autenticación
│   ├── dashboard.py      # Rutas del dashboard
│   ├── transactions.py   # Rutas de ingresos/egresos
│   ├── categories.py     # Rutas de categorías
│   ├── metodospago.py    # Rutas de métodos de pago
│   ├── tickets.py        # Rutas de gestión de tickets
│   ├── admin.py          # Panel de administración
│   ├── integrations.py   # Integración con otros sistemas
│── services/
│   ├── external_services.py # Conexión con la API de Tickets
│── migrations/           # Migraciones de la base de datos
│── requirements.txt      # Dependencias del backend
│── Dockerfile            # Imagen de Docker para Flask
│── docker-compose.yml    # Composición del backend y base de datos

frontend/
│── src/
│   ├── components/       # Componentes reutilizables
│   ├── pages/
│   ├── services/api.js   # Llamadas a la API
│   ├── styles/           # Estilos CSS
│   ├── App.js            # Enrutamiento principal
│   ├── index.js          # Punto de entrada React
│── package.json          # Dependencias del frontend
│── Dockerfile            # Imagen de Docker para React
│── docker-compose.yml    # Composición del frontend
```

---

## ⚙️ Instalación y Configuración

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

### 2️⃣ Configurar Variables de Entorno

Crea un archivo **`.env`** en el backend:

```ini
FLASK_APP=app.py
FLASK_ENV=production
SECRET_KEY=tu-clave-secreta
DATABASE_URL=postgresql://usuario:contraseña@localhost/db_finanzas
TICKETS_API_URL=https://api.tickets.com  # Cambiar cuando la API esté disponible
```

### 3️⃣ Configurar la Base de Datos

```bash
flask db init  # Inicializar migraciones
flask db migrate -m "Inicial"
flask db upgrade
```

### 4️⃣ Ejecutar Backend

```bash
cd backend
pip install -r requirements.txt
flask run --host=0.0.0.0 --port=5000
```

### 5️⃣ Ejecutar Frontend

```bash
cd frontend
npm install
npm start
```

---

## 📦 Despliegue con Docker Compose

1️⃣ **Construir y ejecutar los contenedores:**
```bash
docker-compose up --build -d
```

2️⃣ **Ver logs de los servicios:**
```bash
docker-compose logs -f
```

---

## 📌 API Endpoints

### 🔐 Autenticación
| Método | Endpoint       | Descripción |
|--------|---------------|-------------|
| `POST` | `/api/login`  | Iniciar sesión |
| `POST` | `/api/register` | Registrar usuario |

### 📊 Dashboard
| Método | Endpoint       | Descripción |
|--------|---------------|-------------|
| `GET`  | `/api/dashboard`  | Obtener estadísticas |

### 💰 Transacciones
| Método | Endpoint       | Descripción |
|--------|---------------|-------------|
| `POST` | `/api/ingresos` | Agregar ingreso |
| `POST` | `/api/egresos`  | Agregar egreso |

### 🎫 Tickets
| Método | Endpoint       | Descripción |
|--------|---------------|-------------|
| `GET`  | `/api/tickets` | Obtener tickets |
| `POST` | `/api/tickets` | Reportar problema |
| `PATCH`| `/api/tickets/{id}` | Actualizar estado |

---

## 📜 Licencia
Este proyecto está bajo la **Licencia MIT**.

---

## 👨‍💻 Desarrollado por
**Franco Jimenez** -

