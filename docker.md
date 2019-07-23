# Taller de introducción al testing en node - Bootcamp 2019

Si la máquina de desarrollo tiene instalado `Docker` y `docker-compose` es posible usar `docker-compose` para correr la applicación y los tests sin instalar `node` ni `mysql`.

## Requerimientos

* [Docker](https://www.docker.com/)
* [docker-compose](https://docs.docker.com/compose/)

### Iniciar los servidores

Ir al directorio del proyecto

```
cd ejercicio-3
```

### Iniciar los servidores

Iniciar node, el servidor mysql y el admin de mysql con:

```
sudo docker-compose up -d
```

### Crear la base de datos de la aplicación

Crear la base de datos `bootcamp` con

```
sudo docker-compose exec -T database sh -c 'exec mysql -hdatabase -uroot -proot' < $(pwd)/bootcamp.sql
```

### Instalar las depedencias de npm

```
sudo docker run -it --rm -v "$PWD":/home/node/app -w /home/node/app/backend node:12 npm install
```

```
sudo docker run -it --rm -v "$PWD":/home/node/app -w /home/node/app/frontend node:12 npm install
```

### Crear las tablas con las migraciones 

```
sudo docker run --network ejercicio-3_default -it --rm -v "$PWD":/home/node/app -w /home/node/app/backend node:12 node ./node_modules/ts-node/dist/bin.js ./node_modules/typeorm/cli migration:run
```

### Iniciar el servidor web

```
sudo docker run --network ejercicio-3_default -it --rm -p3000:3000 -v "$PWD":/home/node/app -w /home/node/app/backend node:12 npm run watch
```

### Buildear el frontend

```
sudo docker run -it --rm -v "$PWD":/home/node/app -w /home/node/app/frontend node:12 npm run watch
```

### Correr los tests de backend

```
sudo docker run --network ejercicio-3_default -it --rm -v "$PWD":/home/node/app -w /home/node/app/backend node:12 npm test
```

## Otros comandos

### Apagar los servidores

Apagar los servidores con

```
sudo docker-compose rm -f
```

### Mysql adminer

El `docker-compose` usado tiene un administrador de `mysql` al que se puede acceder desde

[http://localhost:8080/](http://localhost:8080/)


### Mysql client

Es posible conectarse desde un cliente mysql con

```
sudo docker run -it --rm --network bootcamp-2019_default mysql:5.7 mysql -hdb -uroot -p
```

Para hacer sh al servidor mysql hacer

```
sudo docker exec -ti bootcamp-mysql sh
```

Para guardar el contendido de la base de datos a un archivo `/bootcamp.sql` hacer

```
sudo docker exec bootcamp-mysql sh -c 'exec mysqldump bootcamp -hdb -uroot -p"root"' > $(pwd)/bootcamp.sql
```