let shapes = [];
let e = new p5.Ease();
let ox, oy;
let img = [];

function preload() {
  img[0] = loadImage("./img/flowerimg/1.png");
  img[1] = loadImage("./img/flowerimg/2.png");
  img[2] = loadImage("./img/flowerimg/3.png");
  img[3] = loadImage("./img/flowerimg/4.png");
  img[4] = loadImage("./img/flowerimg/5.png");
  img[5] = loadImage("./img/flowerimg/6.png");
  img[6] = loadImage("./img/flowerimg/7.png");
  img[7] = loadImage("./img/flowerimg/8.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  back = loadImage("./img/flowerimg/selectPage_bg.jpg");
  // imageMode(CENTER);

  ox = width / 2;
  oy = height / 2;

  angleMode(DEGREES);
  
  
}

function draw() {
  background(back);

  shapes.push(new Shape(ox, oy));
  if (mouseIsPressed) {
    shapes.push(new Shape(mouseX + random(-30, 30), mouseY + random(-30, 30)));
  }

  for (let i = 0; i < shapes.length; i++) {
    shapes[i].display();
  }

  ox += random(-45, 45);
  oy += random(-45, 45);

  if (ox > width) {
    ox = width;
  }
  if (ox < 0) {
    ox = 0;
  }
  if (oy > height) {
    oy = height;
  }
  if (oy < 0) {
    oy = 0;
  }

  for (let j = 0; j < shapes.length; j++) {
    if (shapes[j].isFinished) {
      shapes.splice(j, 1);
    }
  }
}

function Shape(tmpX, tmpY) {
  this.pos = createVector(tmpX, tmpY);
  this.rMax = random(0.1, 1.0);
  this.theta = random(360);
  this.r = 0;
  this.delta = 0;
  this.speed = 1 / 100;
  this.isDeg = false;
  this.isFinished = false;
  this.imgIndex = floor(random(img.length));

  this.display = function () {
    if (!this.isDeg) {
      this.r = this.rMax * e.quarticOut(this.delta);

      this.delta += this.speed;
      if (this.delta > 1.0) {
        this.delta = 1.0;
        this.isDeg = true;
      }
    } else {
      this.r = this.rMax * e.quarticOut(this.delta);

      this.delta -= this.speed * 0.75;
      if (this.delta < 0.0) {
        this.delta = 0.0;
        this.isFinished = true;
      }
    }

    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.theta);
    scale(this.r);

    image(img[this.imgIndex], 0, 0);

    pop();
  }
}
