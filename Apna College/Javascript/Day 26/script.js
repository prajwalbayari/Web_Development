let url="https://catfact.ninja/fact";
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

async function getFacts(){
    let res=await fetch(url);
    let data=await res.json();
    console.log(data.fact);
}