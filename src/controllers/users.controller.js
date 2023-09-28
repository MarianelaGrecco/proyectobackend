import { usersService } from "../services/users.service.js";
import logger from "../utils/logger.js";

export const findAllUsers = async (req, res) => {
  try {
    const users = await usersService.findAll();
    if (users.length) {
      logger.info("Users found:", users);
      res.status(200).json({ message: "Users found", users });
    } else {
      logger.info("No users found");
      res.status(200).json({ message: "No users" });
    }
  } catch (error) {
    logger.error("Error finding users:", error);
    res.status(500).json({ error });
  }
};
export const userProfile = async (req, res) => {
  try {
    // Aquí debes obtener la información del usuario desde tu base de datos o servicio.
    // Por ejemplo, asumiendo que tienes una función en tu servicio llamada `getUserProfileData` que obtiene los datos del usuario:
    const userData = await usersService.userProfileData(req.user._id);

    // Luego, renderiza la vista "perfil" y pasa los datos del usuario como contexto
    res.render("perfil", { first_name: userData.first_name });
  } catch (error) {
    logger.error("Error fetching user profile:", error);
    res.status(500).json({ error });
  }
};


export const findOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await usersService.findById(id);
    if (user) {
      logger.info("User found:", user);
      res.status(200).json({ message: "User found", user });
    } else {
      logger.info("User not found");
      res.status(400).json({ message: "No user" });
    }
  } catch (error) {
    logger.error("Error finding user:", error);
    res.status(500).json({ error });
  }
};

export const createOneUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "Data missing" });
  }

  const newUser = new usersModel({
    first_name,
    last_name,
    email,
    password,
  });

  try {
    const createdUser = await newUser.save();
    logger.info("User created:", createdUser);
    res.status(200).json({ message: "User created", user: createdUser });
  } catch (error) {
    logger.error("Error creating user:", error);
    res.status(500).json({ error });
  }
};



//actualizar usuario premium
export const updatePremiumStatus = async (req, res) => {
  const { uid } = req.params;
  
  try {
    // Busca al usuario por su UID
    const user = await usersModel.findOne({ uid });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verifica si el usuario ha cargado los documentos requeridos
    if (!user.hasUploadedDocuments) {
      return res.status(400).json({ message: 'User has not uploaded required documents' });
    }

    // Actualiza el estado del usuario a premium
    user.role = 'premium';
    await user.save();

    logger.info('User updated to premium:', user);
    res.status(200).json({ message: 'User updated to premium', user });
  } catch (error) {
    logger.error('Error updating user to premium:', error);
    res.status(500).json({ error });
  }
};


