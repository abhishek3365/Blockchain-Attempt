const express = require('express');
const bodyparser = require('body-parser')
const Blockchain = require('../blockchain');

const PORT = process.env.HTTP_PORT || 3000;

const app = express();
const bc = new Blockchain();

app.use( bodyparser.json() );

app.get('/blocks' , (req,res) => {
    res.json(bc.chain);
});

app.post( '/mine' , (req,res) => {
    const block =  bc.addBlock(req.body.data);
    console.log(`New block added : ${block.toString()}`);
    res.redirect('/blocks');
} )

app.listen( PORT , () =>{
    console.log(`Server running at port ${PORT}`);
} );