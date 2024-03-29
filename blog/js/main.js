Promise.all([
  fetch('https://ahmadfathy.onrender.com/api/posts/recent-posts').then(res => res.json()),
  fetch('https://ahmadfathy.onrender.com/api/posts/popular-posts').then(res => res.json())
])
.then(data => {
  if(data[0].success){
    appendPosts("recent", data[0].posts)
  }
  if(data[1].success){
    appendPosts("popular", data[1].posts)
  }
})
.catch(err=>{
  console.log(err);
});
let recentPostsContainer = document.getElementById('recent-posts'),
    popularPostsContainer = document.getElementById('popular-posts');

function appendPosts(type, posts){
  if(type === "recent"){
    recentPostsContainer.innerHTML = '';
    posts.forEach(post=>{
      recentPostsContainer.innerHTML += htmlPost(post);
    })
  } else if(type === "popular"){
    popularPostsContainer.innerHTML = '';
    posts.forEach(post=>{
      popularPostsContainer.innerHTML += htmlPost(post)
    })

  }
}

function htmlPost(post){
  return `
  <div class="post ${post.dir == 'rtl' ? 'rtl' : ''}" >
    <h3 class="post-title" dir="auto"><a href="/blog/post?title=${post.dashedTitle}">${post.title}</a></h3>
    <h5>${dateHelper(post.created_at)}</h5>
    <div class="post-tags">
      ${post.tags.map(tag => '<a href="/blog/tag?name=' + tag + '" class="post-tag">#' + tag + '</a>' ).join('')}
    </div>
  </div>
  `
}
function dateHelper(date){
  let options = {year: 'numeric', month: 'long', day: 'numeric' };
  // let dateArr = new Date(Number.parseInt(date)).toLocaleDateString().split('/');
  // return months[dateArr[0] - 1] + ' ' + dateArr[1] + ' ' + dateArr[2];
  return new Date(Number.parseInt(date)).toLocaleDateString('en-US', options);
}
