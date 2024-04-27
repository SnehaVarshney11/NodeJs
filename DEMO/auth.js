const passport = require('passport');
const LocalStrateg = require('passport-local').Strategy;
const Person = require('./models/Person');
const bcrypt = require('bcrypt');

passport.use(new LocalStrateg(async (username, password, done) => {
    //Authentication Logic
    try{
        console.log('Recieved Credentials', username, password);
        const user = await Person.findOne({ USERNAME: username });
        if(!user) {
            return done(null, false, { message: 'Incorrect Username' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(passwordMatch) {
            return done(null, user);
        }else {
            return done(null, false, { message: 'Incorrect Password' });
        }
    }catch(err) {
        return done(err);
    }
}))

module.exports = passport;