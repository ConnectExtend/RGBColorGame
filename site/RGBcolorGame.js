 // alert(" ")
var numSquares = 6;
var colors = [];
var pickedColor; 
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");
var modeBtns = document.querySelectorAll(".mode");
var confettiElement = document.getElementsByTagName("canvas")[0];

init();

function init() {
    setupModeButtons();
    setupSquares();
    reset();
}

function confetti( party ) {

    if (party) {

        // turn on the confetti
        confettiElement.style.display = null;


    } else {

        //turn off the confetti
        confettiElement.style.display = "none";
    }

}

//  set-up click event listeners for mode buttons
function setupModeButtons() {
    for (var i = 0; i < modeBtns.length; i++) {
        modeBtns[i].addEventListener("click", function() {
            modeBtns[0].classList.remove("selected");
            modeBtns[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
 
            reset();
        });
    }
}

// set-up click event listeners for squares
function setupSquares() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        squares[i].addEventListener("click", function() {
            // grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            // compare color to pickedColor
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetBtn.textContent = "Play again?";
                confetti(true);
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try again!";
            }
        });
    }
    reset();
}

function reset() {
    confetti(false);
    colors = generateRandomColors(numSquares);
    // pick a new random color from arr
    pickedColor = pickColor();
    // change colorDisplay to match pickedColor
    var rgb = /rgb\((\d+), (\d+), (\d+)\)/.exec(pickedColor);
    colorDisplay.innerHTML = "rgb(" + style("#b11212", rgb[1]) 
    						+ ", " + style("#0a6b0a", rgb[2]) 
    						+ ", " + style("#1c1cc4", rgb[3])
    						+ style("white", ")");
    resetBtn.textContent = "New Colors";
    messageDisplay.textContent = "";
    // change colors of squares
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
}

resetBtn.addEventListener("click", function() {
    reset();
});

function changeColors(color) {
    // loop thru all squares
    for (var i = 0; i < squares.length; i++) {
        // change each square to match pickedColor
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    // make an array 
    var arr = [];
    // repeat num times
    for (var i = 0; i < num; i++) {
        // get random color and push onto arr
        arr.push(randomColor());
    }
    return arr;
}

function style( color, text ) {

	return "<span style=\"color:" + color + "\">" + text + "</style>";

}

function randomColor() {
    // pick a red from 0-255, a green 0-255 and a blue 0-255
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    // create string
    return "rgb(" + r + ", " + b + ", " + g + ")";
}
