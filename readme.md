
# PROYECTO FINAL

* Iniciar aplicación:
                     "start": "node src/index.js",
                     "dev" : "nodemon src/index.js",
                     "test": "mocha test/**/*.test.js --file test/setup.test.js --timeout 5000"

* Puerto: http://localhost:4000

* Estructura de Archivos
src:
    config/: Configuraciones del proyecto.
    controllers/: Controladores de las rutas.
    persistencia/: DAOs, models.
    routes/: Definición de las rutas de la API.
    services/: Lógica de negocios del proyecto.
    utils/: Utilidades y funciones auxiliares.
    views/: Plantillas handlebars para las vistas.


* RUTAS: 
         - api/views/login => login para usuario existen, signup nuevo usuario.
         - api/products => renderiza todos los productos.


* Aplicación de logger en: index.js, controllers.

* Swagger: /apidocs

* Modulos de testing: npm run test

                      Test routes Cart [GET] /api/cart:cid
                                       [POST] /api/cart

                      Test routes Products [GET] /api/products
                                           [POST] /api/products/nuevoProducto
                                           [PUT] /api/products/:pid
                                           [DELETE] /api/products/:pid

