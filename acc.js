  // Get reference to submit button and age text field
  const startBtn = document.getElementById("start");
  const output = document.getElementById("output");

  // When the check button is clicked, run the checkAge function
  startBtn.addEventListener("click", start);

  function start() {
    if (typeof DeviceMotionEvent === 'undefined') {
      output.innerHTML = "Sorry, your browser doesn't support device motion.";
      return;
    }


    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      // We need to ask permission first
      output.innerHTML = "Asking for permission&hellip;";

      DeviceMotionEvent.requestPermission().then(response => {
        if (response === 'granted') {
          window.addEventListener('devicemotion', gotMotionEvent);
        }
      }).catch(error => {
        output.innerHTML = `Unable to access device motion - ${error}`;
      });
    } else {
      // No need to ask permission
      window.addEventListener('devicemotion', gotMotionEvent);
    }
  }

  function gotMotionEvent(e) {
    output.innerText = `acceleration:
  x: ${e.acceleration.x}
  y: ${e.acceleration.y}
  z: ${e.acceleration.z}

  rotation rate:
  alpha: ${e.rotationRate.alpha}
  beta: ${e.rotationRate.beta}
  gamma: ${e.rotationRate.gamma}`;
  }
