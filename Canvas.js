'use strict';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const heartColors = ['#FF0000','#FF4C4C','#FF6666','#CC0000','#990000'];
let floatingHearts = [];
let particles = [];
const gravity = 0.01;
const friction = 0.99;

// Resize canvas
addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

// Particle class (fireworks)
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x; this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }
  draw() {
    c.save();
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore();
  }
  update() {
    this.draw();
    this.velocity.y *= friction;
    this.velocity.x *= friction;
    this.velocity.y += gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.005;
  }
}

// HeartParticle class
class HeartParticle {
  constructor(x, y, size, color, velocity) {
    this.x = x; this.y = y; this.size = size; this.color = color;
    this.velocity = velocity;
    this.alpha = Math.random() * 0.5 + 0.5;
  }
  draw() {
    c.save();
    c.globalAlpha = this.alpha;
    c.fillStyle = this.color;
    c.beginPath();
    const topCurveHeight = this.size * 0.3;
    c.moveTo(this.x, this.y);
    c.bezierCurveTo(
      this.x, this.y - topCurveHeight,
      this.x - this.size/2, this.y - topCurveHeight,
      this.x - this.size/2, this.y
    );
    c.bezierCurveTo(
      this.x - this.size/2, this.y + this.size/2,
      this.x, this.y + this.size/1.5,
      this.x, this.y + this.size
    );
    c.bezierCurveTo(
      this.x, this.y + this.size/1.5,
      this.x + this.size/2, this.y + this.size/2,
      this.x + this.size/2, this.y
    );
    c.bezierCurveTo(
      this.x + this.size/2, this.y - topCurveHeight,
      this.x, this.y - topCurveHeight,
      this.x, this.y
    );
    c.fill();
    c.closePath();
    c.restore();
  }
  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.002;
  }
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = `rgba(0,0,0,0.05)`;
  c.fillRect(0,0,canvas.width,canvas.height);

  // Update hearts
  floatingHearts.forEach((heart,i)=>{
    if(heart.alpha>0) heart.update();
    else floatingHearts.splice(i,1);
  });

  // Update fireworks if birthday passed
  particles.forEach((p,i)=>{
    if(p.alpha>0) p.update();
    else particles.splice(i,1);
  });
}

// Create a floating heart
function createFloatingHeart() {
  const size = Math.random() * 20 + 10;
  const x = Math.random() * canvas.width;
  const y = canvas.height + size;
  const color = heartColors[Math.floor(Math.random() * heartColors.length)];
  const velocity = {x:(Math.random()-0.5)*0.5, y:-(Math.random()*1+0.5)};
  floatingHearts.push(new HeartParticle(x,y,size,color,velocity));
}

// Fireworks explosion at random position
function createFireworks() {
  if(window.distanceOfTime < 0){
    const x = Math.random() * (innerWidth-200) + 100;
    const y = Math.random() * (innerHeight-100) + 50;
    const particleCount = 100;
    const angleIncrement = (Math.PI*2)/particleCount;
    const power = 7;

    for(let i=0;i<particleCount;i++){
      particles.push(new Particle(x,y,5,`hsl(${Math.random()*360},50%,50%)`,{
        x:Math.cos(angleIncrement*i)*Math.random()*power,
        y:Math.sin(angleIncrement*i)*Math.random()*power
      }));
    }
  }
}

// Start loops
animate();
setInterval(createFloatingHeart, 200);
setInterval(createFireworks, 2000);
setInterval(createFireworks, 5000);
setInterval(createFireworks, 10000);
setInterval(createFireworks, 15000);