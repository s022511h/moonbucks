  // Get reference to submit button and age text field
  const startBtn = document.getElementById("start");
  const stopBtn = document.getElementById("stop");
  const output = document.getElementById("output");
  let watchId;
  // When the check button is clicked, run the checkAge function
  startBtn.addEventListener("click", start);
  stopBtn.addEventListener("click", stop);

  function stop() {
    if (watchId != null) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
    }
  }

  function start() {
    if (!navigator.geolocation) {
      output.innerHTML = "The geolocation feature is not available in your browser.";
    } else {
      output.innerHTML = "Attempting to locate you&hellip;";
      watchId = navigator.geolocation.watchPosition(gotPosition, gotError);
    }
  }

  function gotPosition(position) {
    if (position == null) {
      console.log("Null position");
      return;
    }
    console.log(position);

    // Cap the number of items in the table. 
    if (output.children.length > 10) {
      output.removeChild(output.children[0]);
    }

    output.insertAdjacentHTML('beforeend', `<tr><td>${position.timestamp}</td><td>(${position.coords.latitude},${position.coords.longitude})</td></tr>`);
  }

  function gotError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        output.innerHTML = "You have declined permission to use geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        output.innerHTML = "Unable to determine your position using geolocation.";
        break;
      case error.TIMEOUT:
        output.innerHTML = "Unable to determine your position using geolocation within a given duration of time.";
        break;
      case error.UNKNOWN_ERROR:
        output.innerHTML = "An unknown error occurred when using geolocation.";
        break;
    }
  }
