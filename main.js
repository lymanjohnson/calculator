calculator = document.getElementById("calculator");
wrapper = document.getElementById("wrapper");

// https://stackoverflow.com/questions/11101364/javascript-detect-shift-key-down-within-another-function
// let shiftDown = false;
// let setShiftDown = function(event){
//     if(event.keyCode === 16 || event.charCode === 16){
//         window.shiftDown = true;
//     }
// };
//
// let setShiftUp = function(event){
//     if(event.keyCode === 16 || event.charCode === 16){
//         window.shiftDown = false;
//     }
// };
//
// window.addEventListener? document.addEventListener('keydown', setShiftDown) : document.attachEvent('keydown', setShiftDown);
// window.addEventListener? document.addEventListener('keyup', setShiftUp) : document.attachEvent('keyup', setShiftUp);
//
//
// if (event.shiftKey) {
//     console.log("The SHIFT key was pressed!");
// } else {
//     console.log("The SHIFT key was NOT pressed!");
// }

window.addEventListener("keypress", keyboardFunction, false);

let buttons = {};
let lastPress = "";
let memoryLog = [];
let newEntry = true;
let openParenCount = 0;
let closeParenCount = 0;
let anotherDotAllowed = true;

function keyboardFunction(event) {
  console.log(event.key);
  console.log(findButtonFromCharacter(event.key));
  keyboardClicker(findButtonFromCharacter(event.key));
}

// window.onkeydown = function (e) {
//     var code = e.keyCode ? e.keyCode : e.which;
//     if      (code === 49) {} // 1
//     else if (code === 50)   {} // 2
//     else if (code === 51)   {} // 3
//     else if (code === 52)   {} // 4
//     else if (code === 53)   {} // 5 and %
//     else if (code === 54)   {} // 6 and ^
//     else if (code === 55)   {} // 7
//     else if (code === 56)   {} // 8 and 8
//     else if (code === 57)   {} // 9 and (
//     else if (code === 48)   {} // 0 and )
//     else if (code === 190)   {} // .
//     else if (code === 219)   {} // ( alternate
//     else if (code === 221)   {} // ) alternate
//     else if (code === 187)   {} // + and =
//     else if (code === 189)   {} // -
//     else if (code === 88)   {} // x
//     else if (code === 191)   {} // /
//     else if (code === 80)   {} // p (plus)
//     else if (code === 69)   {} // e (exp)
//     else if (code === 13)   {} // enter
//     else if (code === 8)   {} // backspace
//     else if (code === 77)   {} // m
//     else if (code === 67)   {} // c
// };

for (i=0;i<calculator.children.length;i++){
  let thisButton = calculator.children[i];
  thisButton.type = thisButton.classList[0];
  thisButton.value = thisButton.innerHTML;
  thisButton.addEventListener("click",clicker);
  buttons[thisButton.id] = thisButton;
}

//special exceptions:
buttons.power.value = "^";
buttons.modulo.value = "%";
buttons.times.value = "*";
buttons.divide.value = "/";
buttons.backspace.value = "backspace";


function clicker() {
    if (lastPress === undefined) {lastPress == ""}
    if      (this.type == "number")     {clickNumber(this);}
    else if (this.type == "function")   {clickFunction(this);}
    else if (this.value == "CM")        {clickClear(this);}
    else if (this.value == "MEM")       {clickMemory(this);}
    else if (this.value == "=")         {clickEquals(this);}
    else if (this.value == "backspace") {clickBackspace(this);}
}

function keyboardClicker(thisKey) {
    if      (thisKey.type == "number")     {clickNumber(thisKey);}
    else if (thisKey.type == "function")   {clickFunction(thisKey);}
    else if (thisKey.value == "CM")        {clickClear(thisKey);}
    else if (thisKey.value == "MEM")       {clickMemory(thisKey);}
    else if (thisKey.value == "=")         {clickEquals(thisKey);}
    else if (thisKey.value == "backspace") {clickBackspace(thisKey);}
}


