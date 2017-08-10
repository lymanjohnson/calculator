// numberButtons = document.getElementsByClassName("number");
// functionButtons = document.getElementsByClassName("function");
// specialButtons = document.getElementsByClassName("special");

calculator = document.getElementById("calculator");
wrapper = document.getElementById("wrapper");

let buttons = {};
let lastPress = "";
let memoryLog = [0];
let newEntry = true;

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


function clicker() {
    console.log(this.type,this.value);
    if      (this.type == "number")   {clickNumber(this);}
    else if (this.type == "function") {clickFunction(this)}
    else if (this.value == "CM")      {clickClear();}
    else if (this.value == "MEM")     {clickMemory();}
    else if (this.value == "=")       {clickEquals();}
}


function clickNumber(thisButton) {
  if ((lastPress.type=="function")&&(thisButton.value==")")) {}
  else if (newEntry) {
    buttons.displayArea.textContent = thisButton.value;
    newEntry = false;
    lastPress = thisButton;
    buttons.clear.textContent = "C"
  }
  else {
    buttons.displayArea.textContent += thisButton.value;
    lastPress = thisButton;
    buttons.clear.textContent = "C"
    }

}

function clickFunction(thisButton) {
    console.log(lastPress);
    if (buttons.displayArea.textContent == "" && thisButton.value != "-"){}
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
}

function clickClear() {
  if (buttons.displayArea.textContent !== ""){
    buttons.displayArea.textContent = "";
    buttons.clear.textContent = "CM";
  }
  else {
    wrapper.classList.remove("flipped");
    wrapper.classList.add("flip");
    setTimeout(function () {
      wrapper.classList.remove("flip");
      wrapper.classList.add("flipped");
    }, 500);
    memoryLog = [0];
  };
}

function clickEquals(){
  // try{
    let answer = buttons.displayArea.textContent;

    if(lastPress.value == "(" || lastPress.type=="function" || lastPress.value == "."){}

    else{
      newEntry = true;
      if (memoryLog[memoryLog.length-1] != answer){
        console.log(memoryLog[memoryLog.length-1],answer);
        memoryLog.push(answer);}
      buttons.displayArea.textContent = eval(answer);
    }
  // }
  // catch(e){
  //   console.log("error!");
  // }
}

// CATCH:
// newEntry = true;
// buttons.displayArea.textContent = "";
// buttons.displayArea.classList.remove("flipped");
// buttons.displayArea.classList.add("flip");
//
// setTimeout(function () {
//   buttons.displayArea.classList.remove("flip");
//   buttons.displayArea.classList.add("flipped");
// }, 500);
