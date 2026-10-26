(function(){
const q=s=>document.querySelector(s);
// nav toggle
const b=q('.burger'),u=q('nav ul');
if(b)b.onclick=()=>u.classList.toggle('open');
// reveal on scroll
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
// countdown (8PM Dublin = 20:00 UTC on 30 Oct 2026)
const cd=q('#cd');
if(cd){const t=new Date('2026-10-30T20:00:00Z');
const tick=()=>{let d=t-new Date();if(d<0){cd.innerHTML='<h3 class="px" style="color:#ff4fd8">OUT NOW!</h3>';return}
const v=[['Days',864e5],['Hrs',36e5],['Min',6e4],['Sec',1e3]];
cd.innerHTML=v.map(([n,m])=>{const x=Math.floor(d/m);d-=x*m;return `<div><b>${String(x).padStart(2,'0')}</b><small>${n}</small></div>`}).join('')};
tick();setInterval(tick,1000)}
// lightbox
const imgs=[...document.querySelectorAll('.gallery img')];
if(imgs.length){let i=0;const lb=document.createElement('div');lb.className='lb';
lb.innerHTML='<button class="x">&times;</button><button class="pv">&#10094;</button><img alt=""><button class="nx">&#10095;</button>';
document.body.appendChild(lb);const im=lb.querySelector('img');
const show=n=>{i=(n+imgs.length)%imgs.length;im.src=imgs[i].src;lb.classList.add('on')};
imgs.forEach((p,n)=>p.onclick=()=>show(n));
lb.querySelector('.pv').onclick=e=>{e.stopPropagation();show(i-1)};
lb.querySelector('.nx').onclick=e=>{e.stopPropagation();show(i+1)};
lb.onclick=e=>{if(e.target!==im)lb.classList.remove('on')};
addEventListener('keydown',e=>{if(!lb.classList.contains('on'))return;
if(e.key==='Escape')lb.classList.remove('on');if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1)})}
// glowing background particles
const c=q('#fx');if(!c||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
const g=c.getContext('2d'),cols=['186,85,211','255,79,216','79,216,255'];let W,H,P=[];
const rs=()=>{W=c.width=innerWidth;H=c.height=innerHeight};rs();addEventListener('resize',rs);
const mk=()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*3+1,s:Math.random()*.4+.1,c:cols[Math.random()*3|0],sq:Math.random()<.45,p:Math.random()*6});
for(let n=0;n<(W<700?35:70);n++)P.push(mk());
(function f(){g.clearRect(0,0,W,H);
for(const p of P){p.y-=p.s;p.p+=.02;p.x+=Math.sin(p.p)*.3;if(p.y<-10){p.y=H+10;p.x=Math.random()*W}
const a=.35+Math.sin(p.p*2)*.25;
if(p.sq){g.fillStyle=`rgba(${p.c},${a})`;g.shadowColor=`rgb(${p.c})`;g.shadowBlur=12;g.fillRect(p.x,p.y,p.r*2,p.r*2)}
else{const r=p.r*6,gr=g.createRadialGradient(p.x,p.y,0,p.x,p.y,r);gr.addColorStop(0,`rgba(${p.c},${a})`);gr.addColorStop(1,`rgba(${p.c},0)`);g.shadowBlur=0;g.fillStyle=gr;g.beginPath();g.arc(p.x,p.y,r,0,7);g.fill()}}
requestAnimationFrame(f)})();
})();
