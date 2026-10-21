/* true 3D brilliant-cut diamond (Three.js). Falls back to the static image if WebGL is missing or the device is weak. */
(function(){
const host=document.getElementById('sgem');if(!host||!window.THREE)return;
const weak=(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=3)||(navigator.deviceMemory&&navigator.deviceMemory<=2);
if(weak||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
const T=THREE;let renderer;
try{renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'})}catch(e){return}
const mobile=innerWidth<700;renderer.setPixelRatio(Math.min(devicePixelRatio||1,mobile?1.5:2));
renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
const cv=renderer.domElement;cv.className='gem3d';host.appendChild(cv);
const scene=new T.Scene(),cam=new T.PerspectiveCamera(32,1,.1,50);cam.position.set(0,0,6.2);
/* studio environment: dark room with soft boxes, drawn on a canvas */
const ec=document.createElement('canvas');ec.width=1024;ec.height=512;const x=ec.getContext('2d');
let g=x.createLinearGradient(0,0,0,512);g.addColorStop(0,'#1b2a52');g.addColorStop(.5,'#070b18');g.addColorStop(1,'#241a0a');x.fillStyle=g;x.fillRect(0,0,1024,512);
const box=(a,b,w,h,c)=>{const gr=x.createLinearGradient(a,b,a+w,b+h);gr.addColorStop(0,c);gr.addColorStop(1,'#ffffff00');x.fillStyle=c;x.globalAlpha=.95;x.fillRect(a,b,w,h);x.globalAlpha=1};
box(80,60,150,200,'#ffffff');box(330,30,60,260,'#bcd6ff');box(520,90,170,120,'#fff2cf');box(760,40,70,300,'#ffffff');box(900,120,100,160,'#ffd9a0');box(200,330,260,40,'#9fc0ff');box(600,350,200,30,'#ffffff');box(430,200,24,150,'#ffffff');
const et=new T.CanvasTexture(ec);et.mapping=T.EquirectangularReflectionMapping;et.encoding=T.sRGBEncoding;
const pm=new T.PMREMGenerator(renderer);const env=pm.fromEquirectangular(et).texture;scene.environment=env;
/* geometry */
const P=(r,a,y)=>new T.Vector3(r*Math.cos(a),y,r*Math.sin(a));
const Tb=[],G=[],Gb=[],M=[];for(let i=0;i<8;i++){Tb.push(P(.56,i*Math.PI/4,.52));M.push(P(.52,i*Math.PI/4,-.5))}
for(let j=0;j<16;j++){G.push(P(1,j*Math.PI/8,.14));Gb.push(P(1,j*Math.PI/8,.0))}
const tc=new T.Vector3(0,.52,0),cu=new T.Vector3(0,-1.05,0),tris=[];
const tri=(a,b,c)=>tris.push([a,b,c]);
for(let i=0;i<8;i++){const n=(i+1)%8,g0=2*i,g1=2*i+1,g2=(2*i+2)%16;
 tri(tc,Tb[i],Tb[n]);tri(Tb[i],Tb[n],G[g1]);tri(Tb[i],G[g0],G[g1]);tri(Tb[n],G[g1],G[g2]);
 tri(Gb[g0],Gb[g1],M[i]);tri(Gb[g1],M[i],M[n]);tri(Gb[g1],M[n],Gb[g2]);tri(M[i],M[n],cu)}
for(let j=0;j<16;j++){const n=(j+1)%16;tri(G[j],G[n],Gb[j]);tri(G[n],Gb[n],Gb[j])}
const pos=[],mid=new T.Vector3(0,-.2,0);
tris.forEach(([a,b,c])=>{const nrm=new T.Vector3().subVectors(b,a).cross(new T.Vector3().subVectors(c,a));const cen=a.clone().add(b).add(c).divideScalar(3).sub(mid);
 const pts=nrm.dot(cen)<0?[a,c,b]:[a,b,c];pts.forEach(p=>pos.push(p.x,p.y,p.z))});
const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(pos,3));geo.computeVertexNormals();
const outer=new T.Mesh(geo,new T.MeshStandardMaterial({color:0xe6f0ff,metalness:1,roughness:.03,envMapIntensity:1.5,flatShading:true,transparent:true,opacity:.92}));
/* inner back faces give depth and a little colour fire */
const inner=new T.Mesh(geo,new T.MeshStandardMaterial({color:0x9fb8ff,metalness:.9,roughness:.1,envMapIntensity:1.1,flatShading:true,side:T.BackSide,transparent:true,opacity:.55}));
inner.scale.setScalar(.985);
const gem=new T.Group();gem.add(inner,outer);scene.add(gem);
const key=new T.DirectionalLight(0xfff0d0,1.2);key.position.set(3,4,5);scene.add(key);
const st=window.SBGem={rx:.12,ry:0,sc:1,on:false,ready:true};
function size(){const w=host.clientWidth||300,h=host.clientHeight||w;renderer.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}
addEventListener('resize',size);size();
let idle=0;
function frame(t){if(!st.on)return;idle=t/1000;
 gem.rotation.set(st.rx,st.ry+idle*.18,0,'XYZ');gem.scale.setScalar(st.sc);gem.position.y=Math.sin(idle*.9)*.04;
 renderer.render(scene,cam)}
gsap.ticker.add(frame);
host.classList.add('is3d');
})();
