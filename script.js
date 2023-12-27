import { Star } from "./star.js";

let starField = [];
let ctx = {};
let canvasEl = {};

// Creates an array of star objects with random positions
const starFieldRandom = function (qty) {
  let starField = [];

  for (let index = 0; index < qty; index++) {
    const starEntry = new Star(true);
    starField[index] = starEntry;
  }

  return starField;
};

// Initalise the canvas to full screen
// Generate starField array of stars
// Start the rendering
const init = function (starCount) {
  canvasEl = document.querySelector(".canvas-view");
  ctx = canvasEl.getContext("2d", { alpha: false });

  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight;

  starField = starFieldRandom(starCount);
  requestAnimationFrame(render);
};

// Render the starfield
const render = function () {
  // Remove the off screen Stars
  const countStars = starField.length;
  const starFieldTemp = starField.filter((star) => star.startOnScreen());
  starField = starFieldTemp;

  // Replace removed Stars with new ones
  const removedStarCount = countStars - starField.length;
  if (removedStarCount) {
    for (let index = 0; index < removedStarCount; index++)
      starField.push(new Star(true));
  }

  // Clear Canvas
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  // Plot each Star
  starField.forEach((el) => {
    // Draw the star
    ctx.beginPath();
    ctx.arc(...el.starPosition, el.starSize / 2, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    // update Star
    el.starUpdate();
  });

  requestAnimationFrame(render);
};

// Handle Window resize
window.addEventListener("resize", () => {
  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight;
});

init(500);
