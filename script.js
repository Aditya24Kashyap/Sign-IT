const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const fontSizePicker = document.getElementById("fontSizePicker");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const retrieveButton = document.getElementById("retrieveButton");

let isDrawing = false;
let lastX = 0;
let lastY = 0;

/* Fix canvas resolution */
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

/* Default settings */
ctx.strokeStyle = "#000";
ctx.lineWidth = 5;
ctx.lineCap = "round";

/* Events */
canvas.addEventListener("mousedown", e => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener("mousemove", e => {
  if (!isDrawing) return;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseleave", () => isDrawing = false);

colorPicker.addEventListener("change", e => {
  ctx.strokeStyle = e.target.value;
});

fontSizePicker.addEventListener("change", e => {
  ctx.lineWidth = e.target.value;
});

canvasColor.addEventListener("change", e => {
  ctx.save();
  ctx.globalCompositeOperation = "destination-over";
  ctx.fillStyle = e.target.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
});

clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveButton.addEventListener("click", () => {
  const data = canvas.toDataURL();
  localStorage.setItem("signature", data);

  const link = document.createElement("a");
  link.href = data;
  link.download = "signature.png";
  link.click();
});

retrieveButton.addEventListener("click", () => {
  const data = localStorage.getItem("signature");
  if (!data) return;

  const img = new Image();
  img.onload = () => ctx.drawImage(img, 0, 0);
  img.src = data;
});

const modeToggle = document.getElementById("modeToggle");

modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    modeToggle.textContent = "☀️ Light Mode";
  } else {
    modeToggle.textContent = "🌙 Dark Mode";
  }
});
