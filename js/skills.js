function appendingSkills(elem, key, c) {
  key.forEach(lang =>{
    elem.innerHTML += `<span class="lang ${c} ${lang}" >${lang}</span>`;
  })
}
function fetchAllSkills() {
  fetch('../data/skills.json')
  .then(res=>res.json())
  .then(data =>{
    for(key in data){
      appendingSkills(selectElem(`.${key}-langs`), data[key], key);
    }
  })
}

fetchAllSkills();
