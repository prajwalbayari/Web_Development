let b=document.querySelector('button');
let p=document.querySelector('p');
b.addEventListener("click",function(){
    getFacts();
})

let url="https://catfact.ninja/fact";

async function getFacts(){
    try{
        let res=await axios.get(url);
        console.log(res);
        let data=res.data.fact;
        p.innerText=data;
        console.log(data);
    }catch(e){
        console.log("error- ",e);
        p.innerText="No fact found";
    }
}

// fetch(url)
// .then(response=>{
//     console.log(response);
//     return response.json()
// })
// .then(data1=>{
//     console.log(data1);
//     return fetch(url);
// })
// .then(res=>{
//     return res.json();
// })
// .then(data2=>{
//     console.log(data2)
// })
// .catch(err=>{
//     console.log(err);
// })

// async function getFacts(){
//     try{
//         let res=await fetch(url);
//         let data=await res.json();
//         console.log(data.fact);

//         let res2=await fetch(url);
//         let data2=await res2.json();
//         console.log(data2.fact);
//     }catch(e){
//         console.log("error- ",e);
//     }
// }