function clickNumber(thisButton) {

  if ((lastPress.type=="function")&&(thisButton.value==")")) {womp(thisButton)}
  else if (thisButton.value==")" && closeParenCount>=openParenCount){womp(thisButton)}
  else if (lastPress.value==")" && thisButton.type =="number" && thisButton.value!=")" && !newEntry){womp(thisButton)}
  else if (lastPress.value=="(" && thisButton.value==")"){womp(thisButton)}
  else if (newEntry) {
    buttons.displayArea.textContent = thisButton.value;
    // if(thisButton.value =="."){anotherDotAllowed = false;}
    newEntry = false;
    lastPress = thisButton;
    buttons.clear.textContent = "C"
    if(thisButton.value == "("){openParenCount+=1}
    if(thisButton.value == ")"){closeParenCount+=1}
     ding(thisButton);
  }
  else {
    if (thisButton.value=="(" && lastPress.value != "(" && lastPress.type != "function" ) {womp(thisButton)}
    else if (thisButton.value == "." && anotherDotAllowed==false){womp(thisButton)}
    else{
      ding(thisButton);
      if(thisButton.value =="."){anotherDotAllowed = false;}
      buttons.displayArea.textContent += thisButton.value;
      lastPress = thisButton;
      newEntry = false;
      buttons.clear.textContent = "C"
      if(thisButton.value == "("){openParenCount+=1}
      if(thisButton.value == ")"){closeParenCount+=1}
    }
  }
}

function clickFunction(thisButton) {
    if (thisButton.value == lastPress.value){womp(thisButton)}
    else if (buttons.displayArea.textContent == "" && thisButton.value != "-" && thisButton.value != "+") {womp(thisButton)}
    else if ((buttons.displayArea.textContent == "+" || buttons.displayArea.textContent == "-") && thisButton.value != "-" && thisButton.value != "+"){womp(thisButton)}
    else if ((lastPress.value=="(")&&(thisButton.value=="*" || thisButton.value=="/" || lastPress.value==".")){womp(thisButton)}

    else if (lastPress.value == "."){womp(thisButton)}

    else if (lastPress.type == "function"){
      ding(thisButton);
      buttons.displayArea.textContent = buttons.displayArea.textContent.substr(0, buttons.displayArea.textContent.length - 1)+thisButton.value;
      buttons.clear.textContent = "C"
      newEntry = false;
      anotherDotAllowed = true;
      lastPress=thisButton;
    }
    else {
      ding(thisButton);
      buttons.displayArea.textContent += thisButton.value;
      buttons.clear.textContent = "C"
      lastPress = thisButton;
      newEntry = false;
      anotherDotAllowed = true;
    }
}

function clickMemory(thisButton) {
  //console.log(memoryLog);
  if (memoryLog.length == 0 && buttons.displayArea.textContent=="") {womp(thisButton)}
  else {ding(thisButton)}
  buttons.displayArea.textContent = memoryLog.pop();
  openParenCount = 0;
  closeParenCount = 0;
  refreshLastPress();
  okayToDot();
  newEntry = true;
  if (buttons.displayArea.textContent==""){
    buttons.clear.textContent = "CM";
  }
  // if (lastPress === undefined) {
  //   lastPress = "";
  // }
}

function clickClear(thisButton) {
  if (buttons.displayArea.textContent !== ""){
    buttons.displayArea.textContent = "";
    buttons.clear.textContent = "CM";
    ding(thisButton);
    openParenCount = 0;
    closeParenCount = 0;
    newEntry = true;
    lastPress = "";
    anotherDotAllowed = true;
  }
  else {
    buttons.clear.textContent = "CM";
    wrapper.classList.remove("flipped");
    wrapper.classList.add("flip");
    setTimeout(function () {
      wrapper.classList.remove("flip");
      wrapper.classList.add("flipped");
    }, 500);
    memoryLog = [];
    openParenCount = 0;
    closeParenCount = 0;
    newEntry = true;
    lastPress = "";
  };
}

function clickEquals(thisButton){
    let answer = buttons.displayArea.textContent;
    // answer = answer.replace("^","**");

    if(lastPress.value == "(" || lastPress.type=="function" || lastPress.value == "."){womp(thisButton)}

    else if (openParenCount != closeParenCount){womp(thisButton)}

    else{
      ding(thisButton);
      newEntry = true;
      if (memoryLog[memoryLog.length-1] != answer){
        memoryLog.push(answer);}
      buttons.displayArea.textContent = math.eval(answer);
    }
}

