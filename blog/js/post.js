let params = new URLSearchParams(document.location.search.substring(1)),
title = params.get("title");
fetch(`https://ahmad-fathy-blog.herokuapp.com/api/posts/${title}`)
.then(res => res.json())
.then(data => {
  console.log(data);
  if(data.success){
    appendPost(data.post);
    document.title = 'Ahmad Fathy - ' + post.title;
    document.head.innerHTML += `
      <meta name="description" content="${post.title}"/>
    `
  } else {
    appendError(data.msg)
  }
})
.catch(err=>{
  console.log(err);
});

let postContainer = document.getElementById('post');

function appendPost(post){
  postContainer.innerHTML = htmlPost(post);
}


function htmlPost(post){
  return `
  <div class="post ${post.dir == 'rtl' ? 'rtl' : ''}" >
    <h3 class="post-title"><a href="/blog/post/?title=${post.dashedTitle}">${post.title}</a></h3>
    <h5>${post.created_at}</h5>
    <div>${post.sanitizedHtml}</div>
    <div class="post-tags">
      ${post.tags.map(tag => '<a href="/blog/tag?name=' + tag + '" class="post-tag">#' + tag + '</a>' ).join('')}
    </div>
  </div>
  `
}


function appendError(err){
  postContainer.innerHTML = `<p class="err">${err}</p>`;
}
