
buttonsElements = document.getElementsByClassName("calcButton");
wrapper = document.getElementById("wrapper");

console.log(wrapper);

let buttons = {};
let memoryLog = [];
let newEntry = true;

for (i=0;i<buttonsElements.length;i++){
  let thisButton = buttonsElements[i];
  if (thisButton.classList.contains("normal")){
    thisButton.value = thisButton.innerHTML;
    thisButton.type  = "normal"}
  else {thisButton.value = thisButton.id;
        thisButton.type = "special"}
  thisButton.addEventListener("click",clickFunction);
  buttons[thisButton.id] = thisButton;
}

//special exceptions:
buttons.power.value = "^";
buttons.modulo.value = "%";
buttons.times.value = "*";
buttons.divide.value = "/";


function clickFunction() {
    if (this.type == "normal") {
      if(newEntry == true){
        if(this.type == "number") {buttons.displayArea.textContent="";}
        newEntry = false;
      }
      buttons.displayArea.textContent += this.value;
      buttons.clear.textContent = "C";}
    else if (this.value == "clear") {clickClear();}
    else if (this.value == "memory") {clickMemory();}
    else if (this.value == "equalsign") {clickEquals();}
}

function clickMemory() {
  console.log(memoryLog);
  buttons.displayArea.textContent = memoryLog.pop();
}

function clickClear() {
  // console.log(buttons.displayArea.textContent);
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
    memoryLog = [];
  };
}

function clickEquals(){
  newEntry = true;
  console.log(buttons.displayArea.textContent);
  let answer = buttons.displayArea.textContent;
  memoryLog.push(answer);
  buttons.displayArea.textContent = eval(answer);
}
