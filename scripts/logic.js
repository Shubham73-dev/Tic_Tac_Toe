// Game Logic
// when html is loaded then we want the bindEvent will be call
window.addEventListener('load', bindEvents);
// 1st Pick the Buttons
let buttons ;
function bindEvents(){
buttons = document.getElementsByTagName('button');

for(let i = 0 ;i<buttons.length; i++){
    buttons[i].addEventListener('click', printXOrZero);
}

document.getElementById('reset').removeEventListener('click',printXOrZero);
document.getElementById('reset').addEventListener('click',resetGame);
}


// console.log(buttons.length);
// console.log(buttons[0].value);
let flag = true;
let clickCount = 0;
let message = "";
let isGameFinish = false;
function printXOrZero(){
    // this is a keyword 
    // this - contains the current calling object reference
    // this - get the current button reference
    //console.log('Print X or Zero is called...', this);
    const currentButton = this;
    if(!isGameFinish && currentButton.innerText.length ==0){
        clickCount++;
    currentButton.innerText = flag?"X":"0"; 
    if(clickCount>=5){
        if(isGameOver()){
            isGameFinish = true;
            message = "Game Over " + (flag?"X":"0") +" Win ";
            printMessage();
            //playAudio();
        }
        isDraw();
}
    flag = !flag; 
    }
    // get the current clicked button
    // then print x or zero (if nothing is printed on button)
}
const playAudio = ()=>document.getElementById('gameover').play();
const printMessage=()=>document.getElementById("msg").innerText = message;
const resetGame = ()=>{
    isGameFinish = false;
    flag = true;
    clickCount = 0;
    message = "";
    printMessage();
    for(let i = 0; i<buttons.length; i++){
        if(buttons[i].id==='reset'){
            continue;
        }
        buttons[i].innerText = '';
    }
}

function isGameOver(){
    return isThreeSame(buttons[0], buttons[1], buttons[2]) ||
    isThreeSame(buttons[0], buttons[3], buttons[6]) ||
    isThreeSame(buttons[0], buttons[4], buttons[8]) ||
    isThreeSame(buttons[2], buttons[4], buttons[6]) ||
    isThreeSame(buttons[2], buttons[5], buttons[8]) ||
    isThreeSame(buttons[1], buttons[4], buttons[7]) ||
    isThreeSame(buttons[3], buttons[4], buttons[5]) ||
    isThreeSame(buttons[6], buttons[7], buttons[8]);
}

function isThreeSame(one, two, three){
    if(isNotBlank(one) && isNotBlank(two) && isNotBlank(three)){
        if(one.innerText === two.innerText && one.innerText === three.innerText){
            return true;
        }
    }
    return false;
}

const isNotBlank =currentButton=>currentButton.innerText.length>0;

function isDraw(){
    if(clickCount==9){
        message = "Game Draw";
        
        printMessage();
    }
}