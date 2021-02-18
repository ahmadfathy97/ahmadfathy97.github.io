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
  // appending ads
  let adContainers = document.querySelectorAll('.google-ad');
  adContainers.forEach(ad=>{
    ad.innerHTML = `
      <h4 style="padding:.5rem;background: #5d6aff; color: #f8f8f8;margin: .25rem">Google Ad</h4>
      <div style="padding:.5rem;border: 2px solid #5d6aff; margin: .25rem">
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      <!-- ad -->
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-3134371406804208"
           data-ad-slot="5581764436"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      <script>
           (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    `;
  })
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
    <h3 class="post-title"><a href="/blog/post?title=${post.dashedTitle}">${post.title}</a></h3>
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
