const express = require('express');
const Blockchain = require('../blockchain');

const PORT = process.env.HTTP_PORT || 3000;

const app = express();
const bc = new Blockchain();

app.get('/blocks' , (req,res) => {
    res.json(bc.chain);
});

app.listen( PORT , () =>{
    console.log(`Server running at port ${PORT}`);
} );