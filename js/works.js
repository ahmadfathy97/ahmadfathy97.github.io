let showBtns = selectAll('.show-btn');
// disactive all show buttons
function disAciveAllBtns() {
  showBtns.forEach(btn=>{
    btn.classList.remove('btn-colorful');
  })
}
// show a group of projects depending on specific button
function showWorks(id) {
  allWorks.forEach(work=>{
    if(id !== "all"){
      if(work.dataset.group == id){
        work.classList.remove('disable');
      } else {
        work.classList.add('disable');
      }
    } else{
      work.classList.remove('disable');
    }
  })
}
// the function that fire when any show button clicked
function handleShowBtnClick(e){
  disAciveAllBtns();
  e.target.classList.add('btn-colorful');
  showWorks(e.target.id)
}
// fire a handleShowBtnClick function when any show button clicked
showBtns.forEach(btn=>{
  btn.addEventListener('click', handleShowBtnClick)
})

// appending all works to the page
let myWorks = selectElem('.my-works');
function appendAllWorks(works) {
  works.forEach(work =>{
    myWorks.innerHTML += `
    <div class="work" data-group="${work.group}">
      <div class="img-container">
        <img class="cover" src="images/projects/${work.image}" loading="lazy" alt="${work.name}">
      </div>
      <h3><span>${work.name}</span></h3>
      ${work.description}
      <div class="languages">
        ${work.languages.map(lang=>{
          return `
          <div class="used-lang" title="${lang.name}">
            <img src="images/langs/${lang.icon}" alt="${lang.name}" title="${lang.name}" />
          </div>`;
        }).join(',')}
      </div>
      <a href="${work.preview}" class="btn btn-colorful" target="_blank" rel="noopener">Preview</a>
      ${work.code ? '<a href="' + work.code + '" class="btn btn-colorful" target="_blank" rel="noopener">Code</a>': ''}
    </div>
    `;
    allWorks = selectAll('.work');
    let allWorksImg = selectAll('.work .img-container img');
    allWorksImg.forEach(img=>{
      img.addEventListener('click', openImg)
    })
  })
}

// fetching my works from json file
function fetchMyWorks(){
  fetch('../data/my-works.json')
  .then(res=> res.json())
  .then(data =>{
    appendAllWorks(data.All);
  })
}



fetchMyWorks();
