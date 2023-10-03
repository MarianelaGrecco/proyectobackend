import passport from "passport";
import  usersModel  from "./persistencia/mongoDB/models/users.model.js";
import cartModel from "./persistencia/mongoDB/models/cart.model.js"
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as jwtStrategy, ExtractJwt } from "passport-jwt";
import { compareData } from "./utils/bcrypt.js";
import dotenv from "dotenv";
import config from "./config/config.js";

// Función para cargar el carrito del usuario
export const loadUserCart = async (userId) => {
  try {
    const user = await usersModel.findById(userId);
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
        const user = await usersModel.findOne({ email });
        if (!user) {
          return done(null, false);
        }
        const isPasswordValid = await compareData(password, user.password);
        if (!isPasswordValid) {
          return done(null, false);
        }
        // Si el carrito aún no existe para este usuario, créalo
        if (!user.cart) {
          const cart = await cartModel.create({ products: [] });
          user.cart = cart._id;
          await user.save();
        }
        user.cart = await loadUserCart(user.id);
        done(null, user);
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
        const { password } = req.body;
        const user = await usersModel.findOne({ email });
        
        if (user) {
          return done(null, false, { message: 'Usuario existente con ese correo' });
        }

        const hashPassword = await hashData(password);
        const newUser = { ...req.body, password: hashPassword };

        // Crea el carrito para el nuevo usuario
        const cart = await cartModel.create({ products: [] });
        result.cart = cart._id;
        await result.save();

        // Carga el usuario con el carrito utilizando populate
        const userWithCart = await usersModel.findById(result._id).populate('cart');
        done(null, userWithCart);
      } catch (error) {
        console.error('Error durante el registro:', error);
        done(error);
      }
    }
  )
);







// GITHUB - PASSPORT

passport.use(
  "githubSignup",
  new GithubStrategy(
    {
      clientID: config.GITHUB_CLIENT_ID,
      clientSecret: config.GITHUB_CLIENT_SECRET,
      callbackURL: config.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { name, email } = profile._json;

      if (!email) {
        return done(null, false, {
          message: "Correo electrónico no disponible en el perfil de GitHub",
        });
      }
      try {
        const userDB = await usersModel.findOne({ email });
        if (userDB) {
          return done(null, userDB);
        }
        const user = { 
          first_name: name.split(" ")[0],
          last_name: name.split(" ")[1] || "",
          email,
          password: " ",
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

//JWT - Passport

passport.use('jwtStrategy', new jwtStrategy ({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret_key_jwt,
},
async(jwt_payload, done)=> {
  done(null, jwt_payload.user)

}))



passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await usersModel.findById(id);
    user.cart = loadUserCart(user.id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;

