# Practica Dockerfile

En esta practica se realizaran 3 contenedores docker a traves de imagenes personalizadas:

-Contenedor de mongo (mongo)
-Contenedor de backend (nodejs-expressjs)
-Contenedor de frontend (nodejs-angular12)

Las imagenes personalizadas de estos contenedores estan basadas en las imagenes oficiales de mongo y nodejs. De esta manera tendremos instalados 
mongo y nodejs respectivamente una vez iniciemos los contenedores y agilizaremos el proceso de instalación.

Para preparar la práctica, clonaremos nuestro repositorio de github mediante el comando:

- git clone https://github.com/SantiSL5/Nem_Angular12_NodeJS_ExpressJS

![1](https://user-images.githubusercontent.com/76181286/139924812-a147dab8-69a7-42b7-ac2f-0836f3a3c9d9.png)

Para empezar debemos de crear un tag anotado v1 con la anotación "Versión inicial de la aplicación" de la versión actual del proyecto.

Para ello utilizaremos el siguiente comando:

- git tag -a v1 -m "Versión inicial de la aplicación"

![0](https://user-images.githubusercontent.com/76181286/139924807-071944a7-4272-4c0b-ab24-628d9f0f480a.png)

Y hacemos un push al repositorio para subir el tag mediante el comando:

- git push origin --tags

![2](https://user-images.githubusercontent.com/76181286/139924818-0cd31320-4f0f-4cb3-b5be-257849975175.png)

Una vez hecho esto comenzaremos creando la rama main_dockerfile en nuestro repositorio:

- git checkout -b main_dockerfile

![3](https://user-images.githubusercontent.com/76181286/139924826-8641c44a-87bb-4681-984f-608458fa4f32.png)

Una vez hemos creado la rama debemos creamos los tres dockerfiles y el script.sh para automatizar la creación
de los contenedores

![4](https://user-images.githubusercontent.com/76181286/139924832-79e7c93d-1e23-461e-8241-b20114127f8f.png)

Y debemos crear un archivo variables.env para el backend, el cual se ubicara en la carpeta backend:

![12](https://user-images.githubusercontent.com/76181286/139924867-5658ef2d-c445-43d6-98f5-93aa2c4867a1.png)

DBMONGO es la variable que utiliza el backend para conectarse a la base de datos, utiliza el usuario, su contraseña y
el nombre del contenedor de la base de datos.
PORT es el puerto en el que se desplegara el backend, en este caso el 4001.

A continuación se mostraran los 3 dockerfiles que debemos crear:

##Dockerfile mongodb

FROM mongo:latest (indica la imagen en la que se basa para crear nuestra imagen personalizada, en este caso mongo:latest)
EXPOSE 27017 (expone el puerto 27017)
ENV MONGO_INITDB_ROOT_USERNAME=root (define el nombre del usuario root)
ENV MONGO_INITDB_ROOT_PASSWORD=admin (define la contraseña del usuario root)

![7](https://user-images.githubusercontent.com/76181286/139927407-41771cf7-9710-4c77-a87c-69cf63f9e1c0.png)

##Dockerfile backend

FROM node:latest (indica la imagen en la que se basa para crear nuestra imagen personalizada, en este caso node:latest)
EXPOSE 4001 (expone el puerto 4001)
WORKDIR /usr/app (define el directorio de trabajo como /usr/app)
CMD npm install | npm start (instalará los paquetes necesarios y iniciará el backend)

![5](https://user-images.githubusercontent.com/76181286/139926497-739d22bb-2758-491b-8492-f44c2b9233ed.png)

## Dockerfile frontend

FROM node:latest (indica la imagen en la que se basa para crear nuestra imagen personalizada, en este caso node:latest)
EXPOSE 4200 (expone el puerto 4200)
WORKDIR /usr/app (define el directorio de trabajo como /usr/app)
CMD npm install -g @angular/cli --save | npm install | npm start (instalará angularcli, los paquetes necesarios y iniciará el backend)

![6](https://user-images.githubusercontent.com/76181286/139927351-2e5369c8-c332-49ea-889a-662f294201f5.png)

Después de crear los dockerfiles, crearemos el script que automatizará la creación de los contenedores y de las imagenes
personalizadas:

Mediante docker build -t crearemos las 3 imagenes personalizadas y para esto especificaremos su nombre y su ubicación.
Mediante docker network create networkdi, crearemos la network que utilizarán los 3 contenedores.
Mediante docker run crearemos los diferentes contenedores especificando la imagen que utilizarán.
Las intrucciones que se utilizan en el docker run son las siguientes:
 - "--name": para dar nombre al contenedor
 - "--network": para especificar la network que utilizará el contenedor
 - "-p": para asignar puertos del contenedor a puertos de nuestra máquina
 - "-v": para asignar un volumen compartido entre nuestra máquina y el contenedor
 - "-d": para iniciar el contenedor en modo deattach

![8](https://user-images.githubusercontent.com/76181286/139927565-b421685e-c713-4d0c-918a-b8886b458919.png)

Después de esto le damos permisos de ejecución al script y lo ejecutamos mediante chmod +x script.sh y ./script.sh:

![9](https://user-images.githubusercontent.com/76181286/139928763-0384282e-7eef-4ab9-90b7-cd00a6462f02.png)

Podemos ver como todos los contenedores estan funciónando correctamente mediante el comando docker container ls:

![10](https://user-images.githubusercontent.com/76181286/139928866-469b208a-11e6-4169-8df2-a6b648d4f55d.png)

Y podemos acceder a http://localhost:4201 para visualizar el frontend con angular 12:

![11](https://user-images.githubusercontent.com/76181286/139928989-ede53c3b-c379-498e-90ac-d11638e607a0.png)

Para que el proyecto funcione correctamente se deben de añadir las imagenes necesarias para el proyecto y la base de datos:

Una vez finalizada la practica, hacemos un git push de los cambios a la nueva rama que hemos creado al principio de la practica:
Mediante los comandos:
- git branch (para comprobar que estamos en la rama correcta)
- git add . (para poner los cambios en stage mode)
- git status (para comprobar que todos los archivos que queremos estan en stage mode)
- git commit -m "main_dockerfile commit" (para hacer un commit con los archivos que estan en stage mode)
- git push origin main_dockerfile (para subir los cambios al remoto)

![16](https://user-images.githubusercontent.com/76181286/139929978-998fa376-632c-4651-a4f6-ca1ff6dfcd95.png)

![17](https://user-images.githubusercontent.com/76181286/139930002-e30234bf-ddf6-4c2d-b7da-646f659e883d.png)
