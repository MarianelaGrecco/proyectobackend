import config from "../config/config.js";
import winston from "winston";
import fs from "fs";

// Definir niveles
const logLevels = {
  fatal: 0,
  error: 1,
  warning: 2,
  info: 3,
  http: 4,
  debug: 5,
};

// Definir colores para cada nivel
const logColors = {
  fatal: "red",
  error: "red",
  warning: "yellow",
  info: "green",
  http: "blue",
  debug: "gray",
};

// Configurar el transporte para los errores
const errorTransport = new winston.transports.File({
  level: "error",
  filename: "errors.log",
});
if (!fs.existsSync("errors.log")) {
    fs.writeFileSync("errors.log", "", "utf8");
  }

// Configurar el transporte de la consola
const consoleTransport = new winston.transports.Console({
  level: "debug",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
});

// Configurar el transporte para producción
const productionTransport = new winston.transports.File({
  level: "info",
  filename: "production.log",
});

// Verificar y crear el archivo "production.log" si no existe
if (!fs.existsSync("production.log")) {
    fs.writeFileSync("production.log", "", "utf8");
  }


// Crear el logger
const logger = winston.createLogger({
  levels: logLevels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [consoleTransport, errorTransport],
});

// Configurar el logger para producción
if (config.LOGGER === "production") {
  logger.add(productionTransport);
}

export default logger;

