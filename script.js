"use strict";

let starField = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  // createCanvas(
  //   document.documentElement.clientWidth,
  //   document.documentElement.clientHeight
  // );
  //console.log(`A: ${document.documentElement.clientWidth}`);
  //console.log(`B: ${window.innerWidth}`);

  // Create an array of Star objects every x pixels
  //const spacer_pixels = 100;
  //starField = starTestArray(spacer_pixels);

  // Single Star
  //starArray[0] = new Star(false, 10, 10);

  // Create Random start array
  starField = starFieldRandom(500);

  stroke(255);
  textSize(32);

  //frameRate();
  //noLoop(); // Run once and stop
}

function draw() {
  background(0);
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
    strokeWeight(el.starSize);
    point(...el.starPosition);
    el.starUpdate();
  });

  // Show FPS
  // let fps = frameRate();
  // text(Math.trunc(fps), 50, 100);
}

const updateSize = function () {
  resizeCanvas(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", updateSize);

// Creates an array of star objects with random positions
const starFieldRandom = function (qty) {
  let starField = [];

  for (let index = 0; index < qty; index++) {
    const starEntry = new Star(true);
    starField[index] = starEntry;
  }

  return starField;
};

// Creates an evently space start cluster
const starTestArray = function (pointSpacing) {
  const xMax = Math.trunc(width / pointSpacing);
  const yMax = Math.trunc(height / pointSpacing);

  let starIndex = 0;
  let starCluster = [];

  for (let x = 0; x <= xMax; x++) {
    for (let y = 0; y <= yMax; y++) {
      let distance = dist(
        width / 2,
        height / 2,
        x * pointSpacing,
        y * pointSpacing
      );

      const starEntry = new Star(false, x * pointSpacing, y * pointSpacing);

      starCluster[starIndex] = starEntry;
      starIndex++;
    }
  }

  return starCluster;
};

// STAR CLASS
const Star = class {
  // Private fields
  // Tweak these
  #velocityMultiplier = 1.01;
  #starSizeMax = 6;

  // Current pixel position
  #x;
  #y;

  // Max distance from center to screen edge
  #maxDistance;

  // Initial Distance from screen center
  #initDistance;

  // Velocity, derived from inital distance from screen center
  // initally btween 0 and 1
  #velocity;

  // Star Size
  #size;

  constructor(auto, x = 0, y = 0) {
    if (auto) {
      // place a random start
      this.#x = Math.random() * window.innerWidth;
      this.#y = Math.random() * window.innerHeight;
    } else {
      // Manual placing of star
      this.#x = x;
      this.#y = y;
    }

    this.#size = 1;

    this.#initDistance = Math.trunc(
      this.#distance(
        window.innerWidth / 2,
        window.innerHeight / 2,
        this.#x,
        this.#y
      )
    );

    this.#maxDistance = Math.trunc(
      this.#distance(
        window.innerWidth / 2,
        window.innerHeight / 2,
        window.innerWidth,
        window.innerHeight
      )
    );

    this.#starInitVelocity();

    // console.log(
    //   `X:${this.x} Y:${this.y}  initDistance:${this.initDistance} initVelocity:${this.velocity}`
    // );
  }

  // Private methods
  #distance = (x1, y1, x2, y2) => ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5;

  #starInitVelocity = function () {
    this.#initDistance > this.#maxDistance
      ? (this.#initDistance = this.#maxDistance)
      : (this.#initDistance = this.#initDistance);

    let speedRatio = this.#initDistance / this.#maxDistance;
    speedRatio = 1 - speedRatio;
    //console.log(`starInitVelocity ${speedRatio}`);
    this.#velocity = speedRatio;
  };

  // Public Methods
  starUpdate = function () {
    // Coords relative to screen center
    let xCenter = this.#x - width / 2;
    let yCenter = this.#y - height / 2;
    // console.log(star.initSpeed);

    // Update velocity, sise and position
    xCenter += (xCenter * this.#velocity) / 100;
    yCenter += (yCenter * this.#velocity) / 100;
    this.#velocity *= this.#velocityMultiplier;
    this.#size =
      this.#velocity * 2 > this.#starSizeMax
        ? this.#starSizeMax
        : this.#velocity * 2;
    //console.log(`vel:${this.velocity}`);

    // set back to screen pixel position
    this.#x = xCenter + width / 2;
    this.#y = yCenter + height / 2;
    //console.log(`starUpdate ${this.x}, ${this.y}`);
  };

  startOnScreen = function () {
    if (this.#y < 0) return false;
    if (this.#y > window.innerHeight) return false;
    if (this.#x < 0) return false;
    if (this.#x > window.innerWidth) return false;

    return true;
  };

  // getters
  get starPosition() {
    return [this.#x, this.#y];
  }
  get starSize() {
    return this.#size;
  }
};

// // Objects

// // (1) Empty object
// const obj1 = {};
// console.log(obj1);

// // Same as Above
// const obj1a = Object.create(Object.prototype);
// console.log(obj1a);

// // (2) object literial
// const obj2 = {
//   make: "sony",
//   model: "KD",
// };
// console.log(obj2);

// // (3) Using an existing object as the prototype of the newly created object
// const obj3 = Object.create(obj2);
// console.log(obj3);
// //obj3.make = "samsung";
// //obj3.model = "oo";
// //console.log(obj3);

// // (4) function Constructor
// const funcCons = function () {
//   this.make = "LG";
//   this.model = "XD";
// };

// const obj4 = new funcCons();
// console.log(obj4);

// // WHAT HAPPENS when new is used.
// // 1. An empty object {} is created.
// // 2. The function is called and the 'this' is set to the new object {}.
// // 3. This newly created object is linked to prototype.
// // 4. The object that was create is returned from the constructor function.

// // (5) ES6 Classes
// const CarCl = class {
//   constructor() {
//     this.make = "TOS";
//     this.model = "arst";
//   }
// };

// const obj5 = new CarCl();
// console.log(obj5);
