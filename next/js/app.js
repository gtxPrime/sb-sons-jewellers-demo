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
/* data-wa links */
$$('[data-wa]').forEach(e=>e.href=wa(e.dataset.wa));
/* slider */
(function(){
 let f='All',idx=0,list=[],drag=null;
 const st=$('#slStage'),pr=$('#slPrev'),nx=$('#slNext'),sl=$('#sl');
 function build(){list=S.products.filter(p=>f==='All'||p.cat===f);idx=Math.min(idx,list.length-1);
  st.innerHTML=list.map((p,i)=>`<figure class="ed" data-i="${i}"><img src="${p.img}" alt="${p.name} (AI-generated demo image)" loading="lazy" draggable="false"><figcaption><small>${p.cat}</small><b>${p.name}</b><span>${p.meta}</span><a class="edq" target="_blank" rel="noopener" href="${wa('Hello S B & Sons Jewellers, I would like to enquire about: '+p.name)}">Enquire on WhatsApp</a></figcaption></figure>`).join('');if(window.gsap&&window.ScrollTrigger){ScrollTrigger.batch('#slStage .ed',{start:'top 92%',once:true,onEnter:b=>gsap.fromTo(b,{y:70,opacity:0,scale:.96},{y:0,opacity:1,scale:1,duration:.9,stagger:.1,ease:'power3.out',overwrite:true})});ScrollTrigger.refresh()}
  $('#slDots').innerHTML=list.map((p,i)=>`<i data-i="${i}"></i>`).join('');render()}
 function render(){if(!list[idx])return;[...st.children].forEach((c,i)=>{const o=i-idx,a=Math.abs(o);c.style.setProperty('--o',o);c.style.setProperty('--a',Math.min(a,3));c.classList.toggle('act',o===0);c.classList.toggle('hid',a>3)});
  [...$('#slDots').children].forEach((d,i)=>d.classList.toggle('on',i===idx));
  const p=list[idx];if(!p)return;$('#slName').textContent=p.name;$('#slMeta').textContent=p.meta+' ('+p.cat+')';$('#slCount').textContent=String(idx+1).padStart(2,'0')+' / '+String(list.length).padStart(2,'0');
  $('#slEnq').href=wa('Hello S B & Sons Jewellers, I would like to enquire about: '+p.name)}
 const go=n=>{idx=(n+list.length)%list.length;render()};
 pr.onclick=()=>go(idx-1);nx.onclick=()=>go(idx+1);
 st.onclick=e=>{if(drag&&drag.moved)return;const c=e.target.closest('.sl-card');if(c)go(+c.dataset.i)};
 $('#slDots').onclick=e=>{const d=e.target.closest('i');if(d)go(+d.dataset.i)};
 sl.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')go(idx-1);if(e.key==='ArrowRight')go(idx+1)});
 sl.addEventListener('pointerdown',e=>{if(e.target.closest('.sl-a'))return;drag={x:e.clientX,moved:false}});
 addEventListener('pointermove',e=>{if(drag&&Math.abs(e.clientX-drag.x)>8)drag.moved=true});
 addEventListener('pointerup',e=>{if(!drag)return;const dx=e.clientX-drag.x;if(Math.abs(dx)>50)go(idx+(dx<0?1:-1));setTimeout(()=>drag=null,30)});
 function setF(v){f=v;idx=0;$$('.sl-tabs button').forEach(b=>b.classList.toggle('on',b.dataset.f===v));build()}
 $$('.sl-tabs button').forEach(b=>b.onclick=()=>setF(b.dataset.f));
 $$('.cpanel[data-f]').forEach(c=>c.addEventListener('click',()=>setF(c.dataset.f)));
 build();
})();
/* misc */
$$('[data-copy]').forEach(b=>b.onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(b.dataset.copy);toast('Copied')});
$('#copyNum').onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText('+91 81265 60338');toast('Number copied')};
$('#burger').onclick=()=>{const m=$('#menu');m.classList.toggle('open');document.body.classList.toggle('lock',m.classList.contains('open'))};
$$('#menu a').forEach(a=>a.onclick=()=>{$('#menu').classList.remove('open');document.body.classList.remove('lock')});
/* open now (IST) */
(function(){const p=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Kolkata',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());
 const g=t=>p.find(x=>x.type===t).value,days={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6},d=days[g('weekday')],m=(+g('hour')%24)*60+ +g('minute');
 const open=d!==1&&m>=660&&m<1200;$('#openNow').textContent=open?'Open now':'Closed now';$('#openNow').className=open?'on':'';
 const r=document.querySelector('#hrs tr[data-d="'+d+'"]');r&&r.classList.add('today')})();
