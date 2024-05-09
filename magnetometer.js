const startBtn = document.getElementById("start");
const output = document.getElementById("output");

// When the check button is clicked, run the checkAge function
startBtn.addEventListener("click", start);

function start() {
  if (typeof Magnetometer === 'undefined') {
    output.innerHTML = "Sorry, your browser doesn't support magnetometer.";
    return;
  }
  let magSensor = new Magnetometer({ frequency: 60 });
  magSensor.addEventListener('reading', (e) => {
    output.innerHTML = `Magnetic field along the X-axis ${magSensor.x}<br>Magnetic field along the Y-axis ${magSensor.y}<br>Magnetic field along the Z-axis ${magSensor.z}`;
  });
  magSensor.start();
}

