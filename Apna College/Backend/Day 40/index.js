const express=require("express");
const app=express();
const mongoose = require('mongoose');
const path=require("path");
const Chat=require("./models/chats.js")

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public"))) //Tells that css being exported from public folder
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.send("Root is working");
})

app.listen(4000,()=>{
    console.log("Server is listening on port 4000");
})

main().then(console.log("Connection successfull!!"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//Index route
app.get("/chats",async (req,res)=>{        //Getting data from database is asynchronous 
  let chats=await Chat.find();             //Function
  console.log(chats);
  res.render("index.ejs",{chats});
})

//New route
app.get("/chats/new",(req,res)=>{
  res.render("new.ejs");
})

//Create route

app.post("/chats",(req,res)=>{
  let {from,to,message}=req.body;
  let newChat=new Chat({from:from,to:to,message:message,created_at:new Date()})
  newChat.save().then(res=>{console.log(res)}).catch(err=>{console.log(err)});
  res.redirect("/chats");
})