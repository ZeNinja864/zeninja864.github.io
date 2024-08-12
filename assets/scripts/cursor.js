// cursor.js -- 'blink' the HTML element with an ID of `cursor`
// Causes a blinking effect on the element marked with an ID of `cursor` by swapping the opacity between 0 and 1

// Define `cursorActive` with a starting value of `true`
var cursorActive = true;
// Define `blinkSpeed` with a value of `500` for 500 ms between 'blinks'
var blinkSpeed = 500;

setInterval(() => {
    // Check if cursorActive
    if(cursorActive) {
        // cursorActive = true
        document.getElementById('cursor').style.opacity = 0; // Set opacity to 0 -- "Hide it"
        cursorActive = false; // Set cursorActive to `false`
    } else {
        // cursorActive = false
        document.getElementById('cursor').style.opacity = 1; // Set opacity to 1 -- "Show it"
        cursorActive = true; // set cursorActive to `true`
    }
}, blinkSpeed);