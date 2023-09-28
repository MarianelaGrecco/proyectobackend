
# PROYECTO FINAL

* Iniciar aplicación: npm start

* Puerto: http://localhost:4000

* Estructura de Archivos
config/: Configuraciones del proyecto.
controllers/: Controladores de las rutas.
persistencia/: DAOs, models.
routes/: Definición de las rutas de la API.
services/: Lógica de negocios del proyecto.
utils/: Utilidades y funciones auxiliares.
views/: Plantillas handlebars para las vistas.


* Aplicación de logger en: index.js, controllers y routes.

* Swagger: /apidocs

* Modulos de testing: npm run test

                      Test routes Cart [GET] /api/cart:cid
                                       [POST] /api/cart

                      Test routes Products [GET] /api/products
                                           [POST] /api/products/nuevoProducto
                                           [PUT] /api/products/:pid
                                           [DELETE] /api/products/:pid

