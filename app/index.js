const express = require('express');
const bodyparser = require('body-parser')
const Blockchain = require('../blockchain');
const P2PServer = require('./p2p-server');

const PORT = process.env.HTTP_PORT || 3000;

const app = express();
const bc = new Blockchain();
const p2pServer = new P2PServer(bc);

app.use( bodyparser.json() );

app.get('/blocks' , (req,res) => {
    res.json(bc.chain);
});

app.post( '/mine' , (req,res) => {
    const block =  bc.addBlock(req.body.data);
    console.log(`New block added : ${block.toString()}`);
    p2pServer.syncChange();
    res.redirect('/blocks');
} )

app.listen( PORT , () => console.log(`Server running at port ${PORT}`) );
p2pServer.listen();