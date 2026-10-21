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
 ScrollTrigger.create({trigger:'#story',start:'top 60%',end:'bottom 40%',onToggle:s=>gsap.to(g,{opacity:s.isActive?0:.6,duration:.4,overwrite:true})});
 ScrollTrigger.create({trigger:'#hero',start:'bottom 80%',onEnter:()=>gsap.to(g,{opacity:.6,duration:.6}),onLeaveBack:()=>gsap.to(g,{opacity:0,duration:.4})});
 ScrollTrigger.create({trigger:'#coll',start:'top bottom',end:'bottom top',onToggle:s=>gsap.to(g,{opacity:s.isActive?0:.6,duration:.3,overwrite:true})});
 ScrollTrigger.create({trigger:'#visit',start:'top 60%',onEnter:()=>gsap.to(g,{opacity:0,duration:.4}),onLeaveBack:()=>gsap.to(g,{opacity:.6,duration:.4})});
 /* 2. story: giant diamond grows, spins and fills the frame behind alternating chapters */
 gsap.timeline({scrollTrigger:ST({trigger:'#story',start:'top top',end:'+=320%',scrub:.6})})
  .fromTo('#sgem',{opacity:0,scale:.15,rotate:-40},{opacity:.55,scale:mobile?1.6:2.2,rotate:40,ease:'none',duration:1});
 /* 3. word bands slide against each other */
 gsap.fromTo('#bw1',{x:0},{x:()=>-($('#bw1').scrollWidth-innerWidth),ease:'none',scrollTrigger:ST({trigger:'#band',start:'top bottom',end:'bottom top'})});
 gsap.fromTo('#bw2',{x:()=>-($('#bw2').scrollWidth-innerWidth)},{x:0,ease:'none',scrollTrigger:ST({trigger:'#band',start:'top bottom',end:'bottom top'})});
 /* 4. diwali: arch opens, countdown rises, offer and CTA enter from opposite sides */
 gsap.fromTo('.dw-img',{clipPath:'inset(40% 30% 0% 30% round 200px 200px 0 0)',scale:.8},{clipPath:'inset(0% 0% 0% 0% round 200px 200px 18px 18px)',scale:1,ease:'none',scrollTrigger:ST({trigger:'.dw-img',start:'top 95%',end:'top 35%'})});
 gsap.from('.dw-img img',{scale:1.5,ease:'none',scrollTrigger:ST({trigger:'.dw-img',start:'top 95%',end:'bottom 40%'})});
 gsap.from('#count>div',{y:90,opacity:0,rotateX:-70,stagger:.12,ease:'power3.out',scrollTrigger:{trigger:'#count',start:'top 90%'}});
 gsap.from('#offerBox',{x:-120,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:'#offerBox',start:'top 90%'}});
 gsap.from('#offerCta',{x:120,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:'#offerCta',start:'top 95%'}});
 /* 5. gallery cards: alternate sides, tilt in */
 ScrollTrigger.batch('#grid .card',{start:'top 92%',once:true,onEnter:b=>b.forEach((c,i)=>gsap.fromTo(c,{x:i%2?60:-60,rotate:i%2?4:-4,opacity:0,y:40},{x:0,rotate:0,opacity:1,y:0,duration:.9,delay:i*.06,ease:'power3.out',overwrite:true}))});
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
