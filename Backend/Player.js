var mongoose = require("mongoose");

var PlayerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    GameCounts:{
        type: Number,
        required: true
    },
    TotalRounds:{
        type: Number,
        required: true
    },
});

const Player = mongoose.model('players', PlayerSchema);

module.exports = Player;
