// Wait until the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    var noofsquares = 6;  // Number of color squares
    var arr = [];  // Array to hold the colors
    var picked;  // Variable to hold the color picked by the user
    var squares = document.querySelectorAll(".square");  // Select all elements with class "square"
    var targetcolor = document.getElementById("targetcolor");  // Select the element to display the target color
    var message = document.getElementById("message");  // Select the element to display messages
    var head = document.querySelector("h1");  // Select the <h1> element for the heading
    var reset = document.getElementById("newcolor");  // Select the button to reset the game

    init();  // Call the initialization function

    function init() {
        // Check if all required elements are present
        if (!targetcolor || !message || !head || !reset) {
            console.error("One or more elements not found. Check your HTML and JavaScript.");
            return;  // Exit the function if any element is missing
        }

        // Generate an array of random colors and pick one as the target color
        arr = generateRandomColor(noofsquares);
        picked = normalizeColor(arr[randomPickedColorIndex()]);
        targetcolor.textContent = picked;  // Display the target color

        // Iterate over each square and set up event listeners
        for (var i = 0; i < squares.length; i++) {
            squares[i].style.backgroundColor = arr[i];  // Set the background color of the square
            squares[i].addEventListener("click", function() {
                var clickedColor = normalizeColor(this.style.backgroundColor);  // Get and normalize the clicked square's color
                if (picked === clickedColor) {  // Check if the clicked color matches the target color
                    message.textContent = "Correct";  // Display a success message
                    message.style.color = "green";  // Set the message color to green
                    changeColor(this.style.backgroundColor);  // Change all square colors to the correct color
                    reset.textContent = "Play Again";  // Change the reset button text
                } else {
                    message.textContent = "Try Again";  // Display a failure message
                    message.style.color = "red";  // Set the message color to red
                    this.style.backgroundColor = "#232323";  // Hide the incorrect color by setting it to a dark color
                }
            });
        }
    }

    function randomPickedColorIndex() {
        return Math.floor(Math.random() * arr.length);  // Return a random index from the colors array
    }

    function generateRandomColor(limit) {
        var color = [];  // Array to store generated colors
        for (var i = 0; i < limit; i++) {
            color.push(rgbGenerator());  // Generate and add a random color to the array
        }
        return color;  // Return the array of colors
    }

    function rgbGenerator() {
        var r = Math.floor(Math.random() * 256);  // Generate a random red value (0-255)
        var g = Math.floor(Math.random() * 256);  // Generate a random green value (0-255)
        var b = Math.floor(Math.random() * 256);  // Generate a random blue value (0-255)
        return "rgb(" + r + "," + g + "," + b + ")";  // Return the color in RGB format
    }

    function rgbToHex(rgb) {
        var rgbArray = rgb.match(/\d+/g);  // Extract the RGB values from the RGB string
        var hex = rgbArray.map(function(x) {  // Convert each RGB value to a hex string
            return ('0' + parseInt(x).toString(16)).slice(-2);
        }).join('');  // Concatenate the hex values
        return '#' + hex;  // Return the color in hex format
    }

    function normalizeColor(color) {
        if (color.startsWith('rgb')) {  // Check if the color is in RGB format
            return rgbToHex(color);  // Convert RGB to hex format
        }
        return color;  // Return the color if it is already in hex format
    }

    function changeColor(color) {
        for (var i = 0; i < squares.length; i++) {
            squares[i].style.backgroundColor = color;  // Change the background color of all squares
        }
        head.style.backgroundColor = color;  // Change the background color of the heading
    }

    function resetIn() {
        arr = generateRandomColor(noofsquares);  // Generate a new array of random colors
        picked = normalizeColor(arr[randomPickedColorIndex()]);  // Pick a new target color
        targetcolor.textContent = picked;  // Update the displayed target color
        message.textContent = "";  // Clear any previous messages
        head.style.backgroundColor = "steelblue";  // Reset the heading background color
        for (var i = 0; i < squares.length; i++) {
            squares[i].style.backgroundColor = arr[i];  // Reset the background color of all squares
        }
    }

    reset.addEventListener("click", resetIn);  // Add an event listener to the reset button
});
