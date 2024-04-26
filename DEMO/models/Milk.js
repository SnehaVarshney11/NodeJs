const mongoose = require('mongoose');

const MilkSchema = new mongoose.Schema ({
    seller: {
        type: String, 
        required: true,
        unique: true 
    },
    amount: {
        type: Number,
        required: true
    },
    avgMilkAmount: {
        type: Number,
        required: true,
        default: 0
    }
})

const Milk = mongoose.model('Milk', MilkSchema);
module.exports = Milk;