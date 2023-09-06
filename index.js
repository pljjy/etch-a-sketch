const main = document.querySelector(".main");
const btn = document.querySelector("#change-state");
const inputLength = document.querySelector("#grid-size");
const reset = document.querySelector("#reset");

// init
btn.textContent = "hover";
var state = "hover";
var mousedown;
document.body.onmousedown = () => mousedown = true;
document.body.onmouseup = () => mousedown = false;
changeMode(state, true);


// eventListeners
inputLength.addEventListener("input", () => {
  if (parseInt(inputLength.value) > parseInt(inputLength.getAttribute("max"))) {
    inputLength.value = parseInt(inputLength.getAttribute("max"));
  } else if (parseInt(inputLength.value) < 0) {
    inputLength.value = 1;
  }

  main.innerHTML = "";  
  for (let x = 0; x < inputLength.value * inputLength.value; x++) {
    main.appendChild(document.createElement("div"));
  }

  main.setAttribute(
    "style",
    `grid-template-columns: repeat(${inputLength.value}, 1fr)`
  );

  changeMode(state, true)
  changeBackground(parseInt(inputLength.value))
});

btn.addEventListener("click", () => {
  if (btn.textContent == "hover") {
    btn.textContent = "click";
    state = "click";
  } else {
    btn.textContent = "hover";
    click = "hover";
  }

  changeMode(state)
});

reset.addEventListener("click", () => {
  Array.from(main.children).forEach((element) => {
    element.classList.remove("black-filled");
  });
});

// functions
function changeMode(newMode, fresh = false) {
  if(!fresh){
      Array.from(main.children).forEach((element) => {
        main.removeChild(element);
        main.appendChild(document.createElement("div"));
      });
  }

  if(newMode == "hover"){
    Array.from(main.children).forEach((element) => {
        element.addEventListener("mouseenter", () => {
          element.classList.add("black-filled");
        });
      });
  }
  else{
    Array.from(main.children).forEach((element) => {
        element.addEventListener("mouseenter", () => {
          if(mousedown){
            element.classList.add("black-filled");
          }
        });
        
        element.addEventListener("mousedown", ()=>{
          element.classList.add("black-filled");
        })
      });
  }
}