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
    document.getElementById('twitter-btn').href = `https://twitter.com/intent/tweet?text=${encodeURI(LINK)} `;

    //appending comments
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
    // appending ads
    let adContainers = document.querySelectorAll('.google-ad');
    adContainers.forEach(ad=>{
      ad.innerHTML = `
      <h4 style="padding:.5rem;background: #5d6aff; color: #f8f8f8;margin: .25rem">Google Ad</h4>
      <div style="padding:.5rem;border: 2px solid #5d6aff; margin: .25rem">
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-format="fluid"
             data-ad-layout-key="-gw-3+1f-3d+2z"
             data-ad-client="ca-pub-3134371406804208"
             data-ad-slot="1095724519"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      `;
    })
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
  return months[dateArr[0] - 1] + ' ' + dateArr[1] + ' ' + dateArr[2];
}
