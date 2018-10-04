// Fisher-Yates devised and Don Knuth popularized random number generating function
Array.prototype.shuffle = function() {
  var input = this;

  for (var i = input.length - 1; i >= 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var itemAtIndex = input[randomIndex];

    input[randomIndex] = input[i];
    input[i] = itemAtIndex;
  }
  return input;
};

// Original array of values with new array shuffle function
const tileNumbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
const randNumbers = tileNumbers.shuffle();

// Display the guess count
const displayCount = document.querySelector('.matchCount');

// Variables for count, selections, and guesses
let count = 0;
let firstGuess = '';
let secondGuess = '';
let previousTarget = null;
let guessCount = 0;

// Add the random numbers to the DOM divs
const tiles = document.querySelectorAll('.card');

for (let i = 0; i < tiles.length; i++) {
  tiles[i].innerHTML = `<span>${randNumbers[i]}</span>`;
}

// Finding a match function call
function match() {
  let selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
    card.classList.remove('selected');
  });

  // Reset after match is found
  firstGuess = '';
  secondGuess = '';
  count = 0;
}

// Reset guesses when no match is found
function reset() {
  guessCount++;
  displayCount.innerHTML = guessCount;

  firstGuess = '';
  secondGuess = '';
  count = 0;

  let selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
    card.querySelector('span').style.display = 'none';
  });
}

// Listen for events here
const grid = document.querySelector('.row');

// Event listener for selections
grid.addEventListener('click', function(event) {
  event.preventDefault();

  // Selecting the span that holds the number
  const clicked = event.target.querySelector('span');
  if (clicked.innerHTML === previousTarget) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = event.target.innerHTML;
      clicked.style.display = 'block';
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = event.target.innerHTML;
      clicked.style.display = 'block';
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess !== '' && secondGuess !== '') {
      // and the first guess matches the second match...
      if (firstGuess === secondGuess) {
        // run the match function
        match();
      } else {
        setTimeout(reset, 800);
      }
      previousTarget = clicked;
      console.log(previousTarget);
    }
  }
});
