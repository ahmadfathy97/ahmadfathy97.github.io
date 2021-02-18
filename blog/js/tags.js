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
// let colors = ['#5B2C6F', '#2E4053', '#21618C', '#D35400', '#241780', '#1B4F72'];
function appendTags(tags){
  tagsContainer.innerHTML = '';
  tags.forEach(tag =>{
    tagsContainer.innerHTML += htmlTags(tag /*, colors[Math.floor(Math.random() * colors.length)]*/);
  })
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
}

function htmlTags(tag/*, color*/){
  /*style="background:${color}"*/
  return `
    <a href="/blog/tag?name=${tag}" class="post-tag">#${tag}</a>
  `
}
