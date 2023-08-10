var currentDate = new Date();

// Get the current year, month, day, hours, minutes, and seconds
var year = currentDate.getFullYear();
var month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
var day = currentDate.getDate();
var hours = currentDate.getHours();
var minutes = currentDate.getMinutes();
var seconds = currentDate.getSeconds();

// Format the date components as needed
var formattedDate = year + '-' + month + '-' + day;
var formattedTime = hours + ':' + minutes + ':' + seconds;

// Display the results
// console.log("Current Date: " + formattedDate);
// console.log("Current Time: " + formattedTime);

var currentMonth = month;


switch (currentMonth) {
    case 12: // December
        // Create a new canvas element
        var newSnowfallDiv = document.createElement("div");
        newSnowfallDiv.id = "snow"; // Set the ID for the new canvas
        // Get a reference to the main-content div
        var mainContentDiv = document.getElementById("main-content");
        // Get the parent container of main-content
        var container = mainContentDiv.parentNode;
        // Insert the new canvas and div before the main-content div
        container.insertBefore(newSnowfallDiv, mainContentDiv);

        // Set background coloring elements
        document.body.style.backgroundColor = 'rgb(42, 53, 63)';
        document.body.style.backgroundImage = "url('pine.jpg')";
        document.body.classList.add('bgImageWinter');

        // Create a new div element with class "bgOverlay"
        var bgOverlayWinter = document.createElement("div");
        // Add the class to the <div> element
        bgOverlayWinter.classList.add('bgOverlay');
        // Apply the CSS properties directly
        bgOverlayWinter.style.position = 'absolute';
        bgOverlayWinter.style.top = '0';
        bgOverlayWinter.style.left = '0';
        bgOverlayWinter.style.width = '100%';
        bgOverlayWinter.style.height = '100%';
        bgOverlayWinter.style.background = 'rgba(0, 0, 0, 0.6)';
        bgOverlayWinter.style.pointerEvents = 'none';
        // Get a reference to the main-content div
        var mainContentDiv = document.getElementById("main-content");
        // Get the parent container of main-content
        var container = mainContentDiv.parentNode;
        // Insert the new canvas and div before the main-content div
        container.insertBefore(bgOverlayWinter, mainContentDiv);

//        // Create an <audio> element
//        var audioElement = document.createElement('audio');
//        audioElement.id = 'christmasBells';
//        audioElement.autoplay = true;
//        // Create a <source> element within the <audio> element
//        var sourceElement = document.createElement('source');
//        sourceElement.src = 'tf2bells.mp3';
//        sourceElement.type = 'audio/mpeg';
//        // Append the <source> element to the <audio> element
//        audioElement.appendChild(sourceElement);
//        // Append the <audio> element to the <body> of the document
//        document.body.appendChild(audioElement);
//        // Play the audio
//        audioElement.play();
//        // Pause and reset the audio when the page is about to unload (refresh)
//        window.onbeforeunload = function() {
//            audioElement.pause();
//            audioElement.currentTime = 0;
//        };


        // Set the basic 'default' values for the snowfall
        let snowflakesCount = 750; // Snowflake count, can be overridden by configured parameters
        let baseCss = ``;

        // Set global attributes for snowflakes
        if (typeof SNOWFLAKES_COUNT !== 'undefined') {
            snowflakesCount = SNOWFLAKES_COUNT;
        }
        if (typeof BASE_CSS !== 'undefined') {
            baseCss = BASE_CSS;
        }

        let bodyHeightPx = null;
        let pageHeightVh = null;

        function setHeightVariables() {
            bodyHeightPx = document.body.offsetHeight;
            pageHeightVh = (100 * bodyHeightPx / window.innerHeight);
        }

        // Define function getSnowAttributes()
        // Fetch parameters from the HTML element with the ID of `snow`
        function getSnowAttributes() {
            const snowWrapper = document.getElementById('snow'); // Search relevant HTML source for `snow` element
            if (snowWrapper) {
                // Element with the ID of `snow` exists.
                snowflakesCount = Number(
                    // Set number of maximum snowflakes present to the value parameter set in the `snow` element.
                    // Should no such parameter exist, set maximum snowflakes to the default of 200 then.
                    snowWrapper.attributes?.count?.value || snowflakesCount
                );
            }
        }

        // Define showSnow(value)
        // Add the ability to toggle snowfall, if warranted.
        function showSnow(value) {
            if (value) {
                document.getElementById('snow').style.display = "block";
            } else {
                document.getElementById('snow').style.display = "none";
            }
        }

        // Creating snowflakes
        function spawnSnow(snowDensity = 200) {
            snowDensity -= 1;

            for (let i = 0; i < snowDensity; i++) {
                let board = document.createElement('div');
                board.className = "snowflake";

                document.getElementById('snow').appendChild(board);
            }
        }

        // Define function addCss(rule)
        // Append styling for snowflakes to the document <head>
        function addCss(rule) {
            let css = document.createElement('style'); // Create an additional <style> element
            css.appendChild(document.createTextNode(rule)); // Support for remaining styling
            document.getElementsByTagName("head")[0].appendChild(css); // Append CSS to the document <head>
        }

        // Math
        function randomInt(value = 100) {
            return Math.floor(Math.random() * value) + 1;
        }

        function randomIntRange(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

        // Create style for snowflake
        function spawnSnowCSS(snowDensity = 200) {
            let snowflakeName = "snowflake";
            let rule = baseCss;

            for (let i = 1; i < snowDensity; i++) {
                let randomX = Math.random() * 100; // vw
                let randomOffset = Math.random() * 10 // vw;
                let randomXEnd = randomX + randomOffset;
                let randomXEndYoyo = randomX + (randomOffset / 2);
                let randomYoyoTime = getRandomArbitrary(0.3, 0.8);
                let randomYoyoY = randomYoyoTime * pageHeightVh; // vh
                let randomScale = Math.random();
                let fallDuration = randomIntRange(10, pageHeightVh / 10 * 3); // s
                let fallDelay = randomInt(pageHeightVh / 10 * 3) * -1; // s
                let opacity = Math.random();

                rule += `
                    .${snowflakeName}:nth-child(${i}) {
                        opacity: ${opacity};
                        transform: translate(${randomX}vw, -10px) scale(${randomScale});
                        animation: fall-${i} ${fallDuration}s ${fallDelay}s linear infinite;
                    }
                    @keyframes fall-${i} {
                        ${randomYoyoTime * 100}% {
                            transform: translate(${randomXEnd}vw, ${randomYoyoY}vh) scale(${randomScale});
                        } to {
                            transform: translate(${randomXEndYoyo}vw, ${pageHeightVh}vh) scale(${randomScale});
                        }
                    }
                `
            }
            addCss(rule);
        }

        // Load the rules and execute after the DOM loads
        createSnow = function () {
            setHeightVariables();
            getSnowAttributes();
            spawnSnowCSS(snowflakesCount);
            spawnSnow(snowflakesCount);
        };


        // export createSnow function if using node or CommonJS environment
        if (typeof module !== 'undefined') {
            module.exports = {
            createSnow,
            showSnow,
            };
        } else {
            window.onload = createSnow;
        }
        break;


    default:
        // Create a new canvas element
        var newMatrixCanvas = document.createElement("canvas");
        newMatrixCanvas.id = "matrix"; // Set the ID for the new canvas
        // Create a new div element with class "bgOverlay"
        var newBgOverlayDiv = document.createElement("div");
        newBgOverlayDiv.className = "bgOverlay";
        // Get a reference to the main-content div
        var mainContentDiv = document.getElementById("main-content");
        // Get the parent container of main-content
        var container = mainContentDiv.parentNode;
        // Insert the new canvas and div before the main-content div
        container.insertBefore(newMatrixCanvas, mainContentDiv);
        container.insertBefore(newBgOverlayDiv, mainContentDiv);

        const canvas = document.getElementById('matrix');
        const context = canvas.getContext('2d');

        // Move the canvas size setup into a function
        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        setCanvasSize(); // Set initial canvas size

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const alphabet = katakana + latin + nums;

        const fontSize = 10;

        let columns = Math.floor(canvas.width / fontSize);
        let rainDrops = Array(columns).fill(1);

        const draw = () => {
            context.fillStyle = 'rgba(0, 0, 0, 0.07)';
            context.fillRect(0, 0, canvas.width, canvas.height);

            context.font = fontSize + 'px monospace';

            for (let i = 0; i < rainDrops.length; i++) {
                // Decrease opacity based on raindrop position
                const opacity = Math.max(0, 1 - (rainDrops[i] * fontSize) / canvas.height);
                //context.fillStyle = `rgba(246, 186, 139, ${opacity})`;
                context.fillStyle = `rgba(104, 176, 109, ${opacity})`;

                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };

        setInterval(draw, 35);

        // Listen for window resize events and update canvas accordingly
        window.addEventListener('resize', () => {
            setCanvasSize();
            columns = Math.floor(canvas.width / fontSize);
            rainDrops = Array(columns).fill(1);
        });
        break;
    // Code to execute if expression doesn't match any case
}