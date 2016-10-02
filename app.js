
// Create a function to move Arron across the page
function chaseMe(event) {
  // Create a variable that gets and store the width of the window screen
  var windowSize = $(window).width();
  // Use the width of the window screen to reset the margins of Aaron
  $('#aaron').animate({marginLeft: windowSize - 150}, 5000);
}



// Create a function that makes Cady move
function cadyMove(event) {
  $('#cady').offset(function(index, currentOffset) {
    // Create a new object to hold the position of Cady
    var newPosition = new Object();
    // Create an item in her position to store her offset.left
    // Each time this event is executed, 10px will be added to her left offset
    newPosition.left = currentOffset.left + 10;
    // Return her current position
    return newPosition;
  });
}

// Create a function to check if the "z" key is pressed
// If right arrow is pressed, move Cady across the page
function checkForZ(event) {
  // Store the keyCode of whatever key is pressed as a variable
  var x = event.keyCode;
  // Using the keyCode that you just stored, check to see if the key that was
  // pressed is the "z" key
  if (x === 122) {
    // If the "z" key is pressed, call the cadyMove function.
    cadyMove();
  }
}



// Create a function that makes Regina move using the same method used to
// make Cady move
function reginaMove(event) {
  $('#regina').offset(function(index, currentOffset) {
    newPosition = new Object();
    newPosition.left = currentOffset.left + 10;
    return newPosition;
  });
}

// Create a function to check if the right arrow key is pressed using the keyCode
// concept once again.
// If the right arrow is pressed, call the reginaMove function.
function checkForArrow(event) {
  var x = event.keyCode;
  if (x === 39) {
    reginaMove();
  }
}



// Create a function that causes a Cady won alert to fly to middle of window
function flyOne() {
  // Find "centerish" of the winder
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();
  var horizontal = windowWidth/3.3;
  var vertical = windowHeight/3.3;

  // Animate Cady image to fly to center of page
  $('#winner1').animate({
    marginTop: vertical,
    marginLeft: horizontal
    }, 2000)
}

// Create a function that causes Regina won alert to fly to middle of window
function flyTwo() {
  // Find centerish of the winder
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();
  var horizontal = windowWidth/2.6;
  var vertical = windowHeight/4;

  // Animate Regina Wins image to fly to center of page
  $('#winner2').animate({
    marginTop: vertical,
    marginLeft: horizontal
    }, 2000)
}



// Create functions that change the opacity of the winner images
function revealOne() {
  $('#winner1').css("opacity", "1");
}

function revealTwo() {
  $('#winner2').css("opacity", "1");
}



// If Cady wins the game, execute the functions that reveal and animate the
// Cady won alert image
function winnerOne() {
  console.log ('Cady Heron wins!');
  flyOne();
  revealOne();
}

// If Regina wins the game, execute the functions that reveal and animate the
// Regins won alert image
function winnerTwo() {
  console.log('Regina George wins!');
  flyTwo();
  revealTwo();
}



// Create a timer using a loop
// Tictoc will add seconds to clock
var seconds = 0;
var timer = null;
var winningTime = null;

function tictoc(){
  seconds++;
  console.log(seconds);
}

// The set interval will ensure that tictoc is only adding seconds
// to the clock after every second
function startTime() {
  timer = setInterval(tictoc, 1000)
}

// Make a function to turn off the timer
function stopTime() {
  clearInterval(timer);
  // Record the current time and store it as the amount of time to win
  winningTime = seconds + ' seconds';
  console.log('Stop!')
}

// The ".one()" event listener will ensure that my timer is only turned on
// after the first key press or else I will mess up the counter's intervals
$('body').one("keydown", startTime)




// Create functions that change the opacity of the winner time alert
function revealAlert() {
  $('.alertBox').css("opacity", "1");
}

// These "alerts" will appear when someone wins the game logging the time it
// took them to finish.
function alertCady() {
  revealAlert();
  $('.alertBox').text('Cady snagged Aaron\'s heart in ' + winningTime + '! You go, Glenn Coco.')
}

function alertRegina() {
  revealAlert();
  $('.alertBox').text('Regina snagged Aaron\'s heart in ' + winningTime + '! You go, Glenn Coco.')
}




// Create a function to check if Cady or Regina has reached the end of the window
function winner(event) {
  // Create a variable that gets and store the width of the window screen
  var windowSize = $(window).width();
  // Create a variable that sets the finish line where Aaron is
  var finishLine = windowSize - 150;
  // Determine the position of Cady and Regina relative to the document
  var racerOne = $('#cady');
  var racerOnePosition = racerOne.offset();
  var racerTwo = $('#regina');
  var racerTwoPosition = racerTwo.offset();

  // Check to see if Cady is at least at the same position as Aaron.
  if ( racerOnePosition.left >= (windowSize - 150) ) {
    // If so, execute the winnerOne function which animates and reveals the
    // Cady won alert image
    winnerOne();
    // Turn off the event listeners that move players acrros the screen since a
    // winner has been declared
    $('body').off("keydown")
    $('body').off("keypress")
    // The game is now over so execute the function that turns off the timer and
    // stores the winning time.
    stopTime();
    // Execute the function that tells the winner how long it took them to complete
    // the game
    alertCady();
    return;
  } else if ( racerTwoPosition.left >= (windowSize - 150) ) {
    // If so, execute the winnerTwo function which animates and reveals the
    // Regina won alert image
    winnerTwo();
    // Turn off the event listeners that move players acrros the screen since a
    // winner has been declared
    $('body').off("keydown")
    $('body').off("keypress")
    // The game is now over so execute the function that turns off the timer and
    // stores the winning time.
    stopTime();
    // Execute the function that tells the winner how long it took them to complete
    // the game
    alertRegina();
    return;
  } else {
    console.log('Catch me if you can!')
  }
}



// Event listener to make Aarom move across page on load
$(document).ready(chaseMe);
// Event listener to make Cady move when 'z' is clicked
$('body').keypress(checkForZ);
// Event listener to make Regina move when 'right arrow' is clicked
$('body').keydown(checkForArrow);
// Event listener to check if Cady or Regina have won the game
$('body').keydown(winner);




