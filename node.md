# Taller de introducción al testing en node - Bootcamp 2019

## Requerimientos

* [Node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)

### Frontend

Instalar las dependencias del frontend

```
cd ejercicio-3/frontend
npm install
```

### Backend

Instalar las dependencias del backend

```
cd ../backend
npm install
```

### Crear la base de datos de la aplicación

Crear la base de datos `bootcamp` con

```
sudo mysql -hlocalhost -uroot -p < ../bootcamp.sql
```

y crear las tablas con las migraciones 

```
node ./node_modules/ts-node/dist/bin.js $(pwd)/node_modules/typeorm/cli migration:run
```

## Iniciar el servidor

Para ver la aplicación corriendo hacer

```
npm start
```

y en un browser ir a [localhost:3000](localhost:3000)

Para detener el servidor hacer `ctl + c`.

## Correr los tests del backend

```
npm test
```