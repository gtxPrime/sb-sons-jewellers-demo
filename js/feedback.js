(function(){
const S=window.SB,C=S.survey,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const D={
 how:["Friends","Family","Newspaper","Radio","Banners or hoardings","Instagram","Facebook","Google search","Passing by","Other"],
 purpose:["Bridal","Festival","Gift","Daily wear","Investment","Repair or exchange","Just browsing"],
 bought:["Gold jewellery","Diamond jewellery","Silver","Coins or bars","Nothing yet"],
 staff:["polite","knowledgeable","patient","helpful","friendly","pushy","hurried","not attentive"],
 store:["clean","spacious","well lit","easy to browse","welcoming","crowded","noisy"],
 collection:["wide","modern","well finished","good value","limited"],
 trust:["clear hallmark details","transparent billing","fair pricing","pricing felt high","billing was unclear"],
 location:["easy to find","easy to reach","close to the main road","hard to find","far from where I live"]
};
const NEG=new Set(["pushy","hurried","not attentive","crowded","noisy","limited","pricing felt high","billing was unclear","hard to find","far from where I live"]);
const sel={};let rating=0,step=1;const N=6;
$$('.chips').forEach(c=>{const k=c.dataset.k;sel[k]=new Set();c.innerHTML=D[k].map(v=>`<button type="button" aria-pressed="false">${v}</button>`).join('');
 c.onclick=e=>{const b=e.target.closest('button');if(!b)return;const v=b.textContent,on=!sel[k].has(v);on?sel[k].add(v):sel[k].delete(v);b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)}});
$('#stars').innerHTML=[1,2,3,4,5].map(i=>`<button type="button" role="radio" aria-label="${i} stars" data-i="${i}">&#9733;</button>`).join('');
$('#stars').onclick=e=>{const b=e.target.closest('button');if(!b)return;rating=+b.dataset.i;$$('#stars button').forEach(x=>x.classList.toggle('on',+x.dataset.i<=rating))};
const list=a=>a.length<2?a[0]:a.slice(0,-1).join(', ')+' and '+a[a.length-1];
const pick=a=>a[Math.floor(Math.random()*a.length)];
function draft(){
 const out=[],v=k=>[...sel[k]],pos=k=>v(k).filter(x=>!NEG.has(x)),neg=k=>v(k).filter(x=>NEG.has(x));
 const p=v('purpose'),h=v('how'),b=v('bought').filter(x=>x!=='Nothing yet');
 out.push(pick(['I visited S B & Sons Jewellers in Sikandra, Agra','I went to S B & Sons Jewellers in Sikandra, Agra'])+(p.length?' for '+list(p.map(x=>x.toLowerCase()))+'.':'.'));
 if(h.length)out.push(pick(['I came to know about them through ','I first heard of the showroom through '])+list(h.map(x=>x.toLowerCase()))+'.');
 if(b.length)out.push(pick(['I looked at their ','I went through their '])+list(b.map(x=>x.toLowerCase()))+'.');
 [['staff','The staff were ','I felt the staff were '],['store','The showroom was ','The showroom was also '],['collection','The collection was ','The collection was also ']].forEach(([k,a,n])=>{
  const P=pos(k),Q=neg(k);if(P.length)out.push(a+list(P)+'.');if(Q.length)out.push((P.length?'However, ':'')+(k==='staff'?'I felt the staff were ':k==='store'?'the showroom was ':'the collection was ')+list(Q)+'.')});
 const tp=pos('trust'),tn=neg('trust');if(tp.length)out.push('On trust, I noted '+list(tp)+'.');if(tn.length)out.push('One concern: '+list(tn)+'.');
 const lp=pos('location'),ln=neg('location');if(lp.length)out.push('The location was '+list(lp)+'.');if(ln.length)out.push('For me the location was '+list(ln)+'.');
 const more=$('#more').value.trim();if(more)out.push(more);
 const close={5:['A great experience. I would recommend them.','Very happy with my visit.'],4:['A good experience overall.','Happy with my visit.'],3:['An average experience overall.','It was an okay visit.'],2:['I was not fully satisfied with my visit.'],1:['I was not satisfied with my visit.']}[rating];
 if(close)out.push(pick(close));
 return out.join(' ').replace(/instagram/g,'Instagram').replace(/facebook/g,'Facebook').replace(/google search/g,'a Google search').replace(/(^|\. )([a-z])/g,(m,a,c)=>a+c.toUpperCase());
}
function fmt(){const p=$('#ph').value.replace(/\D/g,'');return p}
function data(){return {ts:new Date().toISOString(),how:[...sel.how],purpose:[...sel.purpose],bought:[...sel.bought],rating,staff:[...sel.staff],store:[...sel.store],collection:[...sel.collection],trust:[...sel.trust],location:[...sel.location],comment:$('#more').value.trim(),draft:$('#draft').value,name:$('#nm').value.trim(),phone:fmt(),area:$('#area').value.trim(),contact_ok:$('#consent').checked&&!!fmt(),website:$('#f .hp').value}}
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),1800)}
function show(n){step=n;$$('.st').forEach(s=>s.classList.toggle('on',+s.dataset.s===n));$('#progBar').style.width=(n/N*100)+'%';$('#stepNo').textContent='Step '+n+' of '+N;$('#prev').style.visibility=n===1?'hidden':'visible';$('#next').style.display=n===N?'none':'';if(n===N&&!$('#draft').value)$('#draft').value=draft();window.scrollTo({top:0,behavior:'smooth'})}
$('#next').onclick=()=>{if(step===5){const p=fmt();if(p&&!/^(91)?[6-9]\d{9}$/.test(p)){toast('Please check the mobile number');return}}show(Math.min(N,step+1))};
$('#prev').onclick=()=>show(Math.max(1,step-1));
$('#regen').onclick=()=>{$('#draft').value=draft()};
const copy=()=>{const t=$('#draft').value;navigator.clipboard&&navigator.clipboard.writeText(t).then(()=>toast('Copied. Paste it in Google.'),()=>{})};
$('#copy').onclick=()=>{copy();toast('Copied')};
$('#gbtn').href=C.googleReview;$('#gbtn').onclick=copy;
$('#save').onclick=async()=>{const d=data();if(d.website)return;$('#save').disabled=true;
 try{if(C.mode==='live'){const r=await fetch(C.endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});if(!r.ok)throw 0}
  else{const a=JSON.parse(localStorage.getItem('sb_demo_feedback')||'[]');a.push(d);localStorage.setItem('sb_demo_feedback',JSON.stringify(a))}
  $('#ok').hidden=false;$('#ok').textContent=C.mode==='live'?'Thank you. Your feedback is saved.':'Thank you. Demo only: saved in this browser, not sent anywhere.'}
 catch(e){toast('Could not save. Please try again.');$('#save').disabled=false}};
if(C.mode!=='live')$('#demoBanner').style.display='block';
show(1);
})();
