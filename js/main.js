let selectElem = (selector)=> document.querySelector(selector);
let selectAll = (selector)=> document.querySelectorAll(selector);
let loader = selectElem('.loading');
let allWorks;

window.onload = function(){
    loader.style.display = 'none';
    document.body.style.overflow = 'auto';
    let canvas = selectElem('#defaultCanvas0');
    selectElem('header').append(canvas)
}

// overlay for my picture
let overlay = selectElem('#overlay');
let overlayImg = selectElem('#overlay-background');
let overlayClose = selectElem('#overlay-close');
let me = selectElem('#me');
me.addEventListener('click', openImg)
function openImg(e){
    overlay.style.display = 'flex';
    overlayImg.src = e.target.src;
    document.body.style.overflow = 'hidden';
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
