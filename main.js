calculator = document.getElementById("calculator");
wrapper = document.getElementById("wrapper");

// https://stackoverflow.com/questions/11101364/javascript-detect-shift-key-down-within-another-function
// var shiftDown = false;
// var setShiftDown = function(event){
//     if(event.keyCode === 16 || event.charCode === 16){
//         window.shiftDown = true;
//     }
// };
//
// var setShiftUp = function(event){
//     if(event.keyCode === 16 || event.charCode === 16){
//         window.shiftDown = false;
//     }
// };
//
// window.addEventListener? document.addEventListener('keydown', setShiftDown) : document.attachEvent('keydown', setShiftDown);
// window.addEventListener? document.addEventListener('keyup', setShiftUp) : document.attachEvent('keyup', setShiftUp);

let buttons = {};
let lastPress = "";
let memoryLog = [];
let newEntry = true;
let openParenCount = 0;
let closeParenCount = 0;
let anotherDotAllowed = true;

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
    if      (this.type == "number")   {clickNumber(this);}
    else if (this.type == "function") {clickFunction(this);}
    else if (this.value == "CM")      {clickClear(this);}
    else if (this.value == "MEM")     {clickMemory(this);}
    else if (this.value == "=")       {clickEquals(this);}
    else if (this.value == "backspace") {clickBackspace(this);}
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
  }
  else {
    if (thisButton.value=="(" && lastPress.value != "(" && lastPress.type != "function" ) {womp(thisButton)}
    else if (thisButton.value == "." && anotherDotAllowed==false){womp(thisButton)}
    else{
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
      buttons.displayArea.textContent = buttons.displayArea.textContent.substr(0, buttons.displayArea.textContent.length - 1)+thisButton.value;
      buttons.clear.textContent = "C"
      newEntry = false;
      anotherDotAllowed = true;
      lastPress=thisButton;
    }
    else {
      buttons.displayArea.textContent += thisButton.value;
      buttons.clear.textContent = "C"
      lastPress = thisButton;
      newEntry = false;
      anotherDotAllowed = true;
    }
}

function clickMemory(thisButton) {
  //console.log(memoryLog);
  buttons.displayArea.textContent = memoryLog.pop();
  openParenCount = 0;
  closeParenCount = 0;
  refreshLastPress();
  okayToDot();
  if(buttons.displayArea.textContent!=""){newEntry = false;}
  else if (buttons.displayArea.textContent==""){
    buttons.clear.textContent = "CM";
    newEntry = true;}
}

function clickClear(thisButton) {
  if (buttons.displayArea.textContent !== ""){
    buttons.displayArea.textContent = "";
    buttons.clear.textContent = "CM";
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
      newEntry = true;
      if (memoryLog[memoryLog.length-1] != answer){
        memoryLog.push(answer);}
      buttons.displayArea.textContent = math.eval(answer);
    }
}

function clickBackspace(thisButton){

  if (buttons.displayArea.textContent == "") {
    buttons.clear.textContent = "CM"
    womp(thisButton)}
  else {
    newEntry = false;
    if (buttons.displayArea.textContent.length==1){buttons.clear.textContent = "CM"}
    if (buttons.displayArea.textContent.slice(-1) == ")") {closeParenCount--}
    if (buttons.displayArea.textContent.slice(-1) == "(") {openParenCount--}
    if (buttons.displayArea.textContent.slice(-1) == ".") {anotherDotAllowed = false}
    buttons.displayArea.textContent = buttons.displayArea.textContent.substr(0, buttons.displayArea.textContent.length - 1);

    refreshLastPress();
    okayToDot();
  }
}

function refreshLastPress(){
  let lastChar = buttons.displayArea.textContent.slice(-1);
  if      (lastChar == "1")  {lastPress   =  buttons.one}
  else if (lastChar == "2")  {lastPress  =  buttons.two}
  else if (lastChar == "3")  {lastPress  =  buttons.three}
  else if (lastChar == "4")  {lastPress  =  buttons.four}
  else if (lastChar == "5")  {lastPress  =  buttons.five}
  else if (lastChar == "6")  {lastPress  =  buttons.six}
  else if (lastChar == "7")  {lastPress  =  buttons.seven}
  else if (lastChar == "8")  {lastPress  =  buttons.eight}
  else if (lastChar == "9")  {lastPress  =  buttons.nine}
  else if (lastChar == "0")  {lastPress  =  buttons.zero}
  else if (lastChar == ".")  {lastPress  =  buttons.dot}
  else if (lastChar == "(")  {lastPress  =  buttons.openparen}
  else if (lastChar == ")")  {lastPress  =  buttons.closedparen}
  else if (lastChar == "%")  {lastPress  =  buttons.modulo}
  else if (lastChar == "^")  {lastPress  =  buttons.power}
  else if (lastChar == "+")  {lastPress  =  buttons.plus}
  else if (lastChar == "-")  {lastPress  =  buttons.minus}
  else if (lastChar == "/")  {lastPress  =  buttons.divide}
  else if (lastChar == "*")  {lastPress  =  buttons.times}


}

function womp(thisButton) {
  thisButton.classList.remove("womped");
  thisButton.classList.add("womp");
  setTimeout(function () {
    thisButton.classList.remove("womp");
    thisButton.classList.add("womped");
  }, 500);

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
