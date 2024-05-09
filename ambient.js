// Get reference to submit button and age text field
const output = document.getElementById("output");


if ('ondevicelight' in window) {
  // Supported
  window.addEventListener('devicelight', gotDeviceLight);
  output.innerText = "Ambient Light supported - waiting for first data.";
} else {
  // Not supported
  output.innerText = "Ambient Light is not supported in your browser";
}

function gotDeviceLight(e) {
  output.innerHTML = e;
  output.innerText = `Ambient light: ${e.value} lux`;
  document.body.className = e.value > 50 ? 'high-ambient-light' : 'normal';
}
