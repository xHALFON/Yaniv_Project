var mongoose = require("mongoose");
const connectDB = async() =>{
    try{
        mongoose.connect("mongodb+srv://guyhalfon98:SW8ljmWQlzFPwfyc@yanivproject.qyabshu.mongodb.net/?retryWrites=true&w=majority&appName=YanivProject");
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Cannot connect db'));
        db.once('open', function(){
            console.log('Connected to MongoDB');
        });
    } catch(error){
        console.log("Cannot connect db");
        process.exit(1);
    }
    
}
module.exports = connectDB;