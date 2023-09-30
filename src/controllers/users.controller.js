import { usersService } from "../services/users.service.js";
import logger from "../utils/logger.js";

//Muestra todo los usuarios enla BD
export const findAllUsers = async (req, res) => {
  try {
    const users = await usersService.findAllUsers();
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

//Busca un usuario por su pid
export const findOneUser = async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await usersService.finOneUser(uid);
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

//Crea un usuario en la BD
export const createOneUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "Missing required data" });
    }
    const createdUser = await usersService.createOneUser({
      first_name,
      last_name,
      email,
      password,
    });
    logger.info("User created:", createdUser);
    res.render("profile", createdUser)
    // res.status(200).json({ message: "User created", user: createdUser });
  } catch (error) {
    logger.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Trae el perfil con datos del usuario
export const userProfile = async (req, res) => {
  try {
    const userData = req.user_id;
    res.render("profile", { first_name: userData.first_name });
  } catch (error) {
    logger.error("Error fetching user profile:", error);
    res.status(500).json({ error });
  }
};

//Subir documentos
export const uploadDocuments = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await usersService.findOneById({ uid });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.documents.push(...req.files.map((file) => ({
      name: file.originalname,
      reference: file.path,
    })));

    await user.save();

    logger.info('Document uploaded successfully');
    res.status(200).json({ message: 'Document uploaded successfully' });
  } catch (error) {
    logger.error('Error uploading document:', error);
    res.status(500).json({ error });
  }
};


//actualizar usuario premium
export const updatePremiumStatus = async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await usersService.finOneUser({ uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
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


//Logout del usuario
export const logoutUser = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).send('No estás autenticado.');
    }

    const userId = req.user._id.toSring;
    if (userId === 'logout') {
      req.logout();
      return res.redirect('/');
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send('ID de usuario no válido');
    }

    // Llamamos a la función de logout en el userService
    const result = await usersService.logoutUser();

    req.logout();

    res.redirect('/');
  } catch (error) {
    console.error('Error en la función de logout:', error);
    res.status(500).send('Error en el servidor');
  }
};

//Limpiar usuarios inactivos
export const cleanInactiveUsers = async (req, res) => {
  try {
    const result = await usersService.cleanInactiveUsers();
    res.json({ message: 'Users cleaned successfully', result });
  } catch (error) {
    console.error('Error cleaning users:', error);
    res.status(500).json({ error: 'Failed to clean users' });
  }
}
