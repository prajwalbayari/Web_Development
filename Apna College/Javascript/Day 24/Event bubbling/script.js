let div=document.querySelector('div');
let ul=document.querySelector('ul');
let li=document.querySelector('li');

div.addEventListener("click",function(){
    console.log("Div");
})

ul.addEventListener("click",function(event){
    event.stopPropagation() // Used to stop event bubbling
    console.log("Unordered list");
}) 

for(l of li){
    li.addEventListener("click",function(event){
        event.stopPropagation() // Used to stop event bubbling
        console.log("List item");
    }) 
}