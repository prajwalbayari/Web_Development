const mongoose = require('mongoose');

const chatSchrema=new mongoose.Schema({
    from:{
        type: String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    message:{
        type:String,
        maxLen:50
    },
    created_at:{
        type:Date,
        required:true
    }
})

const Chat=mongoose.model("Chat",chatSchrema);
module.exports=Chat;