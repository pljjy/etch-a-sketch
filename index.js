const main = document.querySelector(".main");
const btn = document.querySelector("#change-state");
const inputLength = document.querySelector("#grid-size");
const clear = document.querySelector("#clear");

// init
btn.textContent = "hover";
var state = btn.textContent;
var mousedown;
document.body.onmousedown = () => (mousedown = true);
document.body.onmouseup = () => (mousedown = false);
resetGrid();
changeMode();

// eventListeners
inputLength.addEventListener("input", () => {
  resetGrid();
  changeMode();
});

btn.addEventListener("click", () => {
  if (btn.textContent == "hover") {
    btn.textContent = "click";
    state = "click";
  } else {
    btn.textContent = "hover";
    state = "hover";
  }

  resetGrid();
  changeMode();
});

clear.addEventListener("click", () => {
  Array.from(main.children).forEach((element) => {
    element.classList.remove("black-filled");
  });
});

// functions
function resetGrid(){
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
}

function changeMode() {
  if (state == "hover") {
    Array.from(main.children).forEach((element) => {
      element.addEventListener("mouseenter", () => {
        element.classList.add("black-filled");
      });
    });
  } else {
    Array.from(main.children).forEach((element) => {
      element.addEventListener("mouseenter", () => {
        if (mousedown) {
          element.classList.add("black-filled");
        }
      });

      element.addEventListener("mousedown", () => {
        element.classList.add("black-filled");
      });
    });
  }
}
