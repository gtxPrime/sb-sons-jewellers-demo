(function(){
const S=window.SB,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const waBase='https://wa.me/'+S.whatsapp;
const wa=t=>waBase+'?text='+encodeURIComponent(t);
$('#fab').href=wa('Hello S B & Sons Jewellers, I would like to know more.');
$('#waVisit').href=wa('Hello S B & Sons Jewellers, I would like to visit the showroom.');
$('#offerCta').href=wa('Hello, please share the current Diwali offers.');
$('#offerBox').textContent=S.offerText;
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),1800)}
$('#navWA').href=wa('Hello S B & Sons Jewellers, I would like to enquire about your jewellery.');
/* shop */
function renderGrid(f){
 const list=S.products.filter(p=>f==='All'||p.cat===f);
 $('#grid').innerHTML=list.map(p=>`<article class="card"><div class="ph"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>${p.tag?`<span class="tag">${p.tag}</span>`:''}<div class="info"><h3>${p.name}</h3><p class="meta">${p.meta}</p><div class="row"><a class="add" target="_blank" rel="noopener" href="${wa('Hello S B & Sons Jewellers, I would like to enquire about: '+p.name)}">Enquire on WhatsApp</a></div></div></article>`).join('');
 if(window.gsap&&!reduce)gsap.from('#grid .card',{y:40,opacity:0,duration:.7,stagger:.07,ease:'power3.out'});
 if(window.ScrollTrigger)ScrollTrigger.refresh();
}
renderGrid('All');
/* misc */
$('#copyNum').onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText('+91 81265 60338');toast('Number copied')};
$('#burger').onclick=()=>{const m=$('#menu');m.classList.toggle('open');document.body.classList.toggle('lock',m.classList.contains('open'))};
$$('#menu a').forEach(a=>a.onclick=()=>{$('#menu').classList.remove('open');document.body.classList.remove('lock')});
/* countdown */
const end=new Date(S.diwali).getTime();
function tick(){let d=Math.max(0,end-Date.now())/1000;const p=n=>String(Math.floor(n)).padStart(2,'0');
 $('#cd').textContent=p(d/86400);$('#ch').textContent=p(d%86400/3600);$('#cm').textContent=p(d%3600/60);$('#cs').textContent=p(d%60)}
tick();setInterval(tick,1000);
/* lamps */
const L=$('#lamps');for(let i=0;i<26;i++){const e=document.createElement('i');e.style.left=Math.random()*100+'%';e.style.top=Math.random()*100+'%';e.style.animationDelay=Math.random()*3+'s';L.appendChild(e)}
/* sparkle canvas */
const cv=$('#sparkle'),cx=cv.getContext('2d');let W,H,pts=[];
function rs(){W=cv.width=cv.offsetWidth*devicePixelRatio;H=cv.height=cv.offsetHeight*devicePixelRatio;pts=Array.from({length:Math.round(innerWidth/14)},()=>({x:Math.random()*W,y:Math.random()*H,r:(Math.random()*1.6+.4)*devicePixelRatio,s:Math.random()*.4+.1,p:Math.random()*6}))}
rs();addEventListener('resize',rs);
(function draw(t){cx.clearRect(0,0,W,H);for(const q of pts){q.y-=q.s*devicePixelRatio*.3;if(q.y<0)q.y=H;const a=.35+.65*Math.abs(Math.sin(t/900+q.p));cx.fillStyle=`rgba(242,216,150,${a})`;cx.beginPath();cx.arc(q.x,q.y,q.r,0,7);cx.fill()}if(!reduce)requestAnimationFrame(draw)})(0);
/* quick view */
let quick=false;
$('#quick').onclick=()=>{quick=!quick;document.documentElement.classList.toggle('noanim',quick);$('#quick').textContent=quick?'Back to the story':'Quick view: all designs';
 if(quick){ScrollTrigger.getAll().forEach(t=>t.disable());gsap.set('.reveal,.story-line',{clearProps:'all'});gsap.set('#track',{clearProps:'all'});window.scrollTo(0,$('#gallery').offsetTop-60);}
 else{location.reload()}};
