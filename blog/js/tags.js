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

function appendTags(tags){
  tagsContainer.innerHTML = '';
  tags.forEach(tag =>{
    tagsContainer.innerHTML += htmlTags(tag);
  })
}

function htmlTags(tag){
  return `
    <a href="/blog/tag?name=${tag}" class="post-tag">#${tag}</a>
  `
}
