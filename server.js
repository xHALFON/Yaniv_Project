const express = require('express');
const path = require('path');
const app = express()
const connectDB = require('./Backend/database'); 
const playermodel = require('./Backend/Player');

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
connectDB();

app.use(express.static(__dirname + '/public'));
app.get('/', function(req,res) {
    res.sendFile(path.resolve('./public/index.html'));
});
app.get('/api', async (req,res) => {
    const Player = await playermodel.find();
    console.log(Player);
    res.json(Player);
});
app.post('/addplayer', async (req,res) => {
    var temp = req.body;
    var newplayer = new playermodel({
        name: req.body.name,
        TotalRounds: req.body.TotalRounds,
        GameCounts: req.body.GameCounts,
      });
      await newplayer.save();

    console.log(temp);
});
const port = 5500;
app.listen(port, function(){
    console.log('App listen to port:', port);
});