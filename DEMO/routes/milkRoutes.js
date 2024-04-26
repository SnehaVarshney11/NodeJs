const express = require('express');
const router = express.Router();
const Milk = require('./../models/Milk');

router.post('/', async(req, res) => {
    try{
        const data = req.body;
        const newItem = new Milk(data);
        const savedItem = newItem.save();
        console.log('Item saved');
        res.status(200).json(savedItem);
    }catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/', async (req, res) => {
    try{
        const data = await Milk.find();
        console.log('Data fetched');
        res.status(200).json(data);
    }catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/:name', async (req, res) => {
    try{
        const sellerName = await req.params.name;
        const seller = await Milk.findOne({ seller: sellerName});
        if (!seller) {
            return res.status(404).json({ message: 'Milk seller not found' });
        }
        console.log('Data fetched');
        res.status(200).json(seller);
    }catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:name', async (req, res) => {
    try{
        const sellerName = req.params.name;
        const newAmount = req.body.amount;

        console.log('Seller Name:', sellerName);
        console.log('New Amount:', newAmount);

        // Update Seller's Milk
        const updatedSeller = await Milk.findOneAndUpdate({ seller: sellerName }, { amount: newAmount }, { new: true });
        console.log("Updated Seller", updatedSeller);

        const avgMilk = await Milk.aggregate([{ $group: { _id: null, avgAmount: { $avg: '$amount' } } }]);
        const avgAmount = avgMilk[0].avgAmount;
        console.log('Avg Amount', avgAmount);

        //Update all seller's amount based on avg
        const avgUpdate = await Milk.updateMany({}, { $set: { avgMilkAmount: avgAmount } });
        console.log("Updated Avg Milk Amount", avgUpdate);

        res.status(200).send('Milk amounts updated successfully.');

    }catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;