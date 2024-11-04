const express=require("express");
const app=express(); 
const port=4000; //Random port number
const path=require("path"); //Used for routing
const { v4: uuidv4 }=require('uuid'); //Generating random ids
const methodOverride = require('method-override')

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride("_method")) //Used while using patch request

//We are making the posts variable(let) because if we make it const we cannot delete them
let posts=[
    {
        id:uuidv4(),
        username:"Abhay",
        content:"Harbardar"
    },
    {
        id:uuidv4(),
        username:"Sujit",
        content:"Bandbudu"
    },
    {
        id:uuidv4(),
        username:"Srujan",
        content:"Hogi sayi"
    } //Initial content
];

app.use(express.urlencoded({extended: true})); //So that ejs can understand url encoded and json format data
app.use(express.json());

//Setting paths for different folders that have resources related to the code

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.listen(port,()=>{
    console.log(`Listening to port number ${port}\n`); //Initial setup
})

app.get("/",(req,res)=>{
    res.send("Server working properly!!\n"); //Checking if the server is working 
})

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts}); //Main page containing all posts
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs"); //Creating new posts
})


app.get("/posts/:id",(req,res)=>{
    let { id }=req.params;
    let post=posts.find((p)=> id===p.id);
    console.log(post.username,post.content); //Seeing the complete detail of a post
    res.render("show.ejs",{post});
    console.log(id);
})

app.post("/posts",(req,res)=>{
    let { username, content }=req.body;
    console.log(req.body);                   //Creating new posts and assigning them with ids
    console.log(username,content);
    id=uuidv4();
    posts.push({ id, username, content })
    res.redirect("http://localhost:4000/posts")
})

app.patch("/posts/:id",(req,res)=>{
    let { id }=req.params;
    let content=req.body.content;
    let post=posts.find((p)=> id===p.id);  //assigning new content to a post
    post.content=content;
    console.log(post);
    res.redirect("http://localhost:4000/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let { id }=req.params;
    let post=posts.find((p)=> id===p.id);    //Changing the content
    console.log(id,post);
    res.render("edit.ejs",{post})
})

app.delete("/posts/:id",(req,res)=>{
    let { id }=req.params;
    posts=posts.filter((p)=> id!=p.id); //Delete posts
    res.redirect("/posts");
})

app.get("*",(req,res)=>{
    res.render("error.ejs"); //Handles the case of invalid url
})