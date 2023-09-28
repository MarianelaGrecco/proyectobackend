import { Router } from 'express';
import upload from '../multerMiddlewere.js';
import usersModel from '../persistencia/mongoDB/models/users.model.js';
import { hashData, compareData } from '../utils/bcrypt.js';
import passport from 'passport';
import logger from '../utils/logger.js';
import { usersService } from '../services/users.service.js';
import { updatePremiumStatus, userProfile } from '../controllers/users.controller.js';

const userRouter = Router();

// Agregar logger a los métodos existentes
userRouter.get('/', async (req, res) => {
  try {
    logger.info('All users fetched successfully:', users);
    res.status(200).send(users);
  } catch (error) {
    logger.error('Error fetching all users:', error);
    res.status(400).send(error);
  }
});

userRouter.get('/:uid', async (req, res) => {
  try {
    const userUid = req.params.uid;
    const user = await usersModel.findOne({ uid: userUid });

    if (user) {
      logger.info('User found:', user);
      res.status(200).send(user);
    } else {
      logger.warn('User not found with UID:', userUid);
      res.status(404).send('User not found');
    }
  } catch (error) {
    logger.error('Error fetching user:', error);
    res.status(400).send(error);
  }
});



userRouter.post('/', async (req, res) => {
  try {
    logger.info('New user created successfully:', newUser);
    res.send(newUser);
  } catch (error) {
    logger.error('Error creating user:', error);
    res.status(400).send(error);
  }
});

// persistencia mongo
userRouter.post('/signup', async (req, res) => {
  try {
    // Obtén los datos del usuario del cuerpo de la solicitud
    const { first_name, last_name, email, password } = req.body;

    // Realiza el hash de la contraseña
    const hashedPassword = await hashData(password);

    // Crea un nuevo usuario con la contraseña hasheada
    const newUser = await usersService.createOneUser({
      first_name,
      last_name,
      email,
      password: hashedPassword, // Utiliza la contraseña hasheada
    });

    // Verifica si el usuario se creó exitosamente
    if (newUser && !newUser.error) {
      logger.info('New user signed up successfully:', newUser);
      res.redirect('/api/views/login');
    } else {
      // Maneja el caso de error al crear el usuario
      logger.error('Error signing up user:', newUser.error);
      res.redirect('/api/views/errorSignup');
    }
  } catch (error) {
    // Maneja otros errores
    logger.error('Error signing up user:', error);
    res.redirect('/api/views/errorSignup');
  }
});

userRouter.get ('/perfil', userProfile);

// Login con Passport
userRouter.post(
  '/login',
  passport.authenticate('login', {
    passReqToCallback: true,
    failureRedirect: '/api/views/errorLogin',
    successRedirect: '/api/views/profile',
    failureMessage: '',
  })
);


// Ruta para actualizar al usuario a premium si ha cargado los documentos requeridos
userRouter.put('/premium/:uid', updatePremiumStatus);


// Ruta para subir documentos
userRouter.post('/:uid/documents', upload.array('documents'), async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await usersModel.findOne({ uid });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Actualizar el estado del usuario para indicar que ha subido un documento
    user.documents.push(...req.files.map((file) => ({
      name: file.originalname,
      reference: file.path, // Usamos file.path para guardar la referencia al archivo
    })));
    await user.save();

    logger.info('Document uploaded successfully');
    res.status(200).json({ message: 'Document uploaded successfully' });
  } catch (error) {
    logger.error('Error uploading document:', error);
    res.status(500).json({ error });
  }
});

userRouter.get('/logout', async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      // Maneja el caso en que el usuario no esté autenticado, por ejemplo, mostrando un mensaje de error.
      return res.status(401).send('No estás autenticado.');
    }

    // Obtén el ID del usuario autenticado
    const userId = req.user._id;

    // Verifica si el userId es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      // Maneja el caso en que 'userId' no sea un ObjectId válido, por ejemplo, enviando una respuesta de error.
      return res.status(400).send('ID de usuario no válido');
    }

    // Realiza la búsqueda del usuario por su ID
    const user = await usersModel.findById(userId);

    if (!user) {
      // Maneja el caso en que el usuario no se encuentre en la base de datos
      return res.status(404).send('Usuario no encontrado en la base de datos');
    }

    // Cierra la sesión del usuario
    req.logout();

    // Redirige al usuario a la página de inicio o a donde desees
    res.redirect('/');

  } catch (error) {
    // Maneja otros errores
    console.error('Error en la función de logout:', error);
    res.status(500).send('Error en el servidor');
  }
});

userRouter.get (
  '/githunSingup',
  passport.authenticate('githubSignup', {scope: ['user:email']})
)

userRouter.get('/github',
passport.authenticate('githubSignup', {failureRedirect: '/login'}),
function(req,res){
  res.redirect('/api/views/profile')
})


export default userRouter;
