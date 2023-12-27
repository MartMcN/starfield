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
    this.#velocity = speedRatio;
  };

  // Public Methods
  starUpdate = function () {
    // Coords relative to screen center
    let xCenter = this.#x - window.innerWidth / 2;
    let yCenter = this.#y - window.innerHeight / 2;

    // Update velocity, sise and position
    xCenter += (xCenter * this.#velocity) / 100;
    yCenter += (yCenter * this.#velocity) / 100;
    this.#velocity *= this.#velocityMultiplier;
    this.#size =
      this.#velocity * 2 > this.#starSizeMax
        ? this.#starSizeMax
        : this.#velocity * 2;

    // Set coords back to screen pixel position
    this.#x = xCenter + window.innerWidth / 2;
    this.#y = yCenter + window.innerHeight / 2;
    //console.log(`starUpdate ${this.x}, ${this.y} vel:${this.velocity}`);
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

export { Star };
