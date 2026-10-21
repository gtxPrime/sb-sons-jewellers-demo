(function(){
if(!window.gsap||!window.ScrollTrigger||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
function go(){
 if(document.documentElement.classList.contains('noanim'))return;
 const mobile=innerWidth<700,ST=(o)=>Object.assign({scrub:.7,invalidateOnRefresh:true},o);
 /* 1. travelling gem across the whole page */
 const g=$('#gem'),W=()=>innerWidth,gw=()=>g.offsetWidth;
 gsap.set(g,{opacity:0,xPercent:-50,yPercent:-50});
 const xs=mobile?[.88,.12,.88,.12,.88,.5]:[.9,.08,.92,.08,.9,.5],ys=[.28,.5,.4,.62,.45,.5];
 const tl=gsap.timeline({scrollTrigger:ST({trigger:document.body,start:'top top',end:'bottom bottom',scrub:1.2})});
 xs.forEach((x,i)=>tl.to(g,{x:()=>x*W(),y:()=>ys[i]*innerHeight,rotateY:i*180,rotate:i%2?18:-18,scale:i%2?1.5:.6,duration:1,ease:'sine.inOut'}));
 gsap.set(g,{x:()=>.9*W(),y:()=>.28*innerHeight});
 ScrollTrigger.create({trigger:'#story',start:'top 70%',end:()=>'top -'+Math.round(innerHeight*3.2+40),onToggle:s=>gsap.to(g,{opacity:s.isActive?0:.85,duration:.4,overwrite:true})});
 ScrollTrigger.create({trigger:'#hero',start:'bottom 80%',onEnter:()=>gsap.to(g,{opacity:.85,duration:.6}),onLeaveBack:()=>gsap.to(g,{opacity:0,duration:.4})});
 ScrollTrigger.create({trigger:'#coll',start:'top bottom',end:'bottom top',onToggle:s=>gsap.to(g,{opacity:s.isActive?0:.85,duration:.3,overwrite:true})});
 ScrollTrigger.create({trigger:'#visit',start:'top 60%',onEnter:()=>gsap.to(g,{opacity:0,duration:.4}),onLeaveBack:()=>gsap.to(g,{opacity:.85,duration:.4})});
 /* 2. story: four pieces reveal in turn through arched masks, joined by a gold thread drawn with the scroll */
 const cs=$$('#sp .sp-c'),im=cs.map(c=>c.firstElementChild),pth=$('#spP'),dot=$('#spD'),nn=$('#spN');
 const X=mobile?[.5,.5,.5,.5]:[.72,.27,.72,.5],Y=mobile?[.36,.36,.36,.36]:[.5,.5,.5,.5];
 /* thread path through the card centres */
 const pts=mobile?[[500,60],[420,300],[580,520],[440,740],[500,960]]:[[720,40],[400,260],[270,500],[720,600],[500,960]];
 pth.setAttribute('d','M'+pts[0]+' C'+pts[0][0]+','+(pts[0][1]+200)+' '+pts[1][0]+','+(pts[1][1]-200)+' '+pts[1]+' S'+pts[2][0]+','+(pts[2][1]-150)+' '+pts[2]+' S'+pts[3][0]+','+(pts[3][1]-150)+' '+pts[3]+' S'+pts[4][0]+','+(pts[4][1]-150)+' '+pts[4]);
 const L=pth.getTotalLength();pth.style.strokeDasharray=L+' '+L*3;pth.style.strokeDashoffset=L;
 cs.forEach((c,i)=>{c.style.left=(X[i]*100)+'%';c.style.top=(Y[i]*100)+'%'});
 gsap.set(cs,{xPercent:-50,yPercent:-50,clipPath:'inset(100% 0% 0% 0% round 999px 999px 0 0)'});gsap.set(im,{scale:1.3,yPercent:8});
 const P={v:0};
 const rot=gsap.timeline({scrollTrigger:ST({trigger:'#story',start:'top top',end:'+=320%',scrub:.5})});
 cs.forEach((c,i)=>{const t=i*1.1;
  rot.to(c,{clipPath:'inset(0% 0% 0% 0% round 999px 999px 14px 14px)',duration:.6,ease:'power3.out'},t)
     .to(im[i],{scale:1,yPercent:0,duration:.9,ease:'none'},t);
  if(i<3)rot.to(c,{clipPath:'inset(0% 0% 100% 0% round 14px 14px 999px 999px)',duration:.4,ease:'power2.in'},t+.85).to(im[i],{yPercent:-8,duration:.4,ease:'none'},t+.85)});
 rot.to(P,{v:1,duration:4.4,ease:'none',onUpdate:()=>{const p=pth.getPointAtLength(L*P.v);pth.style.strokeDashoffset=L*(1-P.v);dot.style.transform='translate('+p.x/10+'vw,'+p.y/10+'vh) translate(-50%,-50%)';nn.textContent='0'+Math.min(4,1+Math.floor(P.v*4))}},0);
 const gh=$$('#story .ghost span');gsap.set(gh,{opacity:0,yPercent:12});
 [0,1.1,2.2,3.3].forEach((t,i)=>{rot.to(gh[i],{opacity:1,yPercent:0,duration:.4,ease:'power2.out'},t);if(i<3)rot.to(gh[i],{opacity:0,yPercent:-12,duration:.3},t+.85)});
 if(0)gsap.to('#sgem .glint',{backgroundPosition:'-160% 0',ease:'none',scrollTrigger:ST({trigger:'#story',start:'top top',end:'+=320%',scrub:.5})});
 /* texture layers with slow parallax */
 if(!window.LOWFX)[['#hero','silk'],['#diwali','crimson'],['#visit','velvet'],['footer','foil']].forEach(([sel,t])=>{const h=$(sel);if(!h)return;const e=document.createElement('i');e.className='tex '+t;e.setAttribute('aria-hidden','true');h.appendChild(e);gsap.fromTo(e,{yPercent:-4},{yPercent:4,ease:'none',scrollTrigger:ST({trigger:h,start:'top bottom',end:'bottom top',scrub:true})})});
 /* 3. word bands slide against each other */
 gsap.fromTo('#bw1',{x:0},{x:()=>-($('#bw1').scrollWidth-innerWidth),ease:'none',scrollTrigger:ST({trigger:'#band',start:'top bottom',end:'bottom top'})});
 gsap.fromTo('#bw2',{x:()=>-($('#bw2').scrollWidth-innerWidth)},{x:0,ease:'none',scrollTrigger:ST({trigger:'#band',start:'top bottom',end:'bottom top'})});
 /* 4. diwali: arch opens, countdown rises, offer and CTA enter from opposite sides */
 gsap.fromTo('.dw-img',{clipPath:'inset(40% 30% 0% 30% round 200px 200px 0 0)',scale:.8},{clipPath:'inset(0% 0% 0% 0% round 200px 200px 18px 18px)',scale:1,ease:'none',scrollTrigger:ST({trigger:'.dw-img',start:'top 95%',end:'top 35%'})});
 gsap.from('.dw-img img',{scale:1.5,ease:'none',scrollTrigger:ST({trigger:'.dw-img',start:'top 95%',end:'bottom 40%'})});
 gsap.from('#count>div',{y:90,opacity:0,rotateX:-70,stagger:.12,ease:'power3.out',scrollTrigger:{trigger:'#count',start:'top 90%'}});
 gsap.from('#offerBox',{x:-120,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:'#offerBox',start:'top 90%'}});
 gsap.fromTo('#offerCta',{y:60,opacity:0,scale:.8,clipPath:'inset(0 100% 0 0 round 40px)'},{y:0,opacity:1,scale:1,clipPath:'inset(0 0% 0 0 round 40px)',duration:1.3,ease:'expo.out',scrollTrigger:{trigger:'#offerCta',start:'top 96%'},onComplete:()=>$('#offerCta').classList.add('pulse')});
 /* 5. gallery cards: alternate sides, tilt in */
 gsap.from('#sl',{y:90,opacity:0,scale:.92,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:'#sl',start:'top 88%'}});
 /* 6. showroom: frame opens to full bleed while the photo pulls back */
 gsap.fromTo('.sr-bg',{clipPath:'inset(18% 10% 18% 10% round 28px)'},{clipPath:'inset(0% 0% 0% 0% round 0px)',ease:'none',scrollTrigger:ST({trigger:'#showroom',start:'top 85%',end:'top 10%'})});
 /* 7. reviews: cards fan in from three directions */
 const dirs=[{x:-90,y:60,rotate:-5},{x:0,y:110,rotate:0},{x:90,y:60,rotate:5},{x:0,y:110,rotate:-2}];
 $$('.rv').forEach((c,i)=>gsap.from(c,Object.assign({opacity:0,duration:1.05,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 92%'}},dirs[i%4])));
 /* 8. why: pillars draw their icons, scale up in a stagger */
 $$('.pillar').forEach((p,i)=>{
  gsap.from(p,{scale:.85,opacity:0,y:50,duration:.9,delay:(i%4)*.08,ease:'back.out(1.4)',scrollTrigger:{trigger:p,start:'top 92%'}});
  p.querySelectorAll('.ico path').forEach(pa=>{const l=pa.getTotalLength?pa.getTotalLength():0;if(l){gsap.fromTo(pa,{strokeDasharray:l,strokeDashoffset:l},{strokeDashoffset:0,duration:1.6,ease:'power2.out',scrollTrigger:{trigger:p,start:'top 90%'}})}})});
 /* 9. visit: map wipes in from the right */
 gsap.fromTo('.vmap',{clipPath:'inset(0 0 0 100%)',opacity:1},{clipPath:'inset(0 0 0 0%)',ease:'none',scrollTrigger:ST({trigger:'.vmap',start:'top 95%',end:'top 45%'})});
 ScrollTrigger.refresh();
}
function start(){setTimeout(go,50)}
if(document.readyState==='complete')start();else addEventListener('load',start);
})();
/* v93: arch reveals, heading threads, page thread */
(function(){
 if(document.documentElement.classList.contains('noanim'))return;
 const pend=new Set();let qq=0;
 const chk=()=>{qq=0;const H=innerHeight*.92;pend.forEach(el=>{const r=el.getBoundingClientRect();if(r.top<H&&r.bottom>0){el.classList.add('in');pend.delete(el)}})};
 const kick=()=>{if(!qq)qq=requestAnimationFrame(chk)};addEventListener('scroll',kick,{passive:true});addEventListener('resize',kick);
 const io={observe:el=>{pend.add(el);kick()}};
 const scan=()=>{document.querySelectorAll('.ed,.igc,.rv,.pillar,.dw-img,.diya').forEach(el=>{if(el.__o)return;el.__o=1;if(el.matches('.ed,.igc'))el.classList.add('arch-r');io.observe(el)});
  document.querySelectorAll('section .wrap>h2,section .rv-head h2,section .wrap>.eyebrow+h2').forEach(h=>{if(h.__o)return;h.__o=1;h.classList.add('thr');if(getComputedStyle(h).textAlign==='center')h.classList.add('thc');io.observe(h)})};
 scan();const st=document.getElementById('slStage');if(st)new MutationObserver(scan).observe(st,{childList:true});
 /* cpanels: arch reveal when they first show on the pinned track */
 document.querySelectorAll('.cpanel').forEach((c,i)=>{c.classList.add('arch-r');setTimeout(()=>c.classList.add('in'),600+i*250)});
 const pt=document.createElement('div');pt.id='pt';pt.innerHTML='<i></i>';document.body.appendChild(pt);const b=pt.firstChild;
 let q=0;const u=()=>{q=0;const m=document.documentElement.scrollHeight-innerHeight;b.style.top=(m>0?scrollY/m*100:0)+'%'};
 addEventListener('scroll',()=>{if(!q)q=requestAnimationFrame(u)},{passive:true});u();
})();
/* v97: Diwali signature: mandala draws itself, diyas light one by one along a gold thread, embers drift with parallax */
(function(){
 if(document.documentElement.classList.contains('noanim')||!window.gsap||!window.ScrollTrigger)return;
 const dw=document.getElementById('diwali'),img=dw&&dw.querySelector('.dw-img');if(!dw||!img)return;
 const NS='http://www.w3.org/2000/svg',mob=innerWidth<700;
 /* mandala behind the arch image */
 const stg=document.createElement('div');stg.className='dw-stage';img.parentNode.insertBefore(stg,img);stg.appendChild(img);
 let m='<svg class="mand" viewBox="-300 -300 600 600" aria-hidden="true" fill="none" stroke="#f2d896" stroke-width="1.2" stroke-linecap="round">';
 [290,262,236,150].forEach(r=>m+='<circle class="mp" r="'+r+'"/>');
 for(let i=0;i<24;i++){const a=i*15;m+='<path class="mp" transform="rotate('+a+')" d="M0 -150 C 26 -190 26 -230 0 -262 C -26 -230 -26 -190 0 -150Z"/>'}
 for(let i=0;i<12;i++){const a=i*30+15;m+='<path class="mp" transform="rotate('+a+')" d="M0 -262 L 10 -276 L 0 -290 L -10 -276Z"/>'}
 for(let i=0;i<36;i++){m+='<circle class="mp" transform="rotate('+(i*10)+') translate(0 -249)" r="2.4"/>'}
 m+='</svg>';stg.insertAdjacentHTML('afterbegin',m);
 const mp=stg.querySelectorAll('.mp');mp.forEach(e=>{let l=60;try{l=e.getTotalLength()}catch(_){}e.style.strokeDasharray=l;e.style.strokeDashoffset=l;e.__l=l});
 gsap.to(mp,{strokeDashoffset:0,stagger:{each:.012,from:'start'},ease:'none',scrollTrigger:{trigger:stg,start:'top 85%',end:'center 45%',scrub:.8}});
 gsap.fromTo('.mand',{rotate:-25,opacity:.9},{rotate:25,ease:'none',scrollTrigger:{trigger:stg,start:'top bottom',end:'bottom top',scrub:true}});
 /* diya thread */
 const row=document.createElement('div');row.className='dw-row';
 const n=mob?5:7,W=1000,H=160;let d='M0 100';const px=[];
 for(let i=0;i<n;i++){const x=(i+.5)/n*W,y=i%2?58:104;px.push([x,y])}
 d='M0 80';px.forEach(p=>d+=' L'+p[0]+' '+p[1]);d='M0 80 '+px.map((p,i)=>{const pr=i?px[i-1]:[0,80];return 'C'+((pr[0]+p[0])/2)+' '+pr[1]+' '+((pr[0]+p[0])/2)+' '+p[1]+' '+p[0]+' '+p[1]}).join(' ')+' C'+(W-40)+' '+px[n-1][1]+' '+W+' 80 '+W+' 80';
 let s='<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none" aria-hidden="true"><path id="dwT" d="'+d+'" stroke="#d9b25f" stroke-width="1.6" fill="none" vector-effect="non-scaling-stroke"/></svg>';
 row.innerHTML=s;
 px.forEach((p,i)=>{const e=document.createElement('i');e.className='dy';e.style.left=(p[0]/W*100)+'%';e.style.top=(p[1]/H*100)+'%';e.innerHTML='<b class="fl"></b><u></u>';row.appendChild(e)});
 const cd=document.getElementById('count');cd.parentNode.insertBefore(row,cd);
 const T=row.querySelector('#dwT'),L=T.getTotalLength();T.style.strokeDasharray=L;T.style.strokeDashoffset=L;
 const dys=row.querySelectorAll('.dy'),tl=gsap.timeline({scrollTrigger:{trigger:row,start:'top 88%',end:'top 38%',scrub:.7}});
 tl.to(T,{strokeDashoffset:0,ease:'none',duration:dys.length},0);
 dys.forEach((e,i)=>{tl.fromTo(e.firstChild,{scale:0,opacity:0,transformOrigin:'50% 100%'},{scale:1,opacity:1,duration:.7,ease:'back.out(2)'},i+.15);tl.fromTo(e.lastChild,{opacity:.35},{opacity:1,duration:.5},i+.15)});
 /* embers */
 const em=document.createElement('div');em.className='embers';em.setAttribute('aria-hidden','true');const N=mob?10:18;
 for(let i=0;i<N;i++){const e=document.createElement('i');const z=.4+Math.random()*1.2;e.style.cssText='left:'+(Math.random()*100)+'%;top:'+(Math.random()*100)+'%;width:'+(2+z*3)+'px;height:'+(2+z*3)+'px;opacity:'+(.25+z*.3);e.dataset.z=z;em.appendChild(e)}
 dw.insertBefore(em,dw.firstChild);
 em.querySelectorAll('i').forEach(e=>gsap.fromTo(e,{y:120*e.dataset.z},{y:-220*e.dataset.z,ease:'none',scrollTrigger:{trigger:dw,start:'top bottom',end:'bottom top',scrub:true}}));
 ScrollTrigger.refresh();
})();
