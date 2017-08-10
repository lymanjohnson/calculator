

calculator = document.getElementById("calculator");
wrapper = document.getElementById("wrapper");

let buttons = {};
let lastPress = "";
let memoryLog = [0];
let newEntry = true;
let openParenCount = 0;
let closeParenCount = 0;

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
    newEntry = false;
    lastPress = thisButton;
    buttons.clear.textContent = "C"
    if(thisButton.value == "("){openParenCount+=1}
    if(thisButton.value == ")"){closeParenCount+=1}
  }
  else {
    if (thisButton.value=="(" && lastPress.value != "(" && lastPress.type != "function" ) {womp(thisButton)}
    else{
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
    if (buttons.displayArea.textContent == "" && thisButton.value != "-" && thisButton.value != "+") {womp(thisButton)}
    else if ((buttons.displayArea.textContent == "+" || buttons.displayArea.textContent == "-") && thisButton.value != "-" && thisButton.value != "+"){womp(thisButton)}
    else if ((lastPress.value=="(")&&(thisButton.value=="*" || thisButton.value=="/" || lastPress.value==".")){womp(thisButton)}

    else if (lastPress.value == "."){womp(thisButton)}

    else if (lastPress.type == "function"){
      buttons.displayArea.textContent = buttons.displayArea.textContent.substr(0, buttons.displayArea.textContent.length - 1)+thisButton.value;
      buttons.clear.textContent = "C"
      newEntry = false;
    }
    else {
      buttons.displayArea.textContent += thisButton.value;
      buttons.clear.textContent = "C"
      lastPress = thisButton;
      newEntry = false;
    }
}

function clickMemory(thisButton) {
  //console.log(memoryLog);
  buttons.displayArea.textContent = memoryLog.pop();
  openParenCount = 0;
  closeParenCount = 0;
  newEntry = false;
  lastPress = "";
}

function clickClear(thisButton) {
  if (buttons.displayArea.textContent !== ""){
    buttons.displayArea.textContent = "";
    buttons.clear.textContent = "CM";
    openParenCount = 0;
    closeParenCount = 0;
    newEntry = true;
    lastPress = "";
  }
  else {
    wrapper.classList.remove("flipped");
    wrapper.classList.add("flip");
    setTimeout(function () {
      wrapper.classList.remove("flip");
      wrapper.classList.add("flipped");
    }, 500);
    memoryLog = [0];
    openParenCount = 0;
    closeParenCount = 0;
    newEntry = true;
    lastPress = "";
  };
}

function clickEquals(thisButton){
  // try{
    let answer = buttons.displayArea.textContent;
    answer = answer.replace("^","**");

    if(lastPress.value == "(" || lastPress.type=="function" || lastPress.value == "."){womp(thisButton)}

    else if (openParenCount != closeParenCount){womp(thisButton)}

    else{
      newEntry = true;
      if (memoryLog[memoryLog.length-1] != answer){
        memoryLog.push(answer);}
      buttons.displayArea.textContent = eval(answer);
    }

}

function clickBackspace(thisButton){
  if (buttons.displayArea.textContent.length==1){buttons.clear.textContent = "CM"}
  if (buttons.displayArea.textContent == "") {
    buttons.clear.textContent = "CM"
    womp(thisButton)}
  else {
    if (buttons.displayArea.textContent.slice(-1) == ")") {closeParenCount--}
    if (buttons.displayArea.textContent.slice(-1) == "(") {openParenCount--}
    buttons.displayArea.textContent = buttons.displayArea.textContent.substr(0, buttons.displayArea.textContent.length - 1);
    let lastChar = buttons.displayArea.textContent.slice(-1);
    if      (lastChar == "1") {lastPress   =  buttons.one}
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
}

function womp(thisButton) {
  thisButton.classList.remove("womped");
  thisButton.classList.add("womp");
  setTimeout(function () {
    thisButton.classList.remove("womp");
    thisButton.classList.add("womped");
  }, 500);

}