/* countdown */
const end=new Date(S.diwali).getTime();
function tick(){let d=Math.max(0,end-Date.now())/1000;const p=n=>String(Math.floor(n)).padStart(2,'0');
 $('#cd').textContent=p(d/86400);$('#ch').textContent=p(d%86400/3600);$('#cm').textContent=p(d%3600/60);$('#cs').textContent=p(d%60)}
tick();setInterval(tick,1000);
/* lamps */
const L=$('#lamps');for(let i=0;i<26;i++){const e=document.createElement('i');e.style.left=Math.random()*100+'%';e.style.top=Math.random()*100+'%';e.style.animationDelay=Math.random()*3+'s';L.appendChild(e)}
/* sparkle canvas */
const cv=$('#sparkle'),cx=cv.getContext('2d');let W,H,pts=[];
function rs(){const D=Math.min(devicePixelRatio,1.5);W=cv.width=cv.offsetWidth*D;H=cv.height=cv.offsetHeight*D;pts=Array.from({length:Math.round(innerWidth/(window.LOWFX?40:18))},()=>({x:Math.random()*W,y:Math.random()*H,r:(Math.random()*1.6+.4)*devicePixelRatio,s:Math.random()*.4+.1,p:Math.random()*6}))}
rs();addEventListener('resize',rs);
(function draw(t){if(scrollY>innerHeight*1.2){if(!reduce)requestAnimationFrame(draw);return}cx.clearRect(0,0,W,H);for(const q of pts){q.y-=q.s*devicePixelRatio*.3;if(q.y<0)q.y=H;const a=.35+.65*Math.abs(Math.sin(t/900+q.p));cx.fillStyle=`rgba(242,216,150,${a})`;cx.beginPath();cx.arc(q.x,q.y,q.r,0,7);cx.fill()}if(!reduce)requestAnimationFrame(draw)})(0);
/* quick view */
let quick=false;
$('#quick').onclick=()=>{quick=!quick;document.documentElement.classList.toggle('noanim',quick);$('#quick').textContent=quick?'Back to the story':'Quick view: all designs';
 if(quick){ScrollTrigger.getAll().forEach(t=>t.disable());gsap.set('.reveal,.story-line,.sc,.sr-bg,.sr-bg img,.story-gem,.mqw',{clearProps:'all'});gsap.set('#track',{clearProps:'all'});window.scrollTo(0,$('#gallery').offsetTop-60);}
 else{location.reload()}};
