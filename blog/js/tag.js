let params = new URLSearchParams(document.location.search.substring(1)),
tagName = params.get("name"),
page = Number.parseInt(params.get("page")) || 1;
document.getElementById('section-title').textContent = '#' + tagName;
let naviBtns = document.querySelector('.navigation-btns');
fetch(`https://ahmad-fathy-blog.herokuapp.com/api/posts/tags/${tagName}?page=${page}`)
.then(res => res.json())
.then(data => {
  if(data.posts && data.posts.length){
    appendPosts(data.posts);
    if(data.prev){
      console.log(555);
      naviBtns.innerHTML += `
        <a aria-label="previous page" class="post-tag" href="/blog/tag/?name=${tagName}&page=${page - 1}">&lt; prev</a>
      `
    }
    if(data.next){
      naviBtns.innerHTML += `
        <a aria-label="next page" class="post-tag" href="/blog/tag/?name=${tagName}&page=${page + 1}">next &gt;</a>
      `
    }
  } else {
    appendError('no posts found')
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
  // let dateArr = new Date(Number.parseInt(date)).toLocaleDateString().split('/');
  // return months[dateArr[0] - 1] + ' ' + dateArr[1] + ' ' + dateArr[2];
  return new Date(Number.parseInt(date)).toDateString();
}
