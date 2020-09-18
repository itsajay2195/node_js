const express = require('express');
const { route } = require('./productsRoute');
const router = express.Router();




router.get('/',(req,res)=>{
    res.send('Welcome Home')
})



module.exports = router;