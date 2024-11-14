//Contains code for initializing the database of project

const mongoose = require('mongoose');
const Chat=require("./models/chats.js")

main()
.then(console.log("Connection successfull!!"))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

Chat.insertMany([
    {
        from:"Shreyas",
        to:"Nirmith",
        message:"Come to college",
        created_at:new Date()
    },
    {
        from:"Prajwal",
        to:"Srujan",
        message:"Teach me promises",
        created_at:new Date()
    },
    {
        from:"Sujit",
        to:"Abhay",
        message:"Mysore grand",
        created_at:new Date()
    }
])