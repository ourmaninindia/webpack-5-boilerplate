import "./styles/index.scss";
import getClasses from "./getClasses";

function _renderData(jsonData) {
  let responseEl = document.querySelector('#response');
  responseEl.innerHTML = jsonData.message;
}

function _fetchMessage() {
  fetch('/api/getMessage')
    .then(response => response.json())
    .then(_renderData);
}

let buttonEl = document.querySelector('input');
buttonEl.addEventListener('click', () => {
  _fetchMessage();
});

console.log("The client has loaded index.js");

getClasses();

const elvenShieldRecipe = {
  leatherStrips: 2,
  ironIngot: 1,
  refinedMoonstone: 4,
};

// ES7 Object spread example
const elvenGauntletsRecipe = {
  ...elvenShieldRecipe,
  leather: 1,
  refinedMoonstone: 1,
};

//comment out the   next line to test
//console.log("ES7 Object spread example: ", elvenGauntletsRecipe);

// ES8 Object.values example
// Note: Will not transpile without babel polyfills because it is a new method

//comment out the   next line to test
// console.log("ES8 Object.values example", Object.values(elvenGauntletsRecipe));

// Event queue block scoping example
// Check babel output to see that `let` isn't simply switched to `var`
// because the code would not have the same output.

//comment out the   next line to test
// for (let i = 0; i < 10; i++) { setTimeout(function () { console.log(i);  }, 1);}
