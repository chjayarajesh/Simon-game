const result = document.querySelector(".result");
const buttons = document.querySelector(".buttons")
const blueButton = document.querySelector(".blue");
const greenButton = document.querySelector(".green");
const redButton = document.querySelector(".red");
const yellowButton = document.querySelector(".yellow");
const currentLevel = document.querySelector(".current-level");
const highestLevel = document.querySelector(".highest-level");
const cleared = document.querySelector(".cleared");
const play = document.querySelector(".play");
let win = true
let level = 0
let gameStart = false;
let playclicked = 0;
let screenWidth = window.innerWidth;
console.log(screenWidth)
const colors = {
    0 : ['blue',blueButton],
    1 : ['green',greenButton],
    2 : ['red', redButton],
    3 : ['yellow',yellowButton]
}
let gameOutput = []
let userInput = []
const sounds = {
    blue : new Audio("sounds/blue.mp3"),
    green : new Audio("sounds/green.mp3"),
    red : new Audio("sounds/red.mp3"),
    yellow : new Audio("sounds/yellow.mp3")
}

const playSound = (id) =>{
    sounds[id].currentTime = 0;
    sounds[id].play();
}
const anim = (index,i) =>{
    let btn = colors[index][1];
    setTimeout(() => {
        btn.classList.add("toggle");
        playSound(colors[index][0]);
        setTimeout(() => {
          btn.classList.remove("toggle");
        }, 100); // remove animation after 1 second
      },  i*1000);
};
const randomClicks = (level) => {
    buttons.style.pointerEvents = "none";
    for(let i = 0; i < level; i++){
        let index = Math.floor(Math.random()*4);
        let color = colors[index][0];
        gameOutput.push(color)
        anim(index,i);    
    }
    console.log(gameOutput)
    setTimeout(()=>{
        buttons.style.pointerEvents = "all";
    },1000);
       
};
const gameInput = (id) => {
    let color = colors[id][0];
    playSound(color);
    if(gameOutput.length >= 0){
        let outColor = gameOutput.shift()
        console.log(outColor);
        console.log(gameOutput);
        if(outColor !== colors[id][0]){
            win = false;
            gameOver();
        }
    }
    if((gameOutput.length == 0 ) && (win)){
        setTimeout(()=>{
            setTimeout(()=>{
                cleared.style.color = "rgb(0, 255, 26)";
                cleared.style.backgroundColor="rgba(0,0,0,0.6)";
                cleared.style.textShadow = "0px 0px 0px";
                cleared.innerHTML = `<div>Level<span> ${level}</span> Cleared</div>`;
                cleared.style.display = "block";
                cleared.querySelector("div").classList.add("clear");
                setTimeout(()=>{
                    cleared.style.display = "none";
                    cleared.querySelector("div").classList.remove("clear");
                    setTimeout(()=>{
                        gameBegin();
                    },2000)
                },1500);
            },1000);
            buttons.style.pointerEvents = "none";
            
        },500)
    }     
};
const gameOver = ()  =>{
    gameStart = false;
    gameOutput = [];
    result.style.color = "black";
    let txt ="";
    result.querySelector("span").style.color = "red";
    if (playclicked == 1){
         txt = `<p><span style="color : red;">GAME OVER</span></p> <p>RESTART</p>`
    }else{
         txt = `<p><span style="color : red;">GAME OVER</span></p> <p>SPACEBAR TO RESTART</p>`
    }
    result.innerHTML = txt;
    result.style.visibility = "visible";
    highestLevel.innerText = level;
    buttons.style.pointerEvents = "none";
    over = new Audio("sounds/wrong.mp3");
    over.currentTime = 0;
    over.play();
    play.innerText = "RESTART";
    if (playclicked == 1) {play.style.visibility = "visible";}
}
const gameBegin = () => {
    win = true
    if (win){
        level++;
        currentLevel.innerHTML = level
        randomClicks(level);
        result.style.visibility = "hidden";
    } 
};
$(document).on("keypress",function(e){
    if (e.key == " "){
        console.log("space bar pressed")
        if(!gameStart){
            level = 0;
            setTimeout(()=>{
                gameBegin();
            },1000)   
        } 
    }
});
play.addEventListener("click",()=>{
    if(!gameStart){
            playclicked = 1;
            level = 0;
            play.style.visibility = "hidden";
            setTimeout(()=>{
                gameBegin();
            },1000)   
    }
})

setTimeout(()=>{
    cleared.style.display = "block";
    document.querySelector("main").style.position = "static";
    cleared.style.backgroundColor = "rgba(0,0,0,0.9)"
    cleared.querySelector("div").classList.add("start");
    setTimeout(()=>{
        if(screenWidth <= 600){
            result.innerHTML = `<p>PRESS</p><span>PLAY</span> <p>TO START</p>`
        }
        else{
            result.innerHTML = `<p>PRESS </p><span>SPACE BAR</span><p> TO START</p>`;
        }
        cleared.querySelector("div").classList.remove("start");
        setTimeout(()=>{
            cleared.style.display = "none";
            document.querySelector("main").style.position = "relative";
        },1500)
    },1000)
})