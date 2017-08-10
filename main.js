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
    else if (this.value == "CE")      {clickClear();}
    else if (this.value == "MEM")     {clickMemory();}
    else if (this.value == "=")       {clickEquals();}
}


function clickNumber(thisButton) {
  if (newEntry) {
    buttons.displayArea.textContent = thisButton.value;
    newEntry = false;
  }
  else {
    buttons.displayArea.textContent += thisButton.value;
    }
  lastPress = thisButton;
}

function clickFunction(thisButton) {
    if (buttons.displayArea.textContent == "" || lastPress.type == "function"){};
    else {buttons.displayArea.textContent += thisButton.value;}
}

function clickMemory() {
  console.log(memoryLog);
  buttons.displayArea.textContent = memoryLog.pop();
}

function clickClear() {
  if (buttons.displayArea.textContent !== ""){
    buttons.displayArea.textContent = "";
    buttons.clear.textContent = "CE";
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
  newEntry = true;
  let answer = buttons.displayArea.textContent;
  if (memoryLog[memoryLog.length-1] != answer){
    console.log(memoryLog[memoryLog.length-1],answer);
    memoryLog.push(answer);}
  buttons.displayArea.textContent = eval(answer);
}
