let params = new URLSearchParams(document.location.search.substring(1)),
title = params.get("title");
const LINK = window.location.href.toString();
fetch(`https://ahmad-fathy-blog.herokuapp.com/api/posts/${title}`)
.then(res => res.json())
.then(data => {
  if(data.success){
    appendPost(data.post);
    document.title = 'Ahmad Fathy - ' + data.post.title;
    document.getElementById('metaDesc').content = `${data.post.title}`;
    document.getElementById('twitterDesc').content = `${data.post.title}`;
    document.getElementById('facebook-btn').href = `http://www.facebook.com/sharer.php?p[url]=${LINK}`;
    document.getElementById('twitter-btn').href = `https://twitter.com/intent/tweet?text=${data.post.title} ${data.post.tags.map(tag => '%23'+tag).join(' ')} ${encodeURI(LINK)}`;
    var disqus_config = function () {
    this.page.url = LINK;
    this.page.identifier = data.post._id;
    };
    (function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://ahmadfathy.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    })();
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
  document.querySelectorAll('code').forEach(block => {
    // then highlight each
    hljs.highlightBlock(block);
  });
}


function htmlPost(post){
  return `
  <div class="post ${post.dir == 'rtl' ? 'rtl' : ''}" >
    <h1 class="post-title"><a href="/blog/post/?title=${post.dashedTitle}">${post.title}</a></h1>
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
  return months[dateArr[0] - 1] + ' ' + dateArr[1] + ' ' + dateArr[2];
}
