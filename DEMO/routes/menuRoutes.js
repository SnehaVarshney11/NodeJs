const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

router.post('/', async(req, res) => {
    try{
        const data = req.body;
        const newItem = new MenuItem(data);
        const savedItem = newItem.save();
        console.log('Item saved');
        res.status(200).json(savedItem);
    }catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/', async(req, res) => {
    try{
        const data = await MenuItem.find();
        console.log('Data fetched');
        res.status(200).json(data);
    }catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/:tasteType', async(req, res) => {
    try{
        const tasteType = req.params.tasteType;

        if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour') {
            const response = await MenuItem.find({taste: tasteType});
            console.log('Response fetched');
            res.status(200).json(response);
        }
    }catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:id', async(req, res) => {
    try{
        const menuId = req.params.id;
        const updatedMenu = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenu, {
            new: true,
            runValidators: true,
        })

        if(!response) {
            return res.status(400).json({message: 'Data Not Found'});
        }

        console.log('Data Updated');
        res.status(200).json(response);
    }catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId);

        if(!response) {
            return res.status(400).json({error: 'Data Not Found'}); 
        }

        console.log('Data Deleted');
        res.status(200).json({message: 'menu deleted'});

    }catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;