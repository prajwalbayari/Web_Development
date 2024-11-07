const { faker } = require('@faker-js/faker'); //Gives random user details
const mySQL= require('mysql2');
const express =require('express');
const app=express();
const path=require("path");
const methodOverride=require("method-override");
const { Console } = require('console');

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs");
app.set("path",path.join(__dirname,"/views"));

const connection=mySQL.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mybase',
  password: 'GOJOSATORU'
});

//Inserting new data
// let q="INSERT INTO user (id,username,email,password) VALUES ?";

let getRandomUser=()=>{
  return[
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password()
  ];
};

//Home route

app.get("/",(req,res)=>{
  let q=`SELECT count(*) FROM user`;
  try{
    connection.query(q,(err,result)=>{
      if(err)
        throw err;
      let cnt=result[0]["count(*)"];
      res.render("home.ejs",{cnt});
    })
  }catch(err){
    res.send("Some error occurred",err);
  }
})

//User list route

app.get("/user",(req,res)=>{
  let query=`SELECT * FROM user`;
  try{
    connection.query(query,(err,table)=>{
      if(err)
        throw err;
      res.render("users.ejs",{ table });
    })
  }
  catch(err){
    res.send("Some error occured");
  }
})

//Edit route

app.get("/user/:id/edit",(req,res)=>{
  let { id }=req.params;
  let q=`SELECT * FROM user WHERE id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
      if(err)
        throw err;
      let user=result[0];
      res.render("edit.ejs",{user});
    })
  }catch(err){
    console.log("Error!!");
  }
})

//Update database route

app.patch("/user/:id",(req,res)=>{
  let { id }=req.params;
  let newUserName=req.body.username,formPass=req.body.password;
  console.log(req.body);
  let q=`SELECT * FROM user WHERE id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
      if(err)
        throw err;
      let user=result[0];
      if(formPass!=user.password){
        console.log(formPass,user.password);
        res.send("Wrong password!!!");
      }else{
        console.log(newUserName);
        let que=`UPDATE user SET username='${newUserName}' WHERE id='${id}'`;
        connection.query(que,(err,r)=>{
          if(err)
            throw err;
          res.redirect("/user");
        })
      }
    })
  }catch(err){
    console.log("Error!!");
  }
})

//Add new user

app.get("/user/new",(req,res)=>{
  res.render("new.ejs");
})

app.get("/new",(req,res)=>{
  let { username, email, password}=req.query;
  let arr=[faker.string.uuid(),username,email,password];
  // console.log(arr);
  let q="INSERT INTO user (id,username,email,password) VALUES (?,?,?,?)"
  try{
    connection.query(q,arr,(err,result)=>{
      if(err)
        throw err;
      res.redirect("/user");
    })
  }catch(err){
    console.log("Error!!");
  }
})

//Delete user

app.get("/user/:id/delete",(req,res)=>{
  let { id }=req.params;
  let q=`DELETE FROM user WHERE id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
      if(err)
        throw err;
      let user=result[0];
      res.redirect("/user");
    })
  }catch(err){
    console.log("Error!!");
  }
})

app.get("*",(req,res)=>{
  res.render("error.ejs");
})

app.listen("4000",()=>{
  console.log("Listening to port number 4000");
})

// try{
//   connection.query(q,[data],(err,result)=>{
  //     if(err)
  //       throw err;
//     console.log(result);
//   })
// }catch(err){
//   console.log(err);
// }

// connection.end(); //Ends the connection with database