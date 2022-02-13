const  rElement = document.getElementById("r");
const  gElement = document.getElementById("g");
const  bElement = document.getElementById("b");
const colorDisplayElement = document.getElementById("color-display");

const levels = Array.from(document.getElementsByClassName("mode"));
// Selecting and Changing innerHTML
let gameLevel = levels.find((level) => {
    const classList = Array.from(level.classList);
    return classList.includes("selected");
}).innerHTML;


let squares = getSquares(gameLevel);

levels.forEach((level) => {
    level.addEventListener("click", function() {
        levels.forEach(mode => mode.classList.remove("selected"));
        this.classList.add("selected");

        gameLevel = this.innerHTML;
        setTilesAccordingtoGameLevel(gameLevel);
        squares = getSquares(gameLevel);
    });
});

function getSquares (){
    const allSquares = Array.from(document.getElementsByClassName("square"));
    if (gameLevel == "Easy"){
        return allSquares.slice(0, 3)
    }
    else {
        return allSquares
    };
};
function setTilesAccordingtoGameLevel(currentGammeLevel){
    const allSquares = Array.from(document.getElementsByClassName("square"));

    if (currentGammeLevel == "Easy"){
        // set three squares
        const firstThreeSquares = allSquares.slice(0, 3);
        const lastThreeSquares = allSquares.slice(3, 6);
        lastThreeSquares.forEach(sq => sq.classList.add("hidden"));
        
    }
    else if (currentGammeLevel == "Hard") {
        // set 6 squares
        allSquares.forEach(sq => sq.classList.remove("hidden"))
    };
};
// Attempt to maek sqaure different background colour rgb(255, 0, 45)
const startButton = document.getElementById("reset");
startButton.addEventListener("click", function() {
    this.innerHTML = "New Colors"
    // assign each individual square an individual color
    for (let i=0; i<squares.length; i+=1){
        // generating random RGB string
        const red = Math.floor(Math.random()*256);
        const green = Math.floor(Math.random()*256);
        const blue = Math.floor(Math.random()*256);
        
        const rgbString = "rgb(" + red + "," + green + "," + blue +")" ;
        const square = squares[i];

        square.dataset.rgb_values = JSON.stringify([red, green, blue]);
        square.style.backgroundColor = rgbString;
    };
    // assign the header random rgb value from the squares
    const randomSquareIndex = Math.floor(Math.random() * squares.length);
    const headerColorSquare = squares[randomSquareIndex];
    setHeaderRgbBackgroundColor(headerColorSquare);
});

function setHeaderRgbBackgroundColor(squareElement){
    const setHeaderElementBackgroundColor = (rgbValues, element) => {
        const [r, g, b] = rgbValues;
        const rgbString = `rgb(${r}, ${g}, ${b})`;
        element.style.backgroundColor = rgbString
        element.innerHTML = rgbValues.find(rgbValue => {
            return rgbValue > 0;
        });
    };
    const rgbString = squareElement.dataset.rgb_values;
    colorDisplayElement.dataset.rgb_values = rgbString;
    const [red, green, blue] = JSON.parse(rgbString);
    const redBackground = [red, 0, 0];
    const greenBackground = [0, green, 0];
    const blueBackground = [0, 0, blue];

    // combines the different colours into one single element
    setHeaderElementBackgroundColor(redBackground, rElement);
    setHeaderElementBackgroundColor(greenBackground, gElement);
    setHeaderElementBackgroundColor(blueBackground, bElement);
};

//Event listner to squares so that it disappears or changes color of all other squares
squares.forEach(square => {
    square.addEventListener("click", function(){
        const rgbHeaderValue = colorDisplayElement.dataset.rgb_values;
        const squareRgbValue = this.dataset.rgb_values

        if (rgbHeaderValue == squareRgbValue){
            setSquareElementBackgroundAfterWin(rgbHeaderValue);
        }
        else{
            this.classList.add("hidden");
        }
    });
});

// What happens when the right color is selected.
function setSquareElementBackgroundAfterWin(rgbHeaderString) {
    const [r, g, b] = JSON.parse(rgbHeaderString);
    const rgbString = `rgb(${r}, ${g}, ${b})`; // Separates them into individual values
    squares.forEach((sq) => {
        sq.classList.remove("hidden");
        sq.style.backgroundColor = rgbString;
        sq.dataset.rgb_values = colorDisplayElement.dataset.rgb_values;
    });
};