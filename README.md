# Desarrollo2
Registro usuarios DAO

## Ejecución local

El proyecto está dividido en dos carpetas independientes:

- `backend/` (servidor Node/Express + MongoDB)
- `client/` (aplicación React creada con CRA)

### Pasos básicos

1. Instalar dependencias:
   ```bash
   cd backend && npm install
   cd ../client && npm install
   ```
2. Iniciar el servidor y el cliente en terminales distintas:
   ```bash
   cd backend && npm run dev    # usa nodemon
   cd client  && npm start      # levanta CRA en http://localhost:3000
   ```

### Usando Docker (recomendado)

Se proporciona un `docker-compose.yml` que arranca un contenedor **MongoDB**
junto con el backend.

1. Asegúrate de tener Docker instalado y en ejecución.

   > ⚠️ **Puertos en uso:** si tienes el backend corriendo localmente
   > (`npm run dev` u otro proceso) debes detenerlo antes de arrancar
   > los contenedores, ya que Docker mapea el puerto 5000 del host. Para
   > liberar el puerto ejecuta algo como:
   >
   > ```bash
   > lsof -i :5000          # ver qué PID lo ocupa
   > kill <PID>             # o `pkill -f "node.*server.js"`
   > ```
   >
   > Alternativamente, puedes cambiar la línea `ports:` en el
   > `docker-compose.yml` a `"5001:5000"` (o cualquier otro número)
   > si prefieres que el contenedor escuche en un puerto distinto del host.

2. Desde la raíz del repositorio ejecuta:
   ```bash
   docker-compose up --build
   ```
   Esto construirá y levantará tres servicios:
   - `mongo`: base de datos (puerto 27017)
   - `backend`: API Node en el puerto 5000
   - `client`: aplicación React en el puerto 3000
3. Verifica que los logs muestren en los tres contenedores:
   ```txt
   mongo      | waiting for connections on port 27017
   backend    | MongoDB conectado
   backend    | Servidor corriendo en puerto 5000
   client     | Starting the development server...
   ```

   El cliente ya está configurado para usar `http://backend:5000` como URL
   de la API dentro de la red de Docker Compose.

Abre tu navegador en **http://localhost:3000** y el flujo de autenticación
funcionará sin necesidad de ejecutar nada más.

> Si prefieres solo MongoDB en Docker:
> ```bash
> docker run -d --name dev-mongo -p 27017:27017 mongo:latest
> ```
> y ajusta `backend/.env` para usar `mongodb://localhost:27017/desarrollo2`

---

