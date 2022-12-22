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
module.exports = router