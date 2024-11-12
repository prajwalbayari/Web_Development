const mongoose = require('mongoose');

//Connecting the database
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

//Checking if the database is connected
main()
    .then(()=>{
        console.log("Connection successfull!!");
    })
    .catch((err) => console.log(err));

//Defining the structure of a collection in a database also called schema
const userSchema= new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User=mongoose.model("User",userSchema);    //Name of the model and the string passed inside the model() is usually same

//Delete a value

// User.deleteOne({name:"Prajwal"}).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })

//Update one
// User.updateOne({ name:'Sujit' },{ email:'Hellochild@hotmail.com' }).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })

//Update many
// User.updateMany({},{ age:20 }).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })

//Display complete content
User.find({}).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
})

//Inserting new values into database

// const user1=new User({name:"Prajwal",email:"prajwal@gmail.com",age:99});
// const user2=new User({name:"Srujan",email:"srujan07@gmail.com",age:98}); //Creates an object with single set of values
// user1.save(); //Saves the values
// user2.save(); 

//Inserting multiple values

// User.insertMany([
//     {name:"Sujit",email:"childsujit@yahoo.com",age:7},
//     {name:"Shreyas",email:"SVBhat@hotmail.com",age:20}
// ]);

// User.findOne({age:{$gt:75}}).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })