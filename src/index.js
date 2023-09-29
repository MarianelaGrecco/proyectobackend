import "dotenv/config";
import express from "express";
import bodyParser from "body-parser"
import exphbs  from 'express-handlebars';
import cookieParser from "cookie-parser";
import multer from "multer";
import * as path from "path";
import { __dirname } from "./utils/path.js";
import { Server } from "socket.io";
import mongoose from "mongoose";
import mongoStore from "connect-mongo";
import  cartModel  from "./persistencia/mongoDB/models/cart.model.js";
import  productsModel  from "./persistencia/mongoDB/models/products.model.js";
import viewsRouter from "./routes/views.routes.js";
import usersRouter from "./routes/users.routes.js";
import cartRouter from "./routes/cart.routes.js";
import productsRouter from "./routes/products.routes.js";
import messagesRouter from "./routes/messages.routes.js";
import chatRouter from "./routes/chat.routes.js";
import ticketRouter from "./routes/ticket.routes.js";
import jwtRouter from "./routes/jwt.routes.js"
import mockingRouter from "./routes/mocking.routes.js"
import passport from "passport";
import "./passportStrategies.js";
import config from "./config/config.js";
import './persistencia/mongoDB/dbConfig.js'
import errorHandler from "./errorMiddlewere.js"
import logger from "./utils/logger.js"
import session from "express-session"
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express"

//Configuraciones

const app = express();


logger.debug("Logger imported successfully");
logger.info("Logger instance:", logger);

// Middleware de logger 
app.use((req, res, next) => {
  req.logger = logger;
  next();
});

// Endpoint /loggerTest para probar los logs
app.get("/loggerTest", (req, res) => {
  console.log("Logger imported successfully");
console.log("Logger instance:", logger)
  req.logger.debug("Mensaje de nivel debug");
  req.logger.http("Mensaje de nivel http");
  req.logger.info("Mensaje de nivel info");
  req.logger.warning("Mensaje de nivel warning");
  req.logger.error("Mensaje de nivel error");
  req.logger.fatal("Mensaje de nivel fatal");

  res.send("Logs probados");
});


const PORT = config.port;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/img");
  },
  filename: (req, file, cd) => {
    cd(null, `${file.originalname}`);
  },
});

const server = app.listen(PORT, () => {
  logger.info(`Server on port ${PORT}`);
});


app.use(express.static(path.join(__dirname, "./public")));
app.use(errorHandler)

//swagger

const swaggerOptions={
  definition:{
    openapi:'3.0.1',
    info:{
      title:"Documentacion de las APIs",
      description:"Información productos y carrito",
      version:'1.0.0',
    }
  },
  apis: [`${process.cwd()}/src/docs/**/*.yaml`],
}

const spec=swaggerJsdoc(swaggerOptions)


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer({ storage: storage });


//Handlebars (seteo motores de plantillas)
app.engine('handlebars',  exphbs());
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'handlebars');

// Configurar body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Cookie
app.use(cookieParser("config.secretCookie"));

//generar info en cookies
app.get("/crearCookie", (req, res) => {
  req.logger.info("Creando primera cookie");
  res.cookie("cookie1", "Primera cookie", { maxAge: 10000 }).send("Creando primera cookie");
});

app.get("/leerCookie", (req, res) => {
  const { cookie1 } = req.cookies;
  req.logger.info("Leyendo cookies", { cookie: cookie1 });
  res.json({ message: "Leyendo cookies", cookie: cookie1 });
});

app.get("/crearcookieFirmada", (req, res) => {
  req.logger.info("Creando cookie firmada");
  res.cookie("cookie1Firmada", "1234", { signed: true }).json({ message: "Creando cookie firmada" });
});

app.get('/leerCookieFirmada', (req, res) => {
  const { cookie1Firmada } = req.signedCookies;
  req.logger.info("Probando cookie firmada", { cookie1Firmada });
  res.send('Probando');
});


//ServerIO
const io = new Server(server, { cors: { origin: "*" } }); 

io.on("connection", (socket) => {
  console.log("cliente conectado");

  socket.on("mensaje", (info) => {
    console.log(info);
  });
  socket.on("nuevoProducto", (prod) => {
    console.log(prod);
  });
});


//sessions
app.use(session({
    store: new mongoStore({
      mongoUrl: config. mongo_uri,
      ttl: 60
    }),
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60000}
})
)

//passport
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/views", viewsRouter);
app.use("/api/users", usersRouter);
app.use("/api/jwt", jwtRouter);
app.use("/api/message", messagesRouter);
app.use("/api/chat", chatRouter);
app.use("/api/ticket", ticketRouter);
app.use("/api/mockingproducts", mockingRouter);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));


app.post("/upload", upload.single("product"), (req, res) => {
  req.logger.info("Imagen subida");
  req.logger.debug(req.body);
  req.logger.debug(req.file);
  res.send("Imagen subida");
});


app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.get("/", (req, res) => {
  res.render("home");
});

