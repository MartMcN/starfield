import { Star } from "./star.js";

let starField = [];

// Creates an array of star objects with random positions
const starFieldRandom = function (qty) {
  let starField = [];

  for (let index = 0; index < qty; index++) {
    const starEntry = new Star(true);
    starField[index] = starEntry;
  }

  return starField;
};

// Using P5 in instance mode
const s = function (p) {
  p.setup = function () {
    p.createCanvas(window.innerWidth, window.innerHeight);

    // Create Random start array
    starField = starFieldRandom(500);

    p.stroke(255);
    p.textSize(32);

    //frameRate();
    //noLoop(); // Run once and stop
  };

  p.draw = function () {
    p.background(0);

    // Remove the off screen Stars
    const countStars = starField.length;
    const starFieldTemp = starField.filter((star) => star.startOnScreen());
    starField = starFieldTemp;

    // Replace stars removed off screen
    const removedStarCount = countStars - starField.length;
    if (removedStarCount > 0) {
      //console.log(`Adding ${removedStarCount} removed Stars`);
      for (let index = 0; index < removedStarCount; index++)
        starField.push(new Star(true));
    }

    // Plot each Star
    starField.forEach((el) => {
      p.strokeWeight(el.starSize);
      p.point(...el.starPosition);
      el.starUpdate();
    });
  };

  p.windowResized = function () {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
  };
};

new p5(s); // invoke p5

// const updateSize = function () {
//   resizeCanvas(window.innerWidth, window.innerHeight);
// };

// window.addEventListener("resize", updateSize);
