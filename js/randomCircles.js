let w,h;
class randomCircles{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  show(){
    noStroke();
    circle(this.x, this.y, 10, 10);
    let colors = ['#ff0', '#e8e8e8', '#3282b8'];
    let clr = colors[Math.floor(Math.random() * colors.length)];
    fill(clr);
  }
  update(){
    this.x += random(-10,10);
    this.y +=random(-10,10);
  }
}

let allCircles = [], clicked= false;
function setup(){
  w = document.querySelector('header').getClientRects()[0].width;
  h = document.querySelector('header').getClientRects()[0].height;
  createCanvas(w, h);
  fill(255);
}
function mousePressed() {
  if(mouseY < height && mouseX < width){
    clicked = true;
    let circle = new randomCircles(mouseX, mouseY);
    allCircles.push(circle);
    if(allCircles.length > 150){
      allCircles.splice(0, 20);
    }
  }
}

function draw(){
  background(20,20,20);
  if(!clicked){
    text('click to celebrate :)', 10, 10, 200);
  }
  if(allCircles && allCircles.length){
    allCircles.forEach(circle=>{
      circle.show();
      circle.update();
    })
  }
}
