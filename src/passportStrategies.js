import passport from "passport";
import  usersModel  from "./persistencia/mongoDB/models/users.model.js";
import cartModel from "./persistencia/mongoDB/models/cart.model.js"
import { Strategy as LocalStrategy } from "passport-local";
import { compareData } from "./utils/bcrypt.js";
import dotenv from "dotenv";
import config from "./config/config.js";


// Función para cargar el carrito del usuario
export const loadUserCart = async (uid) => {
  try {
    const user = await usersModel.findOne({_id: uid});
    if (user && user.cart) {
      const cart = await cartModel.findById(user.cart);
      return cart;
    }
    return null;
  } catch (error) {
    throw error;
  }
};


// estrategia passport-local
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        console.log("Estrategia de login llamada");
        const user = await usersModel.findOne({ email });
        if (!user) {
          console.log("Usuario no encontrado");
          return done(null, false);
        }
        const isPasswordValid = await compareData(password, user.password);
        if (!isPasswordValid) {
          console.log("Contraseña inválida");
          return done(null, false);
        }
        // Si el carrito aún no existe para este usuario, créalo
        if (!user.cart) {
          const cart = await cartModel.create({ products: [] });
          user.cart = cart._id;
          await user.save();
        }
        user.cart = await loadUserCart(user.id);
        console.log("Usuario autenticado:", user);
        
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// estrategia passport-local signup
passport.use(
  'signup',
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: 'email',
    },
    async (req, email, password, done) => {
      try {
        console.log("Estrategia de singup llamada");
        const user = await usersModel.findOne({ email });
        
        if (user) {
          console.log('Usuario existente con ese correo');
          return done(null, false, { message: 'Usuario existente con ese correo' });
        }

        const hashPassword = await hashData(password);
        const newUser = { ...req.body, password: hashPassword };

        // Crea el carrito para el nuevo usuario
        const cart = await cartModel.create({ products: [] });
        newUser.cart = cart._id;
        console.log('Nuevo usuario creado:', newUser)
        req.login( newUser, (loginErr) => {
          if (loginErr) {
            return done(loginErr);
          }
          return done(null, newUser)
        });
      } catch (error) {
        console.error('Error durante el registro:', error);
        done(error);
      }
    }
  )
);



passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await usersModel.findById(id);
    user.cart = await loadUserCart(user.uid);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;

