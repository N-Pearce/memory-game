const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let cardCount = 0;
let pauseState = false;

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  const data = event.target.getAttribute('data');
  if (!pauseState &&  data != "selected" && data != "complete"){
    cardCount++;
    event.target.style.backgroundColor = event.target.classList;
    event.target.setAttribute("data", "selected");
    if (cardCount % 2 == 0){
      pauseState = true;
      setTimeout(handleTwoCards, 1000);
    }
  }
}

function handleTwoCards(){
  // NodeList of the two selected cards
  const selectedCards = document.querySelectorAll('[data="selected"]');

  if (selectedCards[0].className == selectedCards[1].className){
    // matching cards
    selectedCards[0].setAttribute("data", "complete");
    selectedCards[1].setAttribute("data", "complete");
  } else {
    // mismatched cards
    selectedCards[0].setAttribute("data", "null");
    selectedCards[1].setAttribute("data", "null");
    selectedCards[0].style.backgroundColor = 'white';
    selectedCards[1].style.backgroundColor = 'white';
  }

  pauseState = false;
}

// when the DOM loads
createDivsForColors(shuffledColors);
