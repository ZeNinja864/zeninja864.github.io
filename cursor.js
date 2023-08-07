var cursorActive = true; // Define `cursorActive` with a starting value of `true`
var blinkSpeed = 500; // Define `blinkSpeed` with a value of `500` for 500 ms

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