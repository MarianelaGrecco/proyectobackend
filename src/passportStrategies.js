import passport from "passport";
import  usersModel  from "./persistencia/mongoDB/models/users.model.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as jwtStrategy, ExtractJwt } from "passport-jwt";
import { compareData } from "./utils/bcrypt.js";
import dotenv from "dotenv";
import config from "./config/config.js";

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
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await usersModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});




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
        };
        const newUserDB = await usersModel.create(user);
        done(null, newUserDB);
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

export default passport;

