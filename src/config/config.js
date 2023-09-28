import dotenv from 'dotenv'

dotenv.config()

export default {
    mongo_uri: process.env.MONGO_URI,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
    port: process.env.PORT,
    secret_key_jwt: process.env.SECRET_KEY_JWT,
    gmail_user: process.env.GMAIL_USER,
    gmail_password: process.env.GMAIL_PASSWORD,
    LOGGER: process.env.LOGGER,
    secretCookie: process.env.SECRET_COOKIE,
    sessionSecret: process.env.SECRET_SESSION
}
