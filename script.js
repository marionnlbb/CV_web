/* nav background on scroll */
const nav=document.getElementById('nav');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40),{passive:true});

/* hero waves (same spirit as the LinkedIn banner) */
(function(){
  const c=document.getElementById('waves'),x=c.getContext('2d');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w,h,dpr,t=0,dots=[];
  function size(){dpr=Math.min(devicePixelRatio||1,2);w=c.clientWidth;h=c.clientHeight;c.width=w*dpr;c.height=h*dpr;x.setTransform(dpr,0,0,dpr,0,0);
    dots=Array.from({length:70},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.6+.4,a:Math.random()*.6+.2}))}
  function ribbon(n,amp,freq,phase,y0,tilt,rgb,spread){
    for(let i=0;i<n;i++){
      const k=Math.sin(Math.PI*i/(n-1));
      x.strokeStyle=`rgba(${rgb},${.08+.42*k})`;x.lineWidth=1;x.beginPath();
      for(let px=-20;px<=w+20;px+=8){
        const y=y0+i*spread+amp*Math.sin(px*freq+phase+i*.045)+amp*.4*Math.sin(px*freq*2.3+i*.08+phase*.7)+tilt*px;
        px<0?x.moveTo(px,y):x.lineTo(px,y)}
      x.stroke()}
  }
  function frame(){
    x.clearRect(0,0,w,h);
    x.globalCompositeOperation='lighter';
    ribbon(44,h*.14,1/(w*.33),t*.6,h*.12,.10,'61,123,255',h*.008);
    ribbon(32,h*.11,1/(w*.27),2.1+t*.45,h*.55,-.05,'95,212,238',h*.009);
    x.globalCompositeOperation='source-over';
    dots.forEach(d=>{x.fillStyle=`rgba(190,215,255,${d.a})`;x.beginPath();x.arc(d.x,d.y,d.r,0,7);x.fill()});
    t+=.004;
    if(!reduce)requestAnimationFrame(frame);
  }
  size();frame();addEventListener('resize',()=>{size();if(reduce)frame()});
})();

/* skills mind map */
document.querySelectorAll('.node[data-panel]').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.node[data-panel]').forEach(n=>n.setAttribute('aria-expanded',String(n===b)));
  document.querySelectorAll('.skill-panel').forEach(p=>p.hidden=p.id!==b.dataset.panel);
  const p=document.getElementById(b.dataset.panel);
  if(p&&innerWidth<900)p.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
}));

/* hobbies carousel */
document.querySelectorAll('.carousel').forEach(c=>{
  const t=c.querySelector('.track');
  c.querySelectorAll('[data-dir]').forEach(b=>b.addEventListener('click',()=>
    t.scrollBy({left:t.clientWidth*0.8*Number(b.dataset.dir),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})));
});