/* animation */
function intro(){
 document.body.classList.remove('lock');
 const tl=gsap.timeline();
 tl.from('.hero-mono',{scale:.6,opacity:0,duration:1.2,ease:'power3.out'})
   .from('#hero h1 i,#hero h1 em',{yPercent:110,duration:1.1,stagger:.15,ease:'power4.out'},'-=.7')
   .from('#hero .sub,.hero-cta,.ticker',{y:24,opacity:0,duration:.9,stagger:.12},'-=.6');
}
function boot(){
 const bar=$('#loader .bar i');
 if(!window.gsap){$('#loader').remove();document.body.classList.remove('lock');return}
 gsap.registerPlugin(ScrollTrigger);
 let lenis;
 if(window.Lenis&&!reduce&&!matchMedia('(pointer:coarse)').matches){lenis=new Lenis({lerp:.09});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);
  $$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const h=a.getAttribute('href');if(h.length>1&&$(h)){e.preventDefault();lenis.scrollTo(h,{offset:-40})}}))}
 ScrollTrigger.create({start:60,onUpdate:s=>$('#nav').classList.toggle('solid',s.scroll()>60)});
 if(reduce){$('#loader').remove();document.body.classList.remove('lock');document.documentElement.classList.add('noanim');return}
 gsap.to(bar,{width:'100%',duration:1,ease:'power1.inOut',onComplete:()=>gsap.to('#loader',{yPercent:-100,duration:.9,ease:'power4.inOut',onComplete:()=>{$('#loader').remove();intro()}})});
 /* hero parallax out */
 gsap.to('.hero-in',{yPercent:-18,opacity:.2,scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});
 /* story */
 const lines=$$('.story-line'),st=gsap.timeline({scrollTrigger:{trigger:'#story',start:'top top',end:'+=320%',pin:true,scrub:.6}});
 st.fromTo('.story-ring',{scale:.3,opacity:0},{scale:1,opacity:1,duration:lines.length*1.2,ease:'none',stagger:.2},0);
 st.to('.story-ring.r2',{rotate:180,duration:lines.length*1.2,ease:'none'},0);
 lines.forEach((l,i)=>{st.fromTo(l,{opacity:0,y:50,filter:'blur(8px)'},{opacity:1,y:0,filter:'blur(0px)',duration:.4},i*1.1).to(l,{opacity:i===lines.length-1?1:0,y:-40,duration:.35},i*1.1+.85)});
 /* reveals */
 $$('.reveal').forEach(el=>gsap.to(el,{opacity:1,y:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%'}}));
 /* collections */
 const mm=gsap.matchMedia();
 mm.add('(min-width:1px)',()=>{
  const track=$('#track'),dist=()=>track.scrollWidth-innerWidth+40;
  const rp=$('#rp'),rt=$('#route');
  function path(){const w=track.scrollWidth,h=rw.offsetHeight;rt.setAttribute('viewBox',`0 0 ${w} ${h}`);rt.style.width=w+'px';rt.style.height=h+'px';
   let d=`M0 ${h/2}`;for(let x=0;x<w;x+=400){d+=` Q${x+100} ${h*.25} ${x+200} ${h/2} T${x+400} ${h/2}`}rp.setAttribute('d',d)}
  const rw=$('#rw');path();
  const tw=gsap.to(track,{x:()=>-dist(),ease:'none',scrollTrigger:{trigger:'#coll',start:'top top',end:()=>'+='+(dist()+innerHeight*.4),pin:true,scrub:.6,invalidateOnRefresh:true,onRefresh:path}});
  gsap.to('#rider',{x:()=>innerWidth-30,rotate:360,ease:'none',scrollTrigger:{trigger:'#coll',start:'top top',end:()=>'+='+(dist()+innerHeight*.4),scrub:.6}});
  gsap.to('#route',{x:()=>-dist(),ease:'none',scrollTrigger:{trigger:'#coll',start:'top top',end:()=>'+='+(dist()+innerHeight*.4),scrub:.6}});
 });
 $$('.card').forEach(()=>{});
 addEventListener('load',()=>ScrollTrigger.refresh());
}
if(document.readyState==='complete')boot();else addEventListener('load',boot);
setTimeout(()=>{const l=document.querySelector('#loader');if(l){l.remove();document.body.classList.remove('lock')}},5000);
})();
