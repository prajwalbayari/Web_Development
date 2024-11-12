const mongoose = require('mongoose');

main()
.then(()=>{
    console.log("Connection successfull!!");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}

const bookSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLength:20,
    },
    author:{
        type:String,
    },
    price:{
        type:Number,
    },
    discount:{
        type:Number,
        default:0,
    },
    category:{
        type:String,
        enum:["Fiction","Non-fiction"],
    },
});

const Book=mongoose.model("Book",bookSchema);

//To make sure the constraints are applied while doing updates set runValidators as true
Book.findByIdAndUpdate('673399c595b544083754f57b',{price:500},{runValidators:true}).then((res)=>{
    console.log(res);
}).catch(err=>{
    console.log(err);
})

// let book1=new Book({title:"Marvel",author:"Stan lee",price:"2499",category:"Fiction"});
// book1.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })