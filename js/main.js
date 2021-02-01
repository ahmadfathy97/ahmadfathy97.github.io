let selectElem = (selector)=> document.querySelector(selector);
let selectAll = (selector)=> document.querySelectorAll(selector);
let loader = selectElem('.loading');
let allWorks;

window.onload = function(){
    loader.style.display = 'none';
    document.body.style.overflow = 'auto';
    let canvas = selectElem('#defaultCanvas0');
    canvas.setAttribute('aria-lable', 'click to celebrate')
    canvas.setAttribute('alt', 'click to celebrate')
    canvas.textContent = 'Your browser does not support the canvas element.';
    selectElem('header').append(canvas)
}
window.addEventListener('keyup', closeOverlay)
function closeOverlay(e){
  if(e.keyCode && e.keyCode == 27){
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// overlay for my picture
let overlay = selectElem('#overlay');
let overlayImg = selectElem('#overlay-background');
let overlayClose = selectElem('#overlay-close');
let me = selectElem('#me');
me.addEventListener('click', openImg)
me.addEventListener('keyup', openImgByKeyboard)

function openImg(e){
    overlay.style.display = 'flex';
    overlayImg.src = e.target.src;
    overlayImg.setAttribute('aria-label', e.target.alt)
    console.log(overlayImg);
    document.body.style.overflow = 'hidden';
}
function openImgByKeyboard(e) {
  if(e.keyCode && e.keyCode == 13){
    overlay.style.display = 'flex';
    overlayImg.src = e.target.src;
    document.body.style.overflow = 'hidden';
  }
}
overlayClose.onclick = function(){
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}


// handle resizing the window
window.onresize = function () {
  let canvas = selectElem('#defaultCanvas0');
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  selectElem('header').append(canvas)
}
