# Proyecto UpTask

## Tecnologías:
1. React Native
    1. Creación el proyecto
        - En consola: `npm init -y`
        - con esto se logra el archivo: **package.json**
1. Apollo Server
    - `npm i apollo-server graphql`
1. Nodemon
    - `npm i --save-dev nodemon`
    1. Agregamos en: **package.json**, en la parte de _SCRIPTS_:
        ```
            "start" : "node .",
            "dev" : "nodemon ."
        ```
    1. Ejecutamos en consola:
        - `npm run dev`
1. MongoDB
    - [MongoDB Atlas](https://www.mongodb.com/es/cloud/atlas/lp/try4)
    - Creamos una cuenta y seleccionamos la opción _Free_
1. Mongoose
    - `npm i mongoose dotenv`
1. MongoDB Compass
    - [Descarga](https://www.mongodb.com/try/download/compass)
1. Hash Password:
    - `npm i bcryptjs`
1. JSON WEB TOKEN
    - `npm i jsonwebtoken`
        - Valir el JSON WEB TOKEN [jwt.io](https://jwt.io/)
