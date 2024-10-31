const express=require("express");
app=express();
const port=4000;
const path=require("path");

app.listen(port,()=>{
    console.log(`Listening on port number: ${port}`)
})

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views")); //To make sure that the views file will always be available for the index.js

// app.get("/",(req,res)=>{
//     res.send("Root");
// })

app.get("/",(req,res)=>{
    console.log("Running root!!\n")
    res.render("home.ejs")
})

app.get("/rolldice",(req,res)=>{
    console.log("Running Rolldice!!!\n");
    // res.render("rolldice.ejs");
    res.render("rolldice.ejs",{num:Math.floor(Math.random()*6)+1});
})

// Basic intsa

// app.get("/ig/:username",(req,res)=>{
//     const followers=["Adam","Aaron","Ashley","Jason"]
//     let { username }=req.params;
//     console.log(username);
//     res.render("instagram.ejs",{username,followers}); 
// })

//Actual implementation of Insta using EJS

app.get("/ig/:username",(req,res)=>{
    const instaData=require("./data.json");
    const { username }=req.params;
    const Data=instaData[username];
    if(Data){
        console.log(Data);
        res.render("instagram.ejs",{data:Data}); 
    }else{
        res.render("error.ejs")
    }
})