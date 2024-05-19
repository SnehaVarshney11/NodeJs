const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const menuItemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    taste:{
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        required: true,
    },
    is_drink: {
        type: Boolean,
        default: false 
    },
    ingredients: {
        type: String,
        enum: ['spices', 'sauces'],
        required: true
    },
    num_sales: {
        type: Number,
        required: true 
    },
    username: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true 
    }
})

menuItemSchema.pre('save', async function(next){
    const menuItem = this;

    //if password is already in use
    if(!menuItem.isModified('password')) return next();

    try{
        // hash password generation
        const salt = await bcrypt.genSalt(10); // generate the salt

        //hash password
        const hashedPassword = await bcrypt.hash(menuItem.password, salt);

        //override plain password with hashed password 
        menuItem.password = hashedPassword;
        next();
    }catch(err) {
        return next(err);
    }
})

menuItemSchema.methods.compareMenuPassword = async function(candidatePwd) {
    try{
        const isPassMatch = await bcrypt.compare(candidatePwd, this.password);
        return isPassMatch;
    }catch(err) {
        throw err;
    }
}

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;