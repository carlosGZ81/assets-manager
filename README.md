# Assets Manager – Node.js + PostgreSQL + HTML/Bootstrap


Aplicación full‑stack para gestionar un listado de assets (laptops, celulares, monitores, etc.). 
Incluye API REST con Node.js/Express y persistencia en PostgreSQL. 
Frontend HTML + Bootstrap usando `fetch()`.


## Requisitos
- Node.js 18+
- PostgreSQL 13+


## Instalación
```bash
# 1) Clonar
git clone https://github.com/carlosGZ81/assets-manager.git
cd assets-manager


# 2) Dependencias
npm install


# 3) Variables de entorno
cp .env.example .env
# editar .env con credenciales apropiadas de PostgreSQL


# 4) Base de datos
# crear DB (si no existe) y ejecutar schema.sql - pgAdmin4
# el proyecto contiene los scripts
createdb assets_db # o por GUI
psql -d assets_db -f schema.sql


# 5) Ejecutar
npm run dev # modo desarrollo (nodemon)
# ó
npm start # producción