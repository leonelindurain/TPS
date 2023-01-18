const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const { usersDao } = require("../daos/index");
const users = usersDao

const dotenv = require('dotenv').config() // 1
const {mailer} = require('../mailer/mailer')

// ------------- PASSPORT ----------------
passport.use('login', new LocalStrategy(
    async (username, password, done) => {
        const email = username
        let user = await users.getByEmail(email)
        logger.info(user);

        if (!user) {
            logger.info(`No existe el usuario ${email}`)
            return done(null, false, { message: 'User not found' })
        }

        if (!isValidPassword(user, password)) {
            logger.info('Password incorrecto')
            return done(null, false, { message: 'Password incorrect' })
        }

        done(null, user)
    }
))

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done) => {
    const email = username

    let user = await users.getByEmail(email)

    if (user) {
        logger.info(`El usuario ${email} ya existe`)
        return done(null, false, { message: 'User already exists' })
    }

    const { completeName, phone } = req.body

    let newUser = {
        completeName,
        phone,
        email,
        password: createHash(password)
    }

    const signupMessage = `Datos del Usuario Registrado: <br><br> 
                            Nombre Completo: ${completeName} <br>
                            Telefono: ${phone} <br>
                            Email: ${email} <br>`

    const mailOptions = {
        from: 'MaraArtesanias',
        to: process.env.MAIL_ADMIN,
        subject: 'Nuevo Registro',
        html: signupMessage
    }

    mailer(mailOptions)

    await users.save(newUser)

    return done(null, req.body)

}))

// ---------------------- UTIL -----------------------
const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

// ----------------- SERIALIZER ----------------------
passport.serializeUser(function (user, done) {
    logger.info("serialize");
    done(null, user);
})

passport.deserializeUser(function (user, done) {
    logger.info("deserialize");
    done(null, user);
})

module.exports = passport;