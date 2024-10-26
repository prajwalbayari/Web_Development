let btn=document.querySelector('button');
let ul=document.querySelector('ul');
let inp=document.querySelector('input')

btn.addEventListener("click",function(){
    let l=document.createElement('li');
    l.innerText=inp.value;

    let dltbtn=document.createElement('button');
    dltbtn.innerText="Delete";
    dltbtn.classList.add("js")
    l.appendChild(dltbtn);
    
    ul.appendChild(l);
    
    inp.value="";
})

//Event delegation

ul.addEventListener("click",function(event){
    if(event.target.nodeName=="BUTTON")
        event.target.parentElement.remove();

})



// let delbtn=document.querySelectorAll("js");
// for(btn of delbtn){
//     btn.addEventListener("click",function(){        //Works only for already existing 
//         console.log("Hello world");
//     });
// }