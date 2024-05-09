// Get reference to submit button and age text field
const startBtn = document.getElementById("start");
const output = document.getElementById("output");

// When the check button is clicked, run the checkAge function
startBtn.addEventListener("click", start);

function start() {
  console.log("started");
  if (typeof DeviceMotionEvent === 'undefined') {
    output.innerHTML = "Sorry, your browser doesn't support device motion.";
    return;
  } else {
    window.addEventListener('deviceorientation', gotOrientationEvent);
  }
}

function gotOrientationEvent(e) {
  console.log(e);
  output.innerText = `orientation:
  alpha: ${e.alpha}
  beta: ${e.beta}
  gamma: ${e.gamma}`;
}
