const mongoose=require('mongoose');
const dotenv = require('dotenv');
const fs=require('fs');
const tour=require("../../models/tourModel");
const { isUtf8 } = require('buffer');
const Tour = require('../../models/tourModel');

dotenv.config({ path: `${__dirname}/../../config.env` });

const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)
mongoose.connect(DB)
.then(()=>{
  console.log("Database connection successfull\n");
})

//Read json file

const tours=JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'));

//Import data into database
const importData=async()=>{
    try{
        await Tour.create(tours);
        console.log('Data successfully loaded\n');
    }catch(err){
        console.log(err);
    }
    process.exit();
}

//Delete all data from collection
const deleteData=async()=>{
    try{
        await Tour.deleteMany();
        console.log('Data successfully deleted\n');
    }catch(err){
        console.log(err);
    }
    process.exit();
}

if(process.argv[2]==='--deleteData')
    deleteData();

if(process.argv[2]==='--insertData')
    importData();