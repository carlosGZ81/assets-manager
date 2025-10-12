# Assets Manager – Node.js + PostgreSQL + HTML/Bootstrap


Aplicación full‑stack para gestionar un listado de assets (laptops, celulares, monitores, etc.). Incluye API REST con Node.js/Express y persistencia en PostgreSQL. Frontend simple con HTML + Bootstrap usando `fetch()`.


## Requisitos
- Node.js 18+
- PostgreSQL 13+


## Instalación
```bash
# 1) Clonar
git clone <REPO_URL>
cd assets-manager


# 2) Dependencias
npm install


# 3) Variables de entorno
cp .env.example .env
# editar .env con tus credenciales de PostgreSQL


# 4) Base de datos
# crear DB (si no existe) y ejecutar schema.sql - pgAdmin 4
createdb assets_db # o por GUI
psql -d assets_db -f schema.sql


# 5) Ejecutar
npm run dev # modo desarrollo (nodemon)
# ó
npm start # producción