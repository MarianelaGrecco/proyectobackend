import EErrors from "./services/errors/enum.js";

export default (error, req, res, next) => {
  if (error.cause) {
    // Si existe error.cause, se trata de un error manejado específicamente en tu aplicación
    switch (error.code) {
      case EErrors.PRODUCT_NOT_FOUND:
        res.status(404).send({ status: "error", error: error.name });
        break;

      case EErrors.INSUFFICIENT_STOCK:
        res.status(400).send({ status: "error", error: error.name });
        break;

      case EErrors.INVALID_QUANTITY:
        res.status(400).send({ status: "error", error: error.name });
        break;

      case EErrors.CART_NOT_FOUND:
        res.status(404).send({ status: "error", error: error.name });
        break;

      default:
        res.status(500).send({ status: "error", error: "Unhandled error" });
    }
  } else {
    // Si no hay error.cause, asumimos que es un error de análisis JSON
    res.status(400).send({ status: "error", error: "Datos JSON mal formados" });
  }
};



