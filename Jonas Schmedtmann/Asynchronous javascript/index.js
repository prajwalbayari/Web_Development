//Callback hell

const fs=require('fs');
const { resolve } = require('path/posix');
const superagent=require('superagent');
const { reject } = require('superagent/lib/request-base');

// fs.readFile(`${__dirname}/dogs.txt`,(err,data)=>{
//     if(err) return console.log(err.message);
//     console.log(`Breed: ${data}`);
// superagent.get(`https://dog.ceo/api/breed/${data}/images/random/3`).end((err,res)=>{
//     if(err) return console.log(err.message);
//     console.log(res.body.message);
    
//     fs.writeFile('dog-img.txt',res.body.message[0],err=>{
//         if(err) return console.log(err.message);
//         console.log('Random dog image saved to file');
//     });
// })
// })

//Removing the nesting

// fs.readFile(`${__dirname}/dogs.txt`,(err,data)=>{
//     if(err) return console.log(err.message);
//     console.log(`Breed: ${data}`);
//     superagent.get(`https://dog.ceo/api/breed/${data}/images/random/3`)
//     .then(res=>{
//         console.log(res.body.message);
        
//         fs.writeFile('dog-img.txt',res.body.message[0],err=>{
//             if(err) return console.log(err.message);
//             console.log('Random dog image saved to file');
//         });
//     })
//     .catch(err=>{
//         console.log(err.message);
//     })
// })

//Creating promise through functions and function chaining

const readFilePro=file=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(file,(err,data)=>{
            if(err) reject('I could not find that file 😒\n');
            resolve(data); //The value will be stored as a response and it can be accessed later by using then
        })
    })
}

const writeFilePro=(file,data)=>{
    return new Promise((resolve,reject)=>{
        fs.writeFile(file,data,err=>{
            if(err) reject('I could not write into the file 😢');
            resolve('Succuessfull');
        })
    })
}

// readFilePro(`${__dirname}/dogs.txt`)
// .then(res=>{
//     console.log(`Breed: ${res}`);
//     return superagent.get(`https://dog.ceo/api/breed/${res}/images/random/3`)
// })
// .then(res=>{
//     console.log(res.body.message);
//     return writeFilePro('dog-img.txt',res.body.message[0]);
// })
// .then(()=>{
//     console.log('Random dog image url saved in text file\n')
// })
// .catch(err=>{
//     console.log(err);
// })

//Using async and await

// const getDogPic=async()=>{
//     try{
//         const data=await readFilePro(`${__dirname}/dogs.txt`);
//         console.log(`Breed: ${data}`);
    
//         const res= await superagent.get(`https://dog.ceo/api/breed/${data}/images/random/3`);
//         console.log(res.body.message[0]);
    
//         await writeFilePro('dog-img.txt',res.body.message[0]);
//         console.log('Random dog image url saved in text file\n')
//     }catch(err){
//         console.log(err);
//     }
// }

//Resolving multiple promises simultaneously

const getDogPic=async()=>{
    try{
        const data=await readFilePro(`${__dirname}/dogs.txt`);
        console.log(`Breed: ${data}`);
    
        const res1Pro=superagent.get(`https://dog.ceo/api/breed/${data}/images/random/3`);
        const res2Pro=superagent.get(`https://dog.ceo/api/breed/${data}/images/random/3`);
        const res3Pro=superagent.get(`https://dog.ceo/api/breed/${data}/images/random/3`);
        const all=await Promise.all([res1Pro,res2Pro,res3Pro]);
        const img=all.map(el=>el.body.message[0])
        console.log(img);
    
        await writeFilePro('dog-img.txt',img.join('\n'));
        console.log('Random dog image url saved in text file\n')
    }catch(err){
        console.log(err);
    }
}

getDogPic();