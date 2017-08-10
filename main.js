// //
// let math = require('mathjs');
// let limitedEval = math.eval;
//
// math.import({
//   'import':     function () { throw new Error('Function import is disabled') },
//   'createUnit': function () { throw new Error('Function createUnit is disabled') },
//   // 'eval':       function () { throw new Error('Function eval is disabled') },
//   'parse':      function () { throw new Error('Function parse is disabled') },
//   'simplify':   function () { throw new Error('Function simplify is disabled') },
//   'derivative': function () { throw new Error('Function derivative is disabled') }
// }, {override: true});


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

// for (i=0;i<buttonsElements.length;i++){
//   console.log(i);
//   let thisButton = buttonsElements[i];
//   thisButton.type  = thisButton.classList[0];
//   thisButton.addEventListener("click",clickFunction);
//   console.log(thisButton.classList.contains("special"));
//   if (thisButton.classList.contains("special")==false){
//     thisButton.value = thisButton.innerHTML;
//   }
//   else {
//     thisButton.value = thisButton.id;
//   }
//
//   buttons[thisButton.id] = thisButton;
// }

//special exceptions:
buttons.power.value = "^";
buttons.modulo.value = "%";
buttons.times.value = "*";
buttons.divide.value = "/";
buttons.backspace.value = "backspace";


function clicker() {
    console.log(this.type,this.value);
    if      (this.type == "number")   {clickNumber(this);}
    else if (this.type == "function") {clickFunction(this)}
    else if (this.value == "CM")      {clickClear();}
    else if (this.value == "MEM")     {clickMemory();}
    else if (this.value == "=")       {clickEquals();}
    else if (this.value == "backspace"){
      clickBackspace();
    }
}


function clickNumber(thisButton) {
  if ((lastPress.type=="function")&&(thisButton.value==")")) {}
  else if (thisButton.value==")" && closeParenCount>=openParenCount){}
  else if (lastPress.value==")" && thisButton.type =="number" && thisButton.value!=")" && !newEntry){}
  else if (lastPress.value=="(" && thisButton.value==")"){}
  else if (newEntry) {
    buttons.displayArea.textContent = thisButton.value;
    newEntry = false;
    lastPress = thisButton;
    buttons.clear.textContent = "C"
    if(thisButton.value == "("){openParenCount+=1}
    if(thisButton.value == ")"){closeParenCount+=1}
  }
  else {
    // if (thisButton.value=="(" && ((lastPress.type != "function" || lastPress.value != "(") && buttons.displayArea.textContent != "")){}
    if (thisButton.value=="(" && lastPress.value != "(" && lastPress.type != "function" ) {}
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
    console.log(lastPress);
    if (buttons.displayArea.textContent == "" && thisButton.value != "-" && thisButton.value != "+") {}
    else if ((buttons.displayArea.textContent == "+" || buttons.displayArea.textContent == "-") && thisButton.value != "-" && thisButton.value != "+"){}
    else if ((lastPress.value=="(")&&(thisButton.value=="*" || thisButton.value=="/" || lastPress.value==".")){}

    else if (lastPress.value == "."){}

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

function clickMemory() {
  console.log(memoryLog);
  buttons.displayArea.textContent = memoryLog.pop();
  openParenCount = 0;
  closeParenCount = 0;
  newEntry = false;
  lastPress = "";
}

function clickClear() {
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

function clickEquals(){
  // try{
    let answer = buttons.displayArea.textContent;
    answer = answer.replace("^","**");

    if(lastPress.value == "(" || lastPress.type=="function" || lastPress.value == "."){}

    else if (openParenCount != closeParenCount){}

    else{
      newEntry = true;
      if (memoryLog[memoryLog.length-1] != answer){
        console.log(memoryLog[memoryLog.length-1],answer);
        memoryLog.push(answer);}
      buttons.displayArea.textContent = eval(answer);
    }

}

function clickBackspace(){
  let display = buttons.displayArea.textContent;
  if (display = "") {}
  else {
    display = display.substr(0, display.length - 1);
    let lastChar = display.slice(-1);
    if (lastChar == "^") {}
    else if (lastChar == ""){}
    else if (lastChar == ""){}
    else if (lastChar == ""){}
    else if (lastChar == ""){}
    else if (lastChar == ""){}
    else if (lastChar == ""){}


    else {lastPress = lastChar}
  }
}
