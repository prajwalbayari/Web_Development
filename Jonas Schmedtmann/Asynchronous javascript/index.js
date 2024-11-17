//Callback hell

const fs=require('fs');
const superagent=require('superagent');

fs.readFile(`${__dirname}/dogs.txt`,(err,data)=>{
    if(err) return console.log(err.message);
    console.log(`Breed: ${data}`);
    superagent.get(`https://dog.ceo/api/breed/${data}/images/random/3`).end((err,res)=>{
        if(err) return console.log(err.message);
        console.log(res.body.message);
        
        fs.writeFile('dog-img.txt',res.body.message[0],err=>{
            if(err) return console.log(err.message);
            console.log('Random dog image saved to file');
        });
    })
})