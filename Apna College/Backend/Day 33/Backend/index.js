const express=require("express");
const app=express();
const port=4000;

//This is used so that req.body in EJS can uunderstand the encoded message of URL and json 
//format data which can not be directly read by EJS
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(port,()=>{
    console.log(`\nListening to port number ${port}`);
})

app.get("/register",(req,res)=>{
    let { user, password }=req.query;
    res.send(`Standard get response!!\n.Welcome ${user}\n`);
})

app.post("/register",(req,res)=>{
    console.log(req.body);
    res.send(`Standard post response!!\n.`);
})