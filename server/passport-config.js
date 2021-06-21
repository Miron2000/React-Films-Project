const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {User} = require('./models/models');

 function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email);
        console.log(email, 'email')
        console.log(password, 'password')
        if (user == null) {
            return done(null, false, {message: 'No user with that email'});
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {message: 'Password incorrect'})
            }
        } catch (err) {
            console.log(err, 'err')
            return done(err)
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}
module.exports = initialize