/* animation */
let _in=0;function intro(){if(_in)return;_in=1;
 document.body.classList.remove('lock');
 gsap.set('#hero .hero-in>*,.scroll-cue',{clearProps:'opacity'});
 const tl=gsap.timeline();
 tl.from('.hero-mono',{scale:.6,opacity:0,duration:1.2,ease:'power3.out'})
   .from('#hero h1 i,#hero h1 em',{yPercent:110,duration:1.1,stagger:.15,ease:'power4.out'},'-=.7')
   .from('#hero .sub,.hero-cta,.ticker,.rate-chip',{y:24,opacity:0,duration:.9,stagger:.12},'-=.6');
}
function boot(){
 const bar=$('#loader .bar i');
 if(!window.gsap){$('#loader').remove();document.body.classList.remove('lock');return}
 gsap.registerPlugin(ScrollTrigger);
 let lenis;
 if(window.Lenis&&!reduce&&!matchMedia('(pointer:coarse)').matches){lenis=new Lenis({lerp:.12,smoothWheel:true});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);
  $$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const h=a.getAttribute('href');if(h.length>1&&$(h)){e.preventDefault();lenis.scrollTo(h,{offset:-40})}}))}
 ScrollTrigger.create({start:60,onUpdate:s=>$('#nav').classList.toggle('solid',s.scroll()>60)});
 if(reduce){$('#loader').remove();document.body.classList.remove('lock');document.documentElement.classList.add('noanim');return}
 /* loader: real progress */
 gsap.set('#hero .hero-in>*:not(.hx-l):not(.hx-r),.scroll-cue',{opacity:0});
 const pc=$('#pct'),pr={p:0};
 const srcs=['img/crest.png','img/ai/ai-hero.jpg','img/real/showroom.jpg'];
 const loaded=Promise.race([Promise.all(srcs.map(s=>new Promise(r=>{const i=new Image();i.onload=i.onerror=r;i.src=s}))).then(()=>document.fonts?document.fonts.ready:0),new Promise(r=>setTimeout(r,3500))]);
 const draw=()=>{pc.textContent=Math.round(pr.p);bar.style.width=pr.p+'%'};
 gsap.to(pr,{p:88,duration:1.5,ease:'power1.out',onUpdate:draw,onComplete:()=>loaded.then(()=>{
  gsap.to(pr,{p:100,duration:.45,ease:'none',onUpdate:draw,onComplete:()=>{
   const o=gsap.timeline({onComplete:()=>{$('#loader').remove();intro()}});
   o.to('#loader .lc',{opacity:0,scale:1.12,duration:.5,ease:'power2.in'})
    .to('#loader .lp.t',{yPercent:-101,duration:.95,ease:'power4.inOut'},'-=.05')
    .to('#loader .lp.b',{yPercent:101,duration:.95,ease:'power4.inOut'},'<');
  }})})});
 /* hero parallax out */
 gsap.to('.hz-none',{scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});
 /* story */
 const lines=$$('.story-line'),st=gsap.timeline({scrollTrigger:{trigger:'#story',start:'top top',end:'+=320%',pin:true,scrub:.6}});
 st.fromTo('.story-ring',{scale:.3,opacity:0},{scale:1,opacity:1,duration:lines.length*1.2,ease:'none',stagger:.2},0);
 st.to('.story-ring.r2',{rotate:180,duration:lines.length*1.2,ease:'none'},0);
 lines.forEach((l,i)=>{st.fromTo(l,{opacity:0,y:50,filter:'blur(8px)'},{opacity:1,y:0,filter:'blur(0px)',duration:.4},i*1.1).to(l,{opacity:i===lines.length-1?1:0,y:-40,duration:.35},i*1.1+.85)});
 /* reveals */
 $$('.reveal').forEach(el=>gsap.to(el,{opacity:1,y:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%'}}));
 /* showroom parallax */
 gsap.fromTo('.sr-bg img',{yPercent:-12,scale:1.15},{yPercent:12,scale:1.15,ease:'none',scrollTrigger:{trigger:'#showroom',start:'top bottom',end:'bottom top',scrub:true}});
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
setTimeout(()=>{const l=document.querySelector('#loader');if(l){l.remove();document.body.classList.remove('lock');intro()}},8000);
})();

(function(){const t=document.querySelectorAll('.tabs:not(.sl-tabs) button');t.forEach(b=>b.onclick=()=>{t.forEach(x=>x.classList.toggle('on',x===b));document.querySelectorAll('.tp').forEach(p=>p.classList.toggle('on',p.id==='t-'+b.dataset.t));window.ScrollTrigger&&ScrollTrigger.refresh()})})();
/* v42: custom scrollbar + smooth FAQ */
(function(){
 const bar=document.createElement('div');bar.id='sbar';bar.innerHTML='<i></i>';document.body.appendChild(bar);const th=bar.firstChild;let hide;
 const dim=()=>{const H=document.documentElement.scrollHeight,V=innerHeight,tr=V-24;const h=Math.max(44,tr*V/H);return{H,V,h,tr}};
 function upd(){const d=dim(),max=d.H-d.V;if(max<=0)return;const p=scrollY/max;th.style.height=d.h+'px';th.style.top=(12+p*(d.tr-d.h))+'px';bar.classList.add('show');clearTimeout(hide);hide=setTimeout(()=>bar.classList.remove('show'),1400)}
 addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);
 let dragging=false,sy=0,ss=0;
 th.addEventListener('pointerdown',e=>{dragging=true;sy=e.clientY;ss=scrollY;bar.classList.add('drag');th.setPointerCapture(e.pointerId);e.preventDefault()});
 th.addEventListener('pointermove',e=>{if(!dragging)return;const d=dim();window.scrollTo(0,ss+(e.clientY-sy)*(d.H-d.V)/(d.tr-d.h))});
 const end=()=>{dragging=false;bar.classList.remove('drag')};th.addEventListener('pointerup',end);th.addEventListener('pointercancel',end);
 bar.addEventListener('pointerdown',e=>{if(e.target===th)return;const d=dim(),p=(e.clientY-12-d.h/2)/(d.tr-d.h);window.scrollTo({top:Math.max(0,Math.min(1,p))*(d.H-d.V),behavior:'smooth'})});
 /* faq */
 document.querySelectorAll('.faqs details').forEach(dt=>{
  const sm=dt.querySelector('summary'),p=dt.querySelector('p');
  sm.addEventListener('click',e=>{e.preventDefault();
   if(!window.gsap){dt.open=!dt.open;return}
   if(dt.open){gsap.to(p,{height:0,opacity:0,duration:.5,ease:'power3.inOut',onComplete:()=>{dt.open=false;ScrollTrigger.refresh()}})}
   else{document.querySelectorAll('.faqs details[open]').forEach(o=>{if(o!==dt)o.querySelector('summary').click()});dt.open=true;gsap.fromTo(p,{height:0,opacity:0},{height:'auto',opacity:1,duration:.65,ease:'power3.out',onComplete:()=>ScrollTrigger.refresh()})}
  })});
})();
;(function(){try{if(!window.gsap||!window.ScrollTrigger||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
var m=document.querySelector('#hero .hero-mono');if(m)gsap.to(m,{yPercent:-14,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});
document.querySelectorAll('#diwali img,#insta img,#why img').forEach(function(i){if(i.closest('.slider'))return;gsap.fromTo(i,{yPercent:-5},{yPercent:5,ease:'none',scrollTrigger:{trigger:i,start:'top bottom',end:'bottom top',scrub:true}})})}catch(e){}})();

(function(){const b=document.getElementById('themeBtn');if(!b)return;const m=document.querySelector('meta[name=theme-color]');const sync=()=>{if(m)m.content=document.documentElement.classList.contains('light')?'#fbf6ea':'#070c1a'};sync();b.addEventListener('click',()=>{const l=document.documentElement.classList.toggle('light');try{localStorage.setItem('sbtheme',l?'light':'dark')}catch(e){}sync()})})();

/* v99 hero collage: staggered reveal + depth parallax */
(function(){if(!window.gsap||!window.ScrollTrigger||document.documentElement.classList.contains('noanim'))return;
 const f=document.querySelectorAll('.hx-r figure');if(!f.length)return;
 gsap.from('.hx-a',{clipPath:'circle(0% at 50% 100%)',duration:1.6,ease:'power3.out',delay:.5});
 gsap.from('.hx-b',{xPercent:-30,opacity:0,duration:1.2,ease:'power3.out',delay:.9});
 gsap.from('.hx-c',{scale:.3,opacity:0,duration:1.1,ease:'back.out(1.4)',delay:1.2});
 [['.hx-a',-6],['.hx-b',-16],['.hx-c',-24],['.hx-ring',-10]].forEach(([s,y])=>gsap.to(s,{yPercent:y*1.6,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}}));
 if(matchMedia('(pointer:fine)').matches)addEventListener('mousemove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;gsap.to('.hx-a',{x:x*-14,y:y*-10,duration:1});gsap.to('.hx-b',{x:x*22,duration:1});gsap.to('.hx-c',{x:x*-30,y:y*20,duration:1});gsap.to('.h-big',{x:x*30,duration:1.4})});
})();

/* v103 hero: step through the arch (pinned, scrubbed) */
(function(){if(!window.gsap||!window.ScrollTrigger||document.documentElement.classList.contains('noanim'))return;
 const A=document.getElementById('hzA');if(!A)return;const mob=innerWidth<=800;
 const th=document.querySelector('.hz-thread line');if(th){const L=th.getTotalLength?th.getTotalLength():100;}
 gsap.from('.hz-thread',{scaleY:0,transformOrigin:'50% 0',duration:1.4,ease:'power3.out',delay:.3});
 gsap.from('.hz-bead',{opacity:0,scale:0,duration:.8,delay:1.4});
 gsap.from(A,{clipPath:'inset(100% 0 0 0)',duration:1.6,ease:'power3.out',delay:.6});
 gsap.from('.hz-i1',{scale:1.3,duration:2.2,ease:'power2.out',delay:.6});
 const tl=gsap.timeline({scrollTrigger:{trigger:'#hero',start:'top top',end:'+=130%',pin:true,scrub:.7,anticipatePin:1}});
 tl.to('.hz-ui,.scroll-cue,.hz-mono',{opacity:0,y:20,duration:.15},0)
   .to('.hz-l',{xPercent:-120,opacity:0,duration:.6,ease:'power2.in'},0)
   .to('.hz-r',{xPercent:120,opacity:0,duration:.6,ease:'power2.in'},0)
   .to(A,{left:0,right:0,top:0,bottom:0,borderRadius:0,duration:1,ease:'power2.inOut'},0)
   .to('.hz-echo',{opacity:0,scale:1.8,duration:.8},0)
   .to('.hz-thread,.hz-bead',{opacity:0,duration:.2},0)
   .to(A,{outlineOffset:0,outlineColor:'#d9b25f00',duration:.5},0)
   .to('.hz-i1',{opacity:0,scale:1.15,duration:.5,ease:'none'},.35)
   .fromTo('.hz-i2',{opacity:0,scale:1.15},{opacity:1,scale:1,duration:.7,ease:'none'},.3)
   .to('.hz-shade',{opacity:1,duration:.3},.6)
   .fromTo('.hz-in',{opacity:0,y:30},{opacity:1,y:0,duration:.35},.75)
   .to({},{duration:.25});
})();

/* v110 hero: floating cut-out jewellery, scrubbed depth */
(function(){if(!window.gsap||!window.ScrollTrigger||document.documentElement.classList.contains('noanim'))return;
 const H=document.getElementById('hero');if(!H||!H.classList.contains('hf'))return;
 const C=H.querySelector('.hf-c'),D=H.querySelector('.hf-d');
 gsap.from('.hf-glow',{scale:.3,opacity:0,duration:2.4,ease:'power3.out',delay:.2});
 gsap.from('.hf-c',{scale:.7,opacity:0,rotate:-12,yPercent:8,duration:1.8,ease:'power3.out',delay:.5});
 gsap.from('.hf-d',{scale:.6,opacity:0,rotate:30,x:120,duration:1.8,ease:'power3.out',delay:.9});
 gsap.from('.hf-a i',{yPercent:60,opacity:0,duration:1.2,stagger:.12,ease:'power3.out',delay:.7});
 gsap.from('.hf-b em',{yPercent:60,opacity:0,duration:1.2,stagger:.12,ease:'power3.out',delay:1.1});
 gsap.to(C,{y:-12,duration:3.4,yoyo:true,repeat:-1,ease:'sine.inOut'});
 gsap.to(D,{y:14,duration:4.2,yoyo:true,repeat:-1,ease:'sine.inOut'});
 if(matchMedia('(pointer:fine)').matches)addEventListener('mousemove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;gsap.to('.hf-wc',{x:x*-26,y:y*-16,duration:1.2});gsap.to('.hf-wd',{x:x*50,y:y*30,duration:1.2});gsap.to('.hf-h',{x:x*18,duration:1.4});gsap.to('.hf-glow',{x:x*-60,y:y*-40,duration:1.6})});
 const tl=gsap.timeline({scrollTrigger:{trigger:'#hero',start:'top top',end:'+=110%',pin:true,scrub:.7,anticipatePin:1}});
 tl.to('.hz-ui,.scroll-cue',{opacity:0,y:20,duration:.15},0)
   .to('.hf-wc',{scale:(innerWidth<800?1.1:1.28),rotate:-4,yPercent:-8,duration:1,ease:'power1.inOut'},0)
   .to('.hf-wd',{yPercent:-120,xPercent:30,rotate:25,opacity:0,duration:.8,ease:'power2.in'},0)
   .to('.hf-a',{xPercent:-35,opacity:0,duration:.7,ease:'power2.in'},.05)
   .to('.hf-b',{xPercent:35,opacity:0,duration:.7,ease:'power2.in'},.05)
   .to('.hf-glow',{scale:2.1,opacity:.9,duration:1},0)
   .fromTo('.hz-in',{opacity:0,y:30},{opacity:1,y:0,duration:.35},.7)
   .to({},{duration:.25});
})();
