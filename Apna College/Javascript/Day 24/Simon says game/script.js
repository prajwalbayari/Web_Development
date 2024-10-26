let userSeq=[];
let gameSeq=[];

let buttons=["yellow","red","purple","green"];

let start=false;
let level=0;

let h2=document.querySelector('h2');
let b=document.querySelector('body');

document.addEventListener("keypress", function(){
    if(start==false){
        start=true;
        levelup();
    }
});

function gameFlash(btn){
    btn.classList.add("gameflash");
    setTimeout(function(){
        btn.classList.remove("gameflash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },500);
}

function levelup(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randIdx=Math.floor(Math.random()*3);
    let randColor=buttons[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
};

function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length===gameSeq.length){
            setTimeout(levelup,1000);
        }
    }else{
        h2.innerText="Game over press any key to start!!";
        scoreTracker();
        resetTobeginning();
    }
}

function btnPress(){
    let btn=this;
    userFlash(btn);
    userSeq.push(btn.getAttribute("id"));
    console.log(userSeq);
    checkAns(userSeq.length-1);
}

let allBtn=document.querySelectorAll('.buttons');
for(but of allBtn){
    but.addEventListener("click",btnPress);
}

function over(){
    document.querySelector('body').style.backgroundColor="red";
    setTimeout(function(){
        document.querySelector('body').style.backgroundColor="white";
    },100);
}

function scoreTracker(){
    h2.innerHTML=`GAME OVER! Your score is ${level-1}. <br> Press any key to restart.`
    over();
}

function resetTobeginning(){
    gameSeq=[];
    userSeq=[];
    start=false;
    level=0;
}
