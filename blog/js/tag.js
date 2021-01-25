let params = new URLSearchParams(document.location.search.substring(1)),
name = params.get("name");
document.getElementById('section-title').textContent = '#' + name
fetch(`https://ahmad-fathy-blog.herokuapp.com/api/posts/tags/${name}`)
.then(res => res.json())
.then(data => {
  if(data.posts && data.posts.length){
    appendPosts(data.posts);
  } else {
    appendError('no posts found with this tag')
  }
})
.catch(err=>{
  console.log(err);
});

let postsContainer = document.getElementById('posts-container');

function appendPosts(posts){
  postsContainer.innerHTML = '';
  posts.forEach(post =>{
    postsContainer.innerHTML += htmlPost(post);
  })
}


function htmlPost(post){
  return `
  <div class="post ${post.dir == 'rtl' ? 'rtl' : ''}" >
    <h3 class="post-title"><a href="/blog/post?title=${post.dashedTitle}">${post.title}</a></h3>
    <h5>${dateHelper(post.created_at)}</h5>
    <div class="post-tags">
      ${post.tags.map(tag => '<a href="/blog/tag?name=' + tag + '" class="post-tag">#' + tag + '</a>' ).join('')}
    </div>
  </div>
  `
}

function appendError(err){
  postsContainer.innerHTML = `<p class="err">${err}</p>`;
}

let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
function dateHelper(date){
  let dateArr = new Date(Number.parseInt(date)).toLocaleDateString().split('/');
  console.log(dateArr);
  return months[dateArr[0] - 1] + ' ' + dateArr[1] + ' ' + dateArr[2];
}