function clickBackspace(thisButton){

  if (buttons.displayArea.textContent == "") {
    buttons.clear.textContent = "CM"
    lastPress="";
    womp(thisButton)}
  else {
    ding(thisButton);
    newEntry = false;
    if (buttons.displayArea.textContent.length==1){buttons.clear.textContent = "CM"}
    if (buttons.displayArea.textContent.slice(-1) == ")") {closeParenCount--}
    if (buttons.displayArea.textContent.slice(-1) == "(") {openParenCount--}
    if (buttons.displayArea.textContent.slice(-1) == ".") {anotherDotAllowed = false}
    buttons.displayArea.textContent = buttons.displayArea.textContent.substr(0, buttons.displayArea.textContent.length - 1);

    refreshLastPress();
    okayToDot();
    if (lastPress === undefined || lastPress == ""){
      newEntry = true;
      lastPress = "";
    }
  }
}

function refreshLastPress(){
  let lastChar = buttons.displayArea.textContent.slice(-1);
  lastPress = findButtonFromCharacter(lastChar);
  if (lastPress === undefined) {lastPress=""}
}

function findButtonFromCharacter(string){
  let retrievedButton;

  if      (string == "1")  {retrievedButton  =  buttons.one}
  else if (string == "2")  {retrievedButton  =  buttons.two}
  else if (string == "3")  {retrievedButton  =  buttons.three}
  else if (string == "4")  {retrievedButton  =  buttons.four}
  else if (string == "5")  {retrievedButton  =  buttons.five}
  else if (string == "6")  {retrievedButton  =  buttons.six}
  else if (string == "7")  {retrievedButton  =  buttons.seven}
  else if (string == "8")  {retrievedButton  =  buttons.eight}
  else if (string == "9")  {retrievedButton  =  buttons.nine}
  else if (string == "0")  {retrievedButton  =  buttons.zero}
  else if (string == ".")  {retrievedButton  =  buttons.dot}
  else if (string == "(")  {retrievedButton  =  buttons.openparen}
  else if (string == ")")  {retrievedButton  =  buttons.closedparen}
  else if (string == "%")  {retrievedButton  =  buttons.modulo}
  else if (string == "^" || string == "e"  || string == "E")  {retrievedButton  =  buttons.power}
  else if (string == "+" || string == "p" || string == "P")  {retrievedButton  =  buttons.plus}
  else if (string == "-")  {retrievedButton  =  buttons.minus}
  else if (string == "/")  {retrievedButton  =  buttons.divide}
  else if (string == "*" || string == "x" || string == "X")  {retrievedButton  =  buttons.times}
  else if (string == "m" || string == "M") {retrievedButton  =  buttons.memory}
  else if (string == "c" || string == "C") {retrievedButton  =  buttons.clear}
  else if (string == "b" || string == "B" || string == "\\") {retrievedButton  =  buttons.backspace}
  else if (string == "Enter" || string == "=") {retrievedButton = buttons.equalsign}

  return retrievedButton;

}

function womp(thisButton) {
  thisButton.classList.remove("womped");
  thisButton.classList.add("womp");
  setTimeout(function () {
    thisButton.classList.remove("womp");
    thisButton.classList.add("womped");
  }, 500);

}

function ding(thisButton) {
  thisButton.classList.remove("dinged");
  thisButton.classList.add("ding");
  setTimeout(function () {
    thisButton.classList.remove("ding");
    thisButton.classList.add("dinged");
  }, 300);

}

function okayToDot() {
  let lastOpOrDot = "";
  for (i=0 ; i<=buttons.displayArea.textContent.length ; i++) {

    if (buttons.displayArea.textContent.slice(i,i+1)== "*"
      ||buttons.displayArea.textContent.slice(i,i+1)== "+"
      ||buttons.displayArea.textContent.slice(i,i+1)== "-"
      ||buttons.displayArea.textContent.slice(i,i+1)== "/"
      ||buttons.displayArea.textContent.slice(i,i+1)== "^"
      ||buttons.displayArea.textContent.slice(i,i+1)== "%"
      ||buttons.displayArea.textContent.slice(i,i+1)== ".")

      {
      lastOpOrDot = buttons.displayArea.textContent.slice(i,i+1);
      }
  }
  if (lastOpOrDot=="."){
    anotherDotAllowed = false;
  }
  else {
    anotherDotAllowed = true;
  }
}
