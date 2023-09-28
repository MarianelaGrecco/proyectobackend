import { Router } from "express";
import { transporter } from "../utils/nodemailer.js";
import logger from "../utils/logger.js";

const messagesRouter = Router();

messagesRouter.get("/", async (req, res) => {
  try {
    await transporter.sendMail({
      to: [""],
      subject: "Bienvenido",
      html: "<h1>Visitá nuestra tienda</h1>",
    });
    logger.info("Mail sent successfully");
    res.status(200).send("Mail sent");
  } catch (error) {
    logger.error("Error sending mail:", error);
    res.status(500).json({ message: error });
  }
});

messagesRouter.post("/", async (req, res) => {
  const { email, name, quote } = req.body;
  try {
    await transporter.sendMail({
      to: email,
      subject: `Welcome ${name}`,
      text: quote,
    });
    logger.info(`Mail sent to ${email} successfully`);
    res.status(200).send("Mail sent");
  } catch (error) {
    logger.error(`Error sending mail to ${email}:`, error);
    res.status(500).json({ message: error });
  }
});

export default messagesRouter;

