const express = require('express');
const router = express.Router();
const Variants = require('../model/variants')

router.get('/', async (req, res) => {
    try {
        await new Variants().fetchAll().then(variants => {
            res.send(variants.toJSON());
        })
    }catch(err) {
        console.log(err);
    }
})

router.get('/add', async (req, res) => {
    try{
        await new Variants({
            products_id : 3,
            description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image : 'image.jpeg',
            size : "9",
            color : 'green-yellow',
            price : 15.99
        }).save().then(variants => {
            res.send(variants.toJSON())
        })
    }catch(err) {
        console.log(err);
    }
})

router.all('/products', async (req, res) => {
    try {
        await new Variants({id : 2}).fetch({withRelated : ['products']}).then(products => {
            res.send(JSON.stringify(products.related('products')));
        })
    }catch (err){
        console.log(err);
    }
})
module.exports = router