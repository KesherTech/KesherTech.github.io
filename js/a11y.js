(function(){
  // Privacy notice
  var COOKIE_KEY='kt-privacy';
  var bar=document.getElementById('cookie-bar');
  if(bar&&!localStorage.getItem(COOKIE_KEY)) bar.removeAttribute('hidden');
  var okBtn=document.getElementById('cookie-ok');
  if(okBtn) okBtn.onclick=function(){ localStorage.setItem(COOKIE_KEY,'y'); bar.setAttribute('hidden',''); };

  // A11y widget
  var FS_KEY='kt-fs', HC_KEY='kt-hc';
  var root=document.documentElement;
  var fs=parseFloat(localStorage.getItem(FS_KEY))||100;
  var hc=localStorage.getItem(HC_KEY)==='1';
  root.style.fontSize=fs+'%';
  if(hc){ root.dataset.hc='1'; }

  var trigger=document.getElementById('a11y-trigger');
  var panel=document.getElementById('a11y-panel');
  var hcTog=document.getElementById('a11y-hc');
  if(!trigger) return;

  trigger.onclick=function(e){
    e.stopPropagation();
    var open=panel.classList.toggle('open');
    trigger.setAttribute('aria-expanded',open);
  };
  document.addEventListener('click',function(e){
    if(!trigger.closest('.a11y-widget').contains(e.target)){
      panel.classList.remove('open');
      trigger.setAttribute('aria-expanded','false');
    }
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){ panel.classList.remove('open'); trigger.setAttribute('aria-expanded','false'); trigger.focus(); }
  });

  function setFs(v){
    fs=Math.max(80,Math.min(130,v));
    root.style.fontSize=fs+'%';
    if(fs===100) localStorage.removeItem(FS_KEY); else localStorage.setItem(FS_KEY,fs);
  }
  document.getElementById('a11y-fs-up').onclick=function(){ setFs(fs+10); };
  document.getElementById('a11y-fs-down').onclick=function(){ setFs(fs-10); };
  document.getElementById('a11y-fs-reset').onclick=function(){ setFs(100); };

  if(hcTog){
    if(hc){ hcTog.classList.add('on'); hcTog.setAttribute('aria-pressed','true'); }
    hcTog.onclick=function(){
      hc=!hc;
      hcTog.classList.toggle('on',hc);
      hcTog.setAttribute('aria-pressed',hc);
      if(hc){ root.dataset.hc='1'; localStorage.setItem(HC_KEY,'1'); }
      else{ delete root.dataset.hc; localStorage.removeItem(HC_KEY); }
    };
  }
})();
