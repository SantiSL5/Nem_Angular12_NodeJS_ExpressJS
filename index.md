# Ejercicio de docker compose

## ¿Que es docker compose?

Docker compose es una herramienta para definir y ejecutar aplicaciones Docker de varios contenedores. Docker Compose usa un archivo YAML para configurar los servicios de su aplicación. Luego, con un solo comando, crea e inicia todos los servicios desde su configuración.

## ¿Que es kubernetes?

Kubernetes es una plataforma portátil, extensible y de código abierto para administrar cargas de trabajo y servicios en contenedores, que facilita tanto la configuración declarativa como la automatización. Tiene un ecosistema grande y de rápido crecimiento. Los servicios, el soporte y las herramientas de Kubernetes están ampliamente disponibles.

## Resumen de la práctica

En esta practica vamos a relaizar un docker-compose que utilizara una multi-stage build desde un Dockerfile para desplegar nuestra aplicación y otro docker-compose para desplegar grafana y prometheus con los que obtendremos información de nuestra aplicación.

## Práctica

###Para empezar crearemos las ramas de gh-pages y main-docker-compose:

Creamos la rama de gh-pages:
![1](https://user-images.githubusercontent.com/76181286/142944122-e3beadbe-ec60-4be9-8173-6a1ab42c877b.png)

Y subimos al servidor el archivo index.md:
![2](https://user-images.githubusercontent.com/76181286/142944233-b35c1667-3e47-4c27-93f5-1fb7d410b908.png)
![3](https://user-images.githubusercontent.com/76181286/142944263-f186d310-8de0-4fb5-8602-d3ef9778c646.png)

Podemos ver como esta configurado github pages entrando en nuestro repositorio de github, settings, pages:
![5](https://user-images.githubusercontent.com/76181286/142944360-f8127828-cc45-428c-ac1a-4443c84eea0f.png)

Y podemos entrar a nuestro github pages(esta documentación) mediante este link:
https://santisl5.github.io/Nem_Angular12_NodeJS_ExpressJS/
![6](https://user-images.githubusercontent.com/76181286/142944600-7d003831-7464-4e04-859d-555d0611d8c0.png)

En la misma carpeta hacemos un pull de master:

![7](https://user-images.githubusercontent.com/76181286/142944657-a150d19a-c9d4-4fff-bd5a-cdc9c7d1b190.png)

Y creamos la nueva rama de main-docker-compose a partir de la rama master:

![8](https://user-images.githubusercontent.com/76181286/142944722-affd638a-f75b-46b0-a673-168956b35d99.png)

Una vez hecho esto, trabajaremos sobre esta rama.

###A continuación mostraremos los docker-files necesarios los cuales estarán en nuestra carpeta raiz:

Docker compose de la aplicación:

![docker-compose-app](https://user-images.githubusercontent.com/76181286/142942928-983bdc0a-64f2-43d2-be00-5757a42cdb68.png)

Docker compose de grafana y prometheus:

![compose-stadistics](https://user-images.githubusercontent.com/76181286/142942989-b2d8d780-4bef-4300-bfce-b808aa70bc66.png)


###A continuación mostraremos el dockerfile que contiene el multistage-build:

![dockerfile](https://user-images.githubusercontent.com/76181286/142943034-ac0504dd-389d-411a-9be6-a4fd54bcf5ae.png)

###Y además deberemos añadir un .dockerignore y un .gitignore:

Gitignore:

![dockerignore](https://user-images.githubusercontent.com/76181286/142943097-1d7dbb68-a3e5-4e01-b4dd-6d551ae0acec.png)

Dockerignore:

![gitignore](https://user-images.githubusercontent.com/76181286/142943255-49b08e06-9947-495b-b68f-5c463bf01a30.png)

###Y además deberemos añadir un fichero .env con las variables necesarias, que son:

MONGODB_USER=(username root de la base de datos)
MONGODB_PASSWORD=(password del usuario root de la base de datos)
MONGODB_DATABASE="nemdb"
MONGODB_PORT=27017

BACKEND_LOCAL_PORT=4000
BACKEND_DOCKER_PORT=4000

FRONTEND_LOCAL_PORT=4200
FRONTEND_DOCKER_PORT=4200

DB_MONGO='mongodb://root:admin@nemmongodb:27017/nemdb?authSource=admin'
PORT=4000

SECRET=(secret de la aplicación)

###Una vez tengamos estos ficheros deberemos añadir el siguiente codigo a nuestro index.js de la aplicación de backend:

![15](https://user-images.githubusercontent.com/76181286/142943911-36a900db-70b6-4e6e-8336-283a9c4113f9.png)

![14](https://user-images.githubusercontent.com/76181286/142943920-00e157db-96d6-4ff8-ae0c-4375e2b88046.png)

###Para finalizar deberemos instalar en el backend las dependencias de prom-client y response-time.

Para hacer esto las añadiremos al package.json ya que se instalaran mediante el dockerfile y el docker-compose. Además puntualizar que para que funcione correctamente, la versión de prom-client debe ser la 12.0.0 ya que en versiones posteriores dan errores.

![11](https://user-images.githubusercontent.com/76181286/142945042-e18aa7ef-6417-4540-8d67-1945507a7fb1.png)

Y en el fichero adjunto de prometheus.yml hay que hacer el siguiente cambio(Cambiar el target para que apunte a nuestro contenedor de backend):

![12](https://user-images.githubusercontent.com/76181286/142945359-ca7dd9b1-f63b-4030-b0ba-67617d6a55b2.png)

Y en el fichero adjunto de datasource.yml también hay que cambiarlo para que apunte a nuestro contenedor de prometheus:

![datasource](https://user-images.githubusercontent.com/76181286/142945530-bd710e06-38b9-41e2-ac9a-b72ea59c9706.png)

###Ahora ya tenemos todo listo para hacer los docker-compose:

![13](https://user-images.githubusercontent.com/76181286/142945127-1794164f-dbbc-4905-9e1d-0c9ef3ffdb2a.png)

Podemos ver que nuestra aplicación funciona correctamente:

![10](https://user-images.githubusercontent.com/76181286/142945551-743aa482-35e3-4e32-9297-a081fa28b8f3.png)

###A continuación configuraremos prometheus y grafana:

Para ello primero acccederemos a prometheus y accederemos a status targets para comprobar que esta correctamente conectado con nuestro contenedor backend:

![16](https://user-images.githubusercontent.com/76181286/142945889-65e011bb-a96a-49b7-a35d-4fd2f6e60256.png)
![17](https://user-images.githubusercontent.com/76181286/142945780-9756b39f-8c89-482d-a14e-032da6461d2f.png)

Cuando hayamos hecho esa comprobación, iremos a grafana:

![grafana](https://user-images.githubusercontent.com/76181286/142946029-e36b3bb3-7519-49a2-a42c-df14b2f53527.png)

Y iremos al símbolo de + y a create dashboard:

![18](https://user-images.githubusercontent.com/76181286/142946095-81346bbd-6a82-4448-8b79-2f03cafec387.png)

Le daremos a add new panel:

![19](https://user-images.githubusercontent.com/76181286/142946125-9bd1cb91-0ff8-40c1-87e0-284657c22f33.png)

Y una vez aqui iremos añadiendo los endpoints hasta que nos quede asi:

![20](https://user-images.githubusercontent.com/76181286/142946259-bba56f53-6c02-4b7b-8d86-ab856b98be53.png)

Para añadir cada endpoind deberemos hacer add query y en la pestaña de metrics seleccionaremos nuestro endpoint

Una vez hecho esto podemos observar que se realiza el grafico de los endpints y con esto finalizaremos la práctica:

![21](https://user-images.githubusercontent.com/76181286/142946451-d5dec1f2-82a6-43ca-b8fd-c94e2a0eecbe.png)



