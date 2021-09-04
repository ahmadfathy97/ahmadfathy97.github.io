fetch('http://127.0.0.1:4000/api/posts/tags')
.then(res => res.json())
.then(data => {
  if(data.success){
    appendTags(data.tags);
  }
})
.catch(err=>{
  console.log(err);
});
let tagsContainer = document.getElementById('tags-container');
// let colors = ['#5B2C6F', '#2E4053', '#21618C', '#D35400', '#241780', '#1B4F72'];
function appendTags(tags){
  tagsContainer.innerHTML = '';
  for (const [key, value] of Object.entries(tags)) {
    tagsContainer.innerHTML += htmlTags(key, value /*, colors[Math.floor(Math.random() * colors.length)]*/);
  }
  // tags.forEach(tag =>{
  //   tagsContainer.innerHTML += htmlTags(tag /*, colors[Math.floor(Math.random() * colors.length)]*/);
  // })
}

function htmlTags(key, value/*, color*/){
  /*style="background:${color}"*/
  return `
    <a href="/blog/tag?name=${key}" class="post-tag">#${key} (${value})</a>
  `
}
