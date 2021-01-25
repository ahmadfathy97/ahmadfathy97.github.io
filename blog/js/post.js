let params = new URLSearchParams(document.location.search.substring(1)),
title = params.get("title");
const LINK = window.location.href;
fetch(`https://ahmad-fathy-blog.herokuapp.com/api/posts/${title}`)
.then(res => res.json())
.then(data => {
  console.log(data);
  if(data.success){
    appendPost(data.post);
    document.title = 'Ahmad Fathy - ' + data.post.title;
    document.getElementById('metaDesc').content = `
      <meta name="description" content="${data.post.title}"/>
    `
    document.getElementById('facebook-btn').href = `http://www.facebook.com/sharer.php?p[url]=${LINK}`;
    document.getElementById('twitter-btn').href = `https://twitter.com/intent/tweet?text=${LINK}`;
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
    <h5>${dateHelper(post.created_at)}</h5>
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

let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
function dateHelper(date){
  let dateArr = new Date(Number.parseInt(date)).toLocaleDateString().split('/');
  console.log(dateArr);
  return months[dateArr[0] - 1] + ' ' + dateArr[1] + ' ' + dateArr[2];
}
