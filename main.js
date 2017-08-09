
buttonsElements = document.getElementsByClassName("calc-button");

field = "";

buttons = {};

for (i=0;i<buttonsElements.length;i++){
  let thisButton = buttonsElements[i];
  console.log(thisButton);
  if(thisButton.classList.contains("number")){
    thisButton.value = thisButton.innerHTML;
  }
  thisButton.addEventListener("click",clickFunction);
  buttons[thisButton.id] = thisButton;
}

console.log(buttons);
console.log(buttons.one);

function clickFunction() {
  field += this.value;
  buttons.displayArea
  console.log(field);
}
