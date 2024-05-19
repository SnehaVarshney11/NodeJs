const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');
const Menu = require('./models/MenuItem');

passport.use(new LocalStrategy(async (username, password, done) => {
    //Authentication Logic
    try{
        //console.log('Recieved Credentials', username, password);
        const user = await Person.findOne({ username });
        if(!user) {
            return done(null, false, { message: 'Incorrect Username' });
        }
        const isPwdMatch = await user.comparePassword(password);
        if(isPwdMatch) {
            return done(null, user);
        }else {
            return done(null, false, { message: 'Incorrect Password' });
        }
    }catch(err) {
        return done(err);
    }
}))

passport.use(new LocalStrategy(async (username, password, done) => {
    try{
        const user = await Menu.findOne({ username });
        if(!user) {
            return done(null, false, { message: 'Invalid username' });
        }

        const isPassMatch = await user.compareMenuPassword(password);

    }catch(err) {
        return done(err);
    }
}))

module.exports = passport;