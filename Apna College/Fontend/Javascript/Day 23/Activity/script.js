let btn=document.querySelector('button');
btn.addEventListener("click",function()
{
    let h3=document.querySelector('h3');
    let color=generateRandom();
    h3.innerText=color;

    let div=document.querySelector('div');
    div.style.backgroundColor=color;
})

function generateRandom() {
    let x=Math.floor(Math.random()*255);
    let y=Math.floor(Math.random()*255);
    let z=Math.floor(Math.random()*255);

    let color=`rgb(${x},${y},${z})`;
    return color;
}