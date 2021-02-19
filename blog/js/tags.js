fetch('https://ahmad-fathy-blog.herokuapp.com/api/posts/tags')
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
  tags.forEach(tag =>{
    tagsContainer.innerHTML += htmlTags(tag /*, colors[Math.floor(Math.random() * colors.length)]*/);
  })
}

function htmlTags(tag/*, color*/){
  /*style="background:${color}"*/
  return `
    <a href="/blog/tag?name=${tag}" class="post-tag">#${tag}</a>
  `
}
