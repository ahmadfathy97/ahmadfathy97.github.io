Promise.all([
  fetch('https://ahmad-fathy-blog.herokuapp.com/api/posts/recent-posts').then(res => res.json()),
  fetch('https://ahmad-fathy-blog.herokuapp.com/api/posts/popular-posts').then(res => res.json())
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
  <div class="post " >
    <h3 class="post-title" dir="auto"><a href="/blog/post?title=${post.dashedTitle}">${post.title}</a></h3>
    <h5>${dateHelper(post.created_at)}</h5>
    <div class="post-tags">
      ${post.tags.map(tag => '<a href="/blog/tag?name=' + tag + '" class="post-tag">#' + tag + '</a>' ).join('')}
    </div>
  </div>
  `
}
let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
function dateHelper(date){
  let dateArr = new Date(Number.parseInt(date)).toLocaleDateString().split('/');
  return months[dateArr[0] - 1] + ' ' + dateArr[1] + ' ' + dateArr[2];
}
