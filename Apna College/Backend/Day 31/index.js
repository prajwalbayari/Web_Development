const ex=require("express");

const app=ex();
// console.log(app);

let port=4000;

app.listen(port,()=>{
    console.log(`The app is listening to ${port}`);
})

// app.use((req,res)=>{
//     // console.log(req);
//     console.log("Request recieved!!");
//     // res.send("This is a basic response!!");
//     // res.send({
//     //     name:"Prajwal",
//     //     Sem:5
//     // })

//     let code="<h1>Fruits</h1> <ul><li>Apple</li><li>Mango</li></ul>"
//     res.send(code);
// })

// app.get("/",(req,res)=>{
//     res.send(`App is listening on port ${port}`);
// })

// app.get("/Nirmith",(req,res)=>{
    //     res.send(`You contacted Nirmith!!`);
// })

// app.get("/Shreyas",(req,res)=>{
    //     res.send(`You contacted Shreyas!!`);
    // })
    
// app.get("*",(req,res)=>{
    //     res.send(`You get Prajwal`)
    // })
        
        
//Path parameters:
        

app.get("/",(req,res)=>{
    res.send(`This is root`);
})

app.get("/:username/:id",(req,res)=>{
    console.log(req.params);
    let str=`<h1>Welcome to the homepage ${req.params.username}</h1>`;
    res.send(str);
})

// Query strings
app.get("/search",(req,res)=>{
    console.log(req.query);
    // res.send("Success!!");
    let { q }=req.query;
    if(!q){
        res.send("<h1>Nothing searched</h1>")
    }
    res.send(`<h1>Search results: ${q}</h1>`);
})
