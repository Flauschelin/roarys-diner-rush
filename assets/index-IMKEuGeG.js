(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const qu=Math.PI/2,ju=-Math.PI/2,Kr=24*Math.PI/180,Ph=(r,e)=>Math.atan2(Math.sin(e-r),Math.cos(e-r));function Yu(r,e,t,n=12){const i=Ph(r,e),s=Math.max(0,t)*n;return r+Math.max(-s,Math.min(s,i))}function Ku(r,e,t){const n=e-r.z,i=Math.abs(n)>.035,s=i?n>0?0:Math.PI:r.gestureTime>0&&r.gesture==="Carry"?ju:qu;if(r.facing=Yu(r.facing,s,t),r.walking=!1,!i)return;const a=Math.cos(Ph(r.facing,s)),o=Math.max(0,Math.min(1,(a-.8)/.2)),l=Math.min(Math.abs(n),t*8.2*o);r.z+=Math.sign(n)*l,r.walking=l>1e-5}const Ji=["burger","cola","fries"],Pn={burger:"Burger",cola:"Cola",fries:"Pommes"},Wt=[-3.8,0,3.8],Ql=[{name:"Die erste Schicht",customers:6,interval:4.3,speed:.2,comboChance:0},{name:"Mittagsansturm",customers:8,interval:3.2,speed:.25,comboChance:.32},{name:"Volles Haus",customers:10,interval:2.6,speed:.3,comboChance:.52}];function $u(r){let e=r>>>0;return()=>{e+=1831565813;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const ec=(r,e,t)=>Math.max(e,Math.min(t,r));class Zu{constructor({seed:e=Date.now()}={}){this.seed=e,this.events=[],this.reset("menu")}reset(e="playing"){this.random=$u(this.seed),this.phase=e,this.shift=0,this.score=0,this.lives=3,this.combo=0,this.maxCombo=0,this.comboDeadline=0,this.elapsed=0,this.deliveries=0,this.served=0,this.missed=0,this.wrong=0,this.wasted=0,this.nextId=1,this.customers=[],this.projectiles=[],this.player={lane:1,targetLane:1,z:0,facing:0,walking:!1,held:null,cooldown:0,pending:!1,gesture:"Idle",gestureTime:0},this.wave={spawned:0,resolved:0,served:0,clock:.9},this.events=[],this.emit(e==="playing"?"start":e)}start(){this.reset("intro")}beginShift(e=0){return this.phase!=="intro"?!1:(this.player.facing=Number.isFinite(e)?e:0,this.phase="playing",this.emit(this.shift===0?"start":"shift",{shift:this.shift}),!0)}emit(e,t={}){this.events.push({type:e,time:this.elapsed,...t})}takeEvents(){return this.events.splice(0)}get moving(){return Math.abs(this.player.z-Wt[this.player.targetLane])>.035}get shiftConfig(){return Ql[this.shift]}selectLane(e){return this.phase!=="playing"?!1:(this.player.targetLane=ec(Math.round(e),0,2),this.emit("move",{lane:this.player.targetLane}),!0)}move(e){return this.selectLane(this.player.targetLane+e)}requestAction(){return this.phase!=="playing"?!1:this.moving||this.player.cooldown>0?(this.player.pending=!0,!0):this.act()}act(){const e=this.player;if(this.phase!=="playing"||this.moving||e.cooldown>0)return!1;if(e.pending=!1,e.lane=e.targetLane,e.cooldown=.36,!e.held)e.held=Ji[e.lane],e.gesture="Carry",e.gestureTime=.4,this.emit("pickup",{lane:e.lane,food:e.held});else{const t=e.held;e.held=null,e.gesture="Serve",e.gestureTime=.58,this.projectiles.push({id:this.nextId++,lane:e.lane,food:t,x:-1.45,age:0}),this.emit("throw",{lane:e.lane,food:t})}return!0}discard(){if(this.phase!=="playing"||!this.player.held)return!1;const e=this.player.held;return this.player.held=null,this.player.pending=!1,this.player.gesture="Idle",this.wasted++,this.combo=0,this.emit("discard",{food:e}),!0}pause(){return this.phase!=="playing"?!1:(this.phase="paused",this.emit("pause"),!0)}resume(){return this.phase!=="paused"?!1:(this.phase="playing",this.emit("resume"),!0)}nextShift(){return this.phase!=="intermission"?!1:(this.shift++,this.phase="intro",this.wave={spawned:0,resolved:0,served:0,clock:1},this.projectiles=[],this.customers=[],this.player.held=null,this.player.pending=!1,this.player.gesture="Idle",this.player.gestureTime=0,this.player.facing=0,this.player.walking=!1,this.combo=0,this.emit("intro",{shift:this.shift}),!0)}leading(e){return this.customers.filter(t=>t.lane===e&&t.state==="waiting").sort((t,n)=>t.x-n.x)[0]||null}spawn(){const e=[0,1,2].map(o=>this.customers.filter(l=>l.lane===o&&l.state==="waiting").length);let t;if(this.shift===0&&this.wave.spawned<3)t=[1,0,2][this.wave.spawned];else{const o=Math.min(...e),l=[0,1,2].filter(c=>e[c]<=o+1&&e[c]<3);if(!l.length)return!1;t=l[Math.floor(this.random()*l.length)]}if(e[t]>=3)return!1;let n;this.shift===0&&this.wave.spawned<3?n=["burger","fries","cola"][this.wave.spawned]:n=Ji[Math.floor(this.random()*3)];const i=[n];if(this.random()<this.shiftConfig.comboChance){const o=Ji.filter(l=>l!==n);i.push(o[Math.floor(this.random()*o.length)]),this.shift===2&&this.random()<.16&&i.push(Ji.find(l=>!i.includes(l)))}const s=Math.max(7.7,...this.customers.filter(o=>o.lane===t&&o.state==="waiting").map(o=>o.x)),a={id:this.nextId++,lane:t,x:s+.9,startX:s+.9,order:i,originalOrder:[...i],state:"waiting",age:0,speed:this.shiftConfig.speed*(.9+this.random()*.2),variant:Math.floor(this.random()*6),response:0,frustration:0};return this.customers.push(a),this.wave.spawned++,this.emit("customer",{id:a.id,lane:t,order:[...i]}),!0}accept(e,t){const n=e.order.indexOf(t.food);if(n===-1){this.wrong++,this.combo=0,e.frustration+=.15,e.x=Math.max(-1,e.x-.45),e.response=1.2,this.emit("wrong",{id:e.id,lane:e.lane,food:t.food,wanted:[...e.order]});return}e.order.splice(n,1),this.deliveries++,this.combo++,this.maxCombo=Math.max(this.maxCombo,this.combo),this.comboDeadline=this.elapsed+11;const i=ec((e.x+1.25)/9.8,0,1),s=100+Math.round(i*40)+Math.min(this.combo-1,5)*10;this.score+=s,e.response=.8,e.order.length?(e.x+=.18,this.emit("partial",{id:e.id,lane:e.lane,points:s,wanted:[...e.order],x:e.x})):(e.state="happy",this.served++,this.wave.resolved++,this.wave.served++,this.emit("served",{id:e.id,lane:e.lane,points:s,combo:this.combo,x:e.x}))}step(e){if(this.phase!=="playing"||!Number.isFinite(e)||e<=0)return;e=Math.min(e,.05),this.elapsed+=e;const t=this.player;t.cooldown=Math.max(0,t.cooldown-e),t.gestureTime=Math.max(0,t.gestureTime-e);const n=Wt[t.targetLane];if(Ku(t,n,e),this.moving||(t.z=n,t.lane=t.targetLane,t.pending&&!t.cooldown&&this.act()),t.gestureTime||(t.gesture=t.held?"Carry":"Idle"),this.elapsed>this.comboDeadline&&(this.combo=0),this.wave.clock-=e,this.wave.spawned<this.shiftConfig.customers&&this.wave.clock<=0){const i=this.spawn();this.wave.clock=i?this.shiftConfig.interval:.6}for(const i of this.customers)if(i.age+=e,i.response=Math.max(0,i.response-e),i.state==="waiting"){const s=this.customers.filter(a=>a.lane===i.lane&&a.state==="waiting"&&a.id!==i.id&&a.x<i.x).sort((a,o)=>o.x-a.x)[0];i.x=Math.max(s?s.x+.9:-10,i.x-i.speed*(1+i.frustration)*e),i.x<=-1.25&&(i.state="angry",this.lives--,this.missed++,this.wave.resolved++,this.combo=0,this.emit("miss",{id:i.id,lane:i.lane}))}else i.x+=e*(i.state==="happy"?4:5);this.customers=this.customers.filter(i=>i.state==="waiting"||i.x<11.2);for(const i of this.projectiles){if(i.done)continue;i.age+=e,i.x+=e*9.2;const s=this.leading(i.lane);s&&i.x>=s.x-.23?(i.done=!0,this.accept(s,i)):i.x>10.5&&(i.done=!0,this.wasted++,this.combo=0,this.emit("waste",{lane:i.lane}))}this.projectiles=this.projectiles.filter(i=>!i.done),this.lives<=0?(this.lives=0,this.phase="lost",this.player.pending=!1,this.emit("lost",{score:this.score})):this.wave.spawned===this.shiftConfig.customers&&this.wave.resolved===this.shiftConfig.customers&&!this.projectiles.length&&(this.phase=this.shift===Ql.length-1?"won":"intermission",this.score+=250*this.lives,this.player.pending=!1,this.emit(this.phase,{score:this.score,shift:this.shift}))}}const xl="181",Ju=0,tc=1,Qu=2,Ih=1,Lh=2,Yn=3,Jn=0,jt=1,un=2,It=0,wi=1,fo=2,nc=3,ic=4,Dh=5,Mn=100,ed=101,td=102,nd=103,id=104,Ds=200,sd=201,rd=202,ad=203,po=204,mo=205,go=206,od=207,xo=208,ld=209,cd=210,hd=211,ud=212,dd=213,fd=214,_o=0,vo=1,yo=2,rs=3,bo=4,Mo=5,So=6,To=7,_l=0,pd=1,md=2,ui=0,Nh=1,Uh=2,Fh=3,vl=4,Oh=5,Bh=6,zh=7,sc="attached",gd="detached",kh=300,as=301,os=302,Eo=303,wo=304,ra=306,mn=1e3,Un=1001,$r=1002,Dt=1003,Vh=1004,Ns=1005,Xt=1006,Hr=1007,Kn=1008,wn=1009,Hh=1010,Gh=1011,Xs=1012,yl=1013,Ci=1014,En=1015,dn=1016,bl=1017,Ml=1018,ls=1020,Wh=35902,Xh=35899,qh=1021,jh=1022,sn=1023,qs=1026,cs=1027,Sl=1028,Tl=1029,El=1030,wl=1031,Al=1033,Gr=33776,Wr=33777,Xr=33778,qr=33779,Ao=35840,Ro=35841,Co=35842,Po=35843,Io=36196,Lo=37492,Do=37496,No=37808,Uo=37809,Fo=37810,Oo=37811,Bo=37812,zo=37813,ko=37814,Vo=37815,Ho=37816,Go=37817,Wo=37818,Xo=37819,qo=37820,jo=37821,Yo=36492,Ko=36494,$o=36495,Zo=36283,Jo=36284,Qo=36285,el=36286,Yh=2200,Kh=2201,xd=2202,js=2300,Pi=2301,xa=2302,Qi=2400,es=2401,Zr=2402,Rl=2500,_d=2501,vd=0,$h=1,tl=2,yd=3200,bd=3201,aa=0,Md=1,li="",gt="srgb",Yt="srgb-linear",Jr="linear",ct="srgb",Ui=7680,rc=519,Sd=512,Td=513,Ed=514,Zh=515,wd=516,Ad=517,Rd=518,Cd=519,nl=35044,Pd=35048,ac="300 es",Fn=2e3,Qr=2001;function Jh(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Ys(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Id(){const r=Ys("canvas");return r.style.display="block",r}const oc={};function ea(...r){const e="THREE."+r.shift();console.log(e,...r)}function De(...r){const e="THREE."+r.shift();console.warn(e,...r)}function Qe(...r){const e="THREE."+r.shift();console.error(e,...r)}function Ks(...r){const e=r.join(" ");e in oc||(oc[e]=!0,De(...r))}function Ld(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}class Li{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}}const Ut=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let lc=1234567;const zs=Math.PI/180,hs=180/Math.PI;function fn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ut[r&255]+Ut[r>>8&255]+Ut[r>>16&255]+Ut[r>>24&255]+"-"+Ut[e&255]+Ut[e>>8&255]+"-"+Ut[e>>16&15|64]+Ut[e>>24&255]+"-"+Ut[t&63|128]+Ut[t>>8&255]+"-"+Ut[t>>16&255]+Ut[t>>24&255]+Ut[n&255]+Ut[n>>8&255]+Ut[n>>16&255]+Ut[n>>24&255]).toLowerCase()}function Je(r,e,t){return Math.max(e,Math.min(t,r))}function Cl(r,e){return(r%e+e)%e}function Dd(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Nd(r,e,t){return r!==e?(t-r)/(e-r):0}function ks(r,e,t){return(1-t)*r+t*e}function Ud(r,e,t,n){return ks(r,e,1-Math.exp(-t*n))}function Fd(r,e=1){return e-Math.abs(Cl(r,e*2)-e)}function Od(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Bd(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function zd(r,e){return r+Math.floor(Math.random()*(e-r+1))}function kd(r,e){return r+Math.random()*(e-r)}function Vd(r){return r*(.5-Math.random())}function Hd(r){r!==void 0&&(lc=r);let e=lc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Gd(r){return r*zs}function Wd(r){return r*hs}function Xd(r){return(r&r-1)===0&&r!==0}function qd(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function jd(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Yd(r,e,t,n,i){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),h=a((e+n)/2),u=s((e-n)/2),d=a((e-n)/2),f=s((n-e)/2),m=a((n-e)/2);switch(i){case"XYX":r.set(o*h,l*u,l*d,o*c);break;case"YZY":r.set(l*d,o*h,l*u,o*c);break;case"ZXZ":r.set(l*u,l*d,o*h,o*c);break;case"XZX":r.set(o*h,l*m,l*f,o*c);break;case"YXY":r.set(l*f,o*h,l*m,o*c);break;case"ZYZ":r.set(l*m,l*f,o*h,o*c);break;default:De("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Sn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ht(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const qt={DEG2RAD:zs,RAD2DEG:hs,generateUUID:fn,clamp:Je,euclideanModulo:Cl,mapLinear:Dd,inverseLerp:Nd,lerp:ks,damp:Ud,pingpong:Fd,smoothstep:Od,smootherstep:Bd,randInt:zd,randFloat:kd,randFloatSpread:Vd,seededRandom:Hd,degToRad:Gd,radToDeg:Wd,isPowerOfTwo:Xd,ceilPowerOfTwo:qd,floorPowerOfTwo:jd,setQuaternionFromProperEuler:Yd,normalize:ht,denormalize:Sn};class ae{constructor(e=0,t=0){ae.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ut{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=s[a+0],f=s[a+1],m=s[a+2],x=s[a+3];if(o<=0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o>=1){e[t+0]=d,e[t+1]=f,e[t+2]=m,e[t+3]=x;return}if(u!==x||l!==d||c!==f||h!==m){let g=l*d+c*f+h*m+u*x;g<0&&(d=-d,f=-f,m=-m,x=-x,g=-g);let p=1-o;if(g<.9995){const v=Math.acos(g),y=Math.sin(v);p=Math.sin(p*v)/y,o=Math.sin(o*v)/y,l=l*p+d*o,c=c*p+f*o,h=h*p+m*o,u=u*p+x*o}else{l=l*p+d*o,c=c*p+f*o,h=h*p+m*o,u=u*p+x*o;const v=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=v,c*=v,h*=v,u*=v}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[a],d=s[a+1],f=s[a+2],m=s[a+3];return e[t]=o*m+h*u+l*f-c*d,e[t+1]=l*m+h*d+c*u-o*f,e[t+2]=c*m+h*f+o*d-l*u,e[t+3]=h*m-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(s/2),d=l(n/2),f=l(i/2),m=l(s/2);switch(a){case"XYZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"YZX":this._x=d*h*u+c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u-d*f*m;break;case"XZY":this._x=d*h*u-c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u+d*f*m;break;default:De("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(a-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(s-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Je(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-s*l,this._y=i*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let n=e._x,i=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(e=0,t=0,n=0){I.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(cc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(cc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-s*u,this.z=i+l*u+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return _a.copy(this).projectOnVector(e),this.sub(_a)}reflect(e){return this.sub(_a.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const _a=new I,cc=new ut;class je{constructor(e,t,n,i,s,a,o,l,c){je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],x=i[0],g=i[3],p=i[6],v=i[1],y=i[4],M=i[7],R=i[2],E=i[5],P=i[8];return s[0]=a*x+o*v+l*R,s[3]=a*g+o*y+l*E,s[6]=a*p+o*M+l*P,s[1]=c*x+h*v+u*R,s[4]=c*g+h*y+u*E,s[7]=c*p+h*M+u*P,s[2]=d*x+f*v+m*R,s[5]=d*g+f*y+m*E,s[8]=d*p+f*M+m*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+i*s*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*s,f=c*s-a*l,m=t*u+n*d+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return e[0]=u*x,e[1]=(i*c-h*n)*x,e[2]=(o*n-i*a)*x,e[3]=d*x,e[4]=(h*t-i*l)*x,e[5]=(i*s-o*t)*x,e[6]=f*x,e[7]=(n*l-c*t)*x,e[8]=(a*t-n*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(va.makeScale(e,t)),this}rotate(e){return this.premultiply(va.makeRotation(-e)),this}translate(e,t){return this.premultiply(va.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const va=new je,hc=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),uc=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Kd(){const r={enabled:!0,workingColorSpace:Yt,spaces:{},convert:function(i,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ct&&(i.r=Zn(i.r),i.g=Zn(i.g),i.b=Zn(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ct&&(i.r=ns(i.r),i.g=ns(i.g),i.b=ns(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===li?Jr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Ks("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Ks("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Yt]:{primaries:e,whitePoint:n,transfer:Jr,toXYZ:hc,fromXYZ:uc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:gt},outputColorSpaceConfig:{drawingBufferColorSpace:gt}},[gt]:{primaries:e,whitePoint:n,transfer:ct,toXYZ:hc,fromXYZ:uc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:gt}}}),r}const it=Kd();function Zn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function ns(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Fi;class $d{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Fi===void 0&&(Fi=Ys("canvas")),Fi.width=e.width,Fi.height=e.height;const i=Fi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Fi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ys("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=Zn(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Zn(t[n]/255)*255):t[n]=Zn(t[n]);return{data:t,width:e.width,height:e.height}}else return De("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Zd=0;class Pl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Zd++}),this.uuid=fn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(ya(i[a].image)):s.push(ya(i[a]))}else s=ya(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function ya(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?$d.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(De("Texture: Unable to serialize Texture."),{})}let Jd=0;const ba=new I;class At extends Li{constructor(e=At.DEFAULT_IMAGE,t=At.DEFAULT_MAPPING,n=Un,i=Un,s=Xt,a=Kn,o=sn,l=wn,c=At.DEFAULT_ANISOTROPY,h=li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Jd++}),this.uuid=fn(),this.name="",this.source=new Pl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ae(0,0),this.repeat=new ae(1,1),this.center=new ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ba).x}get height(){return this.source.getSize(ba).y}get depth(){return this.source.getSize(ba).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){De(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){De(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==kh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case mn:e.x=e.x-Math.floor(e.x);break;case Un:e.x=e.x<0?0:1;break;case $r:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case mn:e.y=e.y-Math.floor(e.y);break;case Un:e.y=e.y<0?0:1;break;case $r:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}At.DEFAULT_IMAGE=null;At.DEFAULT_MAPPING=kh;At.DEFAULT_ANISOTROPY=1;class ot{constructor(e=0,t=0,n=0,i=1){ot.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],m=l[9],x=l[2],g=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,M=(f+1)/2,R=(p+1)/2,E=(h+d)/4,P=(u+x)/4,N=(m+g)/4;return y>M&&y>R?y<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(y),i=E/n,s=P/n):M>R?M<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(M),n=E/i,s=N/i):R<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(R),n=P/s,i=N/s),this.set(n,i,s,t),this}let v=Math.sqrt((g-m)*(g-m)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(g-m)/v,this.y=(u-x)/v,this.z=(d-h)/v,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this.w=Je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this.w=Je(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Qd extends Li{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ot(0,0,e,t),this.scissorTest=!1,this.viewport=new ot(0,0,e,t);const i={width:e,height:t,depth:n.depth},s=new At(i);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Xt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Pl(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class rn extends Qd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Qh extends At{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=Un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ef extends At{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=Un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Qn{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(xn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(xn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=xn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,xn):xn.fromBufferAttribute(s,a),xn.applyMatrix4(e.matrixWorld),this.expandByPoint(xn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),sr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),sr.copy(n.boundingBox)),sr.applyMatrix4(e.matrixWorld),this.union(sr)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,xn),xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ms),rr.subVectors(this.max,Ms),Oi.subVectors(e.a,Ms),Bi.subVectors(e.b,Ms),zi.subVectors(e.c,Ms),ei.subVectors(Bi,Oi),ti.subVectors(zi,Bi),mi.subVectors(Oi,zi);let t=[0,-ei.z,ei.y,0,-ti.z,ti.y,0,-mi.z,mi.y,ei.z,0,-ei.x,ti.z,0,-ti.x,mi.z,0,-mi.x,-ei.y,ei.x,0,-ti.y,ti.x,0,-mi.y,mi.x,0];return!Ma(t,Oi,Bi,zi,rr)||(t=[1,0,0,0,1,0,0,0,1],!Ma(t,Oi,Bi,zi,rr))?!1:(ar.crossVectors(ei,ti),t=[ar.x,ar.y,ar.z],Ma(t,Oi,Bi,zi,rr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(xn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Vn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Vn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Vn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Vn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Vn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Vn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Vn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Vn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Vn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Vn=[new I,new I,new I,new I,new I,new I,new I,new I],xn=new I,sr=new Qn,Oi=new I,Bi=new I,zi=new I,ei=new I,ti=new I,mi=new I,Ms=new I,rr=new I,ar=new I,gi=new I;function Ma(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){gi.fromArray(r,s);const o=i.x*Math.abs(gi.x)+i.y*Math.abs(gi.y)+i.z*Math.abs(gi.z),l=e.dot(gi),c=t.dot(gi),h=n.dot(gi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const tf=new Qn,Ss=new I,Sa=new I;class Bn{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):tf.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ss.subVectors(e,this.center);const t=Ss.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ss,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Sa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ss.copy(e.center).add(Sa)),this.expandByPoint(Ss.copy(e.center).sub(Sa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Hn=new I,Ta=new I,or=new I,ni=new I,Ea=new I,lr=new I,wa=new I;class oa{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Hn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Hn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Hn.copy(this.origin).addScaledVector(this.direction,t),Hn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Ta.copy(e).add(t).multiplyScalar(.5),or.copy(t).sub(e).normalize(),ni.copy(this.origin).sub(Ta);const s=e.distanceTo(t)*.5,a=-this.direction.dot(or),o=ni.dot(this.direction),l=-ni.dot(or),c=ni.lengthSq(),h=Math.abs(1-a*a);let u,d,f,m;if(h>0)if(u=a*l-o,d=a*o-l,m=s*h,u>=0)if(d>=-m)if(d<=m){const x=1/h;u*=x,d*=x,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Ta).addScaledVector(or,d),f}intersectSphere(e,t){Hn.subVectors(e.center,this.origin);const n=Hn.dot(this.direction),i=Hn.dot(Hn)-n*n,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Hn)!==null}intersectTriangle(e,t,n,i,s){Ea.subVectors(t,e),lr.subVectors(n,e),wa.crossVectors(Ea,lr);let a=this.direction.dot(wa),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ni.subVectors(this.origin,e);const l=o*this.direction.dot(lr.crossVectors(ni,lr));if(l<0)return null;const c=o*this.direction.dot(Ea.cross(ni));if(c<0||l+c>a)return null;const h=-o*ni.dot(wa);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ge{constructor(e,t,n,i,s,a,o,l,c,h,u,d,f,m,x,g){Ge.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,h,u,d,f,m,x,g)}set(e,t,n,i,s,a,o,l,c,h,u,d,f,m,x,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ge().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/ki.setFromMatrixColumn(e,0).length(),s=1/ki.setFromMatrixColumn(e,1).length(),a=1/ki.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=a*h,f=a*u,m=o*h,x=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+m*c,t[5]=d-x*c,t[9]=-o*l,t[2]=x-d*c,t[6]=m+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,m=c*h,x=c*u;t[0]=d+x*o,t[4]=m*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-m,t[6]=x+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,m=c*h,x=c*u;t[0]=d-x*o,t[4]=-a*u,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*h,t[9]=x-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,f=a*u,m=o*h,x=o*u;t[0]=l*h,t[4]=m*c-f,t[8]=d*c+x,t[1]=l*u,t[5]=x*c+d,t[9]=f*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,m=o*l,x=o*c;t[0]=l*h,t[4]=x-d*u,t[8]=m*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+m,t[10]=d-x*u}else if(e.order==="XZY"){const d=a*l,f=a*c,m=o*l,x=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+x,t[5]=a*h,t[9]=f*u-m,t[2]=m*u-f,t[6]=o*h,t[10]=x*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(nf,e,sf)}lookAt(e,t,n){const i=this.elements;return en.subVectors(e,t),en.lengthSq()===0&&(en.z=1),en.normalize(),ii.crossVectors(n,en),ii.lengthSq()===0&&(Math.abs(n.z)===1?en.x+=1e-4:en.z+=1e-4,en.normalize(),ii.crossVectors(n,en)),ii.normalize(),cr.crossVectors(en,ii),i[0]=ii.x,i[4]=cr.x,i[8]=en.x,i[1]=ii.y,i[5]=cr.y,i[9]=en.y,i[2]=ii.z,i[6]=cr.z,i[10]=en.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],x=n[6],g=n[10],p=n[14],v=n[3],y=n[7],M=n[11],R=n[15],E=i[0],P=i[4],N=i[8],T=i[12],b=i[1],C=i[5],F=i[9],z=i[13],Y=i[2],V=i[6],j=i[10],J=i[14],q=i[3],se=i[7],le=i[11],Me=i[15];return s[0]=a*E+o*b+l*Y+c*q,s[4]=a*P+o*C+l*V+c*se,s[8]=a*N+o*F+l*j+c*le,s[12]=a*T+o*z+l*J+c*Me,s[1]=h*E+u*b+d*Y+f*q,s[5]=h*P+u*C+d*V+f*se,s[9]=h*N+u*F+d*j+f*le,s[13]=h*T+u*z+d*J+f*Me,s[2]=m*E+x*b+g*Y+p*q,s[6]=m*P+x*C+g*V+p*se,s[10]=m*N+x*F+g*j+p*le,s[14]=m*T+x*z+g*J+p*Me,s[3]=v*E+y*b+M*Y+R*q,s[7]=v*P+y*C+M*V+R*se,s[11]=v*N+y*F+M*j+R*le,s[15]=v*T+y*z+M*J+R*Me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],m=e[3],x=e[7],g=e[11],p=e[15];return m*(+s*l*u-i*c*u-s*o*d+n*c*d+i*o*f-n*l*f)+x*(+t*l*f-t*c*d+s*a*d-i*a*f+i*c*h-s*l*h)+g*(+t*c*u-t*o*f-s*a*u+n*a*f+s*o*h-n*c*h)+p*(-i*o*h-t*l*u+t*o*d+i*a*u-n*a*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],m=e[12],x=e[13],g=e[14],p=e[15],v=u*g*c-x*d*c+x*l*f-o*g*f-u*l*p+o*d*p,y=m*d*c-h*g*c-m*l*f+a*g*f+h*l*p-a*d*p,M=h*x*c-m*u*c+m*o*f-a*x*f-h*o*p+a*u*p,R=m*u*l-h*x*l-m*o*d+a*x*d+h*o*g-a*u*g,E=t*v+n*y+i*M+s*R;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/E;return e[0]=v*P,e[1]=(x*d*s-u*g*s-x*i*f+n*g*f+u*i*p-n*d*p)*P,e[2]=(o*g*s-x*l*s+x*i*c-n*g*c-o*i*p+n*l*p)*P,e[3]=(u*l*s-o*d*s-u*i*c+n*d*c+o*i*f-n*l*f)*P,e[4]=y*P,e[5]=(h*g*s-m*d*s+m*i*f-t*g*f-h*i*p+t*d*p)*P,e[6]=(m*l*s-a*g*s-m*i*c+t*g*c+a*i*p-t*l*p)*P,e[7]=(a*d*s-h*l*s+h*i*c-t*d*c-a*i*f+t*l*f)*P,e[8]=M*P,e[9]=(m*u*s-h*x*s-m*n*f+t*x*f+h*n*p-t*u*p)*P,e[10]=(a*x*s-m*o*s+m*n*c-t*x*c-a*n*p+t*o*p)*P,e[11]=(h*o*s-a*u*s-h*n*c+t*u*c+a*n*f-t*o*f)*P,e[12]=R*P,e[13]=(h*x*i-m*u*i+m*n*d-t*x*d-h*n*g+t*u*g)*P,e[14]=(m*o*i-a*x*i-m*n*l+t*x*l+a*n*g-t*o*g)*P,e[15]=(a*u*i-h*o*i+h*n*l-t*u*l-a*n*d+t*o*d)*P,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,u=o+o,d=s*c,f=s*h,m=s*u,x=a*h,g=a*u,p=o*u,v=l*c,y=l*h,M=l*u,R=n.x,E=n.y,P=n.z;return i[0]=(1-(x+p))*R,i[1]=(f+M)*R,i[2]=(m-y)*R,i[3]=0,i[4]=(f-M)*E,i[5]=(1-(d+p))*E,i[6]=(g+v)*E,i[7]=0,i[8]=(m+y)*P,i[9]=(g-v)*P,i[10]=(1-(d+x))*P,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=ki.set(i[0],i[1],i[2]).length();const a=ki.set(i[4],i[5],i[6]).length(),o=ki.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],_n.copy(this);const c=1/s,h=1/a,u=1/o;return _n.elements[0]*=c,_n.elements[1]*=c,_n.elements[2]*=c,_n.elements[4]*=h,_n.elements[5]*=h,_n.elements[6]*=h,_n.elements[8]*=u,_n.elements[9]*=u,_n.elements[10]*=u,t.setFromRotationMatrix(_n),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=Fn,l=!1){const c=this.elements,h=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let m,x;if(l)m=s/(a-s),x=a*s/(a-s);else if(o===Fn)m=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===Qr)m=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=Fn,l=!1){const c=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i);let m,x;if(l)m=1/(a-s),x=a/(a-s);else if(o===Fn)m=-2/(a-s),x=-(a+s)/(a-s);else if(o===Qr)m=-1/(a-s),x=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ki=new I,_n=new Ge,nf=new I(0,0,0),sf=new I(1,1,1),ii=new I,cr=new I,en=new I,dc=new Ge,fc=new ut;class an{constructor(e=0,t=0,n=0,i=an.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Je(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Je(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:De("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return dc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(dc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return fc.setFromEuler(this),this.setFromQuaternion(fc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}an.DEFAULT_ORDER="XYZ";class eu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let rf=0;const pc=new I,Vi=new ut,Gn=new Ge,hr=new I,Ts=new I,af=new I,of=new ut,mc=new I(1,0,0),gc=new I(0,1,0),xc=new I(0,0,1),_c={type:"added"},lf={type:"removed"},Hi={type:"childadded",child:null},Aa={type:"childremoved",child:null};class mt extends Li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:rf++}),this.uuid=fn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mt.DEFAULT_UP.clone();const e=new I,t=new an,n=new ut,i=new I(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ge},normalMatrix:{value:new je}}),this.matrix=new Ge,this.matrixWorld=new Ge,this.matrixAutoUpdate=mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new eu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.multiply(Vi),this}rotateOnWorldAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.premultiply(Vi),this}rotateX(e){return this.rotateOnAxis(mc,e)}rotateY(e){return this.rotateOnAxis(gc,e)}rotateZ(e){return this.rotateOnAxis(xc,e)}translateOnAxis(e,t){return pc.copy(e).applyQuaternion(this.quaternion),this.position.add(pc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(mc,e)}translateY(e){return this.translateOnAxis(gc,e)}translateZ(e){return this.translateOnAxis(xc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Gn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?hr.copy(e):hr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ts.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Gn.lookAt(Ts,hr,this.up):Gn.lookAt(hr,Ts,this.up),this.quaternion.setFromRotationMatrix(Gn),i&&(Gn.extractRotation(i.matrixWorld),Vi.setFromRotationMatrix(Gn),this.quaternion.premultiply(Vi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(_c),Hi.child=e,this.dispatchEvent(Hi),Hi.child=null):Qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(lf),Aa.child=e,this.dispatchEvent(Aa),Aa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Gn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Gn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Gn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(_c),Hi.child=e,this.dispatchEvent(Hi),Hi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ts,e,af),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ts,of,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}mt.DEFAULT_UP=new I(0,1,0);mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const vn=new I,Wn=new I,Ra=new I,Xn=new I,Gi=new I,Wi=new I,vc=new I,Ca=new I,Pa=new I,Ia=new I,La=new ot,Da=new ot,Na=new ot;class Tn{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),vn.subVectors(e,t),i.cross(vn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){vn.subVectors(i,t),Wn.subVectors(n,t),Ra.subVectors(e,t);const a=vn.dot(vn),o=vn.dot(Wn),l=vn.dot(Ra),c=Wn.dot(Wn),h=Wn.dot(Ra),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,m=(a*h-o*l)*d;return s.set(1-f-m,m,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Xn)===null?!1:Xn.x>=0&&Xn.y>=0&&Xn.x+Xn.y<=1}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,Xn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Xn.x),l.addScaledVector(a,Xn.y),l.addScaledVector(o,Xn.z),l)}static getInterpolatedAttribute(e,t,n,i,s,a){return La.setScalar(0),Da.setScalar(0),Na.setScalar(0),La.fromBufferAttribute(e,t),Da.fromBufferAttribute(e,n),Na.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(La,s.x),a.addScaledVector(Da,s.y),a.addScaledVector(Na,s.z),a}static isFrontFacing(e,t,n,i){return vn.subVectors(n,t),Wn.subVectors(e,t),vn.cross(Wn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return vn.subVectors(this.c,this.b),Wn.subVectors(this.a,this.b),vn.cross(Wn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Tn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Tn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return Tn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Tn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Tn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let a,o;Gi.subVectors(i,n),Wi.subVectors(s,n),Ca.subVectors(e,n);const l=Gi.dot(Ca),c=Wi.dot(Ca);if(l<=0&&c<=0)return t.copy(n);Pa.subVectors(e,i);const h=Gi.dot(Pa),u=Wi.dot(Pa);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Gi,a);Ia.subVectors(e,s);const f=Gi.dot(Ia),m=Wi.dot(Ia);if(m>=0&&f<=m)return t.copy(s);const x=f*c-l*m;if(x<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(Wi,o);const g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return vc.subVectors(s,i),o=(u-h)/(u-h+(f-m)),t.copy(i).addScaledVector(vc,o);const p=1/(g+x+d);return a=x*p,o=d*p,t.copy(n).addScaledVector(Gi,a).addScaledVector(Wi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const tu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},si={h:0,s:0,l:0},ur={h:0,s:0,l:0};function Ua(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Ne{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=gt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=it.workingColorSpace){return this.r=e,this.g=t,this.b=n,it.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=it.workingColorSpace){if(e=Cl(e,1),t=Je(t,0,1),n=Je(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Ua(a,s,e+1/3),this.g=Ua(a,s,e),this.b=Ua(a,s,e-1/3)}return it.colorSpaceToWorking(this,i),this}setStyle(e,t=gt){function n(s){s!==void 0&&parseFloat(s)<1&&De("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:De("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);De("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=gt){const n=tu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):De("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Zn(e.r),this.g=Zn(e.g),this.b=Zn(e.b),this}copyLinearToSRGB(e){return this.r=ns(e.r),this.g=ns(e.g),this.b=ns(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=gt){return it.workingToColorSpace(Ft.copy(this),e),Math.round(Je(Ft.r*255,0,255))*65536+Math.round(Je(Ft.g*255,0,255))*256+Math.round(Je(Ft.b*255,0,255))}getHexString(e=gt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=it.workingColorSpace){it.workingToColorSpace(Ft.copy(this),t);const n=Ft.r,i=Ft.g,s=Ft.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=it.workingColorSpace){return it.workingToColorSpace(Ft.copy(this),t),e.r=Ft.r,e.g=Ft.g,e.b=Ft.b,e}getStyle(e=gt){it.workingToColorSpace(Ft.copy(this),e);const t=Ft.r,n=Ft.g,i=Ft.b;return e!==gt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(si),this.setHSL(si.h+e,si.s+t,si.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(si),e.getHSL(ur);const n=ks(si.h,ur.h,t),i=ks(si.s,ur.s,t),s=ks(si.l,ur.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ft=new Ne;Ne.NAMES=tu;let cf=0;class pn extends Li{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cf++}),this.uuid=fn(),this.name="",this.type="Material",this.blending=wi,this.side=Jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=po,this.blendDst=mo,this.blendEquation=Mn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ne(0,0,0),this.blendAlpha=0,this.depthFunc=rs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ui,this.stencilZFail=Ui,this.stencilZPass=Ui,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){De(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){De(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==wi&&(n.blending=this.blending),this.side!==Jn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==po&&(n.blendSrc=this.blendSrc),this.blendDst!==mo&&(n.blendDst=this.blendDst),this.blendEquation!==Mn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==rs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==rc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ui&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ui&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ui&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class On extends pn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.combine=_l,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const wt=new I,dr=new ae;let hf=0;class Bt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:hf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=nl,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)dr.fromBufferAttribute(this,t),dr.applyMatrix3(e),this.setXY(t,dr.x,dr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix3(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Sn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ht(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Sn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Sn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Sn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Sn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array),s=ht(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==nl&&(e.usage=this.usage),e}}class nu extends Bt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class iu extends Bt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class vt extends Bt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let uf=0;const ln=new Ge,Fa=new mt,Xi=new I,tn=new Qn,Es=new Qn,Pt=new I;class Nt extends Li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:uf++}),this.uuid=fn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Jh(e)?iu:nu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new je().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ln.makeRotationFromQuaternion(e),this.applyMatrix4(ln),this}rotateX(e){return ln.makeRotationX(e),this.applyMatrix4(ln),this}rotateY(e){return ln.makeRotationY(e),this.applyMatrix4(ln),this}rotateZ(e){return ln.makeRotationZ(e),this.applyMatrix4(ln),this}translate(e,t,n){return ln.makeTranslation(e,t,n),this.applyMatrix4(ln),this}scale(e,t,n){return ln.makeScale(e,t,n),this.applyMatrix4(ln),this}lookAt(e){return Fa.lookAt(e),Fa.updateMatrix(),this.applyMatrix4(Fa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xi).negate(),this.translate(Xi.x,Xi.y,Xi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new vt(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&De("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];tn.setFromBufferAttribute(s),this.morphTargetsRelative?(Pt.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(Pt),Pt.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(Pt)):(this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(tn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Es.setFromBufferAttribute(o),this.morphTargetsRelative?(Pt.addVectors(tn.min,Es.min),tn.expandByPoint(Pt),Pt.addVectors(tn.max,Es.max),tn.expandByPoint(Pt)):(tn.expandByPoint(Es.min),tn.expandByPoint(Es.max))}tn.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)Pt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Pt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Pt.fromBufferAttribute(o,c),l&&(Xi.fromBufferAttribute(e,c),Pt.add(Xi)),i=Math.max(i,n.distanceToSquared(Pt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Bt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let N=0;N<n.count;N++)o[N]=new I,l[N]=new I;const c=new I,h=new I,u=new I,d=new ae,f=new ae,m=new ae,x=new I,g=new I;function p(N,T,b){c.fromBufferAttribute(n,N),h.fromBufferAttribute(n,T),u.fromBufferAttribute(n,b),d.fromBufferAttribute(s,N),f.fromBufferAttribute(s,T),m.fromBufferAttribute(s,b),h.sub(c),u.sub(c),f.sub(d),m.sub(d);const C=1/(f.x*m.y-m.x*f.y);isFinite(C)&&(x.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(C),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(C),o[N].add(x),o[T].add(x),o[b].add(x),l[N].add(g),l[T].add(g),l[b].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let N=0,T=v.length;N<T;++N){const b=v[N],C=b.start,F=b.count;for(let z=C,Y=C+F;z<Y;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const y=new I,M=new I,R=new I,E=new I;function P(N){R.fromBufferAttribute(i,N),E.copy(R);const T=o[N];y.copy(T),y.sub(R.multiplyScalar(R.dot(T))).normalize(),M.crossVectors(E,T);const C=M.dot(l[N])<0?-1:1;a.setXYZW(N,y.x,y.y,y.z,C)}for(let N=0,T=v.length;N<T;++N){const b=v[N],C=b.start,F=b.count;for(let z=C,Y=C+F;z<Y;z+=3)P(e.getX(z+0)),P(e.getX(z+1)),P(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Bt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new I,s=new I,a=new I,o=new I,l=new I,c=new I,h=new I,u=new I;if(e)for(let d=0,f=e.count;d<f;d+=3){const m=e.getX(d+0),x=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,m),s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Pt.fromBufferAttribute(e,t),Pt.normalize(),e.setXYZ(t,Pt.x,Pt.y,Pt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,m=0;for(let x=0,g=l.length;x<g;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*h;for(let p=0;p<h;p++)d[m++]=c[f++]}return new Bt(d,h,u)}if(this.index===null)return De("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Nt,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const yc=new Ge,xi=new oa,fr=new Bn,bc=new I,pr=new I,mr=new I,gr=new I,Oa=new I,xr=new I,Mc=new I,_r=new I;class _t extends mt{constructor(e=new Nt,t=new On){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){xr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],u=s[l];h!==0&&(Oa.fromBufferAttribute(u,e),a?xr.addScaledVector(Oa,h):xr.addScaledVector(Oa.sub(t),h))}t.add(xr)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),fr.copy(n.boundingSphere),fr.applyMatrix4(s),xi.copy(e.ray).recast(e.near),!(fr.containsPoint(xi.origin)===!1&&(xi.intersectSphere(fr,bc)===null||xi.origin.distanceToSquared(bc)>(e.far-e.near)**2))&&(yc.copy(s).invert(),xi.copy(e.ray).applyMatrix4(yc),!(n.boundingBox!==null&&xi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,xi)))}_computeIntersections(e,t,n){let i;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,x=d.length;m<x;m++){const g=d[m],p=a[g.materialIndex],v=Math.max(g.start,f.start),y=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let M=v,R=y;M<R;M+=3){const E=o.getX(M),P=o.getX(M+1),N=o.getX(M+2);i=vr(this,p,e,n,c,h,u,E,P,N),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){const v=o.getX(g),y=o.getX(g+1),M=o.getX(g+2);i=vr(this,a,e,n,c,h,u,v,y,M),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,x=d.length;m<x;m++){const g=d[m],p=a[g.materialIndex],v=Math.max(g.start,f.start),y=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let M=v,R=y;M<R;M+=3){const E=M,P=M+1,N=M+2;i=vr(this,p,e,n,c,h,u,E,P,N),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){const v=g,y=g+1,M=g+2;i=vr(this,a,e,n,c,h,u,v,y,M),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function df(r,e,t,n,i,s,a,o){let l;if(e.side===jt?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,e.side===Jn,o),l===null)return null;_r.copy(o),_r.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(_r);return c<t.near||c>t.far?null:{distance:c,point:_r.clone(),object:r}}function vr(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,pr),r.getVertexPosition(l,mr),r.getVertexPosition(c,gr);const h=df(r,e,t,n,pr,mr,gr,Mc);if(h){const u=new I;Tn.getBarycoord(Mc,pr,mr,gr,u),i&&(h.uv=Tn.getInterpolatedAttribute(i,o,l,c,u,new ae)),s&&(h.uv1=Tn.getInterpolatedAttribute(s,o,l,c,u,new ae)),a&&(h.normal=Tn.getInterpolatedAttribute(a,o,l,c,u,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new I,materialIndex:0};Tn.getNormal(pr,mr,gr,d.normal),h.face=d,h.barycoord=u}return h}class di extends Nt{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,i,a,2),m("x","z","y",1,-1,e,n,-t,i,a,3),m("x","y","z",1,-1,e,t,n,i,s,4),m("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new vt(c,3)),this.setAttribute("normal",new vt(h,3)),this.setAttribute("uv",new vt(u,2));function m(x,g,p,v,y,M,R,E,P,N,T){const b=M/P,C=R/N,F=M/2,z=R/2,Y=E/2,V=P+1,j=N+1;let J=0,q=0;const se=new I;for(let le=0;le<j;le++){const Me=le*C-z;for(let ke=0;ke<V;ke++){const qe=ke*b-F;se[x]=qe*v,se[g]=Me*y,se[p]=Y,c.push(se.x,se.y,se.z),se[x]=0,se[g]=0,se[p]=E>0?1:-1,h.push(se.x,se.y,se.z),u.push(ke/P),u.push(1-le/N),J+=1}}for(let le=0;le<N;le++)for(let Me=0;Me<P;Me++){const ke=d+Me+V*le,qe=d+Me+V*(le+1),Ze=d+(Me+1)+V*(le+1),et=d+(Me+1)+V*le;l.push(ke,qe,et),l.push(qe,Ze,et),q+=6}o.addGroup(f,q,T),f+=q,d+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new di(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function us(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(De("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Vt(r){const e={};for(let t=0;t<r.length;t++){const n=us(r[t]);for(const i in n)e[i]=n[i]}return e}function ff(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function su(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:it.workingColorSpace}const Nn={clone:us,merge:Vt};var pf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Et extends pn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pf,this.fragmentShader=mf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=us(e.uniforms),this.uniformsGroups=ff(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class ru extends mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ge,this.projectionMatrix=new Ge,this.projectionMatrixInverse=new Ge,this.coordinateSystem=Fn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ri=new I,Sc=new ae,Tc=new ae;class Gt extends ru{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=hs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(zs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return hs*2*Math.atan(Math.tan(zs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ri.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ri.x,ri.y).multiplyScalar(-e/ri.z),ri.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ri.x,ri.y).multiplyScalar(-e/ri.z)}getViewSize(e,t){return this.getViewBounds(e,Sc,Tc),t.subVectors(Tc,Sc)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(zs*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const qi=-90,ji=1;class gf extends mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Gt(qi,ji,e,t);i.layers=this.layers,this.add(i);const s=new Gt(qi,ji,e,t);s.layers=this.layers,this.add(s);const a=new Gt(qi,ji,e,t);a.layers=this.layers,this.add(a);const o=new Gt(qi,ji,e,t);o.layers=this.layers,this.add(o);const l=new Gt(qi,ji,e,t);l.layers=this.layers,this.add(l);const c=new Gt(qi,ji,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Fn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Qr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class au extends At{constructor(e=[],t=as,n,i,s,a,o,l,c,h){super(e,t,n,i,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class xf extends rn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new au(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new di(5,5,5),s=new Et({name:"CubemapFromEquirect",uniforms:us(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:jt,blending:It});s.uniforms.tEquirect.value=t;const a=new _t(i,s),o=t.minFilter;return t.minFilter===Kn&&(t.minFilter=Xt),new gf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}}class Lt extends mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const _f={type:"move"};class Ba{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Lt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Lt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Lt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const g=t.getJointPose(x,n),p=this._getHandJoint(c,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(_f)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Lt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Il{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ne(e),this.near=t,this.far=n}clone(){return new Il(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ou extends mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new an,this.environmentIntensity=1,this.environmentRotation=new an,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class vf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=nl,this.updateRanges=[],this.version=0,this.uuid=fn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=fn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=fn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const kt=new I;class Ll{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix4(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyNormalMatrix(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.transformDirection(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Sn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ht(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Sn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Sn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Sn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Sn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),n=ht(n,this.array),i=ht(i,this.array),s=ht(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){ea("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Bt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ll(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ea("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Ec=new I,wc=new ot,Ac=new ot,yf=new I,Rc=new Ge,yr=new I,za=new Bn,Cc=new Ge,ka=new oa;class bf extends _t{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=sc,this.bindMatrix=new Ge,this.bindMatrixInverse=new Ge,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Qn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,yr),this.boundingBox.expandByPoint(yr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Bn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,yr),this.boundingSphere.expandByPoint(yr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),za.copy(this.boundingSphere),za.applyMatrix4(i),e.ray.intersectsSphere(za)!==!1&&(Cc.copy(i).invert(),ka.copy(e.ray).applyMatrix4(Cc),!(this.boundingBox!==null&&ka.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,ka)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new ot,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===sc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===gd?this.bindMatrixInverse.copy(this.bindMatrix).invert():De("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;wc.fromBufferAttribute(i.attributes.skinIndex,e),Ac.fromBufferAttribute(i.attributes.skinWeight,e),Ec.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const a=Ac.getComponent(s);if(a!==0){const o=wc.getComponent(s);Rc.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(yf.copy(Ec).applyMatrix4(Rc),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class lu extends mt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class er extends At{constructor(e=null,t=1,n=1,i,s,a,o,l,c=Dt,h=Dt,u,d){super(null,a,o,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Pc=new Ge,Mf=new Ge;class Dl{constructor(e=[],t=[]){this.uuid=fn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){De("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ge)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ge;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){const o=e[s]?e[s].matrixWorld:Mf;Pc.multiplyMatrices(o,t[s]),Pc.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Dl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new er(t,e,e,sn,En);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let a=t[s];a===void 0&&(De("Skeleton: No bone found with UUID:",s),a=new lu),this.bones.push(a),this.boneInverses.push(new Ge().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class il extends Bt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Yi=new Ge,Ic=new Ge,br=[],Lc=new Qn,Sf=new Ge,ws=new _t,As=new Bn;class la extends _t{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new il(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Sf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Qn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Yi),Lc.copy(e.boundingBox).applyMatrix4(Yi),this.boundingBox.union(Lc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Bn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Yi),As.copy(e.boundingSphere).applyMatrix4(Yi),this.boundingSphere.union(As)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(ws.geometry=this.geometry,ws.material=this.material,ws.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),As.copy(this.boundingSphere),As.applyMatrix4(n),e.ray.intersectsSphere(As)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Yi),Ic.multiplyMatrices(n,Yi),ws.matrixWorld=Ic,ws.raycast(e,br);for(let a=0,o=br.length;a<o;a++){const l=br[a];l.instanceId=s,l.object=this,t.push(l)}br.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new il(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new er(new Float32Array(i*this.count),i,this.count,Sl,En));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Va=new I,Tf=new I,Ef=new je;class Si{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Va.subVectors(n,t).cross(Tf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Va),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Ef.getNormalMatrix(e),i=this.coplanarPoint(Va).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const _i=new Bn,wf=new ae(.5,.5),Mr=new I;class Nl{constructor(e=new Si,t=new Si,n=new Si,i=new Si,s=new Si,a=new Si){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Fn,n=!1){const i=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],u=s[5],d=s[6],f=s[7],m=s[8],x=s[9],g=s[10],p=s[11],v=s[12],y=s[13],M=s[14],R=s[15];if(i[0].setComponents(c-a,f-h,p-m,R-v).normalize(),i[1].setComponents(c+a,f+h,p+m,R+v).normalize(),i[2].setComponents(c+o,f+u,p+x,R+y).normalize(),i[3].setComponents(c-o,f-u,p-x,R-y).normalize(),n)i[4].setComponents(l,d,g,M).normalize(),i[5].setComponents(c-l,f-d,p-g,R-M).normalize();else if(i[4].setComponents(c-l,f-d,p-g,R-M).normalize(),t===Fn)i[5].setComponents(c+l,f+d,p+g,R+M).normalize();else if(t===Qr)i[5].setComponents(l,d,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_i.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_i)}intersectsSprite(e){_i.center.set(0,0,0);const t=wf.distanceTo(e.center);return _i.radius=.7071067811865476+t,_i.applyMatrix4(e.matrixWorld),this.intersectsSphere(_i)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Mr.x=i.normal.x>0?e.max.x:e.min.x,Mr.y=i.normal.y>0?e.max.y:e.min.y,Mr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Mr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class cu extends pn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ne(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ta=new I,na=new I,Dc=new Ge,Rs=new oa,Sr=new Bn,Ha=new I,Nc=new I;class Ul extends mt{constructor(e=new Nt,t=new cu){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)ta.fromBufferAttribute(t,i-1),na.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=ta.distanceTo(na);e.setAttribute("lineDistance",new vt(n,1))}else De("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Sr.copy(n.boundingSphere),Sr.applyMatrix4(i),Sr.radius+=s,e.ray.intersectsSphere(Sr)===!1)return;Dc.copy(i).invert(),Rs.copy(e.ray).applyMatrix4(Dc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let x=f,g=m-1;x<g;x+=c){const p=h.getX(x),v=h.getX(x+1),y=Tr(this,e,Rs,l,p,v,x);y&&t.push(y)}if(this.isLineLoop){const x=h.getX(m-1),g=h.getX(f),p=Tr(this,e,Rs,l,x,g,m-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let x=f,g=m-1;x<g;x+=c){const p=Tr(this,e,Rs,l,x,x+1,x);p&&t.push(p)}if(this.isLineLoop){const x=Tr(this,e,Rs,l,m-1,f,m-1);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Tr(r,e,t,n,i,s,a){const o=r.geometry.attributes.position;if(ta.fromBufferAttribute(o,i),na.fromBufferAttribute(o,s),t.distanceSqToSegment(ta,na,Ha,Nc)>n)return;Ha.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Ha);if(!(c<e.near||c>e.far))return{distance:c,point:Nc.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}const Uc=new I,Fc=new I;class Af extends Ul{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Uc.fromBufferAttribute(t,i),Fc.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Uc.distanceTo(Fc);e.setAttribute("lineDistance",new vt(n,1))}else De("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Rf extends Ul{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class hu extends pn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Oc=new Ge,sl=new oa,Er=new Bn,wr=new I;class Cf extends mt{constructor(e=new Nt,t=new hu){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Er.copy(n.boundingSphere),Er.applyMatrix4(i),Er.radius+=s,e.ray.intersectsSphere(Er)===!1)return;Oc.copy(i).invert(),sl.copy(e.ray).applyMatrix4(Oc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=d,x=f;m<x;m++){const g=c.getX(m);wr.fromBufferAttribute(u,g),Bc(wr,g,l,i,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let m=d,x=f;m<x;m++)wr.fromBufferAttribute(u,m),Bc(wr,m,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Bc(r,e,t,n,i,s,a){const o=sl.distanceSqToPoint(r);if(o<t){const l=new I;sl.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class is extends At{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Fl extends At{constructor(e,t,n=Ci,i,s,a,o=Dt,l=Dt,c,h=qs,u=1){if(h!==qs&&h!==cs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,i,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Pl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class uu extends At{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ca extends Nt{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],f=[];let m=0;const x=[],g=n/2;let p=0;v(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new vt(u,3)),this.setAttribute("normal",new vt(d,3)),this.setAttribute("uv",new vt(f,2));function v(){const M=new I,R=new I;let E=0;const P=(t-e)/n;for(let N=0;N<=s;N++){const T=[],b=N/s,C=b*(t-e)+e;for(let F=0;F<=i;F++){const z=F/i,Y=z*l+o,V=Math.sin(Y),j=Math.cos(Y);R.x=C*V,R.y=-b*n+g,R.z=C*j,u.push(R.x,R.y,R.z),M.set(V,P,j).normalize(),d.push(M.x,M.y,M.z),f.push(z,1-b),T.push(m++)}x.push(T)}for(let N=0;N<i;N++)for(let T=0;T<s;T++){const b=x[T][N],C=x[T+1][N],F=x[T+1][N+1],z=x[T][N+1];(e>0||T!==0)&&(h.push(b,C,z),E+=3),(t>0||T!==s-1)&&(h.push(C,F,z),E+=3)}c.addGroup(p,E,0),p+=E}function y(M){const R=m,E=new ae,P=new I;let N=0;const T=M===!0?e:t,b=M===!0?1:-1;for(let F=1;F<=i;F++)u.push(0,g*b,0),d.push(0,b,0),f.push(.5,.5),m++;const C=m;for(let F=0;F<=i;F++){const Y=F/i*l+o,V=Math.cos(Y),j=Math.sin(Y);P.x=T*j,P.y=g*b,P.z=T*V,u.push(P.x,P.y,P.z),d.push(0,b,0),E.x=V*.5+.5,E.y=j*.5*b+.5,f.push(E.x,E.y),m++}for(let F=0;F<i;F++){const z=R+F,Y=C+F;M===!0?h.push(Y,Y+1,z):h.push(Y+1,Y,z),N+=3}c.addGroup(p,N,M===!0?1:2),p+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ca(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class zn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){De("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const s=n.length;let a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(s-1);const h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const a=this.getPoint(i),o=this.getPoint(s),l=t||(a.isVector2?new ae:new I);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new I,i=[],s=[],a=[],o=new I,l=new Ge;for(let f=0;f<=e;f++){const m=f/e;i[f]=this.getTangentAt(m,new I)}s[0]=new I,a[0]=new I;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(Je(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,m))}a[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(Je(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(i[m],f*m)),a[m].crossVectors(i[m],s[m])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Ol extends zn{constructor(e=0,t=0,n=1,i=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ae){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(a?s=0:s=i),this.aClockwise===!0&&!a&&(s===i?s=-i:s=s-i);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Pf extends Ol{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Bl(){let r=0,e=0,t=0,n=0;function i(s,a,o,l){r=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,u){let d=(a-s)/c-(o-s)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(s){const a=s*s,o=a*s;return r+e*s+t*a+n*o}}}const Ar=new I,Ga=new Bl,Wa=new Bl,Xa=new Bl;class If extends zn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new I){const n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%s]:(Ar.subVectors(i[0],i[1]).add(i[0]),c=Ar);const u=i[o%s],d=i[(o+1)%s];if(this.closed||o+2<s?h=i[(o+2)%s]:(Ar.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=Ar),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),m<1e-4&&(m=x),g<1e-4&&(g=x),Ga.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,x,g),Wa.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,x,g),Xa.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,x,g)}else this.curveType==="catmullrom"&&(Ga.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Wa.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Xa.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Ga.calc(l),Wa.calc(l),Xa.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new I().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function zc(r,e,t,n,i){const s=(n-e)*.5,a=(i-t)*.5,o=r*r,l=r*o;return(2*t-2*n+s+a)*l+(-3*t+3*n-2*s-a)*o+s*r+t}function Lf(r,e){const t=1-r;return t*t*e}function Df(r,e){return 2*(1-r)*r*e}function Nf(r,e){return r*r*e}function Vs(r,e,t,n){return Lf(r,e)+Df(r,t)+Nf(r,n)}function Uf(r,e){const t=1-r;return t*t*t*e}function Ff(r,e){const t=1-r;return 3*t*t*r*e}function Of(r,e){return 3*(1-r)*r*r*e}function Bf(r,e){return r*r*r*e}function Hs(r,e,t,n,i){return Uf(r,e)+Ff(r,t)+Of(r,n)+Bf(r,i)}class du extends zn{constructor(e=new ae,t=new ae,n=new ae,i=new ae){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ae){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Hs(e,i.x,s.x,a.x,o.x),Hs(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class zf extends zn{constructor(e=new I,t=new I,n=new I,i=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new I){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Hs(e,i.x,s.x,a.x,o.x),Hs(e,i.y,s.y,a.y,o.y),Hs(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class fu extends zn{constructor(e=new ae,t=new ae){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ae){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ae){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class kf extends zn{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class pu extends zn{constructor(e=new ae,t=new ae,n=new ae){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ae){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Vs(e,i.x,s.x,a.x),Vs(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Vf extends zn{constructor(e=new I,t=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new I){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Vs(e,i.x,s.x,a.x),Vs(e,i.y,s.y,a.y),Vs(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class mu extends zn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ae){const n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(zc(o,l.x,c.x,h.x,u.x),zc(o,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new ae().fromArray(i))}return this}}var rl=Object.freeze({__proto__:null,ArcCurve:Pf,CatmullRomCurve3:If,CubicBezierCurve:du,CubicBezierCurve3:zf,EllipseCurve:Ol,LineCurve:fu,LineCurve3:kf,QuadraticBezierCurve:pu,QuadraticBezierCurve3:Vf,SplineCurve:mu});class Hf extends zn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new rl[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const a=i[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const a=s[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new rl[i.type]().fromJSON(i))}return this}}class kc extends Hf{constructor(e){super(),this.type="Path",this.currentPoint=new ae,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new fu(this.currentPoint.clone(),new ae(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new pu(this.currentPoint.clone(),new ae(e,t),new ae(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){const o=new du(this.currentPoint.clone(),new ae(e,t),new ae(n,i),new ae(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new mu(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,s,a,o,l),this}absellipse(e,t,n,i,s,a,o,l){const c=new Ol(e,t,n,i,s,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class gu extends kc{constructor(e){super(e),this.uuid=fn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new kc().fromJSON(i))}return this}}function Gf(r,e,t=2){const n=e&&e.length,i=n?e[0]*t:r.length;let s=xu(r,0,i,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=Yf(r,e,s,t)),r.length>80*t){o=r[0],l=r[1];let h=o,u=l;for(let d=t;d<i;d+=t){const f=r[d],m=r[d+1];f<o&&(o=f),m<l&&(l=m),f>h&&(h=f),m>u&&(u=m)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return $s(s,a,t,o,l,c,0),a}function xu(r,e,t,n,i){let s;if(i===r0(r,e,t,n)>0)for(let a=e;a<t;a+=n)s=Vc(a/n|0,r[a],r[a+1],s);else for(let a=t-n;a>=e;a-=n)s=Vc(a/n|0,r[a],r[a+1],s);return s&&ds(s,s.next)&&(Js(s),s=s.next),s}function Ii(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(ds(t,t.next)||Mt(t.prev,t,t.next)===0)){if(Js(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function $s(r,e,t,n,i,s,a){if(!r)return;!a&&s&&Qf(r,n,i,s);let o=r;for(;r.prev!==r.next;){const l=r.prev,c=r.next;if(s?Xf(r,n,i,s):Wf(r)){e.push(l.i,r.i,c.i),Js(r),r=c.next,o=c.next;continue}if(r=c,r===o){a?a===1?(r=qf(Ii(r),e),$s(r,e,t,n,i,s,2)):a===2&&jf(r,e,t,n,i,s):$s(Ii(r),e,t,n,i,s,1);break}}}function Wf(r){const e=r.prev,t=r,n=r.next;if(Mt(e,t,n)>=0)return!1;const i=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(i,s,a),u=Math.min(o,l,c),d=Math.max(i,s,a),f=Math.max(o,l,c);let m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&Us(i,o,s,l,a,c,m.x,m.y)&&Mt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Xf(r,e,t,n){const i=r.prev,s=r,a=r.next;if(Mt(i,s,a)>=0)return!1;const o=i.x,l=s.x,c=a.x,h=i.y,u=s.y,d=a.y,f=Math.min(o,l,c),m=Math.min(h,u,d),x=Math.max(o,l,c),g=Math.max(h,u,d),p=al(f,m,e,t,n),v=al(x,g,e,t,n);let y=r.prevZ,M=r.nextZ;for(;y&&y.z>=p&&M&&M.z<=v;){if(y.x>=f&&y.x<=x&&y.y>=m&&y.y<=g&&y!==i&&y!==a&&Us(o,h,l,u,c,d,y.x,y.y)&&Mt(y.prev,y,y.next)>=0||(y=y.prevZ,M.x>=f&&M.x<=x&&M.y>=m&&M.y<=g&&M!==i&&M!==a&&Us(o,h,l,u,c,d,M.x,M.y)&&Mt(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;y&&y.z>=p;){if(y.x>=f&&y.x<=x&&y.y>=m&&y.y<=g&&y!==i&&y!==a&&Us(o,h,l,u,c,d,y.x,y.y)&&Mt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;M&&M.z<=v;){if(M.x>=f&&M.x<=x&&M.y>=m&&M.y<=g&&M!==i&&M!==a&&Us(o,h,l,u,c,d,M.x,M.y)&&Mt(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function qf(r,e){let t=r;do{const n=t.prev,i=t.next.next;!ds(n,i)&&vu(n,t,t.next,i)&&Zs(n,i)&&Zs(i,n)&&(e.push(n.i,t.i,i.i),Js(t),Js(t.next),t=r=i),t=t.next}while(t!==r);return Ii(t)}function jf(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&n0(a,o)){let l=yu(a,o);a=Ii(a,a.next),l=Ii(l,l.next),$s(a,e,t,n,i,s,0),$s(l,e,t,n,i,s,0);return}o=o.next}a=a.next}while(a!==r)}function Yf(r,e,t,n){const i=[];for(let s=0,a=e.length;s<a;s++){const o=e[s]*n,l=s<a-1?e[s+1]*n:r.length,c=xu(r,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(t0(c))}i.sort(Kf);for(let s=0;s<i.length;s++)t=$f(i[s],t);return t}function Kf(r,e){let t=r.x-e.x;if(t===0&&(t=r.y-e.y,t===0)){const n=(r.next.y-r.y)/(r.next.x-r.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function $f(r,e){const t=Zf(r,e);if(!t)return e;const n=yu(t,r);return Ii(n,n.next),Ii(t,t.next)}function Zf(r,e){let t=e;const n=r.x,i=r.y;let s=-1/0,a;if(ds(r,t))return t;do{if(ds(r,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){const u=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>s&&(s=u,a=t.x<t.next.x?t:t.next,u===n))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&_u(i<c?n:s,i,l,c,i<c?s:n,i,t.x,t.y)){const u=Math.abs(i-t.y)/(n-t.x);Zs(t,r)&&(u<h||u===h&&(t.x>a.x||t.x===a.x&&Jf(a,t)))&&(a=t,h=u)}t=t.next}while(t!==o);return a}function Jf(r,e){return Mt(r.prev,r,e.prev)<0&&Mt(e.next,r,r.next)<0}function Qf(r,e,t,n){let i=r;do i.z===0&&(i.z=al(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,e0(i)}function e0(r){let e,t=1;do{let n=r,i;r=null;let s=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;n=a}s.nextZ=null,t*=2}while(e>1);return r}function al(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function t0(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function _u(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function Us(r,e,t,n,i,s,a,o){return!(r===a&&e===o)&&_u(r,e,t,n,i,s,a,o)}function n0(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!i0(r,e)&&(Zs(r,e)&&Zs(e,r)&&s0(r,e)&&(Mt(r.prev,r,e.prev)||Mt(r,e.prev,e))||ds(r,e)&&Mt(r.prev,r,r.next)>0&&Mt(e.prev,e,e.next)>0)}function Mt(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function ds(r,e){return r.x===e.x&&r.y===e.y}function vu(r,e,t,n){const i=Cr(Mt(r,e,t)),s=Cr(Mt(r,e,n)),a=Cr(Mt(t,n,r)),o=Cr(Mt(t,n,e));return!!(i!==s&&a!==o||i===0&&Rr(r,t,e)||s===0&&Rr(r,n,e)||a===0&&Rr(t,r,n)||o===0&&Rr(t,e,n))}function Rr(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function Cr(r){return r>0?1:r<0?-1:0}function i0(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&vu(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function Zs(r,e){return Mt(r.prev,r,r.next)<0?Mt(r,e,r.next)>=0&&Mt(r,r.prev,e)>=0:Mt(r,e,r.prev)<0||Mt(r,r.next,e)<0}function s0(r,e){let t=r,n=!1;const i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function yu(r,e){const t=ol(r.i,r.x,r.y),n=ol(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Vc(r,e,t,n){const i=ol(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Js(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function ol(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function r0(r,e,t,n){let i=0;for(let s=e,a=t-n;s<t;s+=n)i+=(r[a]-r[s])*(r[s+1]+r[a+1]),a=s;return i}class a0{static triangulate(e,t,n=2){return Gf(e,t,n)}}class ts{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return ts.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];Hc(e),Gc(n,e);let a=e.length;t.forEach(Hc);for(let l=0;l<t.length;l++)i.push(a),a+=t[l].length,Gc(n,t[l]);const o=a0.triangulate(n,i);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function Hc(r){const e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function Gc(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}class zl extends Nt{constructor(e=new gu([new ae(.5,.5),new ae(-.5,.5),new ae(-.5,-.5),new ae(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],s=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new vt(i,3)),this.setAttribute("uv",new vt(s,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:f-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:o0;let y,M=!1,R,E,P,N;p&&(y=p.getSpacedPoints(h),M=!0,d=!1,R=p.computeFrenetFrames(h,!1),E=new I,P=new I,N=new I),d||(g=0,f=0,m=0,x=0);const T=o.extractPoints(c);let b=T.shape;const C=T.holes;if(!ts.isClockWise(b)){b=b.reverse();for(let ee=0,A=C.length;ee<A;ee++){const D=C[ee];ts.isClockWise(D)&&(C[ee]=D.reverse())}}function z(ee){const D=10000000000000001e-36;let k=ee[0];for(let ie=1;ie<=ee.length;ie++){const Q=ie%ee.length,ne=ee[Q],he=ne.x-k.x,ve=ne.y-k.y,w=he*he+ve*ve,_=Math.max(Math.abs(ne.x),Math.abs(ne.y),Math.abs(k.x),Math.abs(k.y)),U=D*_*_;if(w<=U){ee.splice(Q,1),ie--;continue}k=ne}}z(b),C.forEach(z);const Y=C.length,V=b;for(let ee=0;ee<Y;ee++){const A=C[ee];b=b.concat(A)}function j(ee,A,D){return A||Qe("ExtrudeGeometry: vec does not exist"),ee.clone().addScaledVector(A,D)}const J=b.length;function q(ee,A,D){let k,ie,Q;const ne=ee.x-A.x,he=ee.y-A.y,ve=D.x-ee.x,w=D.y-ee.y,_=ne*ne+he*he,U=ne*w-he*ve;if(Math.abs(U)>Number.EPSILON){const H=Math.sqrt(_),$=Math.sqrt(ve*ve+w*w),W=A.x-he/H,we=A.y+ne/H,me=D.x-w/$,Ie=D.y+ve/$,Re=((me-W)*w-(Ie-we)*ve)/(ne*w-he*ve);k=W+ne*Re-ee.x,ie=we+he*Re-ee.y;const re=k*k+ie*ie;if(re<=2)return new ae(k,ie);Q=Math.sqrt(re/2)}else{let H=!1;ne>Number.EPSILON?ve>Number.EPSILON&&(H=!0):ne<-Number.EPSILON?ve<-Number.EPSILON&&(H=!0):Math.sign(he)===Math.sign(w)&&(H=!0),H?(k=-he,ie=ne,Q=Math.sqrt(_)):(k=ne,ie=he,Q=Math.sqrt(_/2))}return new ae(k/Q,ie/Q)}const se=[];for(let ee=0,A=V.length,D=A-1,k=ee+1;ee<A;ee++,D++,k++)D===A&&(D=0),k===A&&(k=0),se[ee]=q(V[ee],V[D],V[k]);const le=[];let Me,ke=se.concat();for(let ee=0,A=Y;ee<A;ee++){const D=C[ee];Me=[];for(let k=0,ie=D.length,Q=ie-1,ne=k+1;k<ie;k++,Q++,ne++)Q===ie&&(Q=0),ne===ie&&(ne=0),Me[k]=q(D[k],D[Q],D[ne]);le.push(Me),ke=ke.concat(Me)}let qe;if(g===0)qe=ts.triangulateShape(V,C);else{const ee=[],A=[];for(let D=0;D<g;D++){const k=D/g,ie=f*Math.cos(k*Math.PI/2),Q=m*Math.sin(k*Math.PI/2)+x;for(let ne=0,he=V.length;ne<he;ne++){const ve=j(V[ne],se[ne],Q);Ee(ve.x,ve.y,-ie),k===0&&ee.push(ve)}for(let ne=0,he=Y;ne<he;ne++){const ve=C[ne];Me=le[ne];const w=[];for(let _=0,U=ve.length;_<U;_++){const H=j(ve[_],Me[_],Q);Ee(H.x,H.y,-ie),k===0&&w.push(H)}k===0&&A.push(w)}}qe=ts.triangulateShape(ee,A)}const Ze=qe.length,et=m+x;for(let ee=0;ee<J;ee++){const A=d?j(b[ee],ke[ee],et):b[ee];M?(P.copy(R.normals[0]).multiplyScalar(A.x),E.copy(R.binormals[0]).multiplyScalar(A.y),N.copy(y[0]).add(P).add(E),Ee(N.x,N.y,N.z)):Ee(A.x,A.y,0)}for(let ee=1;ee<=h;ee++)for(let A=0;A<J;A++){const D=d?j(b[A],ke[A],et):b[A];M?(P.copy(R.normals[ee]).multiplyScalar(D.x),E.copy(R.binormals[ee]).multiplyScalar(D.y),N.copy(y[ee]).add(P).add(E),Ee(N.x,N.y,N.z)):Ee(D.x,D.y,u/h*ee)}for(let ee=g-1;ee>=0;ee--){const A=ee/g,D=f*Math.cos(A*Math.PI/2),k=m*Math.sin(A*Math.PI/2)+x;for(let ie=0,Q=V.length;ie<Q;ie++){const ne=j(V[ie],se[ie],k);Ee(ne.x,ne.y,u+D)}for(let ie=0,Q=C.length;ie<Q;ie++){const ne=C[ie];Me=le[ie];for(let he=0,ve=ne.length;he<ve;he++){const w=j(ne[he],Me[he],k);M?Ee(w.x,w.y+y[h-1].y,y[h-1].x+D):Ee(w.x,w.y,u+D)}}}K(),Z();function K(){const ee=i.length/3;if(d){let A=0,D=J*A;for(let k=0;k<Ze;k++){const ie=qe[k];Se(ie[2]+D,ie[1]+D,ie[0]+D)}A=h+g*2,D=J*A;for(let k=0;k<Ze;k++){const ie=qe[k];Se(ie[0]+D,ie[1]+D,ie[2]+D)}}else{for(let A=0;A<Ze;A++){const D=qe[A];Se(D[2],D[1],D[0])}for(let A=0;A<Ze;A++){const D=qe[A];Se(D[0]+J*h,D[1]+J*h,D[2]+J*h)}}n.addGroup(ee,i.length/3-ee,0)}function Z(){const ee=i.length/3;let A=0;xe(V,A),A+=V.length;for(let D=0,k=C.length;D<k;D++){const ie=C[D];xe(ie,A),A+=ie.length}n.addGroup(ee,i.length/3-ee,1)}function xe(ee,A){let D=ee.length;for(;--D>=0;){const k=D;let ie=D-1;ie<0&&(ie=ee.length-1);for(let Q=0,ne=h+g*2;Q<ne;Q++){const he=J*Q,ve=J*(Q+1),w=A+k+he,_=A+ie+he,U=A+ie+ve,H=A+k+ve;We(w,_,U,H)}}}function Ee(ee,A,D){l.push(ee),l.push(A),l.push(D)}function Se(ee,A,D){st(ee),st(A),st(D);const k=i.length/3,ie=v.generateTopUV(n,i,k-3,k-2,k-1);Le(ie[0]),Le(ie[1]),Le(ie[2])}function We(ee,A,D,k){st(ee),st(A),st(k),st(A),st(D),st(k);const ie=i.length/3,Q=v.generateSideWallUV(n,i,ie-6,ie-3,ie-2,ie-1);Le(Q[0]),Le(Q[1]),Le(Q[3]),Le(Q[1]),Le(Q[2]),Le(Q[3])}function st(ee){i.push(l[ee*3+0]),i.push(l[ee*3+1]),i.push(l[ee*3+2])}function Le(ee){s.push(ee.x),s.push(ee.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return l0(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,a=e.shapes.length;s<a;s++){const o=t[e.shapes[s]];n.push(o)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new rl[i.type]().fromJSON(i)),new zl(n,e.options)}}const o0={generateTopUV:function(r,e,t,n,i){const s=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[i*3],h=e[i*3+1];return[new ae(s,a),new ae(o,l),new ae(c,h)]},generateSideWallUV:function(r,e,t,n,i,s){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[i*3],f=e[i*3+1],m=e[i*3+2],x=e[s*3],g=e[s*3+1],p=e[s*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new ae(a,1-l),new ae(c,1-u),new ae(d,1-m),new ae(x,1-p)]:[new ae(o,1-l),new ae(h,1-u),new ae(f,1-m),new ae(g,1-p)]}};function l0(r,e,t){if(t.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];t.shapes.push(s.uuid)}else t.shapes.push(r.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class bn extends Nt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=e/o,d=t/l,f=[],m=[],x=[],g=[];for(let p=0;p<h;p++){const v=p*d-a;for(let y=0;y<c;y++){const M=y*u-s;m.push(M,-v,0),x.push(0,0,1),g.push(y/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<o;v++){const y=v+c*p,M=v+c*(p+1),R=v+1+c*(p+1),E=v+1+c*p;f.push(y,M,E),f.push(M,R,E)}this.setIndex(f),this.setAttribute("position",new vt(m,3)),this.setAttribute("normal",new vt(x,3)),this.setAttribute("uv",new vt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bn(e.width,e.height,e.widthSegments,e.heightSegments)}}class kl extends Nt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new I,d=new I,f=[],m=[],x=[],g=[];for(let p=0;p<=n;p++){const v=[],y=p/n;let M=0;p===0&&a===0?M=.5/t:p===n&&l===Math.PI&&(M=-.5/t);for(let R=0;R<=t;R++){const E=R/t;u.x=-e*Math.cos(i+E*s)*Math.sin(a+y*o),u.y=e*Math.cos(a+y*o),u.z=e*Math.sin(i+E*s)*Math.sin(a+y*o),m.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),g.push(E+M,1-y),v.push(c++)}h.push(v)}for(let p=0;p<n;p++)for(let v=0;v<t;v++){const y=h[p][v+1],M=h[p][v],R=h[p+1][v],E=h[p+1][v+1];(p!==0||a>0)&&f.push(y,M,E),(p!==n-1||l<Math.PI)&&f.push(M,R,E)}this.setIndex(f),this.setAttribute("position",new vt(m,3)),this.setAttribute("normal",new vt(x,3)),this.setAttribute("uv",new vt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kl(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ai extends Nt{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],l=[],c=[],h=new I,u=new I,d=new I;for(let f=0;f<=n;f++)for(let m=0;m<=i;m++){const x=m/i*s,g=f/n*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(x),u.y=(e+t*Math.cos(g))*Math.sin(x),u.z=t*Math.sin(g),o.push(u.x,u.y,u.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(m/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=i;m++){const x=(i+1)*f+m-1,g=(i+1)*(f-1)+m-1,p=(i+1)*(f-1)+m,v=(i+1)*f+m;a.push(x,g,v),a.push(g,p,v)}this.setIndex(a),this.setAttribute("position",new vt(o,3)),this.setAttribute("normal",new vt(l,3)),this.setAttribute("uv",new vt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ai(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class c0 extends Et{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class An extends pn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ne(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=aa,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class kn extends An{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ae(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Je(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ne(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ne(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ne(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class h0 extends pn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=aa,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class u0 extends pn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=aa,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.combine=_l,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class d0 extends pn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class f0 extends pn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Pr(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function p0(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function m0(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Wc(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){const o=t[s]*e;for(let l=0;l!==e;++l)i[a++]=r[o+l]}return i}function bu(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push(...a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}class tr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=s)){const o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}a=n,n=0;break n}break e}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class g0 extends tr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Qi,endingEnd:Qi}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,a=e+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case es:s=e,o=2*t-n;break;case Zr:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case es:a=e,l=2*n-t;break;case Zr:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(i-t),x=m*m,g=x*m,p=-d*g+2*d*x-d*m,v=(1+d)*g+(-1.5-2*d)*x+(-.5+d)*m+1,y=(-1-f)*g+(1.5+f)*x+.5*m,M=f*g-f*x;for(let R=0;R!==o;++R)s[R]=p*a[h+R]+v*a[c+R]+y*a[l+R]+M*a[u+R];return s}}class Mu extends tr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[c+d]*u+a[l+d]*h;return s}}class x0 extends tr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Rn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Pr(t,this.TimeBufferType),this.values=Pr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Pr(e.times,Array),values:Pr(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new x0(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Mu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new g0(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case js:t=this.InterpolantFactoryMethodDiscrete;break;case Pi:t=this.InterpolantFactoryMethodLinear;break;case xa:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return De("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return js;case this.InterpolantFactoryMethodLinear:return Pi;case this.InterpolantFactoryMethodSmooth:return xa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(Qe("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(Qe("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){Qe("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Qe("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&p0(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){Qe("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===xa,s=e.length-1;let a=1;for(let o=1;o<s;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(i)l=!0;else{const u=o*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){const x=t[u+m];if(x!==t[d+m]||x!==t[f+m]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Rn.prototype.ValueTypeName="";Rn.prototype.TimeBufferType=Float32Array;Rn.prototype.ValueBufferType=Float32Array;Rn.prototype.DefaultInterpolation=Pi;class xs extends Rn{constructor(e,t,n){super(e,t,n)}}xs.prototype.ValueTypeName="bool";xs.prototype.ValueBufferType=Array;xs.prototype.DefaultInterpolation=js;xs.prototype.InterpolantFactoryMethodLinear=void 0;xs.prototype.InterpolantFactoryMethodSmooth=void 0;class Su extends Rn{constructor(e,t,n,i){super(e,t,n,i)}}Su.prototype.ValueTypeName="color";class fs extends Rn{constructor(e,t,n,i){super(e,t,n,i)}}fs.prototype.ValueTypeName="number";class _0 extends tr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t);let c=e*o;for(let h=c+o;c!==h;c+=4)ut.slerpFlat(s,0,a,c-o,a,c,l);return s}}class ps extends Rn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new _0(this.times,this.values,this.getValueSize(),e)}}ps.prototype.ValueTypeName="quaternion";ps.prototype.InterpolantFactoryMethodSmooth=void 0;class _s extends Rn{constructor(e,t,n){super(e,t,n)}}_s.prototype.ValueTypeName="string";_s.prototype.ValueBufferType=Array;_s.prototype.DefaultInterpolation=js;_s.prototype.InterpolantFactoryMethodLinear=void 0;_s.prototype.InterpolantFactoryMethodSmooth=void 0;class ms extends Rn{constructor(e,t,n,i){super(e,t,n,i)}}ms.prototype.ValueTypeName="vector";class Qs{constructor(e="",t=-1,n=[],i=Rl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=fn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(y0(n[a]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=n.length;s!==a;++s)t.push(Rn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const h=m0(l);l=Wc(l,1,h),c=Wc(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new fs(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(De("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return Qe("AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,m,x){if(f.length!==0){const g=[],p=[];bu(f,g,p,m),g.length!==0&&x.push(new u(d,g,p))}},i=[],s=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let x=0;x<d[m].morphTargets.length;x++)f[d[m].morphTargets[x]]=-1;for(const x in f){const g=[],p=[];for(let v=0;v!==d[m].morphTargets.length;++v){const y=d[m];g.push(y.time),p.push(y.morphTarget===x?1:0)}i.push(new fs(".morphTargetInfluence["+x+"]",g,p))}l=f.length*a}else{const f=".bones["+t[u].name+"]";n(ms,f+".position",d,"pos",i),n(ps,f+".quaternion",d,"rot",i),n(ms,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function v0(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return fs;case"vector":case"vector2":case"vector3":case"vector4":return ms;case"color":return Su;case"quaternion":return ps;case"bool":case"boolean":return xs;case"string":return _s}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function y0(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=v0(r.type);if(r.times===void 0){const t=[],n=[];bu(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const $n={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class b0{constructor(e,t,n){const i=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,s===!1&&i.onStart!==void 0&&i.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],m=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const M0=new b0;class vs{constructor(e){this.manager=e!==void 0?e:M0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}vs.DEFAULT_MATERIAL_NAME="__DEFAULT";const qn={};class S0 extends Error{constructor(e,t){super(e),this.response=t}}class Tu extends vs{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=$n.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(qn[e]!==void 0){qn[e].push({onLoad:t,onProgress:n,onError:i});return}qn[e]=[],qn[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&De("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=qn[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0;let x=0;const g=new ReadableStream({start(p){v();function v(){u.read().then(({done:y,value:M})=>{if(y)p.close();else{x+=M.byteLength;const R=new ProgressEvent("progress",{lengthComputable:m,loaded:x,total:f});for(let E=0,P=h.length;E<P;E++){const N=h[E];N.onProgress&&N.onProgress(R)}p.enqueue(M),v()}},y=>{p.error(y)})}}});return new Response(g)}else throw new S0(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(m=>f.decode(m))}}}).then(c=>{$n.add(`file:${e}`,c);const h=qn[e];delete qn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=qn[e];if(h===void 0)throw this.manager.itemError(e),c;delete qn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Ki=new WeakMap;class T0 extends vs{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=$n.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let u=Ki.get(a);u===void 0&&(u=[],Ki.set(a,u)),u.push({onLoad:t,onError:i})}return a}const o=Ys("img");function l(){h(),t&&t(this);const u=Ki.get(this)||[];for(let d=0;d<u.length;d++){const f=u[d];f.onLoad&&f.onLoad(this)}Ki.delete(this),s.manager.itemEnd(e)}function c(u){h(),i&&i(u),$n.remove(`image:${e}`);const d=Ki.get(this)||[];for(let f=0;f<d.length;f++){const m=d[f];m.onError&&m.onError(u)}Ki.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),$n.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class Eu extends vs{constructor(e){super(e)}load(e,t,n,i){const s=new At,a=new T0(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class ha extends mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ne(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class E0 extends ha{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ne(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const qa=new Ge,Xc=new I,qc=new I;class Vl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ae(512,512),this.mapType=wn,this.map=null,this.mapPass=null,this.matrix=new Ge,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Nl,this._frameExtents=new ae(1,1),this._viewportCount=1,this._viewports=[new ot(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Xc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Xc),qc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(qc),t.updateMatrixWorld(),qa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(qa,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(qa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class w0 extends Vl{constructor(){super(new Gt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=hs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class ia extends ha{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new w0}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const jc=new Ge,Cs=new I,ja=new I;class A0 extends Vl{constructor(){super(new Gt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ae(4,2),this._viewportCount=6,this._viewports=[new ot(2,1,1,1),new ot(0,1,1,1),new ot(3,1,1,1),new ot(1,1,1,1),new ot(3,0,1,1),new ot(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Cs.setFromMatrixPosition(e.matrixWorld),n.position.copy(Cs),ja.copy(n.position),ja.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ja),n.updateMatrixWorld(),i.makeTranslation(-Cs.x,-Cs.y,-Cs.z),jc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(jc,n.coordinateSystem,n.reversedDepth)}}class sa extends ha{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new A0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class ua extends ru{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class R0 extends Vl{constructor(){super(new ua(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ll extends ha{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.shadow=new R0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Gs{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Ya=new WeakMap;class C0 extends vs{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&De("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&De("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=$n.get(`image-bitmap:${e}`);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(c=>{if(Ya.has(a)===!0)i&&i(Ya.get(a)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(c),s.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return $n.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Ya.set(l,c),$n.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});$n.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class P0 extends Gt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class I0{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}class L0{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,a;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[s+o]=n[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(n,s,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,a=i;s!==a;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let a=0;a!==s;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){ut.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const a=this._workIndex*s;ut.multiplyQuaternionsFlat(e,a,e,t,e,n),ut.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,s){const a=1-i;for(let o=0;o!==s;++o){const l=t+o;e[l]=e[l]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,s){for(let a=0;a!==s;++a){const o=t+a;e[o]=e[o]+e[n+a]*i}}}const Hl="\\[\\]\\.:\\/",D0=new RegExp("["+Hl+"]","g"),Gl="[^"+Hl+"]",N0="[^"+Hl.replace("\\.","")+"]",U0=/((?:WC+[\/:])*)/.source.replace("WC",Gl),F0=/(WCOD+)?/.source.replace("WCOD",N0),O0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Gl),B0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Gl),z0=new RegExp("^"+U0+F0+O0+B0+"$"),k0=["material","materials","bones","map"];class V0{constructor(e,t,n){const i=n||lt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class lt{constructor(e,t,n){this.path=t,this.parsedPath=n||lt.parseTrackName(t),this.node=lt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new lt.Composite(e,t,n):new lt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(D0,"")}static parseTrackName(e){const t=z0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);k0.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=lt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){De("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Qe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Qe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Qe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Qe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Qe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Qe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Qe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[i];if(a===void 0){const c=t.nodeName;Qe("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}lt.Composite=V0;lt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};lt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};lt.prototype.GetterByBindingType=[lt.prototype._getValue_direct,lt.prototype._getValue_array,lt.prototype._getValue_arrayElement,lt.prototype._getValue_toArray];lt.prototype.SetterByBindingTypeAndVersioning=[[lt.prototype._setValue_direct,lt.prototype._setValue_direct_setNeedsUpdate,lt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[lt.prototype._setValue_array,lt.prototype._setValue_array_setNeedsUpdate,lt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[lt.prototype._setValue_arrayElement,lt.prototype._setValue_arrayElement_setNeedsUpdate,lt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[lt.prototype._setValue_fromArray,lt.prototype._setValue_fromArray_setNeedsUpdate,lt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class H0{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,a=s.length,o=new Array(a),l={endingStart:Qi,endingEnd:Qi};for(let c=0;c!==a;++c){const h=s[c].createInterpolant(null);o[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Kh,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){const i=this._clip.duration,s=e._clip.duration,a=s/i,o=i/s;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case _d:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulateAdditive(o);break;case Rl:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const a=n===xd;if(e===0)return s===-1?i:a&&(s&1)===1?t-i:i;if(n===Yh){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){const o=Math.floor(i/t);i-=t*o,s+=Math.abs(o);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=i;if(a&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=es,i.endingEnd=es):(e?i.endingStart=this.zeroSlopeAtStart?es:Qi:i.endingStart=Zr,t?i.endingEnd=this.zeroSlopeAtEnd?es:Qi:i.endingEnd=Zr)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,l=a.sampleValues;return o[0]=s,l[0]=t,o[1]=s+e,l[1]=n,this}}const G0=new Float32Array(1);class W0 extends Li{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==s;++u){const d=i[u],f=d.name;let m=h[f];if(m!==void 0)++m.referenceCount,a[u]=m;else{if(m=a[u],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,l,f));continue}const x=t&&t._propertyBindings[u].binding.parsedPath;m=new L0(lt.create(n,f,x),d.ValueTypeName,d.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,l,f),a[u]=m}o[u].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let a=s[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,a=this._actionsByClip,o=a[s],l=o.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const u=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete a[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,a=this._bindingsByRootAndName,o=a[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[s],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Mu(new Float32Array(2),new Float32Array(2),1,G0),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let a=typeof e=="string"?Qs.findByName(i,e):e;const o=a!==null?a.uuid:e,l=this._actionsByClip[o];let c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=Rl),l!==void 0){const u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;const h=new H0(this,a,t,n);return this._bindAction(h,c),this._addInactiveAction(h,o,s),h}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?Qs.findByName(n,e):e,a=s?s.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,s,a);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const a=s.knownActions;for(let o=0,l=a.length;o!==l;++o){const c=a[o];this._deactivateAction(c);const h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const a in s){const o=s[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}function Yc(r,e,t,n){const i=X0(n);switch(t){case qh:return r*e;case Sl:return r*e/i.components*i.byteLength;case Tl:return r*e/i.components*i.byteLength;case El:return r*e*2/i.components*i.byteLength;case wl:return r*e*2/i.components*i.byteLength;case jh:return r*e*3/i.components*i.byteLength;case sn:return r*e*4/i.components*i.byteLength;case Al:return r*e*4/i.components*i.byteLength;case Gr:case Wr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Xr:case qr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ro:case Po:return Math.max(r,16)*Math.max(e,8)/4;case Ao:case Co:return Math.max(r,8)*Math.max(e,8)/2;case Io:case Lo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Do:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case No:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Uo:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Fo:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Oo:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Bo:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case zo:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case ko:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Vo:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Ho:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Go:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Wo:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Xo:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case qo:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case jo:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Yo:case Ko:case $o:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Zo:case Jo:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Qo:case el:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function X0(r){switch(r){case wn:case Hh:return{byteLength:1,components:1};case Xs:case Gh:case dn:return{byteLength:2,components:1};case bl:case Ml:return{byteLength:2,components:4};case Ci:case yl:case En:return{byteLength:4,components:1};case Wh:case Xh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xl}}));typeof window<"u"&&(window.__THREE__?De("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xl);function wu(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function q0(r){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=r.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(r.bindBuffer(c,o),u.length===0)r.bufferSubData(c,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){const m=u[d],x=u[f];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){const x=u[f];r.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(r.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}var j0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Y0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,K0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,$0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Z0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,J0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Q0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ep=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,tp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,np=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ip=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,sp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ap=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,op=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,lp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,cp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,up=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,dp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,fp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,pp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,mp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,gp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,xp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,_p=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,vp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,yp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,bp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Mp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Sp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Tp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ep=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,wp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Ap=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Rp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Cp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Pp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ip=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Lp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Dp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Np=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Up=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Fp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Op=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Bp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,zp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,kp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Hp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Gp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Wp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Xp=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 uv = vec2( roughness, dotNV );
	return texture2D( dfgLUT, uv ).rg;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNV * dotNV), 0.0, dotNV), material.roughness );
	vec2 dfgL = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNL * dotNL), 0.0, dotNL), material.roughness );
	vec3 FssEss_V = material.specularColor * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColor * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColor + ( 1.0 - material.specularColor ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,qp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,jp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Yp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Kp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$p=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Qp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,em=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,tm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,nm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,im=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,am=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,om=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,cm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,um=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,dm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,mm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,gm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_m=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ym=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Mm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Sm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Tm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Em=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,wm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Am=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Rm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Cm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Pm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Im=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Lm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Dm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Nm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Um=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Fm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Om=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Bm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,zm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,km=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Vm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Hm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Gm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Wm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Xm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const qm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ym=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Km=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$m=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Qm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,eg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,tg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,ng=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ig=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,rg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ag=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,og=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ug=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,fg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,pg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,xg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_g=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,bg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Mg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Tg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Eg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ke={alphahash_fragment:j0,alphahash_pars_fragment:Y0,alphamap_fragment:K0,alphamap_pars_fragment:$0,alphatest_fragment:Z0,alphatest_pars_fragment:J0,aomap_fragment:Q0,aomap_pars_fragment:ep,batching_pars_vertex:tp,batching_vertex:np,begin_vertex:ip,beginnormal_vertex:sp,bsdfs:rp,iridescence_fragment:ap,bumpmap_pars_fragment:op,clipping_planes_fragment:lp,clipping_planes_pars_fragment:cp,clipping_planes_pars_vertex:hp,clipping_planes_vertex:up,color_fragment:dp,color_pars_fragment:fp,color_pars_vertex:pp,color_vertex:mp,common:gp,cube_uv_reflection_fragment:xp,defaultnormal_vertex:_p,displacementmap_pars_vertex:vp,displacementmap_vertex:yp,emissivemap_fragment:bp,emissivemap_pars_fragment:Mp,colorspace_fragment:Sp,colorspace_pars_fragment:Tp,envmap_fragment:Ep,envmap_common_pars_fragment:wp,envmap_pars_fragment:Ap,envmap_pars_vertex:Rp,envmap_physical_pars_fragment:zp,envmap_vertex:Cp,fog_vertex:Pp,fog_pars_vertex:Ip,fog_fragment:Lp,fog_pars_fragment:Dp,gradientmap_pars_fragment:Np,lightmap_pars_fragment:Up,lights_lambert_fragment:Fp,lights_lambert_pars_fragment:Op,lights_pars_begin:Bp,lights_toon_fragment:kp,lights_toon_pars_fragment:Vp,lights_phong_fragment:Hp,lights_phong_pars_fragment:Gp,lights_physical_fragment:Wp,lights_physical_pars_fragment:Xp,lights_fragment_begin:qp,lights_fragment_maps:jp,lights_fragment_end:Yp,logdepthbuf_fragment:Kp,logdepthbuf_pars_fragment:$p,logdepthbuf_pars_vertex:Zp,logdepthbuf_vertex:Jp,map_fragment:Qp,map_pars_fragment:em,map_particle_fragment:tm,map_particle_pars_fragment:nm,metalnessmap_fragment:im,metalnessmap_pars_fragment:sm,morphinstance_vertex:rm,morphcolor_vertex:am,morphnormal_vertex:om,morphtarget_pars_vertex:lm,morphtarget_vertex:cm,normal_fragment_begin:hm,normal_fragment_maps:um,normal_pars_fragment:dm,normal_pars_vertex:fm,normal_vertex:pm,normalmap_pars_fragment:mm,clearcoat_normal_fragment_begin:gm,clearcoat_normal_fragment_maps:xm,clearcoat_pars_fragment:_m,iridescence_pars_fragment:vm,opaque_fragment:ym,packing:bm,premultiplied_alpha_fragment:Mm,project_vertex:Sm,dithering_fragment:Tm,dithering_pars_fragment:Em,roughnessmap_fragment:wm,roughnessmap_pars_fragment:Am,shadowmap_pars_fragment:Rm,shadowmap_pars_vertex:Cm,shadowmap_vertex:Pm,shadowmask_pars_fragment:Im,skinbase_vertex:Lm,skinning_pars_vertex:Dm,skinning_vertex:Nm,skinnormal_vertex:Um,specularmap_fragment:Fm,specularmap_pars_fragment:Om,tonemapping_fragment:Bm,tonemapping_pars_fragment:zm,transmission_fragment:km,transmission_pars_fragment:Vm,uv_pars_fragment:Hm,uv_pars_vertex:Gm,uv_vertex:Wm,worldpos_vertex:Xm,background_vert:qm,background_frag:jm,backgroundCube_vert:Ym,backgroundCube_frag:Km,cube_vert:$m,cube_frag:Zm,depth_vert:Jm,depth_frag:Qm,distanceRGBA_vert:eg,distanceRGBA_frag:tg,equirect_vert:ng,equirect_frag:ig,linedashed_vert:sg,linedashed_frag:rg,meshbasic_vert:ag,meshbasic_frag:og,meshlambert_vert:lg,meshlambert_frag:cg,meshmatcap_vert:hg,meshmatcap_frag:ug,meshnormal_vert:dg,meshnormal_frag:fg,meshphong_vert:pg,meshphong_frag:mg,meshphysical_vert:gg,meshphysical_frag:xg,meshtoon_vert:_g,meshtoon_frag:vg,points_vert:yg,points_frag:bg,shadow_vert:Mg,shadow_frag:Sg,sprite_vert:Tg,sprite_frag:Eg},ye={common:{diffuse:{value:new Ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new Ne(16777215)},opacity:{value:1},center:{value:new ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},Dn={basic:{uniforms:Vt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:Vt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Ne(0)}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:Vt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Ne(0)},specular:{value:new Ne(1118481)},shininess:{value:30}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:Vt([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new Ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:Vt([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new Ne(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:Vt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:Vt([ye.points,ye.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:Vt([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:Vt([ye.common,ye.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:Vt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:Vt([ye.sprite,ye.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distanceRGBA:{uniforms:Vt([ye.common,ye.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distanceRGBA_vert,fragmentShader:Ke.distanceRGBA_frag},shadow:{uniforms:Vt([ye.lights,ye.fog,{color:{value:new Ne(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};Dn.physical={uniforms:Vt([Dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new Ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new Ne(0)},specularColor:{value:new Ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};const Ir={r:0,b:0,g:0},vi=new an,wg=new Ge;function Ag(r,e,t,n,i,s,a){const o=new Ne(0);let l=s===!0?0:1,c,h,u=null,d=0,f=null;function m(y){let M=y.isScene===!0?y.background:null;return M&&M.isTexture&&(M=(y.backgroundBlurriness>0?t:e).get(M)),M}function x(y){let M=!1;const R=m(y);R===null?p(o,l):R&&R.isColor&&(p(R,1),M=!0);const E=r.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function g(y,M){const R=m(M);R&&(R.isCubeTexture||R.mapping===ra)?(h===void 0&&(h=new _t(new di(1,1,1),new Et({name:"BackgroundCubeMaterial",uniforms:us(Dn.backgroundCube.uniforms),vertexShader:Dn.backgroundCube.vertexShader,fragmentShader:Dn.backgroundCube.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,P,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),vi.copy(M.backgroundRotation),vi.x*=-1,vi.y*=-1,vi.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(vi.y*=-1,vi.z*=-1),h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(wg.makeRotationFromEuler(vi)),h.material.toneMapped=it.getTransfer(R.colorSpace)!==ct,(u!==R||d!==R.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=R,d=R.version,f=r.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new _t(new bn(2,2),new Et({name:"BackgroundMaterial",uniforms:us(Dn.background.uniforms),vertexShader:Dn.background.vertexShader,fragmentShader:Dn.background.fragmentShader,side:Jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=it.getTransfer(R.colorSpace)!==ct,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(u!==R||d!==R.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,u=R,d=R.version,f=r.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,M){y.getRGB(Ir,su(r)),n.buffers.color.setClear(Ir.r,Ir.g,Ir.b,M,a)}function v(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,M=1){o.set(y),l=M,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(o,l)},render:x,addToRenderList:g,dispose:v}}function Rg(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,a=!1;function o(b,C,F,z,Y){let V=!1;const j=u(z,F,C);s!==j&&(s=j,c(s.object)),V=f(b,z,F,Y),V&&m(b,z,F,Y),Y!==null&&e.update(Y,r.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,M(b,C,F,z),Y!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function l(){return r.createVertexArray()}function c(b){return r.bindVertexArray(b)}function h(b){return r.deleteVertexArray(b)}function u(b,C,F){const z=F.wireframe===!0;let Y=n[b.id];Y===void 0&&(Y={},n[b.id]=Y);let V=Y[C.id];V===void 0&&(V={},Y[C.id]=V);let j=V[z];return j===void 0&&(j=d(l()),V[z]=j),j}function d(b){const C=[],F=[],z=[];for(let Y=0;Y<t;Y++)C[Y]=0,F[Y]=0,z[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:F,attributeDivisors:z,object:b,attributes:{},index:null}}function f(b,C,F,z){const Y=s.attributes,V=C.attributes;let j=0;const J=F.getAttributes();for(const q in J)if(J[q].location>=0){const le=Y[q];let Me=V[q];if(Me===void 0&&(q==="instanceMatrix"&&b.instanceMatrix&&(Me=b.instanceMatrix),q==="instanceColor"&&b.instanceColor&&(Me=b.instanceColor)),le===void 0||le.attribute!==Me||Me&&le.data!==Me.data)return!0;j++}return s.attributesNum!==j||s.index!==z}function m(b,C,F,z){const Y={},V=C.attributes;let j=0;const J=F.getAttributes();for(const q in J)if(J[q].location>=0){let le=V[q];le===void 0&&(q==="instanceMatrix"&&b.instanceMatrix&&(le=b.instanceMatrix),q==="instanceColor"&&b.instanceColor&&(le=b.instanceColor));const Me={};Me.attribute=le,le&&le.data&&(Me.data=le.data),Y[q]=Me,j++}s.attributes=Y,s.attributesNum=j,s.index=z}function x(){const b=s.newAttributes;for(let C=0,F=b.length;C<F;C++)b[C]=0}function g(b){p(b,0)}function p(b,C){const F=s.newAttributes,z=s.enabledAttributes,Y=s.attributeDivisors;F[b]=1,z[b]===0&&(r.enableVertexAttribArray(b),z[b]=1),Y[b]!==C&&(r.vertexAttribDivisor(b,C),Y[b]=C)}function v(){const b=s.newAttributes,C=s.enabledAttributes;for(let F=0,z=C.length;F<z;F++)C[F]!==b[F]&&(r.disableVertexAttribArray(F),C[F]=0)}function y(b,C,F,z,Y,V,j){j===!0?r.vertexAttribIPointer(b,C,F,Y,V):r.vertexAttribPointer(b,C,F,z,Y,V)}function M(b,C,F,z){x();const Y=z.attributes,V=F.getAttributes(),j=C.defaultAttributeValues;for(const J in V){const q=V[J];if(q.location>=0){let se=Y[J];if(se===void 0&&(J==="instanceMatrix"&&b.instanceMatrix&&(se=b.instanceMatrix),J==="instanceColor"&&b.instanceColor&&(se=b.instanceColor)),se!==void 0){const le=se.normalized,Me=se.itemSize,ke=e.get(se);if(ke===void 0)continue;const qe=ke.buffer,Ze=ke.type,et=ke.bytesPerElement,K=Ze===r.INT||Ze===r.UNSIGNED_INT||se.gpuType===yl;if(se.isInterleavedBufferAttribute){const Z=se.data,xe=Z.stride,Ee=se.offset;if(Z.isInstancedInterleavedBuffer){for(let Se=0;Se<q.locationSize;Se++)p(q.location+Se,Z.meshPerAttribute);b.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let Se=0;Se<q.locationSize;Se++)g(q.location+Se);r.bindBuffer(r.ARRAY_BUFFER,qe);for(let Se=0;Se<q.locationSize;Se++)y(q.location+Se,Me/q.locationSize,Ze,le,xe*et,(Ee+Me/q.locationSize*Se)*et,K)}else{if(se.isInstancedBufferAttribute){for(let Z=0;Z<q.locationSize;Z++)p(q.location+Z,se.meshPerAttribute);b.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Z=0;Z<q.locationSize;Z++)g(q.location+Z);r.bindBuffer(r.ARRAY_BUFFER,qe);for(let Z=0;Z<q.locationSize;Z++)y(q.location+Z,Me/q.locationSize,Ze,le,Me*et,Me/q.locationSize*Z*et,K)}}else if(j!==void 0){const le=j[J];if(le!==void 0)switch(le.length){case 2:r.vertexAttrib2fv(q.location,le);break;case 3:r.vertexAttrib3fv(q.location,le);break;case 4:r.vertexAttrib4fv(q.location,le);break;default:r.vertexAttrib1fv(q.location,le)}}}}v()}function R(){N();for(const b in n){const C=n[b];for(const F in C){const z=C[F];for(const Y in z)h(z[Y].object),delete z[Y];delete C[F]}delete n[b]}}function E(b){if(n[b.id]===void 0)return;const C=n[b.id];for(const F in C){const z=C[F];for(const Y in z)h(z[Y].object),delete z[Y];delete C[F]}delete n[b.id]}function P(b){for(const C in n){const F=n[C];if(F[b.id]===void 0)continue;const z=F[b.id];for(const Y in z)h(z[Y].object),delete z[Y];delete F[b.id]}}function N(){T(),a=!0,s!==i&&(s=i,c(s.object))}function T(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:N,resetDefaultState:T,dispose:R,releaseStatesOfGeometry:E,releaseStatesOfProgram:P,initAttributes:x,enableAttribute:g,disableUnusedAttributes:v}}function Cg(r,e,t){let n;function i(c){n=c}function s(c,h){r.drawArrays(n,c,h),t.update(h,n,1)}function a(c,h,u){u!==0&&(r.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function o(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)a(c[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let m=0;for(let x=0;x<u;x++)m+=h[x]*d[x];t.update(m,n,1)}}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Pg(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(P){return!(P!==sn&&n.convert(P)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const N=P===dn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==wn&&n.convert(P)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==En&&!N)}function l(P){if(P==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(De("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),m=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),v=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),y=r.getParameter(r.MAX_VARYING_VECTORS),M=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),R=m>0,E=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:M,vertexTextures:R,maxSamples:E}}function Ig(r){const e=this;let t=null,n=0,i=!1,s=!1;const a=new Si,o=new je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const m=u.clippingPlanes,x=u.clipIntersection,g=u.clipShadows,p=r.get(u);if(!i||m===null||m.length===0||s&&!g)s?h(null):c();else{const v=s?0:n,y=v*4;let M=p.clippingState||null;l.value=M,M=h(m,d,y,f);for(let R=0;R!==y;++R)M[R]=t[R];p.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,m){const x=u!==null?u.length:0;let g=null;if(x!==0){if(g=l.value,m!==!0||g===null){const p=f+x*4,v=d.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<p)&&(g=new Float32Array(p));for(let y=0,M=f;y!==x;++y,M+=4)a.copy(u[y]).applyMatrix4(v,o),a.normal.toArray(g,M),g[M+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}function Lg(r){let e=new WeakMap;function t(a,o){return o===Eo?a.mapping=as:o===wo&&(a.mapping=os),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Eo||o===wo)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new xf(l.height);return c.fromEquirectangularTexture(r,a),e.set(a,c),a.addEventListener("dispose",i),t(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const hi=4,Kc=[.125,.215,.35,.446,.526,.582],Ti=20,Dg=256,Ps=new ua,$c=new Ne;let Ka=null,$a=0,Za=0,Ja=!1;const Ng=new I;class cl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){const{size:a=256,position:o=Ng}=s;Ka=this._renderer.getRenderTarget(),$a=this._renderer.getActiveCubeFace(),Za=this._renderer.getActiveMipmapLevel(),Ja=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Qc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Jc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ka,$a,Za),this._renderer.xr.enabled=Ja,e.scissorTest=!1,$i(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===as||e.mapping===os?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ka=this._renderer.getRenderTarget(),$a=this._renderer.getActiveCubeFace(),Za=this._renderer.getActiveMipmapLevel(),Ja=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Xt,minFilter:Xt,generateMipmaps:!1,type:dn,format:sn,colorSpace:Yt,depthBuffer:!1},i=Zc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zc(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Ug(s)),this._blurMaterial=Og(s,e,t),this._ggxMaterial=Fg(s,e,t)}return i}_compileMaterial(e){const t=new _t(new Nt,e);this._renderer.compile(t,Ps)}_sceneToCubeUV(e,t,n,i,s){const l=new Gt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor($c),u.toneMapping=ui,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new _t(new di,new On({name:"PMREM.Background",side:jt,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,g=x.material;let p=!1;const v=e.background;v?v.isColor&&(g.color.copy(v),e.background=null,p=!0):(g.color.copy($c),p=!0);for(let y=0;y<6;y++){const M=y%3;M===0?(l.up.set(0,c[y],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[y],s.y,s.z)):M===1?(l.up.set(0,0,c[y]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[y],s.z)):(l.up.set(0,c[y],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[y]));const R=this._cubeSize;$i(i,M*R,y>2?R:0,R,R),u.setRenderTarget(i),p&&u.render(x,l),u.render(e,l)}u.toneMapping=f,u.autoClear=d,e.background=v}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===as||e.mapping===os;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Qc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Jc());const s=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;$i(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Ps)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=.05+c*.95,f=u*d,{_lodMax:m}=this,x=this._sizeLods[n],g=3*x*(n>m-hi?n-m+hi:0),p=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=m-t,$i(s,g,p,3*x,2*x),i.setRenderTarget(s),i.render(o,Ps),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=m-n,$i(e,g,p,3*x,2*x),i.setRenderTarget(e),i.render(o,Ps)}_blur(e,t,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Qe("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[i];u.material=c;const d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Ti-1),x=s/m,g=isFinite(s)?1+Math.floor(h*x):Ti;g>Ti&&De(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ti}`);const p=[];let v=0;for(let P=0;P<Ti;++P){const N=P/x,T=Math.exp(-N*N/2);p.push(T),P===0?v+=T:P<g&&(v+=2*T)}for(let P=0;P<p.length;P++)p[P]=p[P]/v;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:y}=this;d.dTheta.value=m,d.mipInt.value=y-n;const M=this._sizeLods[i],R=3*M*(i>y-hi?i-y+hi:0),E=4*(this._cubeSize-M);$i(t,R,E,3*M,2*M),l.setRenderTarget(t),l.render(u,Ps)}}function Ug(r){const e=[],t=[],n=[];let i=r;const s=r-hi+1+Kc.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>r-hi?l=Kc[a-r+hi-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,x=3,g=2,p=1,v=new Float32Array(x*m*f),y=new Float32Array(g*m*f),M=new Float32Array(p*m*f);for(let E=0;E<f;E++){const P=E%3*2/3-1,N=E>2?0:-1,T=[P,N,0,P+2/3,N,0,P+2/3,N+1,0,P,N,0,P+2/3,N+1,0,P,N+1,0];v.set(T,x*m*E),y.set(d,g*m*E);const b=[E,E,E,E,E,E];M.set(b,p*m*E)}const R=new Nt;R.setAttribute("position",new Bt(v,x)),R.setAttribute("uv",new Bt(y,g)),R.setAttribute("faceIndex",new Bt(M,p)),n.push(new _t(R,null)),i>hi&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Zc(r,e,t){const n=new rn(r,e,t);return n.texture.mapping=ra,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function $i(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Fg(r,e,t){return new Et({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Dg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:da(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:It,depthTest:!1,depthWrite:!1})}function Og(r,e,t){const n=new Float32Array(Ti),i=new I(0,1,0);return new Et({name:"SphericalGaussianBlur",defines:{n:Ti,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:da(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:It,depthTest:!1,depthWrite:!1})}function Jc(){return new Et({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:da(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:It,depthTest:!1,depthWrite:!1})}function Qc(){return new Et({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:da(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:It,depthTest:!1,depthWrite:!1})}function da(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Bg(r){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Eo||l===wo,h=l===as||l===os;if(c||h){let u=e.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new cl(r)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new cl(r)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function zg(r){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Ks("WebGLRenderer: "+n+" extension not supported."),i}}}function kg(r,e,t,n){const i={},s=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete i[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)e.update(d[f],r.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,m=u.attributes.position;let x=0;if(f!==null){const v=f.array;x=f.version;for(let y=0,M=v.length;y<M;y+=3){const R=v[y+0],E=v[y+1],P=v[y+2];d.push(R,E,E,P,P,R)}}else if(m!==void 0){const v=m.array;x=m.version;for(let y=0,M=v.length/3-1;y<M;y+=3){const R=y+0,E=y+1,P=y+2;d.push(R,E,E,P,P,R)}}else return;const g=new(Jh(d)?iu:nu)(d,1);g.version=x;const p=s.get(u);p&&e.remove(p),s.set(u,g)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Vg(r,e,t){let n;function i(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,f){r.drawElements(n,f,s,d*a),t.update(f,n,1)}function c(d,f,m){m!==0&&(r.drawElementsInstanced(n,f,s,d*a,m),t.update(f,n,m))}function h(d,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];t.update(g,n,1)}function u(d,f,m,x){if(m===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],x[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,x,0,m);let p=0;for(let v=0;v<m;v++)p+=f[v]*x[v];t.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Hg(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:Qe("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Gg(r,e,t){const n=new WeakMap,i=new ot;function s(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let b=function(){N.dispose(),n.delete(o),o.removeEventListener("dispose",b)};var f=b;d!==void 0&&d.texture.dispose();const m=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],v=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let M=0;m===!0&&(M=1),x===!0&&(M=2),g===!0&&(M=3);let R=o.attributes.position.count*M,E=1;R>e.maxTextureSize&&(E=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const P=new Float32Array(R*E*4*u),N=new Qh(P,R,E,u);N.type=En,N.needsUpdate=!0;const T=M*4;for(let C=0;C<u;C++){const F=p[C],z=v[C],Y=y[C],V=R*E*4*C;for(let j=0;j<F.count;j++){const J=j*T;m===!0&&(i.fromBufferAttribute(F,j),P[V+J+0]=i.x,P[V+J+1]=i.y,P[V+J+2]=i.z,P[V+J+3]=0),x===!0&&(i.fromBufferAttribute(z,j),P[V+J+4]=i.x,P[V+J+5]=i.y,P[V+J+6]=i.z,P[V+J+7]=0),g===!0&&(i.fromBufferAttribute(Y,j),P[V+J+8]=i.x,P[V+J+9]=i.y,P[V+J+10]=i.z,P[V+J+11]=Y.itemSize===4?i.w:1)}}d={count:u,texture:N,size:new ae(R,E)},n.set(o,d),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const x=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(r,"morphTargetBaseInfluence",x),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function Wg(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}const Au=new At,eh=new Fl(1,1),Ru=new Qh,Cu=new ef,Pu=new au,th=[],nh=[],ih=new Float32Array(16),sh=new Float32Array(9),rh=new Float32Array(4);function ys(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=th[i];if(s===void 0&&(s=new Float32Array(i),th[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function Rt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Ct(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function fa(r,e){let t=nh[e];t===void 0&&(t=new Int32Array(e),nh[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Xg(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function qg(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;r.uniform2fv(this.addr,e),Ct(t,e)}}function jg(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Rt(t,e))return;r.uniform3fv(this.addr,e),Ct(t,e)}}function Yg(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;r.uniform4fv(this.addr,e),Ct(t,e)}}function Kg(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,n))return;rh.set(n),r.uniformMatrix2fv(this.addr,!1,rh),Ct(t,n)}}function $g(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,n))return;sh.set(n),r.uniformMatrix3fv(this.addr,!1,sh),Ct(t,n)}}function Zg(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,n))return;ih.set(n),r.uniformMatrix4fv(this.addr,!1,ih),Ct(t,n)}}function Jg(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Qg(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;r.uniform2iv(this.addr,e),Ct(t,e)}}function ex(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;r.uniform3iv(this.addr,e),Ct(t,e)}}function tx(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;r.uniform4iv(this.addr,e),Ct(t,e)}}function nx(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function ix(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;r.uniform2uiv(this.addr,e),Ct(t,e)}}function sx(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;r.uniform3uiv(this.addr,e),Ct(t,e)}}function rx(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;r.uniform4uiv(this.addr,e),Ct(t,e)}}function ax(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(eh.compareFunction=Zh,s=eh):s=Au,t.setTexture2D(e||s,i)}function ox(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Cu,i)}function lx(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Pu,i)}function cx(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Ru,i)}function hx(r){switch(r){case 5126:return Xg;case 35664:return qg;case 35665:return jg;case 35666:return Yg;case 35674:return Kg;case 35675:return $g;case 35676:return Zg;case 5124:case 35670:return Jg;case 35667:case 35671:return Qg;case 35668:case 35672:return ex;case 35669:case 35673:return tx;case 5125:return nx;case 36294:return ix;case 36295:return sx;case 36296:return rx;case 35678:case 36198:case 36298:case 36306:case 35682:return ax;case 35679:case 36299:case 36307:return ox;case 35680:case 36300:case 36308:case 36293:return lx;case 36289:case 36303:case 36311:case 36292:return cx}}function ux(r,e){r.uniform1fv(this.addr,e)}function dx(r,e){const t=ys(e,this.size,2);r.uniform2fv(this.addr,t)}function fx(r,e){const t=ys(e,this.size,3);r.uniform3fv(this.addr,t)}function px(r,e){const t=ys(e,this.size,4);r.uniform4fv(this.addr,t)}function mx(r,e){const t=ys(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function gx(r,e){const t=ys(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function xx(r,e){const t=ys(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function _x(r,e){r.uniform1iv(this.addr,e)}function vx(r,e){r.uniform2iv(this.addr,e)}function yx(r,e){r.uniform3iv(this.addr,e)}function bx(r,e){r.uniform4iv(this.addr,e)}function Mx(r,e){r.uniform1uiv(this.addr,e)}function Sx(r,e){r.uniform2uiv(this.addr,e)}function Tx(r,e){r.uniform3uiv(this.addr,e)}function Ex(r,e){r.uniform4uiv(this.addr,e)}function wx(r,e,t){const n=this.cache,i=e.length,s=fa(t,i);Rt(n,s)||(r.uniform1iv(this.addr,s),Ct(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Au,s[a])}function Ax(r,e,t){const n=this.cache,i=e.length,s=fa(t,i);Rt(n,s)||(r.uniform1iv(this.addr,s),Ct(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Cu,s[a])}function Rx(r,e,t){const n=this.cache,i=e.length,s=fa(t,i);Rt(n,s)||(r.uniform1iv(this.addr,s),Ct(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Pu,s[a])}function Cx(r,e,t){const n=this.cache,i=e.length,s=fa(t,i);Rt(n,s)||(r.uniform1iv(this.addr,s),Ct(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Ru,s[a])}function Px(r){switch(r){case 5126:return ux;case 35664:return dx;case 35665:return fx;case 35666:return px;case 35674:return mx;case 35675:return gx;case 35676:return xx;case 5124:case 35670:return _x;case 35667:case 35671:return vx;case 35668:case 35672:return yx;case 35669:case 35673:return bx;case 5125:return Mx;case 36294:return Sx;case 36295:return Tx;case 36296:return Ex;case 35678:case 36198:case 36298:case 36306:case 35682:return wx;case 35679:case 36299:case 36307:return Ax;case 35680:case 36300:case 36308:case 36293:return Rx;case 36289:case 36303:case 36311:case 36292:return Cx}}class Ix{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=hx(t.type)}}class Lx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Px(t.type)}}class Dx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const Qa=/(\w+)(\])?(\[|\.)?/g;function ah(r,e){r.seq.push(e),r.map[e.id]=e}function Nx(r,e,t){const n=r.name,i=n.length;for(Qa.lastIndex=0;;){const s=Qa.exec(n),a=Qa.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){ah(t,c===void 0?new Ix(o,r,e):new Lx(o,r,e));break}else{let u=t.map[o];u===void 0&&(u=new Dx(o),ah(t,u)),t=u}}}class jr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),a=e.getUniformLocation(t,s.name);Nx(s,a,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function oh(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const Ux=37297;let Fx=0;function Ox(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const lh=new je;function Bx(r){it._getMatrix(lh,it.workingColorSpace,r);const e=`mat3( ${lh.elements.map(t=>t.toFixed(4))} )`;switch(it.getTransfer(r)){case Jr:return[e,"LinearTransferOETF"];case ct:return[e,"sRGBTransferOETF"];default:return De("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function ch(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+Ox(r.getShaderSource(e),o)}else return s}function zx(r,e){const t=Bx(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function kx(r,e){let t;switch(e){case Nh:t="Linear";break;case Uh:t="Reinhard";break;case Fh:t="Cineon";break;case vl:t="ACESFilmic";break;case Bh:t="AgX";break;case zh:t="Neutral";break;case Oh:t="Custom";break;default:De("WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Lr=new I;function Vx(){it.getLuminanceCoefficients(Lr);const r=Lr.x.toFixed(4),e=Lr.y.toFixed(4),t=Lr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Hx(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fs).join(`
`)}function Gx(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Wx(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function Fs(r){return r!==""}function hh(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function uh(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Xx=/^[ \t]*#include +<([\w\d./]+)>/gm;function hl(r){return r.replace(Xx,jx)}const qx=new Map;function jx(r,e){let t=Ke[e];if(t===void 0){const n=qx.get(e);if(n!==void 0)t=Ke[n],De('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return hl(t)}const Yx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function dh(r){return r.replace(Yx,Kx)}function Kx(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function fh(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function $x(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Ih?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Lh?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Yn&&(e="SHADOWMAP_TYPE_VSM"),e}function Zx(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case as:case os:e="ENVMAP_TYPE_CUBE";break;case ra:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Jx(r){let e="ENVMAP_MODE_REFLECTION";return r.envMap&&r.envMapMode===os&&(e="ENVMAP_MODE_REFRACTION"),e}function Qx(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case _l:e="ENVMAP_BLENDING_MULTIPLY";break;case pd:e="ENVMAP_BLENDING_MIX";break;case md:e="ENVMAP_BLENDING_ADD";break}return e}function e_(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function t_(r,e,t,n){const i=r.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=$x(t),c=Zx(t),h=Jx(t),u=Qx(t),d=e_(t),f=Hx(t),m=Gx(s),x=i.createProgram();let g,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Fs).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Fs).join(`
`),p.length>0&&(p+=`
`)):(g=[fh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fs).join(`
`),p=[fh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ui?"#define TONE_MAPPING":"",t.toneMapping!==ui?Ke.tonemapping_pars_fragment:"",t.toneMapping!==ui?kx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,zx("linearToOutputTexel",t.outputColorSpace),Vx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Fs).join(`
`)),a=hl(a),a=hh(a,t),a=uh(a,t),o=hl(o),o=hh(o,t),o=uh(o,t),a=dh(a),o=dh(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===ac?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ac?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=v+g+a,M=v+p+o,R=oh(i,i.VERTEX_SHADER,y),E=oh(i,i.FRAGMENT_SHADER,M);i.attachShader(x,R),i.attachShader(x,E),t.index0AttributeName!==void 0?i.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function P(C){if(r.debug.checkShaderErrors){const F=i.getProgramInfoLog(x)||"",z=i.getShaderInfoLog(R)||"",Y=i.getShaderInfoLog(E)||"",V=F.trim(),j=z.trim(),J=Y.trim();let q=!0,se=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(q=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,x,R,E);else{const le=ch(i,R,"vertex"),Me=ch(i,E,"fragment");Qe("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+V+`
`+le+`
`+Me)}else V!==""?De("WebGLProgram: Program Info Log:",V):(j===""||J==="")&&(se=!1);se&&(C.diagnostics={runnable:q,programLog:V,vertexShader:{log:j,prefix:g},fragmentShader:{log:J,prefix:p}})}i.deleteShader(R),i.deleteShader(E),N=new jr(i,x),T=Wx(i,x)}let N;this.getUniforms=function(){return N===void 0&&P(this),N};let T;this.getAttributes=function(){return T===void 0&&P(this),T};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=i.getProgramParameter(x,Ux)),b},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Fx++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=R,this.fragmentShader=E,this}let n_=0;class i_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new s_(e),t.set(e,n)),n}}class s_{constructor(e){this.id=n_++,this.code=e,this.usedTimes=0}}function r_(r,e,t,n,i,s,a){const o=new eu,l=new i_,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(T){return c.add(T),T===0?"uv":`uv${T}`}function g(T,b,C,F,z){const Y=F.fog,V=z.geometry,j=T.isMeshStandardMaterial?F.environment:null,J=(T.isMeshStandardMaterial?t:e).get(T.envMap||j),q=J&&J.mapping===ra?J.image.height:null,se=m[T.type];T.precision!==null&&(f=i.getMaxPrecision(T.precision),f!==T.precision&&De("WebGLProgram.getParameters:",T.precision,"not supported, using",f,"instead."));const le=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Me=le!==void 0?le.length:0;let ke=0;V.morphAttributes.position!==void 0&&(ke=1),V.morphAttributes.normal!==void 0&&(ke=2),V.morphAttributes.color!==void 0&&(ke=3);let qe,Ze,et,K;if(se){const dt=Dn[se];qe=dt.vertexShader,Ze=dt.fragmentShader}else qe=T.vertexShader,Ze=T.fragmentShader,l.update(T),et=l.getVertexShaderID(T),K=l.getFragmentShaderID(T);const Z=r.getRenderTarget(),xe=r.state.buffers.depth.getReversed(),Ee=z.isInstancedMesh===!0,Se=z.isBatchedMesh===!0,We=!!T.map,st=!!T.matcap,Le=!!J,ee=!!T.aoMap,A=!!T.lightMap,D=!!T.bumpMap,k=!!T.normalMap,ie=!!T.displacementMap,Q=!!T.emissiveMap,ne=!!T.metalnessMap,he=!!T.roughnessMap,ve=T.anisotropy>0,w=T.clearcoat>0,_=T.dispersion>0,U=T.iridescence>0,H=T.sheen>0,$=T.transmission>0,W=ve&&!!T.anisotropyMap,we=w&&!!T.clearcoatMap,me=w&&!!T.clearcoatNormalMap,Ie=w&&!!T.clearcoatRoughnessMap,Re=U&&!!T.iridescenceMap,re=U&&!!T.iridescenceThicknessMap,fe=H&&!!T.sheenColorMap,ze=H&&!!T.sheenRoughnessMap,Fe=!!T.specularMap,be=!!T.specularColorMap,Oe=!!T.specularIntensityMap,L=$&&!!T.transmissionMap,ge=$&&!!T.thicknessMap,ue=!!T.gradientMap,_e=!!T.alphaMap,ce=T.alphaTest>0,te=!!T.alphaHash,Ce=!!T.extensions;let Xe=ui;T.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Xe=r.toneMapping);const xt={shaderID:se,shaderType:T.type,shaderName:T.name,vertexShader:qe,fragmentShader:Ze,defines:T.defines,customVertexShaderID:et,customFragmentShaderID:K,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:f,batching:Se,batchingColor:Se&&z._colorsTexture!==null,instancing:Ee,instancingColor:Ee&&z.instanceColor!==null,instancingMorph:Ee&&z.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Z===null?r.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Yt,alphaToCoverage:!!T.alphaToCoverage,map:We,matcap:st,envMap:Le,envMapMode:Le&&J.mapping,envMapCubeUVHeight:q,aoMap:ee,lightMap:A,bumpMap:D,normalMap:k,displacementMap:d&&ie,emissiveMap:Q,normalMapObjectSpace:k&&T.normalMapType===Md,normalMapTangentSpace:k&&T.normalMapType===aa,metalnessMap:ne,roughnessMap:he,anisotropy:ve,anisotropyMap:W,clearcoat:w,clearcoatMap:we,clearcoatNormalMap:me,clearcoatRoughnessMap:Ie,dispersion:_,iridescence:U,iridescenceMap:Re,iridescenceThicknessMap:re,sheen:H,sheenColorMap:fe,sheenRoughnessMap:ze,specularMap:Fe,specularColorMap:be,specularIntensityMap:Oe,transmission:$,transmissionMap:L,thicknessMap:ge,gradientMap:ue,opaque:T.transparent===!1&&T.blending===wi&&T.alphaToCoverage===!1,alphaMap:_e,alphaTest:ce,alphaHash:te,combine:T.combine,mapUv:We&&x(T.map.channel),aoMapUv:ee&&x(T.aoMap.channel),lightMapUv:A&&x(T.lightMap.channel),bumpMapUv:D&&x(T.bumpMap.channel),normalMapUv:k&&x(T.normalMap.channel),displacementMapUv:ie&&x(T.displacementMap.channel),emissiveMapUv:Q&&x(T.emissiveMap.channel),metalnessMapUv:ne&&x(T.metalnessMap.channel),roughnessMapUv:he&&x(T.roughnessMap.channel),anisotropyMapUv:W&&x(T.anisotropyMap.channel),clearcoatMapUv:we&&x(T.clearcoatMap.channel),clearcoatNormalMapUv:me&&x(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ie&&x(T.clearcoatRoughnessMap.channel),iridescenceMapUv:Re&&x(T.iridescenceMap.channel),iridescenceThicknessMapUv:re&&x(T.iridescenceThicknessMap.channel),sheenColorMapUv:fe&&x(T.sheenColorMap.channel),sheenRoughnessMapUv:ze&&x(T.sheenRoughnessMap.channel),specularMapUv:Fe&&x(T.specularMap.channel),specularColorMapUv:be&&x(T.specularColorMap.channel),specularIntensityMapUv:Oe&&x(T.specularIntensityMap.channel),transmissionMapUv:L&&x(T.transmissionMap.channel),thicknessMapUv:ge&&x(T.thicknessMap.channel),alphaMapUv:_e&&x(T.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(k||ve),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!V.attributes.uv&&(We||_e),fog:!!Y,useFog:T.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:T.flatShading===!0&&T.wireframe===!1,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:xe,skinning:z.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:Me,morphTextureStride:ke,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:T.dithering,shadowMapEnabled:r.shadowMap.enabled&&C.length>0,shadowMapType:r.shadowMap.type,toneMapping:Xe,decodeVideoTexture:We&&T.map.isVideoTexture===!0&&it.getTransfer(T.map.colorSpace)===ct,decodeVideoTextureEmissive:Q&&T.emissiveMap.isVideoTexture===!0&&it.getTransfer(T.emissiveMap.colorSpace)===ct,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===un,flipSided:T.side===jt,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Ce&&T.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ce&&T.extensions.multiDraw===!0||Se)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return xt.vertexUv1s=c.has(1),xt.vertexUv2s=c.has(2),xt.vertexUv3s=c.has(3),c.clear(),xt}function p(T){const b=[];if(T.shaderID?b.push(T.shaderID):(b.push(T.customVertexShaderID),b.push(T.customFragmentShaderID)),T.defines!==void 0)for(const C in T.defines)b.push(C),b.push(T.defines[C]);return T.isRawShaderMaterial===!1&&(v(b,T),y(b,T),b.push(r.outputColorSpace)),b.push(T.customProgramCacheKey),b.join()}function v(T,b){T.push(b.precision),T.push(b.outputColorSpace),T.push(b.envMapMode),T.push(b.envMapCubeUVHeight),T.push(b.mapUv),T.push(b.alphaMapUv),T.push(b.lightMapUv),T.push(b.aoMapUv),T.push(b.bumpMapUv),T.push(b.normalMapUv),T.push(b.displacementMapUv),T.push(b.emissiveMapUv),T.push(b.metalnessMapUv),T.push(b.roughnessMapUv),T.push(b.anisotropyMapUv),T.push(b.clearcoatMapUv),T.push(b.clearcoatNormalMapUv),T.push(b.clearcoatRoughnessMapUv),T.push(b.iridescenceMapUv),T.push(b.iridescenceThicknessMapUv),T.push(b.sheenColorMapUv),T.push(b.sheenRoughnessMapUv),T.push(b.specularMapUv),T.push(b.specularColorMapUv),T.push(b.specularIntensityMapUv),T.push(b.transmissionMapUv),T.push(b.thicknessMapUv),T.push(b.combine),T.push(b.fogExp2),T.push(b.sizeAttenuation),T.push(b.morphTargetsCount),T.push(b.morphAttributeCount),T.push(b.numDirLights),T.push(b.numPointLights),T.push(b.numSpotLights),T.push(b.numSpotLightMaps),T.push(b.numHemiLights),T.push(b.numRectAreaLights),T.push(b.numDirLightShadows),T.push(b.numPointLightShadows),T.push(b.numSpotLightShadows),T.push(b.numSpotLightShadowsWithMaps),T.push(b.numLightProbes),T.push(b.shadowMapType),T.push(b.toneMapping),T.push(b.numClippingPlanes),T.push(b.numClipIntersection),T.push(b.depthPacking)}function y(T,b){o.disableAll(),b.supportsVertexTextures&&o.enable(0),b.instancing&&o.enable(1),b.instancingColor&&o.enable(2),b.instancingMorph&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),b.dispersion&&o.enable(20),b.batchingColor&&o.enable(21),b.gradientMap&&o.enable(22),T.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),T.push(o.mask)}function M(T){const b=m[T.type];let C;if(b){const F=Dn[b];C=Nn.clone(F.uniforms)}else C=T.uniforms;return C}function R(T,b){let C;for(let F=0,z=h.length;F<z;F++){const Y=h[F];if(Y.cacheKey===b){C=Y,++C.usedTimes;break}}return C===void 0&&(C=new t_(r,b,T,s),h.push(C)),C}function E(T){if(--T.usedTimes===0){const b=h.indexOf(T);h[b]=h[h.length-1],h.pop(),T.destroy()}}function P(T){l.remove(T)}function N(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:M,acquireProgram:R,releaseProgram:E,releaseShaderCache:P,programs:h,dispose:N}}function a_(){let r=new WeakMap;function e(a){return r.has(a)}function t(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function o_(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function ph(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function mh(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(u,d,f,m,x,g){let p=r[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:x,group:g},r[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=x,p.group=g),e++,p}function o(u,d,f,m,x,g){const p=a(u,d,f,m,x,g);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(u,d,f,m,x,g){const p=a(u,d,f,m,x,g);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||o_),n.length>1&&n.sort(d||ph),i.length>1&&i.sort(d||ph)}function h(){for(let u=e,d=r.length;u<d;u++){const f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:o,unshift:l,finish:h,sort:c}}function l_(){let r=new WeakMap;function e(n,i){const s=r.get(n);let a;return s===void 0?(a=new mh,r.set(n,[a])):i>=s.length?(a=new mh,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function c_(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new Ne};break;case"SpotLight":t={position:new I,direction:new I,color:new Ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new Ne,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new Ne,groundColor:new Ne};break;case"RectAreaLight":t={color:new Ne,position:new I,halfWidth:new I,halfHeight:new I};break}return r[e.id]=t,t}}}function h_(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let u_=0;function d_(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function f_(r){const e=new c_,t=h_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);const i=new I,s=new Ge,a=new Ge;function o(c){let h=0,u=0,d=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let f=0,m=0,x=0,g=0,p=0,v=0,y=0,M=0,R=0,E=0,P=0;c.sort(d_);for(let T=0,b=c.length;T<b;T++){const C=c[T],F=C.color,z=C.intensity,Y=C.distance,V=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=F.r*z,u+=F.g*z,d+=F.b*z;else if(C.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(C.sh.coefficients[j],z);P++}else if(C.isDirectionalLight){const j=e.get(C);if(j.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const J=C.shadow,q=t.get(C);q.shadowIntensity=J.intensity,q.shadowBias=J.bias,q.shadowNormalBias=J.normalBias,q.shadowRadius=J.radius,q.shadowMapSize=J.mapSize,n.directionalShadow[f]=q,n.directionalShadowMap[f]=V,n.directionalShadowMatrix[f]=C.shadow.matrix,v++}n.directional[f]=j,f++}else if(C.isSpotLight){const j=e.get(C);j.position.setFromMatrixPosition(C.matrixWorld),j.color.copy(F).multiplyScalar(z),j.distance=Y,j.coneCos=Math.cos(C.angle),j.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),j.decay=C.decay,n.spot[x]=j;const J=C.shadow;if(C.map&&(n.spotLightMap[R]=C.map,R++,J.updateMatrices(C),C.castShadow&&E++),n.spotLightMatrix[x]=J.matrix,C.castShadow){const q=t.get(C);q.shadowIntensity=J.intensity,q.shadowBias=J.bias,q.shadowNormalBias=J.normalBias,q.shadowRadius=J.radius,q.shadowMapSize=J.mapSize,n.spotShadow[x]=q,n.spotShadowMap[x]=V,M++}x++}else if(C.isRectAreaLight){const j=e.get(C);j.color.copy(F).multiplyScalar(z),j.halfWidth.set(C.width*.5,0,0),j.halfHeight.set(0,C.height*.5,0),n.rectArea[g]=j,g++}else if(C.isPointLight){const j=e.get(C);if(j.color.copy(C.color).multiplyScalar(C.intensity),j.distance=C.distance,j.decay=C.decay,C.castShadow){const J=C.shadow,q=t.get(C);q.shadowIntensity=J.intensity,q.shadowBias=J.bias,q.shadowNormalBias=J.normalBias,q.shadowRadius=J.radius,q.shadowMapSize=J.mapSize,q.shadowCameraNear=J.camera.near,q.shadowCameraFar=J.camera.far,n.pointShadow[m]=q,n.pointShadowMap[m]=V,n.pointShadowMatrix[m]=C.shadow.matrix,y++}n.point[m]=j,m++}else if(C.isHemisphereLight){const j=e.get(C);j.skyColor.copy(C.color).multiplyScalar(z),j.groundColor.copy(C.groundColor).multiplyScalar(z),n.hemi[p]=j,p++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ye.LTC_FLOAT_1,n.rectAreaLTC2=ye.LTC_FLOAT_2):(n.rectAreaLTC1=ye.LTC_HALF_1,n.rectAreaLTC2=ye.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const N=n.hash;(N.directionalLength!==f||N.pointLength!==m||N.spotLength!==x||N.rectAreaLength!==g||N.hemiLength!==p||N.numDirectionalShadows!==v||N.numPointShadows!==y||N.numSpotShadows!==M||N.numSpotMaps!==R||N.numLightProbes!==P)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=M+R-E,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=P,N.directionalLength=f,N.pointLength=m,N.spotLength=x,N.rectAreaLength=g,N.hemiLength=p,N.numDirectionalShadows=v,N.numPointShadows=y,N.numSpotShadows=M,N.numSpotMaps=R,N.numLightProbes=P,n.version=u_++)}function l(c,h){let u=0,d=0,f=0,m=0,x=0;const g=h.matrixWorldInverse;for(let p=0,v=c.length;p<v;p++){const y=c[p];if(y.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(g),u++}else if(y.isSpotLight){const M=n.spot[f];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(g),M.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(g),f++}else if(y.isRectAreaLight){const M=n.rectArea[m];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(g),a.identity(),s.copy(y.matrixWorld),s.premultiply(g),a.extractRotation(s),M.halfWidth.set(y.width*.5,0,0),M.halfHeight.set(0,y.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),m++}else if(y.isPointLight){const M=n.point[d];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(g),d++}else if(y.isHemisphereLight){const M=n.hemi[x];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(g),x++}}}return{setup:o,setupView:l,state:n}}function gh(r){const e=new f_(r),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function s(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function p_(r){let e=new WeakMap;function t(i,s=0){const a=e.get(i);let o;return a===void 0?(o=new gh(r),e.set(i,[o])):s>=a.length?(o=new gh(r),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const m_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,g_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function x_(r,e,t){let n=new Nl;const i=new ae,s=new ae,a=new ot,o=new d0({depthPacking:bd}),l=new f0,c={},h=t.maxTextureSize,u={[Jn]:jt,[jt]:Jn,[un]:un},d=new Et({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ae},radius:{value:4}},vertexShader:m_,fragmentShader:g_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new Nt;m.setAttribute("position",new Bt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new _t(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ih;let p=this.type;this.render=function(E,P,N){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;const T=r.getRenderTarget(),b=r.getActiveCubeFace(),C=r.getActiveMipmapLevel(),F=r.state;F.setBlending(It),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const z=p!==Yn&&this.type===Yn,Y=p===Yn&&this.type!==Yn;for(let V=0,j=E.length;V<j;V++){const J=E[V],q=J.shadow;if(q===void 0){De("WebGLShadowMap:",J,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;i.copy(q.mapSize);const se=q.getFrameExtents();if(i.multiply(se),s.copy(q.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/se.x),i.x=s.x*se.x,q.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/se.y),i.y=s.y*se.y,q.mapSize.y=s.y)),q.map===null||z===!0||Y===!0){const Me=this.type!==Yn?{minFilter:Dt,magFilter:Dt}:{};q.map!==null&&q.map.dispose(),q.map=new rn(i.x,i.y,Me),q.map.texture.name=J.name+".shadowMap",q.camera.updateProjectionMatrix()}r.setRenderTarget(q.map),r.clear();const le=q.getViewportCount();for(let Me=0;Me<le;Me++){const ke=q.getViewport(Me);a.set(s.x*ke.x,s.y*ke.y,s.x*ke.z,s.y*ke.w),F.viewport(a),q.updateMatrices(J,Me),n=q.getFrustum(),M(P,N,q.camera,J,this.type)}q.isPointLightShadow!==!0&&this.type===Yn&&v(q,N),q.needsUpdate=!1}p=this.type,g.needsUpdate=!1,r.setRenderTarget(T,b,C)};function v(E,P){const N=e.update(x);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new rn(i.x,i.y)),d.uniforms.shadow_pass.value=E.map.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,r.setRenderTarget(E.mapPass),r.clear(),r.renderBufferDirect(P,null,N,d,x,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,r.setRenderTarget(E.map),r.clear(),r.renderBufferDirect(P,null,N,f,x,null)}function y(E,P,N,T){let b=null;const C=N.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(C!==void 0)b=C;else if(b=N.isPointLight===!0?l:o,r.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const F=b.uuid,z=P.uuid;let Y=c[F];Y===void 0&&(Y={},c[F]=Y);let V=Y[z];V===void 0&&(V=b.clone(),Y[z]=V,P.addEventListener("dispose",R)),b=V}if(b.visible=P.visible,b.wireframe=P.wireframe,T===Yn?b.side=P.shadowSide!==null?P.shadowSide:P.side:b.side=P.shadowSide!==null?P.shadowSide:u[P.side],b.alphaMap=P.alphaMap,b.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,b.map=P.map,b.clipShadows=P.clipShadows,b.clippingPlanes=P.clippingPlanes,b.clipIntersection=P.clipIntersection,b.displacementMap=P.displacementMap,b.displacementScale=P.displacementScale,b.displacementBias=P.displacementBias,b.wireframeLinewidth=P.wireframeLinewidth,b.linewidth=P.linewidth,N.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const F=r.properties.get(b);F.light=N}return b}function M(E,P,N,T,b){if(E.visible===!1)return;if(E.layers.test(P.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&b===Yn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,E.matrixWorld);const z=e.update(E),Y=E.material;if(Array.isArray(Y)){const V=z.groups;for(let j=0,J=V.length;j<J;j++){const q=V[j],se=Y[q.materialIndex];if(se&&se.visible){const le=y(E,se,T,b);E.onBeforeShadow(r,E,P,N,z,le,q),r.renderBufferDirect(N,null,z,le,E,q),E.onAfterShadow(r,E,P,N,z,le,q)}}}else if(Y.visible){const V=y(E,Y,T,b);E.onBeforeShadow(r,E,P,N,z,V,null),r.renderBufferDirect(N,null,z,V,E,null),E.onAfterShadow(r,E,P,N,z,V,null)}}const F=E.children;for(let z=0,Y=F.length;z<Y;z++)M(F[z],P,N,T,b)}function R(E){E.target.removeEventListener("dispose",R);for(const N in c){const T=c[N],b=E.target.uuid;b in T&&(T[b].dispose(),delete T[b])}}}const __={[_o]:vo,[yo]:So,[bo]:To,[rs]:Mo,[vo]:_o,[So]:yo,[To]:bo,[Mo]:rs};function v_(r,e){function t(){let L=!1;const ge=new ot;let ue=null;const _e=new ot(0,0,0,0);return{setMask:function(ce){ue!==ce&&!L&&(r.colorMask(ce,ce,ce,ce),ue=ce)},setLocked:function(ce){L=ce},setClear:function(ce,te,Ce,Xe,xt){xt===!0&&(ce*=Xe,te*=Xe,Ce*=Xe),ge.set(ce,te,Ce,Xe),_e.equals(ge)===!1&&(r.clearColor(ce,te,Ce,Xe),_e.copy(ge))},reset:function(){L=!1,ue=null,_e.set(-1,0,0,0)}}}function n(){let L=!1,ge=!1,ue=null,_e=null,ce=null;return{setReversed:function(te){if(ge!==te){const Ce=e.get("EXT_clip_control");te?Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.ZERO_TO_ONE_EXT):Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.NEGATIVE_ONE_TO_ONE_EXT),ge=te;const Xe=ce;ce=null,this.setClear(Xe)}},getReversed:function(){return ge},setTest:function(te){te?Z(r.DEPTH_TEST):xe(r.DEPTH_TEST)},setMask:function(te){ue!==te&&!L&&(r.depthMask(te),ue=te)},setFunc:function(te){if(ge&&(te=__[te]),_e!==te){switch(te){case _o:r.depthFunc(r.NEVER);break;case vo:r.depthFunc(r.ALWAYS);break;case yo:r.depthFunc(r.LESS);break;case rs:r.depthFunc(r.LEQUAL);break;case bo:r.depthFunc(r.EQUAL);break;case Mo:r.depthFunc(r.GEQUAL);break;case So:r.depthFunc(r.GREATER);break;case To:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}_e=te}},setLocked:function(te){L=te},setClear:function(te){ce!==te&&(ge&&(te=1-te),r.clearDepth(te),ce=te)},reset:function(){L=!1,ue=null,_e=null,ce=null,ge=!1}}}function i(){let L=!1,ge=null,ue=null,_e=null,ce=null,te=null,Ce=null,Xe=null,xt=null;return{setTest:function(dt){L||(dt?Z(r.STENCIL_TEST):xe(r.STENCIL_TEST))},setMask:function(dt){ge!==dt&&!L&&(r.stencilMask(dt),ge=dt)},setFunc:function(dt,Cn,gn){(ue!==dt||_e!==Cn||ce!==gn)&&(r.stencilFunc(dt,Cn,gn),ue=dt,_e=Cn,ce=gn)},setOp:function(dt,Cn,gn){(te!==dt||Ce!==Cn||Xe!==gn)&&(r.stencilOp(dt,Cn,gn),te=dt,Ce=Cn,Xe=gn)},setLocked:function(dt){L=dt},setClear:function(dt){xt!==dt&&(r.clearStencil(dt),xt=dt)},reset:function(){L=!1,ge=null,ue=null,_e=null,ce=null,te=null,Ce=null,Xe=null,xt=null}}}const s=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],m=null,x=!1,g=null,p=null,v=null,y=null,M=null,R=null,E=null,P=new Ne(0,0,0),N=0,T=!1,b=null,C=null,F=null,z=null,Y=null;const V=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let j=!1,J=0;const q=r.getParameter(r.VERSION);q.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(q)[1]),j=J>=1):q.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),j=J>=2);let se=null,le={};const Me=r.getParameter(r.SCISSOR_BOX),ke=r.getParameter(r.VIEWPORT),qe=new ot().fromArray(Me),Ze=new ot().fromArray(ke);function et(L,ge,ue,_e){const ce=new Uint8Array(4),te=r.createTexture();r.bindTexture(L,te),r.texParameteri(L,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(L,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ce=0;Ce<ue;Ce++)L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY?r.texImage3D(ge,0,r.RGBA,1,1,_e,0,r.RGBA,r.UNSIGNED_BYTE,ce):r.texImage2D(ge+Ce,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ce);return te}const K={};K[r.TEXTURE_2D]=et(r.TEXTURE_2D,r.TEXTURE_2D,1),K[r.TEXTURE_CUBE_MAP]=et(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[r.TEXTURE_2D_ARRAY]=et(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),K[r.TEXTURE_3D]=et(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Z(r.DEPTH_TEST),a.setFunc(rs),D(!1),k(tc),Z(r.CULL_FACE),ee(It);function Z(L){h[L]!==!0&&(r.enable(L),h[L]=!0)}function xe(L){h[L]!==!1&&(r.disable(L),h[L]=!1)}function Ee(L,ge){return u[L]!==ge?(r.bindFramebuffer(L,ge),u[L]=ge,L===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=ge),L===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=ge),!0):!1}function Se(L,ge){let ue=f,_e=!1;if(L){ue=d.get(ge),ue===void 0&&(ue=[],d.set(ge,ue));const ce=L.textures;if(ue.length!==ce.length||ue[0]!==r.COLOR_ATTACHMENT0){for(let te=0,Ce=ce.length;te<Ce;te++)ue[te]=r.COLOR_ATTACHMENT0+te;ue.length=ce.length,_e=!0}}else ue[0]!==r.BACK&&(ue[0]=r.BACK,_e=!0);_e&&r.drawBuffers(ue)}function We(L){return m!==L?(r.useProgram(L),m=L,!0):!1}const st={[Mn]:r.FUNC_ADD,[ed]:r.FUNC_SUBTRACT,[td]:r.FUNC_REVERSE_SUBTRACT};st[nd]=r.MIN,st[id]=r.MAX;const Le={[Ds]:r.ZERO,[sd]:r.ONE,[rd]:r.SRC_COLOR,[po]:r.SRC_ALPHA,[cd]:r.SRC_ALPHA_SATURATE,[xo]:r.DST_COLOR,[go]:r.DST_ALPHA,[ad]:r.ONE_MINUS_SRC_COLOR,[mo]:r.ONE_MINUS_SRC_ALPHA,[ld]:r.ONE_MINUS_DST_COLOR,[od]:r.ONE_MINUS_DST_ALPHA,[hd]:r.CONSTANT_COLOR,[ud]:r.ONE_MINUS_CONSTANT_COLOR,[dd]:r.CONSTANT_ALPHA,[fd]:r.ONE_MINUS_CONSTANT_ALPHA};function ee(L,ge,ue,_e,ce,te,Ce,Xe,xt,dt){if(L===It){x===!0&&(xe(r.BLEND),x=!1);return}if(x===!1&&(Z(r.BLEND),x=!0),L!==Dh){if(L!==g||dt!==T){if((p!==Mn||M!==Mn)&&(r.blendEquation(r.FUNC_ADD),p=Mn,M=Mn),dt)switch(L){case wi:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case fo:r.blendFunc(r.ONE,r.ONE);break;case nc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case ic:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Qe("WebGLState: Invalid blending: ",L);break}else switch(L){case wi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case fo:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case nc:Qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ic:Qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qe("WebGLState: Invalid blending: ",L);break}v=null,y=null,R=null,E=null,P.set(0,0,0),N=0,g=L,T=dt}return}ce=ce||ge,te=te||ue,Ce=Ce||_e,(ge!==p||ce!==M)&&(r.blendEquationSeparate(st[ge],st[ce]),p=ge,M=ce),(ue!==v||_e!==y||te!==R||Ce!==E)&&(r.blendFuncSeparate(Le[ue],Le[_e],Le[te],Le[Ce]),v=ue,y=_e,R=te,E=Ce),(Xe.equals(P)===!1||xt!==N)&&(r.blendColor(Xe.r,Xe.g,Xe.b,xt),P.copy(Xe),N=xt),g=L,T=!1}function A(L,ge){L.side===un?xe(r.CULL_FACE):Z(r.CULL_FACE);let ue=L.side===jt;ge&&(ue=!ue),D(ue),L.blending===wi&&L.transparent===!1?ee(It):ee(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),s.setMask(L.colorWrite);const _e=L.stencilWrite;o.setTest(_e),_e&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Q(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Z(r.SAMPLE_ALPHA_TO_COVERAGE):xe(r.SAMPLE_ALPHA_TO_COVERAGE)}function D(L){b!==L&&(L?r.frontFace(r.CW):r.frontFace(r.CCW),b=L)}function k(L){L!==Ju?(Z(r.CULL_FACE),L!==C&&(L===tc?r.cullFace(r.BACK):L===Qu?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):xe(r.CULL_FACE),C=L}function ie(L){L!==F&&(j&&r.lineWidth(L),F=L)}function Q(L,ge,ue){L?(Z(r.POLYGON_OFFSET_FILL),(z!==ge||Y!==ue)&&(r.polygonOffset(ge,ue),z=ge,Y=ue)):xe(r.POLYGON_OFFSET_FILL)}function ne(L){L?Z(r.SCISSOR_TEST):xe(r.SCISSOR_TEST)}function he(L){L===void 0&&(L=r.TEXTURE0+V-1),se!==L&&(r.activeTexture(L),se=L)}function ve(L,ge,ue){ue===void 0&&(se===null?ue=r.TEXTURE0+V-1:ue=se);let _e=le[ue];_e===void 0&&(_e={type:void 0,texture:void 0},le[ue]=_e),(_e.type!==L||_e.texture!==ge)&&(se!==ue&&(r.activeTexture(ue),se=ue),r.bindTexture(L,ge||K[L]),_e.type=L,_e.texture=ge)}function w(){const L=le[se];L!==void 0&&L.type!==void 0&&(r.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function _(){try{r.compressedTexImage2D(...arguments)}catch(L){L("WebGLState:",L)}}function U(){try{r.compressedTexImage3D(...arguments)}catch(L){L("WebGLState:",L)}}function H(){try{r.texSubImage2D(...arguments)}catch(L){L("WebGLState:",L)}}function $(){try{r.texSubImage3D(...arguments)}catch(L){L("WebGLState:",L)}}function W(){try{r.compressedTexSubImage2D(...arguments)}catch(L){L("WebGLState:",L)}}function we(){try{r.compressedTexSubImage3D(...arguments)}catch(L){L("WebGLState:",L)}}function me(){try{r.texStorage2D(...arguments)}catch(L){L("WebGLState:",L)}}function Ie(){try{r.texStorage3D(...arguments)}catch(L){L("WebGLState:",L)}}function Re(){try{r.texImage2D(...arguments)}catch(L){L("WebGLState:",L)}}function re(){try{r.texImage3D(...arguments)}catch(L){L("WebGLState:",L)}}function fe(L){qe.equals(L)===!1&&(r.scissor(L.x,L.y,L.z,L.w),qe.copy(L))}function ze(L){Ze.equals(L)===!1&&(r.viewport(L.x,L.y,L.z,L.w),Ze.copy(L))}function Fe(L,ge){let ue=c.get(ge);ue===void 0&&(ue=new WeakMap,c.set(ge,ue));let _e=ue.get(L);_e===void 0&&(_e=r.getUniformBlockIndex(ge,L.name),ue.set(L,_e))}function be(L,ge){const _e=c.get(ge).get(L);l.get(ge)!==_e&&(r.uniformBlockBinding(ge,_e,L.__bindingPointIndex),l.set(ge,_e))}function Oe(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},se=null,le={},u={},d=new WeakMap,f=[],m=null,x=!1,g=null,p=null,v=null,y=null,M=null,R=null,E=null,P=new Ne(0,0,0),N=0,T=!1,b=null,C=null,F=null,z=null,Y=null,qe.set(0,0,r.canvas.width,r.canvas.height),Ze.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:Z,disable:xe,bindFramebuffer:Ee,drawBuffers:Se,useProgram:We,setBlending:ee,setMaterial:A,setFlipSided:D,setCullFace:k,setLineWidth:ie,setPolygonOffset:Q,setScissorTest:ne,activeTexture:he,bindTexture:ve,unbindTexture:w,compressedTexImage2D:_,compressedTexImage3D:U,texImage2D:Re,texImage3D:re,updateUBOMapping:Fe,uniformBlockBinding:be,texStorage2D:me,texStorage3D:Ie,texSubImage2D:H,texSubImage3D:$,compressedTexSubImage2D:W,compressedTexSubImage3D:we,scissor:fe,viewport:ze,reset:Oe}}function y_(r,e,t,n,i,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ae,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(w,_){return f?new OffscreenCanvas(w,_):Ys("canvas")}function x(w,_,U){let H=1;const $=ve(w);if(($.width>U||$.height>U)&&(H=U/Math.max($.width,$.height)),H<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const W=Math.floor(H*$.width),we=Math.floor(H*$.height);u===void 0&&(u=m(W,we));const me=_?m(W,we):u;return me.width=W,me.height=we,me.getContext("2d").drawImage(w,0,0,W,we),De("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+W+"x"+we+")."),me}else return"data"in w&&De("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),w;return w}function g(w){return w.generateMipmaps}function p(w){r.generateMipmap(w)}function v(w){return w.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?r.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function y(w,_,U,H,$=!1){if(w!==null){if(r[w]!==void 0)return r[w];De("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let W=_;if(_===r.RED&&(U===r.FLOAT&&(W=r.R32F),U===r.HALF_FLOAT&&(W=r.R16F),U===r.UNSIGNED_BYTE&&(W=r.R8)),_===r.RED_INTEGER&&(U===r.UNSIGNED_BYTE&&(W=r.R8UI),U===r.UNSIGNED_SHORT&&(W=r.R16UI),U===r.UNSIGNED_INT&&(W=r.R32UI),U===r.BYTE&&(W=r.R8I),U===r.SHORT&&(W=r.R16I),U===r.INT&&(W=r.R32I)),_===r.RG&&(U===r.FLOAT&&(W=r.RG32F),U===r.HALF_FLOAT&&(W=r.RG16F),U===r.UNSIGNED_BYTE&&(W=r.RG8)),_===r.RG_INTEGER&&(U===r.UNSIGNED_BYTE&&(W=r.RG8UI),U===r.UNSIGNED_SHORT&&(W=r.RG16UI),U===r.UNSIGNED_INT&&(W=r.RG32UI),U===r.BYTE&&(W=r.RG8I),U===r.SHORT&&(W=r.RG16I),U===r.INT&&(W=r.RG32I)),_===r.RGB_INTEGER&&(U===r.UNSIGNED_BYTE&&(W=r.RGB8UI),U===r.UNSIGNED_SHORT&&(W=r.RGB16UI),U===r.UNSIGNED_INT&&(W=r.RGB32UI),U===r.BYTE&&(W=r.RGB8I),U===r.SHORT&&(W=r.RGB16I),U===r.INT&&(W=r.RGB32I)),_===r.RGBA_INTEGER&&(U===r.UNSIGNED_BYTE&&(W=r.RGBA8UI),U===r.UNSIGNED_SHORT&&(W=r.RGBA16UI),U===r.UNSIGNED_INT&&(W=r.RGBA32UI),U===r.BYTE&&(W=r.RGBA8I),U===r.SHORT&&(W=r.RGBA16I),U===r.INT&&(W=r.RGBA32I)),_===r.RGB&&(U===r.UNSIGNED_INT_5_9_9_9_REV&&(W=r.RGB9_E5),U===r.UNSIGNED_INT_10F_11F_11F_REV&&(W=r.R11F_G11F_B10F)),_===r.RGBA){const we=$?Jr:it.getTransfer(H);U===r.FLOAT&&(W=r.RGBA32F),U===r.HALF_FLOAT&&(W=r.RGBA16F),U===r.UNSIGNED_BYTE&&(W=we===ct?r.SRGB8_ALPHA8:r.RGBA8),U===r.UNSIGNED_SHORT_4_4_4_4&&(W=r.RGBA4),U===r.UNSIGNED_SHORT_5_5_5_1&&(W=r.RGB5_A1)}return(W===r.R16F||W===r.R32F||W===r.RG16F||W===r.RG32F||W===r.RGBA16F||W===r.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function M(w,_){let U;return w?_===null||_===Ci||_===ls?U=r.DEPTH24_STENCIL8:_===En?U=r.DEPTH32F_STENCIL8:_===Xs&&(U=r.DEPTH24_STENCIL8,De("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Ci||_===ls?U=r.DEPTH_COMPONENT24:_===En?U=r.DEPTH_COMPONENT32F:_===Xs&&(U=r.DEPTH_COMPONENT16),U}function R(w,_){return g(w)===!0||w.isFramebufferTexture&&w.minFilter!==Dt&&w.minFilter!==Xt?Math.log2(Math.max(_.width,_.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?_.mipmaps.length:1}function E(w){const _=w.target;_.removeEventListener("dispose",E),N(_),_.isVideoTexture&&h.delete(_)}function P(w){const _=w.target;_.removeEventListener("dispose",P),b(_)}function N(w){const _=n.get(w);if(_.__webglInit===void 0)return;const U=w.source,H=d.get(U);if(H){const $=H[_.__cacheKey];$.usedTimes--,$.usedTimes===0&&T(w),Object.keys(H).length===0&&d.delete(U)}n.remove(w)}function T(w){const _=n.get(w);r.deleteTexture(_.__webglTexture);const U=w.source,H=d.get(U);delete H[_.__cacheKey],a.memory.textures--}function b(w){const _=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(_.__webglFramebuffer[H]))for(let $=0;$<_.__webglFramebuffer[H].length;$++)r.deleteFramebuffer(_.__webglFramebuffer[H][$]);else r.deleteFramebuffer(_.__webglFramebuffer[H]);_.__webglDepthbuffer&&r.deleteRenderbuffer(_.__webglDepthbuffer[H])}else{if(Array.isArray(_.__webglFramebuffer))for(let H=0;H<_.__webglFramebuffer.length;H++)r.deleteFramebuffer(_.__webglFramebuffer[H]);else r.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&r.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&r.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let H=0;H<_.__webglColorRenderbuffer.length;H++)_.__webglColorRenderbuffer[H]&&r.deleteRenderbuffer(_.__webglColorRenderbuffer[H]);_.__webglDepthRenderbuffer&&r.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const U=w.textures;for(let H=0,$=U.length;H<$;H++){const W=n.get(U[H]);W.__webglTexture&&(r.deleteTexture(W.__webglTexture),a.memory.textures--),n.remove(U[H])}n.remove(w)}let C=0;function F(){C=0}function z(){const w=C;return w>=i.maxTextures&&De("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+i.maxTextures),C+=1,w}function Y(w){const _=[];return _.push(w.wrapS),_.push(w.wrapT),_.push(w.wrapR||0),_.push(w.magFilter),_.push(w.minFilter),_.push(w.anisotropy),_.push(w.internalFormat),_.push(w.format),_.push(w.type),_.push(w.generateMipmaps),_.push(w.premultiplyAlpha),_.push(w.flipY),_.push(w.unpackAlignment),_.push(w.colorSpace),_.join()}function V(w,_){const U=n.get(w);if(w.isVideoTexture&&ne(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&U.__version!==w.version){const H=w.image;if(H===null)De("WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)De("WebGLRenderer: Texture marked for update but image is incomplete");else{K(U,w,_);return}}else w.isExternalTexture&&(U.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,U.__webglTexture,r.TEXTURE0+_)}function j(w,_){const U=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&U.__version!==w.version){K(U,w,_);return}else w.isExternalTexture&&(U.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,U.__webglTexture,r.TEXTURE0+_)}function J(w,_){const U=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&U.__version!==w.version){K(U,w,_);return}t.bindTexture(r.TEXTURE_3D,U.__webglTexture,r.TEXTURE0+_)}function q(w,_){const U=n.get(w);if(w.version>0&&U.__version!==w.version){Z(U,w,_);return}t.bindTexture(r.TEXTURE_CUBE_MAP,U.__webglTexture,r.TEXTURE0+_)}const se={[mn]:r.REPEAT,[Un]:r.CLAMP_TO_EDGE,[$r]:r.MIRRORED_REPEAT},le={[Dt]:r.NEAREST,[Vh]:r.NEAREST_MIPMAP_NEAREST,[Ns]:r.NEAREST_MIPMAP_LINEAR,[Xt]:r.LINEAR,[Hr]:r.LINEAR_MIPMAP_NEAREST,[Kn]:r.LINEAR_MIPMAP_LINEAR},Me={[Sd]:r.NEVER,[Cd]:r.ALWAYS,[Td]:r.LESS,[Zh]:r.LEQUAL,[Ed]:r.EQUAL,[Rd]:r.GEQUAL,[wd]:r.GREATER,[Ad]:r.NOTEQUAL};function ke(w,_){if(_.type===En&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Xt||_.magFilter===Hr||_.magFilter===Ns||_.magFilter===Kn||_.minFilter===Xt||_.minFilter===Hr||_.minFilter===Ns||_.minFilter===Kn)&&De("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(w,r.TEXTURE_WRAP_S,se[_.wrapS]),r.texParameteri(w,r.TEXTURE_WRAP_T,se[_.wrapT]),(w===r.TEXTURE_3D||w===r.TEXTURE_2D_ARRAY)&&r.texParameteri(w,r.TEXTURE_WRAP_R,se[_.wrapR]),r.texParameteri(w,r.TEXTURE_MAG_FILTER,le[_.magFilter]),r.texParameteri(w,r.TEXTURE_MIN_FILTER,le[_.minFilter]),_.compareFunction&&(r.texParameteri(w,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(w,r.TEXTURE_COMPARE_FUNC,Me[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Dt||_.minFilter!==Ns&&_.minFilter!==Kn||_.type===En&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const U=e.get("EXT_texture_filter_anisotropic");r.texParameterf(w,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,i.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function qe(w,_){let U=!1;w.__webglInit===void 0&&(w.__webglInit=!0,_.addEventListener("dispose",E));const H=_.source;let $=d.get(H);$===void 0&&($={},d.set(H,$));const W=Y(_);if(W!==w.__cacheKey){$[W]===void 0&&($[W]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,U=!0),$[W].usedTimes++;const we=$[w.__cacheKey];we!==void 0&&($[w.__cacheKey].usedTimes--,we.usedTimes===0&&T(_)),w.__cacheKey=W,w.__webglTexture=$[W].texture}return U}function Ze(w,_,U){return Math.floor(Math.floor(w/U)/_)}function et(w,_,U,H){const W=w.updateRanges;if(W.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,_.width,_.height,U,H,_.data);else{W.sort((re,fe)=>re.start-fe.start);let we=0;for(let re=1;re<W.length;re++){const fe=W[we],ze=W[re],Fe=fe.start+fe.count,be=Ze(ze.start,_.width,4),Oe=Ze(fe.start,_.width,4);ze.start<=Fe+1&&be===Oe&&Ze(ze.start+ze.count-1,_.width,4)===be?fe.count=Math.max(fe.count,ze.start+ze.count-fe.start):(++we,W[we]=ze)}W.length=we+1;const me=r.getParameter(r.UNPACK_ROW_LENGTH),Ie=r.getParameter(r.UNPACK_SKIP_PIXELS),Re=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,_.width);for(let re=0,fe=W.length;re<fe;re++){const ze=W[re],Fe=Math.floor(ze.start/4),be=Math.ceil(ze.count/4),Oe=Fe%_.width,L=Math.floor(Fe/_.width),ge=be,ue=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,Oe),r.pixelStorei(r.UNPACK_SKIP_ROWS,L),t.texSubImage2D(r.TEXTURE_2D,0,Oe,L,ge,ue,U,H,_.data)}w.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,me),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Ie),r.pixelStorei(r.UNPACK_SKIP_ROWS,Re)}}function K(w,_,U){let H=r.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(H=r.TEXTURE_2D_ARRAY),_.isData3DTexture&&(H=r.TEXTURE_3D);const $=qe(w,_),W=_.source;t.bindTexture(H,w.__webglTexture,r.TEXTURE0+U);const we=n.get(W);if(W.version!==we.__version||$===!0){t.activeTexture(r.TEXTURE0+U);const me=it.getPrimaries(it.workingColorSpace),Ie=_.colorSpace===li?null:it.getPrimaries(_.colorSpace),Re=_.colorSpace===li||me===Ie?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,_.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,_.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);let re=x(_.image,!1,i.maxTextureSize);re=he(_,re);const fe=s.convert(_.format,_.colorSpace),ze=s.convert(_.type);let Fe=y(_.internalFormat,fe,ze,_.colorSpace,_.isVideoTexture);ke(H,_);let be;const Oe=_.mipmaps,L=_.isVideoTexture!==!0,ge=we.__version===void 0||$===!0,ue=W.dataReady,_e=R(_,re);if(_.isDepthTexture)Fe=M(_.format===cs,_.type),ge&&(L?t.texStorage2D(r.TEXTURE_2D,1,Fe,re.width,re.height):t.texImage2D(r.TEXTURE_2D,0,Fe,re.width,re.height,0,fe,ze,null));else if(_.isDataTexture)if(Oe.length>0){L&&ge&&t.texStorage2D(r.TEXTURE_2D,_e,Fe,Oe[0].width,Oe[0].height);for(let ce=0,te=Oe.length;ce<te;ce++)be=Oe[ce],L?ue&&t.texSubImage2D(r.TEXTURE_2D,ce,0,0,be.width,be.height,fe,ze,be.data):t.texImage2D(r.TEXTURE_2D,ce,Fe,be.width,be.height,0,fe,ze,be.data);_.generateMipmaps=!1}else L?(ge&&t.texStorage2D(r.TEXTURE_2D,_e,Fe,re.width,re.height),ue&&et(_,re,fe,ze)):t.texImage2D(r.TEXTURE_2D,0,Fe,re.width,re.height,0,fe,ze,re.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){L&&ge&&t.texStorage3D(r.TEXTURE_2D_ARRAY,_e,Fe,Oe[0].width,Oe[0].height,re.depth);for(let ce=0,te=Oe.length;ce<te;ce++)if(be=Oe[ce],_.format!==sn)if(fe!==null)if(L){if(ue)if(_.layerUpdates.size>0){const Ce=Yc(be.width,be.height,_.format,_.type);for(const Xe of _.layerUpdates){const xt=be.data.subarray(Xe*Ce/be.data.BYTES_PER_ELEMENT,(Xe+1)*Ce/be.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ce,0,0,Xe,be.width,be.height,1,fe,xt)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ce,0,0,0,be.width,be.height,re.depth,fe,be.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ce,Fe,be.width,be.height,re.depth,0,be.data,0,0);else De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?ue&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,ce,0,0,0,be.width,be.height,re.depth,fe,ze,be.data):t.texImage3D(r.TEXTURE_2D_ARRAY,ce,Fe,be.width,be.height,re.depth,0,fe,ze,be.data)}else{L&&ge&&t.texStorage2D(r.TEXTURE_2D,_e,Fe,Oe[0].width,Oe[0].height);for(let ce=0,te=Oe.length;ce<te;ce++)be=Oe[ce],_.format!==sn?fe!==null?L?ue&&t.compressedTexSubImage2D(r.TEXTURE_2D,ce,0,0,be.width,be.height,fe,be.data):t.compressedTexImage2D(r.TEXTURE_2D,ce,Fe,be.width,be.height,0,be.data):De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?ue&&t.texSubImage2D(r.TEXTURE_2D,ce,0,0,be.width,be.height,fe,ze,be.data):t.texImage2D(r.TEXTURE_2D,ce,Fe,be.width,be.height,0,fe,ze,be.data)}else if(_.isDataArrayTexture)if(L){if(ge&&t.texStorage3D(r.TEXTURE_2D_ARRAY,_e,Fe,re.width,re.height,re.depth),ue)if(_.layerUpdates.size>0){const ce=Yc(re.width,re.height,_.format,_.type);for(const te of _.layerUpdates){const Ce=re.data.subarray(te*ce/re.data.BYTES_PER_ELEMENT,(te+1)*ce/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,te,re.width,re.height,1,fe,ze,Ce)}_.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,fe,ze,re.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Fe,re.width,re.height,re.depth,0,fe,ze,re.data);else if(_.isData3DTexture)L?(ge&&t.texStorage3D(r.TEXTURE_3D,_e,Fe,re.width,re.height,re.depth),ue&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,fe,ze,re.data)):t.texImage3D(r.TEXTURE_3D,0,Fe,re.width,re.height,re.depth,0,fe,ze,re.data);else if(_.isFramebufferTexture){if(ge)if(L)t.texStorage2D(r.TEXTURE_2D,_e,Fe,re.width,re.height);else{let ce=re.width,te=re.height;for(let Ce=0;Ce<_e;Ce++)t.texImage2D(r.TEXTURE_2D,Ce,Fe,ce,te,0,fe,ze,null),ce>>=1,te>>=1}}else if(Oe.length>0){if(L&&ge){const ce=ve(Oe[0]);t.texStorage2D(r.TEXTURE_2D,_e,Fe,ce.width,ce.height)}for(let ce=0,te=Oe.length;ce<te;ce++)be=Oe[ce],L?ue&&t.texSubImage2D(r.TEXTURE_2D,ce,0,0,fe,ze,be):t.texImage2D(r.TEXTURE_2D,ce,Fe,fe,ze,be);_.generateMipmaps=!1}else if(L){if(ge){const ce=ve(re);t.texStorage2D(r.TEXTURE_2D,_e,Fe,ce.width,ce.height)}ue&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,fe,ze,re)}else t.texImage2D(r.TEXTURE_2D,0,Fe,fe,ze,re);g(_)&&p(H),we.__version=W.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function Z(w,_,U){if(_.image.length!==6)return;const H=qe(w,_),$=_.source;t.bindTexture(r.TEXTURE_CUBE_MAP,w.__webglTexture,r.TEXTURE0+U);const W=n.get($);if($.version!==W.__version||H===!0){t.activeTexture(r.TEXTURE0+U);const we=it.getPrimaries(it.workingColorSpace),me=_.colorSpace===li?null:it.getPrimaries(_.colorSpace),Ie=_.colorSpace===li||we===me?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,_.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,_.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);const Re=_.isCompressedTexture||_.image[0].isCompressedTexture,re=_.image[0]&&_.image[0].isDataTexture,fe=[];for(let te=0;te<6;te++)!Re&&!re?fe[te]=x(_.image[te],!0,i.maxCubemapSize):fe[te]=re?_.image[te].image:_.image[te],fe[te]=he(_,fe[te]);const ze=fe[0],Fe=s.convert(_.format,_.colorSpace),be=s.convert(_.type),Oe=y(_.internalFormat,Fe,be,_.colorSpace),L=_.isVideoTexture!==!0,ge=W.__version===void 0||H===!0,ue=$.dataReady;let _e=R(_,ze);ke(r.TEXTURE_CUBE_MAP,_);let ce;if(Re){L&&ge&&t.texStorage2D(r.TEXTURE_CUBE_MAP,_e,Oe,ze.width,ze.height);for(let te=0;te<6;te++){ce=fe[te].mipmaps;for(let Ce=0;Ce<ce.length;Ce++){const Xe=ce[Ce];_.format!==sn?Fe!==null?L?ue&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce,0,0,Xe.width,Xe.height,Fe,Xe.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce,Oe,Xe.width,Xe.height,0,Xe.data):De("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?ue&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce,0,0,Xe.width,Xe.height,Fe,be,Xe.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce,Oe,Xe.width,Xe.height,0,Fe,be,Xe.data)}}}else{if(ce=_.mipmaps,L&&ge){ce.length>0&&_e++;const te=ve(fe[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,_e,Oe,te.width,te.height)}for(let te=0;te<6;te++)if(re){L?ue&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,fe[te].width,fe[te].height,Fe,be,fe[te].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Oe,fe[te].width,fe[te].height,0,Fe,be,fe[te].data);for(let Ce=0;Ce<ce.length;Ce++){const xt=ce[Ce].image[te].image;L?ue&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce+1,0,0,xt.width,xt.height,Fe,be,xt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce+1,Oe,xt.width,xt.height,0,Fe,be,xt.data)}}else{L?ue&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Fe,be,fe[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Oe,Fe,be,fe[te]);for(let Ce=0;Ce<ce.length;Ce++){const Xe=ce[Ce];L?ue&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce+1,0,0,Fe,be,Xe.image[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ce+1,Oe,Fe,be,Xe.image[te])}}}g(_)&&p(r.TEXTURE_CUBE_MAP),W.__version=$.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function xe(w,_,U,H,$,W){const we=s.convert(U.format,U.colorSpace),me=s.convert(U.type),Ie=y(U.internalFormat,we,me,U.colorSpace),Re=n.get(_),re=n.get(U);if(re.__renderTarget=_,!Re.__hasExternalTextures){const fe=Math.max(1,_.width>>W),ze=Math.max(1,_.height>>W);$===r.TEXTURE_3D||$===r.TEXTURE_2D_ARRAY?t.texImage3D($,W,Ie,fe,ze,_.depth,0,we,me,null):t.texImage2D($,W,Ie,fe,ze,0,we,me,null)}t.bindFramebuffer(r.FRAMEBUFFER,w),Q(_)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,H,$,re.__webglTexture,0,ie(_)):($===r.TEXTURE_2D||$>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,H,$,re.__webglTexture,W),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ee(w,_,U){if(r.bindRenderbuffer(r.RENDERBUFFER,w),_.depthBuffer){const H=_.depthTexture,$=H&&H.isDepthTexture?H.type:null,W=M(_.stencilBuffer,$),we=_.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,me=ie(_);Q(_)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,me,W,_.width,_.height):U?r.renderbufferStorageMultisample(r.RENDERBUFFER,me,W,_.width,_.height):r.renderbufferStorage(r.RENDERBUFFER,W,_.width,_.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,we,r.RENDERBUFFER,w)}else{const H=_.textures;for(let $=0;$<H.length;$++){const W=H[$],we=s.convert(W.format,W.colorSpace),me=s.convert(W.type),Ie=y(W.internalFormat,we,me,W.colorSpace),Re=ie(_);U&&Q(_)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Re,Ie,_.width,_.height):Q(_)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Re,Ie,_.width,_.height):r.renderbufferStorage(r.RENDERBUFFER,Ie,_.width,_.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Se(w,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,w),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const H=n.get(_.depthTexture);H.__renderTarget=_,(!H.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),V(_.depthTexture,0);const $=H.__webglTexture,W=ie(_);if(_.depthTexture.format===qs)Q(_)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,$,0,W):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,$,0);else if(_.depthTexture.format===cs)Q(_)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,$,0,W):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function We(w){const _=n.get(w),U=w.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==w.depthTexture){const H=w.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),H){const $=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,H.removeEventListener("dispose",$)};H.addEventListener("dispose",$),_.__depthDisposeCallback=$}_.__boundDepthTexture=H}if(w.depthTexture&&!_.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");const H=w.texture.mipmaps;H&&H.length>0?Se(_.__webglFramebuffer[0],w):Se(_.__webglFramebuffer,w)}else if(U){_.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(t.bindFramebuffer(r.FRAMEBUFFER,_.__webglFramebuffer[H]),_.__webglDepthbuffer[H]===void 0)_.__webglDepthbuffer[H]=r.createRenderbuffer(),Ee(_.__webglDepthbuffer[H],w,!1);else{const $=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,W=_.__webglDepthbuffer[H];r.bindRenderbuffer(r.RENDERBUFFER,W),r.framebufferRenderbuffer(r.FRAMEBUFFER,$,r.RENDERBUFFER,W)}}else{const H=w.texture.mipmaps;if(H&&H.length>0?t.bindFramebuffer(r.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=r.createRenderbuffer(),Ee(_.__webglDepthbuffer,w,!1);else{const $=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,W=_.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,W),r.framebufferRenderbuffer(r.FRAMEBUFFER,$,r.RENDERBUFFER,W)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function st(w,_,U){const H=n.get(w);_!==void 0&&xe(H.__webglFramebuffer,w,w.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),U!==void 0&&We(w)}function Le(w){const _=w.texture,U=n.get(w),H=n.get(_);w.addEventListener("dispose",P);const $=w.textures,W=w.isWebGLCubeRenderTarget===!0,we=$.length>1;if(we||(H.__webglTexture===void 0&&(H.__webglTexture=r.createTexture()),H.__version=_.version,a.memory.textures++),W){U.__webglFramebuffer=[];for(let me=0;me<6;me++)if(_.mipmaps&&_.mipmaps.length>0){U.__webglFramebuffer[me]=[];for(let Ie=0;Ie<_.mipmaps.length;Ie++)U.__webglFramebuffer[me][Ie]=r.createFramebuffer()}else U.__webglFramebuffer[me]=r.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){U.__webglFramebuffer=[];for(let me=0;me<_.mipmaps.length;me++)U.__webglFramebuffer[me]=r.createFramebuffer()}else U.__webglFramebuffer=r.createFramebuffer();if(we)for(let me=0,Ie=$.length;me<Ie;me++){const Re=n.get($[me]);Re.__webglTexture===void 0&&(Re.__webglTexture=r.createTexture(),a.memory.textures++)}if(w.samples>0&&Q(w)===!1){U.__webglMultisampledFramebuffer=r.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let me=0;me<$.length;me++){const Ie=$[me];U.__webglColorRenderbuffer[me]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,U.__webglColorRenderbuffer[me]);const Re=s.convert(Ie.format,Ie.colorSpace),re=s.convert(Ie.type),fe=y(Ie.internalFormat,Re,re,Ie.colorSpace,w.isXRRenderTarget===!0),ze=ie(w);r.renderbufferStorageMultisample(r.RENDERBUFFER,ze,fe,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.RENDERBUFFER,U.__webglColorRenderbuffer[me])}r.bindRenderbuffer(r.RENDERBUFFER,null),w.depthBuffer&&(U.__webglDepthRenderbuffer=r.createRenderbuffer(),Ee(U.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(W){t.bindTexture(r.TEXTURE_CUBE_MAP,H.__webglTexture),ke(r.TEXTURE_CUBE_MAP,_);for(let me=0;me<6;me++)if(_.mipmaps&&_.mipmaps.length>0)for(let Ie=0;Ie<_.mipmaps.length;Ie++)xe(U.__webglFramebuffer[me][Ie],w,_,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ie);else xe(U.__webglFramebuffer[me],w,_,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);g(_)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(we){for(let me=0,Ie=$.length;me<Ie;me++){const Re=$[me],re=n.get(Re);let fe=r.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(fe=w.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(fe,re.__webglTexture),ke(fe,Re),xe(U.__webglFramebuffer,w,Re,r.COLOR_ATTACHMENT0+me,fe,0),g(Re)&&p(fe)}t.unbindTexture()}else{let me=r.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(me=w.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(me,H.__webglTexture),ke(me,_),_.mipmaps&&_.mipmaps.length>0)for(let Ie=0;Ie<_.mipmaps.length;Ie++)xe(U.__webglFramebuffer[Ie],w,_,r.COLOR_ATTACHMENT0,me,Ie);else xe(U.__webglFramebuffer,w,_,r.COLOR_ATTACHMENT0,me,0);g(_)&&p(me),t.unbindTexture()}w.depthBuffer&&We(w)}function ee(w){const _=w.textures;for(let U=0,H=_.length;U<H;U++){const $=_[U];if(g($)){const W=v(w),we=n.get($).__webglTexture;t.bindTexture(W,we),p(W),t.unbindTexture()}}}const A=[],D=[];function k(w){if(w.samples>0){if(Q(w)===!1){const _=w.textures,U=w.width,H=w.height;let $=r.COLOR_BUFFER_BIT;const W=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,we=n.get(w),me=_.length>1;if(me)for(let Re=0;Re<_.length;Re++)t.bindFramebuffer(r.FRAMEBUFFER,we.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Re,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,we.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Re,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer);const Ie=w.texture.mipmaps;Ie&&Ie.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,we.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let Re=0;Re<_.length;Re++){if(w.resolveDepthBuffer&&(w.depthBuffer&&($|=r.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&($|=r.STENCIL_BUFFER_BIT)),me){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,we.__webglColorRenderbuffer[Re]);const re=n.get(_[Re]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,re,0)}r.blitFramebuffer(0,0,U,H,0,0,U,H,$,r.NEAREST),l===!0&&(A.length=0,D.length=0,A.push(r.COLOR_ATTACHMENT0+Re),w.depthBuffer&&w.resolveDepthBuffer===!1&&(A.push(W),D.push(W),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,D)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,A))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),me)for(let Re=0;Re<_.length;Re++){t.bindFramebuffer(r.FRAMEBUFFER,we.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Re,r.RENDERBUFFER,we.__webglColorRenderbuffer[Re]);const re=n.get(_[Re]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,we.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Re,r.TEXTURE_2D,re,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const _=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[_])}}}function ie(w){return Math.min(i.maxSamples,w.samples)}function Q(w){const _=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function ne(w){const _=a.render.frame;h.get(w)!==_&&(h.set(w,_),w.update())}function he(w,_){const U=w.colorSpace,H=w.format,$=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||U!==Yt&&U!==li&&(it.getTransfer(U)===ct?(H!==sn||$!==wn)&&De("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qe("WebGLTextures: Unsupported texture color space:",U)),_}function ve(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=F,this.setTexture2D=V,this.setTexture2DArray=j,this.setTexture3D=J,this.setTextureCube=q,this.rebindTextures=st,this.setupRenderTarget=Le,this.updateRenderTargetMipmap=ee,this.updateMultisampleRenderTarget=k,this.setupDepthRenderbuffer=We,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=Q}function b_(r,e){function t(n,i=li){let s;const a=it.getTransfer(i);if(n===wn)return r.UNSIGNED_BYTE;if(n===bl)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Ml)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Wh)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Xh)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===Hh)return r.BYTE;if(n===Gh)return r.SHORT;if(n===Xs)return r.UNSIGNED_SHORT;if(n===yl)return r.INT;if(n===Ci)return r.UNSIGNED_INT;if(n===En)return r.FLOAT;if(n===dn)return r.HALF_FLOAT;if(n===qh)return r.ALPHA;if(n===jh)return r.RGB;if(n===sn)return r.RGBA;if(n===qs)return r.DEPTH_COMPONENT;if(n===cs)return r.DEPTH_STENCIL;if(n===Sl)return r.RED;if(n===Tl)return r.RED_INTEGER;if(n===El)return r.RG;if(n===wl)return r.RG_INTEGER;if(n===Al)return r.RGBA_INTEGER;if(n===Gr||n===Wr||n===Xr||n===qr)if(a===ct)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Gr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Wr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Xr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===qr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Gr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Wr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Xr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===qr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ao||n===Ro||n===Co||n===Po)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Ao)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ro)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Co)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Po)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Io||n===Lo||n===Do)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Io||n===Lo)return a===ct?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Do)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===No||n===Uo||n===Fo||n===Oo||n===Bo||n===zo||n===ko||n===Vo||n===Ho||n===Go||n===Wo||n===Xo||n===qo||n===jo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===No)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Uo)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Fo)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Oo)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Bo)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===zo)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ko)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Vo)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ho)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Go)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Wo)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Xo)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===qo)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===jo)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Yo||n===Ko||n===$o)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Yo)return a===ct?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ko)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===$o)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Zo||n===Jo||n===Qo||n===el)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Zo)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Jo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Qo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===el)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ls?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const M_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,S_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class T_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new uu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Et({vertexShader:M_,fragmentShader:S_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new _t(new bn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class E_ extends Li{constructor(e,t){super();const n=this;let i=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,m=null;const x=typeof XRWebGLBinding<"u",g=new T_,p={},v=t.getContextAttributes();let y=null,M=null;const R=[],E=[],P=new ae;let N=null;const T=new Gt;T.viewport=new ot;const b=new Gt;b.viewport=new ot;const C=[T,b],F=new P0;let z=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let Z=R[K];return Z===void 0&&(Z=new Ba,R[K]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(K){let Z=R[K];return Z===void 0&&(Z=new Ba,R[K]=Z),Z.getGripSpace()},this.getHand=function(K){let Z=R[K];return Z===void 0&&(Z=new Ba,R[K]=Z),Z.getHandSpace()};function V(K){const Z=E.indexOf(K.inputSource);if(Z===-1)return;const xe=R[Z];xe!==void 0&&(xe.update(K.inputSource,K.frame,c||a),xe.dispatchEvent({type:K.type,data:K.inputSource}))}function j(){i.removeEventListener("select",V),i.removeEventListener("selectstart",V),i.removeEventListener("selectend",V),i.removeEventListener("squeeze",V),i.removeEventListener("squeezestart",V),i.removeEventListener("squeezeend",V),i.removeEventListener("end",j),i.removeEventListener("inputsourceschange",J);for(let K=0;K<R.length;K++){const Z=E[K];Z!==null&&(E[K]=null,R[K].disconnect(Z))}z=null,Y=null,g.reset();for(const K in p)delete p[K];e.setRenderTarget(y),f=null,d=null,u=null,i=null,M=null,et.stop(),n.isPresenting=!1,e.setPixelRatio(N),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,n.isPresenting===!0&&De("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&De("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(K){if(i=K,i!==null){if(y=e.getRenderTarget(),i.addEventListener("select",V),i.addEventListener("selectstart",V),i.addEventListener("selectend",V),i.addEventListener("squeeze",V),i.addEventListener("squeezestart",V),i.addEventListener("squeezeend",V),i.addEventListener("end",j),i.addEventListener("inputsourceschange",J),v.xrCompatible!==!0&&await t.makeXRCompatible(),N=e.getPixelRatio(),e.getSize(P),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let xe=null,Ee=null,Se=null;v.depth&&(Se=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,xe=v.stencil?cs:qs,Ee=v.stencil?ls:Ci);const We={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(We),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new rn(d.textureWidth,d.textureHeight,{format:sn,type:wn,depthTexture:new Fl(d.textureWidth,d.textureHeight,Ee,void 0,void 0,void 0,void 0,void 0,void 0,xe),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const xe={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,xe),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new rn(f.framebufferWidth,f.framebufferHeight,{format:sn,type:wn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),et.setContext(i),et.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function J(K){for(let Z=0;Z<K.removed.length;Z++){const xe=K.removed[Z],Ee=E.indexOf(xe);Ee>=0&&(E[Ee]=null,R[Ee].disconnect(xe))}for(let Z=0;Z<K.added.length;Z++){const xe=K.added[Z];let Ee=E.indexOf(xe);if(Ee===-1){for(let We=0;We<R.length;We++)if(We>=E.length){E.push(xe),Ee=We;break}else if(E[We]===null){E[We]=xe,Ee=We;break}if(Ee===-1)break}const Se=R[Ee];Se&&Se.connect(xe)}}const q=new I,se=new I;function le(K,Z,xe){q.setFromMatrixPosition(Z.matrixWorld),se.setFromMatrixPosition(xe.matrixWorld);const Ee=q.distanceTo(se),Se=Z.projectionMatrix.elements,We=xe.projectionMatrix.elements,st=Se[14]/(Se[10]-1),Le=Se[14]/(Se[10]+1),ee=(Se[9]+1)/Se[5],A=(Se[9]-1)/Se[5],D=(Se[8]-1)/Se[0],k=(We[8]+1)/We[0],ie=st*D,Q=st*k,ne=Ee/(-D+k),he=ne*-D;if(Z.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(he),K.translateZ(ne),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Se[10]===-1)K.projectionMatrix.copy(Z.projectionMatrix),K.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const ve=st+ne,w=Le+ne,_=ie-he,U=Q+(Ee-he),H=ee*Le/w*ve,$=A*Le/w*ve;K.projectionMatrix.makePerspective(_,U,H,$,ve,w),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function Me(K,Z){Z===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(Z.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(i===null)return;let Z=K.near,xe=K.far;g.texture!==null&&(g.depthNear>0&&(Z=g.depthNear),g.depthFar>0&&(xe=g.depthFar)),F.near=b.near=T.near=Z,F.far=b.far=T.far=xe,(z!==F.near||Y!==F.far)&&(i.updateRenderState({depthNear:F.near,depthFar:F.far}),z=F.near,Y=F.far),F.layers.mask=K.layers.mask|6,T.layers.mask=F.layers.mask&3,b.layers.mask=F.layers.mask&5;const Ee=K.parent,Se=F.cameras;Me(F,Ee);for(let We=0;We<Se.length;We++)Me(Se[We],Ee);Se.length===2?le(F,T,b):F.projectionMatrix.copy(T.projectionMatrix),ke(K,F,Ee)};function ke(K,Z,xe){xe===null?K.matrix.copy(Z.matrixWorld):(K.matrix.copy(xe.matrixWorld),K.matrix.invert(),K.matrix.multiply(Z.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(Z.projectionMatrix),K.projectionMatrixInverse.copy(Z.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=hs*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(K){l=K,d!==null&&(d.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function(K){return p[K]};let qe=null;function Ze(K,Z){if(h=Z.getViewerPose(c||a),m=Z,h!==null){const xe=h.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let Ee=!1;xe.length!==F.cameras.length&&(F.cameras.length=0,Ee=!0);for(let Le=0;Le<xe.length;Le++){const ee=xe[Le];let A=null;if(f!==null)A=f.getViewport(ee);else{const k=u.getViewSubImage(d,ee);A=k.viewport,Le===0&&(e.setRenderTargetTextures(M,k.colorTexture,k.depthStencilTexture),e.setRenderTarget(M))}let D=C[Le];D===void 0&&(D=new Gt,D.layers.enable(Le),D.viewport=new ot,C[Le]=D),D.matrix.fromArray(ee.transform.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale),D.projectionMatrix.fromArray(ee.projectionMatrix),D.projectionMatrixInverse.copy(D.projectionMatrix).invert(),D.viewport.set(A.x,A.y,A.width,A.height),Le===0&&(F.matrix.copy(D.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Ee===!0&&F.cameras.push(D)}const Se=i.enabledFeatures;if(Se&&Se.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&x){u=n.getBinding();const Le=u.getDepthInformation(xe[0]);Le&&Le.isValid&&Le.texture&&g.init(Le,i.renderState)}if(Se&&Se.includes("camera-access")&&x){e.state.unbindTexture(),u=n.getBinding();for(let Le=0;Le<xe.length;Le++){const ee=xe[Le].camera;if(ee){let A=p[ee];A||(A=new uu,p[ee]=A);const D=u.getCameraImage(ee);A.sourceTexture=D}}}}for(let xe=0;xe<R.length;xe++){const Ee=E[xe],Se=R[xe];Ee!==null&&Se!==void 0&&Se.update(Ee,Z,c||a)}qe&&qe(K,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),m=null}const et=new wu;et.setAnimationLoop(Ze),this.setAnimationLoop=function(K){qe=K},this.dispose=function(){}}}const yi=new an,w_=new Ge;function A_(r,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,su(r)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,v,y,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(g,p):p.isMeshToonMaterial?(s(g,p),u(g,p)):p.isMeshPhongMaterial?(s(g,p),h(g,p)):p.isMeshStandardMaterial?(s(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,M)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),x(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,v,y):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===jt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===jt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const v=e.get(p),y=v.envMap,M=v.envMapRotation;y&&(g.envMap.value=y,yi.copy(M),yi.x*=-1,yi.y*=-1,yi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(yi.y*=-1,yi.z*=-1),g.envMapRotation.value.setFromMatrix4(w_.makeRotationFromEuler(yi)),g.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,v,y){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*v,g.scale.value=y*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,v){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===jt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){const v=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function R_(r,e,t,n){let i={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,y){const M=y.program;n.uniformBlockBinding(v,M)}function c(v,y){let M=i[v.id];M===void 0&&(m(v),M=h(v),i[v.id]=M,v.addEventListener("dispose",g));const R=y.program;n.updateUBOMapping(v,R);const E=e.render.frame;s[v.id]!==E&&(d(v),s[v.id]=E)}function h(v){const y=u();v.__bindingPointIndex=y;const M=r.createBuffer(),R=v.__size,E=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,M),r.bufferData(r.UNIFORM_BUFFER,R,E),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,y,M),M}function u(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return Qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const y=i[v.id],M=v.uniforms,R=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,y);for(let E=0,P=M.length;E<P;E++){const N=Array.isArray(M[E])?M[E]:[M[E]];for(let T=0,b=N.length;T<b;T++){const C=N[T];if(f(C,E,T,R)===!0){const F=C.__offset,z=Array.isArray(C.value)?C.value:[C.value];let Y=0;for(let V=0;V<z.length;V++){const j=z[V],J=x(j);typeof j=="number"||typeof j=="boolean"?(C.__data[0]=j,r.bufferSubData(r.UNIFORM_BUFFER,F+Y,C.__data)):j.isMatrix3?(C.__data[0]=j.elements[0],C.__data[1]=j.elements[1],C.__data[2]=j.elements[2],C.__data[3]=0,C.__data[4]=j.elements[3],C.__data[5]=j.elements[4],C.__data[6]=j.elements[5],C.__data[7]=0,C.__data[8]=j.elements[6],C.__data[9]=j.elements[7],C.__data[10]=j.elements[8],C.__data[11]=0):(j.toArray(C.__data,Y),Y+=J.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,F,C.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(v,y,M,R){const E=v.value,P=y+"_"+M;if(R[P]===void 0)return typeof E=="number"||typeof E=="boolean"?R[P]=E:R[P]=E.clone(),!0;{const N=R[P];if(typeof E=="number"||typeof E=="boolean"){if(N!==E)return R[P]=E,!0}else if(N.equals(E)===!1)return N.copy(E),!0}return!1}function m(v){const y=v.uniforms;let M=0;const R=16;for(let P=0,N=y.length;P<N;P++){const T=Array.isArray(y[P])?y[P]:[y[P]];for(let b=0,C=T.length;b<C;b++){const F=T[b],z=Array.isArray(F.value)?F.value:[F.value];for(let Y=0,V=z.length;Y<V;Y++){const j=z[Y],J=x(j),q=M%R,se=q%J.boundary,le=q+se;M+=se,le!==0&&R-le<J.storage&&(M+=R-le),F.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=M,M+=J.storage}}}const E=M%R;return E>0&&(M+=R-E),v.__size=M,v.__cache={},this}function x(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?De("WebGLRenderer: Texture samplers can not be part of an uniforms group."):De("WebGLRenderer: Unsupported uniform value type.",v),y}function g(v){const y=v.target;y.removeEventListener("dispose",g);const M=a.indexOf(y.__bindingPointIndex);a.splice(M,1),r.deleteBuffer(i[y.id]),delete i[y.id],delete s[y.id]}function p(){for(const v in i)r.deleteBuffer(i[v]);a=[],i={},s={}}return{bind:l,update:c,dispose:p}}const C_=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let jn=null;function P_(){return jn===null&&(jn=new er(C_,32,32,El,dn),jn.minFilter=Xt,jn.magFilter=Xt,jn.wrapS=Un,jn.wrapT=Un,jn.generateMipmaps=!1,jn.needsUpdate=!0),jn}class I_{constructor(e={}){const{canvas:t=Id(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const m=new Set([Al,wl,Tl]),x=new Set([wn,Ci,Xs,ls,bl,Ml]),g=new Uint32Array(4),p=new Int32Array(4);let v=null,y=null;const M=[],R=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ui,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const E=this;let P=!1;this._outputColorSpace=gt;let N=0,T=0,b=null,C=-1,F=null;const z=new ot,Y=new ot;let V=null;const j=new Ne(0);let J=0,q=t.width,se=t.height,le=1,Me=null,ke=null;const qe=new ot(0,0,q,se),Ze=new ot(0,0,q,se);let et=!1;const K=new Nl;let Z=!1,xe=!1;const Ee=new Ge,Se=new I,We=new ot,st={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Le=!1;function ee(){return b===null?le:1}let A=n;function D(S,O){return t.getContext(S,O)}try{const S={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${xl}`),t.addEventListener("webglcontextlost",ce,!1),t.addEventListener("webglcontextrestored",te,!1),t.addEventListener("webglcontextcreationerror",Ce,!1),A===null){const O="webgl2";if(A=D(O,S),A===null)throw D(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw S("WebGLRenderer: "+S.message),S}let k,ie,Q,ne,he,ve,w,_,U,H,$,W,we,me,Ie,Re,re,fe,ze,Fe,be,Oe,L,ge;function ue(){k=new zg(A),k.init(),Oe=new b_(A,k),ie=new Pg(A,k,e,Oe),Q=new v_(A,k),ie.reversedDepthBuffer&&d&&Q.buffers.depth.setReversed(!0),ne=new Hg(A),he=new a_,ve=new y_(A,k,Q,he,ie,Oe,ne),w=new Lg(E),_=new Bg(E),U=new q0(A),L=new Rg(A,U),H=new kg(A,U,ne,L),$=new Wg(A,H,U,ne),ze=new Gg(A,ie,ve),Re=new Ig(he),W=new r_(E,w,_,k,ie,L,Re),we=new A_(E,he),me=new l_,Ie=new p_(k),fe=new Ag(E,w,_,Q,$,f,l),re=new x_(E,$,ie),ge=new R_(A,ne,ie,Q),Fe=new Cg(A,k,ne),be=new Vg(A,k,ne),ne.programs=W.programs,E.capabilities=ie,E.extensions=k,E.properties=he,E.renderLists=me,E.shadowMap=re,E.state=Q,E.info=ne}ue();const _e=new E_(E,A);this.xr=_e,this.getContext=function(){return A},this.getContextAttributes=function(){return A.getContextAttributes()},this.forceContextLoss=function(){const S=k.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=k.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return le},this.setPixelRatio=function(S){S!==void 0&&(le=S,this.setSize(q,se,!1))},this.getSize=function(S){return S.set(q,se)},this.setSize=function(S,O,G=!0){if(_e.isPresenting){De("WebGLRenderer: Can't change size while VR device is presenting.");return}q=S,se=O,t.width=Math.floor(S*le),t.height=Math.floor(O*le),G===!0&&(t.style.width=S+"px",t.style.height=O+"px"),this.setViewport(0,0,S,O)},this.getDrawingBufferSize=function(S){return S.set(q*le,se*le).floor()},this.setDrawingBufferSize=function(S,O,G){q=S,se=O,le=G,t.width=Math.floor(S*G),t.height=Math.floor(O*G),this.setViewport(0,0,S,O)},this.getCurrentViewport=function(S){return S.copy(z)},this.getViewport=function(S){return S.copy(qe)},this.setViewport=function(S,O,G,X){S.isVector4?qe.set(S.x,S.y,S.z,S.w):qe.set(S,O,G,X),Q.viewport(z.copy(qe).multiplyScalar(le).round())},this.getScissor=function(S){return S.copy(Ze)},this.setScissor=function(S,O,G,X){S.isVector4?Ze.set(S.x,S.y,S.z,S.w):Ze.set(S,O,G,X),Q.scissor(Y.copy(Ze).multiplyScalar(le).round())},this.getScissorTest=function(){return et},this.setScissorTest=function(S){Q.setScissorTest(et=S)},this.setOpaqueSort=function(S){Me=S},this.setTransparentSort=function(S){ke=S},this.getClearColor=function(S){return S.copy(fe.getClearColor())},this.setClearColor=function(){fe.setClearColor(...arguments)},this.getClearAlpha=function(){return fe.getClearAlpha()},this.setClearAlpha=function(){fe.setClearAlpha(...arguments)},this.clear=function(S=!0,O=!0,G=!0){let X=0;if(S){let B=!1;if(b!==null){const pe=b.texture.format;B=m.has(pe)}if(B){const pe=b.texture.type,Te=x.has(pe),Pe=fe.getClearColor(),Ae=fe.getClearAlpha(),Ve=Pe.r,He=Pe.g,Ue=Pe.b;Te?(g[0]=Ve,g[1]=He,g[2]=Ue,g[3]=Ae,A.clearBufferuiv(A.COLOR,0,g)):(p[0]=Ve,p[1]=He,p[2]=Ue,p[3]=Ae,A.clearBufferiv(A.COLOR,0,p))}else X|=A.COLOR_BUFFER_BIT}O&&(X|=A.DEPTH_BUFFER_BIT),G&&(X|=A.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),A.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ce,!1),t.removeEventListener("webglcontextrestored",te,!1),t.removeEventListener("webglcontextcreationerror",Ce,!1),fe.dispose(),me.dispose(),Ie.dispose(),he.dispose(),w.dispose(),_.dispose(),$.dispose(),L.dispose(),ge.dispose(),W.dispose(),_e.dispose(),_e.removeEventListener("sessionstart",ql),_e.removeEventListener("sessionend",jl),fi.stop()};function ce(S){S.preventDefault(),ea("WebGLRenderer: Context Lost."),P=!0}function te(){ea("WebGLRenderer: Context Restored."),P=!1;const S=ne.autoReset,O=re.enabled,G=re.autoUpdate,X=re.needsUpdate,B=re.type;ue(),ne.autoReset=S,re.enabled=O,re.autoUpdate=G,re.needsUpdate=X,re.type=B}function Ce(S){Qe("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Xe(S){const O=S.target;O.removeEventListener("dispose",Xe),xt(O)}function xt(S){dt(S),he.remove(S)}function dt(S){const O=he.get(S).programs;O!==void 0&&(O.forEach(function(G){W.releaseProgram(G)}),S.isShaderMaterial&&W.releaseShaderCache(S))}this.renderBufferDirect=function(S,O,G,X,B,pe){O===null&&(O=st);const Te=B.isMesh&&B.matrixWorld.determinant()<0,Pe=ku(S,O,G,X,B);Q.setMaterial(X,Te);let Ae=G.index,Ve=1;if(X.wireframe===!0){if(Ae=H.getWireframeAttribute(G),Ae===void 0)return;Ve=2}const He=G.drawRange,Ue=G.attributes.position;let nt=He.start*Ve,ft=(He.start+He.count)*Ve;pe!==null&&(nt=Math.max(nt,pe.start*Ve),ft=Math.min(ft,(pe.start+pe.count)*Ve)),Ae!==null?(nt=Math.max(nt,0),ft=Math.min(ft,Ae.count)):Ue!=null&&(nt=Math.max(nt,0),ft=Math.min(ft,Ue.count));const St=ft-nt;if(St<0||St===1/0)return;L.setup(B,X,Pe,G,Ae);let Tt,pt=Fe;if(Ae!==null&&(Tt=U.get(Ae),pt=be,pt.setIndex(Tt)),B.isMesh)X.wireframe===!0?(Q.setLineWidth(X.wireframeLinewidth*ee()),pt.setMode(A.LINES)):pt.setMode(A.TRIANGLES);else if(B.isLine){let Be=X.linewidth;Be===void 0&&(Be=1),Q.setLineWidth(Be*ee()),B.isLineSegments?pt.setMode(A.LINES):B.isLineLoop?pt.setMode(A.LINE_LOOP):pt.setMode(A.LINE_STRIP)}else B.isPoints?pt.setMode(A.POINTS):B.isSprite&&pt.setMode(A.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)Ks("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),pt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(k.get("WEBGL_multi_draw"))pt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Be=B._multiDrawStarts,yt=B._multiDrawCounts,at=B._multiDrawCount,Jt=Ae?U.get(Ae).bytesPerElement:1,Ni=he.get(X).currentProgram.getUniforms();for(let Qt=0;Qt<at;Qt++)Ni.setValue(A,"_gl_DrawID",Qt),pt.render(Be[Qt]/Jt,yt[Qt])}else if(B.isInstancedMesh)pt.renderInstances(nt,St,B.count);else if(G.isInstancedBufferGeometry){const Be=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,yt=Math.min(G.instanceCount,Be);pt.renderInstances(nt,St,yt)}else pt.render(nt,St)};function Cn(S,O,G){S.transparent===!0&&S.side===un&&S.forceSinglePass===!1?(S.side=jt,S.needsUpdate=!0,ir(S,O,G),S.side=Jn,S.needsUpdate=!0,ir(S,O,G),S.side=un):ir(S,O,G)}this.compile=function(S,O,G=null){G===null&&(G=S),y=Ie.get(G),y.init(O),R.push(y),G.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(y.pushLight(B),B.castShadow&&y.pushShadow(B))}),S!==G&&S.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(y.pushLight(B),B.castShadow&&y.pushShadow(B))}),y.setupLights();const X=new Set;return S.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const pe=B.material;if(pe)if(Array.isArray(pe))for(let Te=0;Te<pe.length;Te++){const Pe=pe[Te];Cn(Pe,G,B),X.add(Pe)}else Cn(pe,G,B),X.add(pe)}),y=R.pop(),X},this.compileAsync=function(S,O,G=null){const X=this.compile(S,O,G);return new Promise(B=>{function pe(){if(X.forEach(function(Te){he.get(Te).currentProgram.isReady()&&X.delete(Te)}),X.size===0){B(S);return}setTimeout(pe,10)}k.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let gn=null;function zu(S){gn&&gn(S)}function ql(){fi.stop()}function jl(){fi.start()}const fi=new wu;fi.setAnimationLoop(zu),typeof self<"u"&&fi.setContext(self),this.setAnimationLoop=function(S){gn=S,_e.setAnimationLoop(S),S===null?fi.stop():fi.start()},_e.addEventListener("sessionstart",ql),_e.addEventListener("sessionend",jl),this.render=function(S,O){if(O!==void 0&&O.isCamera!==!0){Qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),_e.enabled===!0&&_e.isPresenting===!0&&(_e.cameraAutoUpdate===!0&&_e.updateCamera(O),O=_e.getCamera()),S.isScene===!0&&S.onBeforeRender(E,S,O,b),y=Ie.get(S,R.length),y.init(O),R.push(y),Ee.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),K.setFromProjectionMatrix(Ee,Fn,O.reversedDepth),xe=this.localClippingEnabled,Z=Re.init(this.clippingPlanes,xe),v=me.get(S,M.length),v.init(),M.push(v),_e.enabled===!0&&_e.isPresenting===!0){const pe=E.xr.getDepthSensingMesh();pe!==null&&ma(pe,O,-1/0,E.sortObjects)}ma(S,O,0,E.sortObjects),v.finish(),E.sortObjects===!0&&v.sort(Me,ke),Le=_e.enabled===!1||_e.isPresenting===!1||_e.hasDepthSensing()===!1,Le&&fe.addToRenderList(v,S),this.info.render.frame++,Z===!0&&Re.beginShadows();const G=y.state.shadowsArray;re.render(G,S,O),Z===!0&&Re.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=v.opaque,B=v.transmissive;if(y.setupLights(),O.isArrayCamera){const pe=O.cameras;if(B.length>0)for(let Te=0,Pe=pe.length;Te<Pe;Te++){const Ae=pe[Te];Kl(X,B,S,Ae)}Le&&fe.render(S);for(let Te=0,Pe=pe.length;Te<Pe;Te++){const Ae=pe[Te];Yl(v,S,Ae,Ae.viewport)}}else B.length>0&&Kl(X,B,S,O),Le&&fe.render(S),Yl(v,S,O);b!==null&&T===0&&(ve.updateMultisampleRenderTarget(b),ve.updateRenderTargetMipmap(b)),S.isScene===!0&&S.onAfterRender(E,S,O),L.resetDefaultState(),C=-1,F=null,R.pop(),R.length>0?(y=R[R.length-1],Z===!0&&Re.setGlobalState(E.clippingPlanes,y.state.camera)):y=null,M.pop(),M.length>0?v=M[M.length-1]:v=null};function ma(S,O,G,X){if(S.visible===!1)return;if(S.layers.test(O.layers)){if(S.isGroup)G=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(O);else if(S.isLight)y.pushLight(S),S.castShadow&&y.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||K.intersectsSprite(S)){X&&We.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Ee);const Te=$.update(S),Pe=S.material;Pe.visible&&v.push(S,Te,Pe,G,We.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||K.intersectsObject(S))){const Te=$.update(S),Pe=S.material;if(X&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),We.copy(S.boundingSphere.center)):(Te.boundingSphere===null&&Te.computeBoundingSphere(),We.copy(Te.boundingSphere.center)),We.applyMatrix4(S.matrixWorld).applyMatrix4(Ee)),Array.isArray(Pe)){const Ae=Te.groups;for(let Ve=0,He=Ae.length;Ve<He;Ve++){const Ue=Ae[Ve],nt=Pe[Ue.materialIndex];nt&&nt.visible&&v.push(S,Te,nt,G,We.z,Ue)}}else Pe.visible&&v.push(S,Te,Pe,G,We.z,null)}}const pe=S.children;for(let Te=0,Pe=pe.length;Te<Pe;Te++)ma(pe[Te],O,G,X)}function Yl(S,O,G,X){const{opaque:B,transmissive:pe,transparent:Te}=S;y.setupLightsView(G),Z===!0&&Re.setGlobalState(E.clippingPlanes,G),X&&Q.viewport(z.copy(X)),B.length>0&&nr(B,O,G),pe.length>0&&nr(pe,O,G),Te.length>0&&nr(Te,O,G),Q.buffers.depth.setTest(!0),Q.buffers.depth.setMask(!0),Q.buffers.color.setMask(!0),Q.setPolygonOffset(!1)}function Kl(S,O,G,X){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;y.state.transmissionRenderTarget[X.id]===void 0&&(y.state.transmissionRenderTarget[X.id]=new rn(1,1,{generateMipmaps:!0,type:k.has("EXT_color_buffer_half_float")||k.has("EXT_color_buffer_float")?dn:wn,minFilter:Kn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:it.workingColorSpace}));const pe=y.state.transmissionRenderTarget[X.id],Te=X.viewport||z;pe.setSize(Te.z*E.transmissionResolutionScale,Te.w*E.transmissionResolutionScale);const Pe=E.getRenderTarget(),Ae=E.getActiveCubeFace(),Ve=E.getActiveMipmapLevel();E.setRenderTarget(pe),E.getClearColor(j),J=E.getClearAlpha(),J<1&&E.setClearColor(16777215,.5),E.clear(),Le&&fe.render(G);const He=E.toneMapping;E.toneMapping=ui;const Ue=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),y.setupLightsView(X),Z===!0&&Re.setGlobalState(E.clippingPlanes,X),nr(S,G,X),ve.updateMultisampleRenderTarget(pe),ve.updateRenderTargetMipmap(pe),k.has("WEBGL_multisampled_render_to_texture")===!1){let nt=!1;for(let ft=0,St=O.length;ft<St;ft++){const Tt=O[ft],{object:pt,geometry:Be,material:yt,group:at}=Tt;if(yt.side===un&&pt.layers.test(X.layers)){const Jt=yt.side;yt.side=jt,yt.needsUpdate=!0,$l(pt,G,X,Be,yt,at),yt.side=Jt,yt.needsUpdate=!0,nt=!0}}nt===!0&&(ve.updateMultisampleRenderTarget(pe),ve.updateRenderTargetMipmap(pe))}E.setRenderTarget(Pe,Ae,Ve),E.setClearColor(j,J),Ue!==void 0&&(X.viewport=Ue),E.toneMapping=He}function nr(S,O,G){const X=O.isScene===!0?O.overrideMaterial:null;for(let B=0,pe=S.length;B<pe;B++){const Te=S[B],{object:Pe,geometry:Ae,group:Ve}=Te;let He=Te.material;He.allowOverride===!0&&X!==null&&(He=X),Pe.layers.test(G.layers)&&$l(Pe,O,G,Ae,He,Ve)}}function $l(S,O,G,X,B,pe){S.onBeforeRender(E,O,G,X,B,pe),S.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),B.onBeforeRender(E,O,G,X,S,pe),B.transparent===!0&&B.side===un&&B.forceSinglePass===!1?(B.side=jt,B.needsUpdate=!0,E.renderBufferDirect(G,O,X,B,S,pe),B.side=Jn,B.needsUpdate=!0,E.renderBufferDirect(G,O,X,B,S,pe),B.side=un):E.renderBufferDirect(G,O,X,B,S,pe),S.onAfterRender(E,O,G,X,B,pe)}function ir(S,O,G){O.isScene!==!0&&(O=st);const X=he.get(S),B=y.state.lights,pe=y.state.shadowsArray,Te=B.state.version,Pe=W.getParameters(S,B.state,pe,O,G),Ae=W.getProgramCacheKey(Pe);let Ve=X.programs;X.environment=S.isMeshStandardMaterial?O.environment:null,X.fog=O.fog,X.envMap=(S.isMeshStandardMaterial?_:w).get(S.envMap||X.environment),X.envMapRotation=X.environment!==null&&S.envMap===null?O.environmentRotation:S.envMapRotation,Ve===void 0&&(S.addEventListener("dispose",Xe),Ve=new Map,X.programs=Ve);let He=Ve.get(Ae);if(He!==void 0){if(X.currentProgram===He&&X.lightsStateVersion===Te)return Jl(S,Pe),He}else Pe.uniforms=W.getUniforms(S),S.onBeforeCompile(Pe,E),He=W.acquireProgram(Pe,Ae),Ve.set(Ae,He),X.uniforms=Pe.uniforms;const Ue=X.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ue.clippingPlanes=Re.uniform),Jl(S,Pe),X.needsLights=Hu(S),X.lightsStateVersion=Te,X.needsLights&&(Ue.ambientLightColor.value=B.state.ambient,Ue.lightProbe.value=B.state.probe,Ue.directionalLights.value=B.state.directional,Ue.directionalLightShadows.value=B.state.directionalShadow,Ue.spotLights.value=B.state.spot,Ue.spotLightShadows.value=B.state.spotShadow,Ue.rectAreaLights.value=B.state.rectArea,Ue.ltc_1.value=B.state.rectAreaLTC1,Ue.ltc_2.value=B.state.rectAreaLTC2,Ue.pointLights.value=B.state.point,Ue.pointLightShadows.value=B.state.pointShadow,Ue.hemisphereLights.value=B.state.hemi,Ue.directionalShadowMap.value=B.state.directionalShadowMap,Ue.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Ue.spotShadowMap.value=B.state.spotShadowMap,Ue.spotLightMatrix.value=B.state.spotLightMatrix,Ue.spotLightMap.value=B.state.spotLightMap,Ue.pointShadowMap.value=B.state.pointShadowMap,Ue.pointShadowMatrix.value=B.state.pointShadowMatrix),X.currentProgram=He,X.uniformsList=null,He}function Zl(S){if(S.uniformsList===null){const O=S.currentProgram.getUniforms();S.uniformsList=jr.seqWithValue(O.seq,S.uniforms)}return S.uniformsList}function Jl(S,O){const G=he.get(S);G.outputColorSpace=O.outputColorSpace,G.batching=O.batching,G.batchingColor=O.batchingColor,G.instancing=O.instancing,G.instancingColor=O.instancingColor,G.instancingMorph=O.instancingMorph,G.skinning=O.skinning,G.morphTargets=O.morphTargets,G.morphNormals=O.morphNormals,G.morphColors=O.morphColors,G.morphTargetsCount=O.morphTargetsCount,G.numClippingPlanes=O.numClippingPlanes,G.numIntersection=O.numClipIntersection,G.vertexAlphas=O.vertexAlphas,G.vertexTangents=O.vertexTangents,G.toneMapping=O.toneMapping}function ku(S,O,G,X,B){O.isScene!==!0&&(O=st),ve.resetTextureUnits();const pe=O.fog,Te=X.isMeshStandardMaterial?O.environment:null,Pe=b===null?E.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:Yt,Ae=(X.isMeshStandardMaterial?_:w).get(X.envMap||Te),Ve=X.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,He=!!G.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ue=!!G.morphAttributes.position,nt=!!G.morphAttributes.normal,ft=!!G.morphAttributes.color;let St=ui;X.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(St=E.toneMapping);const Tt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,pt=Tt!==void 0?Tt.length:0,Be=he.get(X),yt=y.state.lights;if(Z===!0&&(xe===!0||S!==F)){const zt=S===F&&X.id===C;Re.setState(X,S,zt)}let at=!1;X.version===Be.__version?(Be.needsLights&&Be.lightsStateVersion!==yt.state.version||Be.outputColorSpace!==Pe||B.isBatchedMesh&&Be.batching===!1||!B.isBatchedMesh&&Be.batching===!0||B.isBatchedMesh&&Be.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Be.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Be.instancing===!1||!B.isInstancedMesh&&Be.instancing===!0||B.isSkinnedMesh&&Be.skinning===!1||!B.isSkinnedMesh&&Be.skinning===!0||B.isInstancedMesh&&Be.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Be.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Be.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Be.instancingMorph===!1&&B.morphTexture!==null||Be.envMap!==Ae||X.fog===!0&&Be.fog!==pe||Be.numClippingPlanes!==void 0&&(Be.numClippingPlanes!==Re.numPlanes||Be.numIntersection!==Re.numIntersection)||Be.vertexAlphas!==Ve||Be.vertexTangents!==He||Be.morphTargets!==Ue||Be.morphNormals!==nt||Be.morphColors!==ft||Be.toneMapping!==St||Be.morphTargetsCount!==pt)&&(at=!0):(at=!0,Be.__version=X.version);let Jt=Be.currentProgram;at===!0&&(Jt=ir(X,O,B));let Ni=!1,Qt=!1,bs=!1;const bt=Jt.getUniforms(),Kt=Be.uniforms;if(Q.useProgram(Jt.program)&&(Ni=!0,Qt=!0,bs=!0),X.id!==C&&(C=X.id,Qt=!0),Ni||F!==S){Q.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),bt.setValue(A,"projectionMatrix",S.projectionMatrix),bt.setValue(A,"viewMatrix",S.matrixWorldInverse);const $t=bt.map.cameraPosition;$t!==void 0&&$t.setValue(A,Se.setFromMatrixPosition(S.matrixWorld)),ie.logarithmicDepthBuffer&&bt.setValue(A,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&bt.setValue(A,"isOrthographic",S.isOrthographicCamera===!0),F!==S&&(F=S,Qt=!0,bs=!0)}if(B.isSkinnedMesh){bt.setOptional(A,B,"bindMatrix"),bt.setOptional(A,B,"bindMatrixInverse");const zt=B.skeleton;zt&&(zt.boneTexture===null&&zt.computeBoneTexture(),bt.setValue(A,"boneTexture",zt.boneTexture,ve))}B.isBatchedMesh&&(bt.setOptional(A,B,"batchingTexture"),bt.setValue(A,"batchingTexture",B._matricesTexture,ve),bt.setOptional(A,B,"batchingIdTexture"),bt.setValue(A,"batchingIdTexture",B._indirectTexture,ve),bt.setOptional(A,B,"batchingColorTexture"),B._colorsTexture!==null&&bt.setValue(A,"batchingColorTexture",B._colorsTexture,ve));const on=G.morphAttributes;if((on.position!==void 0||on.normal!==void 0||on.color!==void 0)&&ze.update(B,G,Jt),(Qt||Be.receiveShadow!==B.receiveShadow)&&(Be.receiveShadow=B.receiveShadow,bt.setValue(A,"receiveShadow",B.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(Kt.envMap.value=Ae,Kt.flipEnvMap.value=Ae.isCubeTexture&&Ae.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&O.environment!==null&&(Kt.envMapIntensity.value=O.environmentIntensity),Kt.dfgLUT!==void 0&&(Kt.dfgLUT.value=P_()),Qt&&(bt.setValue(A,"toneMappingExposure",E.toneMappingExposure),Be.needsLights&&Vu(Kt,bs),pe&&X.fog===!0&&we.refreshFogUniforms(Kt,pe),we.refreshMaterialUniforms(Kt,X,le,se,y.state.transmissionRenderTarget[S.id]),jr.upload(A,Zl(Be),Kt,ve)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(jr.upload(A,Zl(Be),Kt,ve),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&bt.setValue(A,"center",B.center),bt.setValue(A,"modelViewMatrix",B.modelViewMatrix),bt.setValue(A,"normalMatrix",B.normalMatrix),bt.setValue(A,"modelMatrix",B.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const zt=X.uniformsGroups;for(let $t=0,ga=zt.length;$t<ga;$t++){const pi=zt[$t];ge.update(pi,Jt),ge.bind(pi,Jt)}}return Jt}function Vu(S,O){S.ambientLightColor.needsUpdate=O,S.lightProbe.needsUpdate=O,S.directionalLights.needsUpdate=O,S.directionalLightShadows.needsUpdate=O,S.pointLights.needsUpdate=O,S.pointLightShadows.needsUpdate=O,S.spotLights.needsUpdate=O,S.spotLightShadows.needsUpdate=O,S.rectAreaLights.needsUpdate=O,S.hemisphereLights.needsUpdate=O}function Hu(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(S,O,G){const X=he.get(S);X.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),he.get(S.texture).__webglTexture=O,he.get(S.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:G,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,O){const G=he.get(S);G.__webglFramebuffer=O,G.__useDefaultFramebuffer=O===void 0};const Gu=A.createFramebuffer();this.setRenderTarget=function(S,O=0,G=0){b=S,N=O,T=G;let X=!0,B=null,pe=!1,Te=!1;if(S){const Ae=he.get(S);if(Ae.__useDefaultFramebuffer!==void 0)Q.bindFramebuffer(A.FRAMEBUFFER,null),X=!1;else if(Ae.__webglFramebuffer===void 0)ve.setupRenderTarget(S);else if(Ae.__hasExternalTextures)ve.rebindTextures(S,he.get(S.texture).__webglTexture,he.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Ue=S.depthTexture;if(Ae.__boundDepthTexture!==Ue){if(Ue!==null&&he.has(Ue)&&(S.width!==Ue.image.width||S.height!==Ue.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ve.setupDepthRenderbuffer(S)}}const Ve=S.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(Te=!0);const He=he.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(He[O])?B=He[O][G]:B=He[O],pe=!0):S.samples>0&&ve.useMultisampledRTT(S)===!1?B=he.get(S).__webglMultisampledFramebuffer:Array.isArray(He)?B=He[G]:B=He,z.copy(S.viewport),Y.copy(S.scissor),V=S.scissorTest}else z.copy(qe).multiplyScalar(le).floor(),Y.copy(Ze).multiplyScalar(le).floor(),V=et;if(G!==0&&(B=Gu),Q.bindFramebuffer(A.FRAMEBUFFER,B)&&X&&Q.drawBuffers(S,B),Q.viewport(z),Q.scissor(Y),Q.setScissorTest(V),pe){const Ae=he.get(S.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+O,Ae.__webglTexture,G)}else if(Te){const Ae=O;for(let Ve=0;Ve<S.textures.length;Ve++){const He=he.get(S.textures[Ve]);A.framebufferTextureLayer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0+Ve,He.__webglTexture,G,Ae)}}else if(S!==null&&G!==0){const Ae=he.get(S.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,Ae.__webglTexture,G)}C=-1},this.readRenderTargetPixels=function(S,O,G,X,B,pe,Te,Pe=0){if(!(S&&S.isWebGLRenderTarget)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=he.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Te!==void 0&&(Ae=Ae[Te]),Ae){Q.bindFramebuffer(A.FRAMEBUFFER,Ae);try{const Ve=S.textures[Pe],He=Ve.format,Ue=Ve.type;if(!ie.textureFormatReadable(He)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ie.textureTypeReadable(Ue)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=S.width-X&&G>=0&&G<=S.height-B&&(S.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+Pe),A.readPixels(O,G,X,B,Oe.convert(He),Oe.convert(Ue),pe))}finally{const Ve=b!==null?he.get(b).__webglFramebuffer:null;Q.bindFramebuffer(A.FRAMEBUFFER,Ve)}}},this.readRenderTargetPixelsAsync=async function(S,O,G,X,B,pe,Te,Pe=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=he.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Te!==void 0&&(Ae=Ae[Te]),Ae)if(O>=0&&O<=S.width-X&&G>=0&&G<=S.height-B){Q.bindFramebuffer(A.FRAMEBUFFER,Ae);const Ve=S.textures[Pe],He=Ve.format,Ue=Ve.type;if(!ie.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ie.textureTypeReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const nt=A.createBuffer();A.bindBuffer(A.PIXEL_PACK_BUFFER,nt),A.bufferData(A.PIXEL_PACK_BUFFER,pe.byteLength,A.STREAM_READ),S.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+Pe),A.readPixels(O,G,X,B,Oe.convert(He),Oe.convert(Ue),0);const ft=b!==null?he.get(b).__webglFramebuffer:null;Q.bindFramebuffer(A.FRAMEBUFFER,ft);const St=A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE,0);return A.flush(),await Ld(A,St,4),A.bindBuffer(A.PIXEL_PACK_BUFFER,nt),A.getBufferSubData(A.PIXEL_PACK_BUFFER,0,pe),A.deleteBuffer(nt),A.deleteSync(St),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,O=null,G=0){const X=Math.pow(2,-G),B=Math.floor(S.image.width*X),pe=Math.floor(S.image.height*X),Te=O!==null?O.x:0,Pe=O!==null?O.y:0;ve.setTexture2D(S,0),A.copyTexSubImage2D(A.TEXTURE_2D,G,0,0,Te,Pe,B,pe),Q.unbindTexture()};const Wu=A.createFramebuffer(),Xu=A.createFramebuffer();this.copyTextureToTexture=function(S,O,G=null,X=null,B=0,pe=null){pe===null&&(B!==0?(Ks("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),pe=B,B=0):pe=0);let Te,Pe,Ae,Ve,He,Ue,nt,ft,St;const Tt=S.isCompressedTexture?S.mipmaps[pe]:S.image;if(G!==null)Te=G.max.x-G.min.x,Pe=G.max.y-G.min.y,Ae=G.isBox3?G.max.z-G.min.z:1,Ve=G.min.x,He=G.min.y,Ue=G.isBox3?G.min.z:0;else{const on=Math.pow(2,-B);Te=Math.floor(Tt.width*on),Pe=Math.floor(Tt.height*on),S.isDataArrayTexture?Ae=Tt.depth:S.isData3DTexture?Ae=Math.floor(Tt.depth*on):Ae=1,Ve=0,He=0,Ue=0}X!==null?(nt=X.x,ft=X.y,St=X.z):(nt=0,ft=0,St=0);const pt=Oe.convert(O.format),Be=Oe.convert(O.type);let yt;O.isData3DTexture?(ve.setTexture3D(O,0),yt=A.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(ve.setTexture2DArray(O,0),yt=A.TEXTURE_2D_ARRAY):(ve.setTexture2D(O,0),yt=A.TEXTURE_2D),A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,O.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,O.unpackAlignment);const at=A.getParameter(A.UNPACK_ROW_LENGTH),Jt=A.getParameter(A.UNPACK_IMAGE_HEIGHT),Ni=A.getParameter(A.UNPACK_SKIP_PIXELS),Qt=A.getParameter(A.UNPACK_SKIP_ROWS),bs=A.getParameter(A.UNPACK_SKIP_IMAGES);A.pixelStorei(A.UNPACK_ROW_LENGTH,Tt.width),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,Tt.height),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Ve),A.pixelStorei(A.UNPACK_SKIP_ROWS,He),A.pixelStorei(A.UNPACK_SKIP_IMAGES,Ue);const bt=S.isDataArrayTexture||S.isData3DTexture,Kt=O.isDataArrayTexture||O.isData3DTexture;if(S.isDepthTexture){const on=he.get(S),zt=he.get(O),$t=he.get(on.__renderTarget),ga=he.get(zt.__renderTarget);Q.bindFramebuffer(A.READ_FRAMEBUFFER,$t.__webglFramebuffer),Q.bindFramebuffer(A.DRAW_FRAMEBUFFER,ga.__webglFramebuffer);for(let pi=0;pi<Ae;pi++)bt&&(A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,he.get(S).__webglTexture,B,Ue+pi),A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,he.get(O).__webglTexture,pe,St+pi)),A.blitFramebuffer(Ve,He,Te,Pe,nt,ft,Te,Pe,A.DEPTH_BUFFER_BIT,A.NEAREST);Q.bindFramebuffer(A.READ_FRAMEBUFFER,null),Q.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else if(B!==0||S.isRenderTargetTexture||he.has(S)){const on=he.get(S),zt=he.get(O);Q.bindFramebuffer(A.READ_FRAMEBUFFER,Wu),Q.bindFramebuffer(A.DRAW_FRAMEBUFFER,Xu);for(let $t=0;$t<Ae;$t++)bt?A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,on.__webglTexture,B,Ue+$t):A.framebufferTexture2D(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,on.__webglTexture,B),Kt?A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,zt.__webglTexture,pe,St+$t):A.framebufferTexture2D(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,zt.__webglTexture,pe),B!==0?A.blitFramebuffer(Ve,He,Te,Pe,nt,ft,Te,Pe,A.COLOR_BUFFER_BIT,A.NEAREST):Kt?A.copyTexSubImage3D(yt,pe,nt,ft,St+$t,Ve,He,Te,Pe):A.copyTexSubImage2D(yt,pe,nt,ft,Ve,He,Te,Pe);Q.bindFramebuffer(A.READ_FRAMEBUFFER,null),Q.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else Kt?S.isDataTexture||S.isData3DTexture?A.texSubImage3D(yt,pe,nt,ft,St,Te,Pe,Ae,pt,Be,Tt.data):O.isCompressedArrayTexture?A.compressedTexSubImage3D(yt,pe,nt,ft,St,Te,Pe,Ae,pt,Tt.data):A.texSubImage3D(yt,pe,nt,ft,St,Te,Pe,Ae,pt,Be,Tt):S.isDataTexture?A.texSubImage2D(A.TEXTURE_2D,pe,nt,ft,Te,Pe,pt,Be,Tt.data):S.isCompressedTexture?A.compressedTexSubImage2D(A.TEXTURE_2D,pe,nt,ft,Tt.width,Tt.height,pt,Tt.data):A.texSubImage2D(A.TEXTURE_2D,pe,nt,ft,Te,Pe,pt,Be,Tt);A.pixelStorei(A.UNPACK_ROW_LENGTH,at),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,Jt),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Ni),A.pixelStorei(A.UNPACK_SKIP_ROWS,Qt),A.pixelStorei(A.UNPACK_SKIP_IMAGES,bs),pe===0&&O.generateMipmaps&&A.generateMipmap(yt),Q.unbindTexture()},this.initRenderTarget=function(S){he.get(S).__webglFramebuffer===void 0&&ve.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?ve.setTextureCube(S,0):S.isData3DTexture?ve.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?ve.setTexture2DArray(S,0):ve.setTexture2D(S,0),Q.unbindTexture()},this.resetState=function(){N=0,T=0,b=null,Q.reset(),L.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=it._getDrawingBufferColorSpace(e),t.unpackColorSpace=it._getUnpackColorSpace()}}function L_(r,e=!1){const t=r[0].index!==null,n=new Set(Object.keys(r[0].attributes)),i=new Set(Object.keys(r[0].morphAttributes)),s={},a={},o=r[0].morphTargetsRelative,l=new Nt;let c=0;for(let h=0;h<r.length;++h){const u=r[h];let d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;s[f]===void 0&&(s[f]=[]),s[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(u.morphAttributes[f])}if(e){let f;if(t)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0;const u=[];for(let d=0;d<r.length;++d){const f=r[d].index;for(let m=0;m<f.count;++m)u.push(f.getX(m)+h);h+=r[d].attributes.position.count}l.setIndex(u)}for(const h in s){const u=xh(s[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in a){const u=a[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let x=0;x<a[h].length;++x)f.push(a[h][x][d]);const m=xh(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}return l}function xh(r){let e,t,n,i=-1,s=0;for(let c=0;c<r.length;++c){const h=r[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*t}const a=new e(s),o=new Bt(a,t,n);let l=0;for(let c=0;c<r.length;++c){const h=r[c];if(h.isInterleavedBufferAttribute){const u=l/t;for(let d=0,f=h.count;d<f;d++)for(let m=0;m<t;m++){const x=h.getComponent(d,m);o.setComponent(d+u,m,x)}}else a.set(h.array,l);l+=h.count*t}return i!==void 0&&(o.gpuType=i),o}function _h(r,e){if(e===vd)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===tl||e===$h){let t=r.getIndex();if(t===null){const a=[],o=r.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);r.setIndex(a),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===tl)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class D_ extends vs{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new B_(t)}),this.register(function(t){return new z_(t)}),this.register(function(t){return new Y_(t)}),this.register(function(t){return new K_(t)}),this.register(function(t){return new $_(t)}),this.register(function(t){return new V_(t)}),this.register(function(t){return new H_(t)}),this.register(function(t){return new G_(t)}),this.register(function(t){return new W_(t)}),this.register(function(t){return new O_(t)}),this.register(function(t){return new X_(t)}),this.register(function(t){return new k_(t)}),this.register(function(t){return new j_(t)}),this.register(function(t){return new q_(t)}),this.register(function(t){return new U_(t)}),this.register(function(t){return new Z_(t)}),this.register(function(t){return new J_(t)})}load(e,t,n,i){const s=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=Gs.extractUrlBase(e);a=Gs.resolveURL(c,this.path)}else a=Gs.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new Tu(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,a,function(h){t(h),s.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const a={},o={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Iu){try{a[tt.KHR_BINARY_GLTF]=new Q_(e)}catch(u){i&&i(u);return}s=JSON.parse(a[tt.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new dv(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case tt.KHR_MATERIALS_UNLIT:a[u]=new F_;break;case tt.KHR_DRACO_MESH_COMPRESSION:a[u]=new ev(s,this.dracoLoader);break;case tt.KHR_TEXTURE_TRANSFORM:a[u]=new tv;break;case tt.KHR_MESH_QUANTIZATION:a[u]=new nv;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function N_(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const tt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class U_{constructor(e){this.parser=e,this.name=tt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const h=new Ne(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Yt);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new ll(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new sa(h),c.distance=u;break;case"spot":c=new ia(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),In(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class F_{constructor(){this.name=tt.KHR_MATERIALS_UNLIT}getMaterialType(){return On}extendParams(e,t,n){const i=[];e.color=new Ne(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Yt),e.opacity=a[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,gt))}return Promise.all(i)}}class O_{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class B_{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:kn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ae(o,o)}return Promise.all(s)}}class z_{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:kn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class k_{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:kn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}}class V_{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:kn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new Ne(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Yt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,gt)),a.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}}class H_{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:kn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(s)}}class G_{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:kn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Ne().setRGB(o[0],o[1],o[2],Yt),Promise.all(s)}}class W_{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:kn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class X_{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:kn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new Ne().setRGB(o[0],o[1],o[2],Yt),a.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,gt)),Promise.all(s)}}class q_{constructor(e){this.parser=e,this.name=tt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:kn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(s)}}class j_{constructor(e){this.parser=e,this.name=tt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:kn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(s)}}class Y_{constructor(e){this.parser=e,this.name=tt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}}class K_{constructor(e){this.parser=e,this.name=tt.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}}class $_{constructor(e){this.parser=e,this.name=tt.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}}class Z_{constructor(e){this.name=tt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class J_{constructor(e){this.name=tt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==hn.TRIANGLES&&c.mode!==hn.TRIANGLE_STRIP&&c.mode!==hn.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const m of u){const x=new Ge,g=new I,p=new ut,v=new I(1,1,1),y=new la(m.geometry,m.material,d);for(let M=0;M<d;M++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,M),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,M),l.SCALE&&v.fromBufferAttribute(l.SCALE,M),y.setMatrixAt(M,x.compose(g,p,v));for(const M in l)if(M==="_COLOR_0"){const R=l[M];y.instanceColor=new il(R.array,R.itemSize,R.normalized)}else M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&m.geometry.setAttribute(M,l[M]);mt.prototype.copy.call(y,m),this.parser.assignFinalMaterial(y),f.push(y)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Iu="glTF",Is=12,vh={JSON:1313821514,BIN:5130562};class Q_{constructor(e){this.name=tt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Is),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Iu)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Is,s=new DataView(e,Is);let a=0;for(;a<i;){const o=s.getUint32(a,!0);a+=4;const l=s.getUint32(a,!0);if(a+=4,l===vh.JSON){const c=new Uint8Array(e,Is+a,o);this.content=n.decode(c)}else if(l===vh.BIN){const c=Is+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class ev{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=tt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const h in a){const u=ul[h]||h.toLowerCase();o[u]=a[h]}for(const h in e.attributes){const u=ul[h]||h.toLowerCase();if(a[h]!==void 0){const d=n.accessors[e.attributes[h]],f=ss[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const m in f.attributes){const x=f.attributes[m],g=l[m];g!==void 0&&(x.normalized=g)}u(f)},o,c,Yt,d)})})}}class tv{constructor(){this.name=tt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class nv{constructor(){this.name=tt.KHR_MESH_QUANTIZATION}}class Lu extends tr{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[s+a];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,m=e*c,x=m-c,g=-2*f+3*d,p=f-d,v=1-g,y=p-d+u;for(let M=0;M!==o;M++){const R=a[x+M+o],E=a[x+M+l]*h,P=a[m+M+o],N=a[m+M]*h;s[M]=v*R+y*E+g*P+p*N}return s}}const iv=new ut;class sv extends Lu{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return iv.fromArray(s).normalize().toArray(s),s}}const hn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},ss={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},yh={9728:Dt,9729:Xt,9984:Vh,9985:Hr,9986:Ns,9987:Kn},bh={33071:Un,33648:$r,10497:mn},eo={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ul={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ai={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},rv={CUBICSPLINE:void 0,LINEAR:Pi,STEP:js},to={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function av(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new An({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Jn})),r.DefaultMaterial}function bi(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function In(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function ov(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;a.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;o.push(d)}if(s){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function lv(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function cv(r){let e;const t=r.extensions&&r.extensions[tt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+no(t.attributes):e=r.indices+":"+no(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+no(r.targets[n]);return e}function no(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function dl(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function hv(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const uv=new Ge;class dv{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new N_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=o.indexOf("Firefox")>-1,a=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&a<98?this.textureLoader=new Eu(this.options.manager):this.textureLoader=new C0(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Tu(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return bi(s,o,i),In(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const a=t[i].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,h]of a.children.entries())s(h,o.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[tt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,a){n.load(Gs.resolveURL(t.uri,i.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=eo[i.type],o=ss[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new Bt(c,a,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(a){const o=a[0],l=eo[i.type],c=ss[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0;let x,g;if(f&&f!==u){const p=Math.floor(d/f),v="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let y=t.cache.get(v);y||(x=new c(o,p*f,i.count*f/h),y=new vf(x,f/h),t.cache.add(v,y)),g=new Ll(y,l,d%f/h,m)}else o===null?x=new c(i.count*l):x=new c(o,d,i.count*l),g=new Bt(x,l,m);if(i.sparse!==void 0){const p=eo.SCALAR,v=ss[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,M=i.sparse.values.byteOffset||0,R=new v(a[1],y,i.sparse.count*p),E=new c(a[2],M,i.sparse.count*l);o!==null&&(g=new Bt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let P=0,N=R.length;P<N;P++){const T=R[P];if(g.setX(T,E[P*l]),l>=2&&g.setY(T,E[P*l+1]),l>=3&&g.setZ(T,E[P*l+2]),l>=4&&g.setW(T,E[P*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,a=t.images[s];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){const i=this,s=this.json,a=s.textures[e],o=s.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(s.samplers||{})[a.sampler]||{};return h.magFilter=yh[d.magFilter]||Xt,h.minFilter=yh[d.minFilter]||Kn,h.wrapS=bh[d.wrapS]||mn,h.wrapT=bh[d.wrapT]||mn,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Dt&&h.minFilter!==Xt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=i.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let m=d;t.isImageBitmapLoader===!0&&(m=function(x){const g=new At(x);g.needsUpdate=!0,d(g)}),t.load(Gs.resolveURL(u,s.path),m,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),In(u,a),u.userData.mimeType=a.mimeType||hv(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[tt.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[tt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=s.associations.get(a);a=s.extensions[tt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new hu,pn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new cu,pn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||s||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),s&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return An}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let a;const o={},l=s.extensions||{},c=[];if(l[tt.KHR_MATERIALS_UNLIT]){const u=i[tt.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,s,t))}else{const u=s.pbrMetallicRoughness||{};if(o.color=new Ne(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Yt),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,gt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=un);const h=s.alphaMode||to.OPAQUE;if(h===to.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===to.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==On&&(c.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new ae(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;o.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&a!==On&&(c.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==On){const u=s.emissiveFactor;o.emissive=new Ne().setRGB(u[0],u[1],u[2],Yt)}return s.emissiveTexture!==void 0&&a!==On&&c.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,gt)),Promise.all(c).then(function(){const u=new a(o);return s.name&&(u.name=s.name),In(u,s),t.associations.set(u,{materials:e}),s.extensions&&bi(i,u,s),u})}createUniqueName(e){const t=lt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[tt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Mh(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],h=cv(c),u=i[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[tt.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=Mh(new Nt,c,t),i[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],a=s.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const h=a[l].material===void 0?av(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,m=h.length;f<m;f++){const x=h[f],g=a[f];let p;const v=c[f];if(g.mode===hn.TRIANGLES||g.mode===hn.TRIANGLE_STRIP||g.mode===hn.TRIANGLE_FAN||g.mode===void 0)p=s.isSkinnedMesh===!0?new bf(x,v):new _t(x,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===hn.TRIANGLE_STRIP?p.geometry=_h(p.geometry,$h):g.mode===hn.TRIANGLE_FAN&&(p.geometry=_h(p.geometry,tl));else if(g.mode===hn.LINES)p=new Af(x,v);else if(g.mode===hn.LINE_STRIP)p=new Ul(x,v);else if(g.mode===hn.LINE_LOOP)p=new Rf(x,v);else if(g.mode===hn.POINTS)p=new Cf(x,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&lv(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),In(p,s),g.extensions&&bi(i,p,g),t.assignFinalMaterial(p),u.push(p)}for(let f=0,m=u.length;f<m;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return s.extensions&&bi(i,u[0],s),u[0];const d=new Lt;s.extensions&&bi(i,d,s),t.associations.set(d,{meshes:e});for(let f=0,m=u.length;f<m;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Gt(qt.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new ua(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),In(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),a=i,o=[],l=[];for(let c=0,h=a.length;c<h;c++){const u=a[c];if(u){o.push(u);const d=new Ge;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Dl(o,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],m=i.samplers[f.sampler],x=f.target,g=x.node,p=i.parameters!==void 0?i.parameters[m.input]:m.input,v=i.parameters!==void 0?i.parameters[m.output]:m.output;x.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",v)),c.push(m),h.push(x))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],m=u[2],x=u[3],g=u[4],p=[];for(let y=0,M=d.length;y<M;y++){const R=d[y],E=f[y],P=m[y],N=x[y],T=g[y];if(R===void 0)continue;R.updateMatrix&&R.updateMatrix();const b=n._createAnimationTracks(R,E,P,N,T);if(b)for(let C=0;C<b.length;C++)p.push(b[C])}const v=new Qs(s,void 0,p);return In(v,i),v})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const a=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),a=[],o=i.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(a),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,uv)});for(let f=0,m=u.length;f<m;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],a=s.name?i.createUniqueName(s.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(s.isBone===!0?h=new lu:c.length>1?h=new Lt:c.length===1?h=c[0]:h=new mt,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(s.name&&(h.userData.name=s.name,h.name=a),In(h,s),s.extensions&&bi(n,h,s),s.matrix!==void 0){const u=new Ge;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){const u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new Lt;n.name&&(s.name=i.createUniqueName(n.name)),In(s,n),n.extensions&&bi(t,s,n);const a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof pn||d instanceof At)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const a=[],o=e.name?e.name:e.uuid,l=[];ai[s.path]===ai.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(ai[s.path]){case ai.weights:c=fs;break;case ai.rotation:c=ps;break;case ai.translation:case ai.scale:c=ms;break;default:n.itemSize===1?c=fs:c=ms;break}const h=i.interpolation!==void 0?rv[i.interpolation]:Pi,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const m=new c(l[d]+"."+ai[s.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),a.push(m)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=dl(t.constructor),i=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ps?sv:Lu;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function fv(r,e,t){const n=e.attributes,i=new Qn;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new I(l[0],l[1],l[2]),new I(c[0],c[1],c[2])),o.normalized){const h=dl(ss[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const o=new I,l=new I;for(let c=0,h=s.length;c<h;c++){const u=s[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,m=d.max;if(f!==void 0&&m!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),d.normalized){const x=dl(ss[d.componentType]);l.multiplyScalar(x)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}r.boundingBox=i;const a=new Bn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=a}function Mh(r,e,t){const n=e.attributes,i=[];function s(a,o){return t.getDependency("accessor",a).then(function(l){r.setAttribute(o,l)})}for(const a in n){const o=ul[a]||a.toLowerCase();o in r.attributes||i.push(s(n[a],o))}if(e.indices!==void 0&&!r.index){const a=t.getDependency("accessor",e.indices).then(function(o){r.setIndex(o)});i.push(a)}return it.workingColorSpace!==Yt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${it.workingColorSpace}" not supported.`),In(r,e),fv(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?ov(r,e.targets,t):r})}class pv extends ou{constructor(){super();const e=new di;e.deleteAttribute("uv");const t=new An({side:jt}),n=new An,i=new sa(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);const s=new _t(e,t);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);const a=new la(e,n,6),o=new mt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const l=new _t(e,Zi(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new _t(e,Zi(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const h=new _t(e,Zi(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const u=new _t(e,Zi(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);const d=new _t(e,Zi(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);const f=new _t(e,Zi(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Zi(r){return new u0({color:0,emissive:16777215,emissiveIntensity:r})}const Ri={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Di{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const mv=new ua(-1,1,1,-1,0,1);class gv extends Nt{constructor(){super(),this.setAttribute("position",new vt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new vt([0,2,0,0,2,0],2))}}const xv=new gv;class pa{constructor(e){this._mesh=new _t(xv,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,mv)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class fl extends Di{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Et?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Nn.clone(e.uniforms),this.material=new Et({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new pa(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Sh extends Di{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class _v extends Di{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class vv{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new ae);this._width=n.width,this._height=n.height,t=new rn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:dn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new fl(Ri),this.copyPass.material.blending=It,this.clock=new I0}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,s=this.passes.length;i<s;i++){const a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Sh!==void 0&&(a instanceof Sh?n=!0:a instanceof _v&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ae);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class yv extends Di{constructor(e,t,n=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ne}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=i}}const Dr={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new ae},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new Ge},cameraProjectionMatrixInverse:{value:new Ge},cameraWorldMatrix:{value:new Ge},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new I(-1,-1,-1)},sceneBoxMax:{value:new I(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif

		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}

		void main() {
			float depth = getDepth(vUv.xy);
			if (depth >= 1.0) {
				discard;
				return;
			}
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {

				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w);
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));

				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));

				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},Nr={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},io={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function bv(r=5){const e=Math.floor(r)%2===0?Math.floor(r)+1:Math.floor(r),t=Mv(e),n=t.length,i=new Uint8Array(n*4);for(let a=0;a<n;++a){const o=t[a],l=2*Math.PI*o/n,c=new I(Math.cos(l),Math.sin(l),0).normalize();i[a*4]=(c.x*.5+.5)*255,i[a*4+1]=(c.y*.5+.5)*255,i[a*4+2]=127,i[a*4+3]=255}const s=new er(i,e,e);return s.wrapS=mn,s.wrapT=mn,s.needsUpdate=!0,s}function Mv(r){const e=Math.floor(r)%2===0?Math.floor(r)+1:Math.floor(r),t=e*e,n=Array(t).fill(0);let i=Math.floor(e/2),s=e-1;for(let a=1;a<=t;){if(i===-1&&s===e?(s=e-2,i=0):(s===e&&(s=0),i<0&&(i=e-1)),n[i*e+s]!==0){s-=2,i++;continue}else n[i*e+s]=a++;s++,i--}return n}const Ur={defines:{SAMPLES:16,SAMPLE_VECTORS:Du(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new ae},cameraProjectionMatrixInverse:{value:new Ge},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;

		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);

			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;

			denoised += w * neighborColor;
			totalWeight += w;
		}

		void main() {
			float depth = getDepth(vUv.xy);
			vec3 viewNormal = getViewNormal(vUv);
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);

			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}

			if (totalWeight > 0.) {
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function Du(r,e,t){const n=Sv(r,e,t);let i="vec3[SAMPLES](";for(let s=0;s<r;s++){const a=n[s];i+=`vec3(${a.x}, ${a.y}, ${a.z})${s<r-1?",":")"}`}return i}function Sv(r,e,t){const n=[];for(let i=0;i<r;i++){const s=2*Math.PI*e*i/r,a=Math.pow(i/(r-1),t);n.push(new I(Math.cos(s),Math.sin(s),a))}return n}class Tv{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let n,i,s;const a=.5*(Math.sqrt(3)-1),o=(e+t)*a,l=Math.floor(e+o),c=Math.floor(t+o),h=(3-Math.sqrt(3))/6,u=(l+c)*h,d=l-u,f=c-u,m=e-d,x=t-f;let g,p;m>x?(g=1,p=0):(g=0,p=1);const v=m-g+h,y=x-p+h,M=m-1+2*h,R=x-1+2*h,E=l&255,P=c&255,N=this.perm[E+this.perm[P]]%12,T=this.perm[E+g+this.perm[P+p]]%12,b=this.perm[E+1+this.perm[P+1]]%12;let C=.5-m*m-x*x;C<0?n=0:(C*=C,n=C*C*this._dot(this.grad3[N],m,x));let F=.5-v*v-y*y;F<0?i=0:(F*=F,i=F*F*this._dot(this.grad3[T],v,y));let z=.5-M*M-R*R;return z<0?s=0:(z*=z,s=z*z*this._dot(this.grad3[b],M,R)),70*(n+i+s)}noise3d(e,t,n){let i,s,a,o;const c=(e+t+n)*.3333333333333333,h=Math.floor(e+c),u=Math.floor(t+c),d=Math.floor(n+c),f=1/6,m=(h+u+d)*f,x=h-m,g=u-m,p=d-m,v=e-x,y=t-g,M=n-p;let R,E,P,N,T,b;v>=y?y>=M?(R=1,E=0,P=0,N=1,T=1,b=0):v>=M?(R=1,E=0,P=0,N=1,T=0,b=1):(R=0,E=0,P=1,N=1,T=0,b=1):y<M?(R=0,E=0,P=1,N=0,T=1,b=1):v<M?(R=0,E=1,P=0,N=0,T=1,b=1):(R=0,E=1,P=0,N=1,T=1,b=0);const C=v-R+f,F=y-E+f,z=M-P+f,Y=v-N+2*f,V=y-T+2*f,j=M-b+2*f,J=v-1+3*f,q=y-1+3*f,se=M-1+3*f,le=h&255,Me=u&255,ke=d&255,qe=this.perm[le+this.perm[Me+this.perm[ke]]]%12,Ze=this.perm[le+R+this.perm[Me+E+this.perm[ke+P]]]%12,et=this.perm[le+N+this.perm[Me+T+this.perm[ke+b]]]%12,K=this.perm[le+1+this.perm[Me+1+this.perm[ke+1]]]%12;let Z=.6-v*v-y*y-M*M;Z<0?i=0:(Z*=Z,i=Z*Z*this._dot3(this.grad3[qe],v,y,M));let xe=.6-C*C-F*F-z*z;xe<0?s=0:(xe*=xe,s=xe*xe*this._dot3(this.grad3[Ze],C,F,z));let Ee=.6-Y*Y-V*V-j*j;Ee<0?a=0:(Ee*=Ee,a=Ee*Ee*this._dot3(this.grad3[et],Y,V,j));let Se=.6-J*J-q*q-se*se;return Se<0?o=0:(Se*=Se,o=Se*Se*this._dot3(this.grad3[K],J,q,se)),32*(i+s+a+o)}noise4d(e,t,n,i){const s=this.grad4,a=this.simplex,o=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20;let h,u,d,f,m;const x=(e+t+n+i)*l,g=Math.floor(e+x),p=Math.floor(t+x),v=Math.floor(n+x),y=Math.floor(i+x),M=(g+p+v+y)*c,R=g-M,E=p-M,P=v-M,N=y-M,T=e-R,b=t-E,C=n-P,F=i-N,z=T>b?32:0,Y=T>C?16:0,V=b>C?8:0,j=T>F?4:0,J=b>F?2:0,q=C>F?1:0,se=z+Y+V+j+J+q,le=a[se][0]>=3?1:0,Me=a[se][1]>=3?1:0,ke=a[se][2]>=3?1:0,qe=a[se][3]>=3?1:0,Ze=a[se][0]>=2?1:0,et=a[se][1]>=2?1:0,K=a[se][2]>=2?1:0,Z=a[se][3]>=2?1:0,xe=a[se][0]>=1?1:0,Ee=a[se][1]>=1?1:0,Se=a[se][2]>=1?1:0,We=a[se][3]>=1?1:0,st=T-le+c,Le=b-Me+c,ee=C-ke+c,A=F-qe+c,D=T-Ze+2*c,k=b-et+2*c,ie=C-K+2*c,Q=F-Z+2*c,ne=T-xe+3*c,he=b-Ee+3*c,ve=C-Se+3*c,w=F-We+3*c,_=T-1+4*c,U=b-1+4*c,H=C-1+4*c,$=F-1+4*c,W=g&255,we=p&255,me=v&255,Ie=y&255,Re=o[W+o[we+o[me+o[Ie]]]]%32,re=o[W+le+o[we+Me+o[me+ke+o[Ie+qe]]]]%32,fe=o[W+Ze+o[we+et+o[me+K+o[Ie+Z]]]]%32,ze=o[W+xe+o[we+Ee+o[me+Se+o[Ie+We]]]]%32,Fe=o[W+1+o[we+1+o[me+1+o[Ie+1]]]]%32;let be=.6-T*T-b*b-C*C-F*F;be<0?h=0:(be*=be,h=be*be*this._dot4(s[Re],T,b,C,F));let Oe=.6-st*st-Le*Le-ee*ee-A*A;Oe<0?u=0:(Oe*=Oe,u=Oe*Oe*this._dot4(s[re],st,Le,ee,A));let L=.6-D*D-k*k-ie*ie-Q*Q;L<0?d=0:(L*=L,d=L*L*this._dot4(s[fe],D,k,ie,Q));let ge=.6-ne*ne-he*he-ve*ve-w*w;ge<0?f=0:(ge*=ge,f=ge*ge*this._dot4(s[ze],ne,he,ve,w));let ue=.6-_*_-U*U-H*H-$*$;return ue<0?m=0:(ue*=ue,m=ue*ue*this._dot4(s[Fe],_,U,H,$)),27*(h+u+d+f+m)}_dot(e,t,n){return e[0]*t+e[1]*n}_dot3(e,t,n,i){return e[0]*t+e[1]*n+e[2]*i}_dot4(e,t,n,i,s){return e[0]*t+e[1]*n+e[2]*i+e[3]*s}}class Ln extends Di{constructor(e,t,n=512,i=512,s,a,o){super(),this.width=n,this.height=i,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=bv(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new rn(this.width,this.height,{type:dn}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new Et({defines:Object.assign({},Dr.defines),uniforms:Nn.clone(Dr.uniforms),vertexShader:Dr.vertexShader,fragmentShader:Dr.fragmentShader,blending:It,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new h0,this.normalMaterial.blending=It,this.pdMaterial=new Et({defines:Object.assign({},Ur.defines),uniforms:Nn.clone(Ur.uniforms),vertexShader:Ur.vertexShader,fragmentShader:Ur.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new Et({defines:Object.assign({},Nr.defines),uniforms:Nn.clone(Nr.uniforms),vertexShader:Nr.vertexShader,fragmentShader:Nr.fragmentShader,blending:It}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Et({uniforms:Nn.clone(Ri.uniforms),vertexShader:Ri.vertexShader,fragmentShader:Ri.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:xo,blendDst:Ds,blendEquation:Mn,blendSrcAlpha:go,blendDstAlpha:Ds,blendEquationAlpha:Mn}),this.blendMaterial=new Et({uniforms:Nn.clone(io.uniforms),vertexShader:io.vertexShader,fragmentShader:io.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:Dh,blendSrc:xo,blendDst:Ds,blendEquation:Mn,blendSrcAlpha:go,blendDstAlpha:Ds,blendEquationAlpha:Mn}),this._fsQuad=new pa(null),this._originalClearColor=new Ne,this.setGBuffer(s?s.depthTexture:void 0,s?s.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),o!==void 0&&this.updatePdMaterial(o)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new Fl,this.depthTexture.format=cs,this.depthTexture.type=ls,this.normalRenderTarget=new rn(this.width,this.height,{minFilter:Dt,magFilter:Dt,type:dn,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);const n=this.normalTexture?1:0,i=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=i,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=i,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Du(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,n){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case Ln.OUTPUT.Off:break;case Ln.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=It,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Ln.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=It,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Ln.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=It,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Ln.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case Ln.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=It,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case Ln.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=It,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(e,t,n,i,s){e.getClearColor(this._originalClearColor);const a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,i!=null&&(e.setClearColor(i),e.setClearAlpha(s||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,n,i,s){e.getClearColor(this._originalClearColor);const a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,i=t.clearColor||i,s=t.clearAlpha||s,i!=null&&(e.setClearColor(i),e.setClearAlpha(s||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_overrideVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(n){(n.isPoints||n.isLine||n.isLine2)&&n.visible&&(n.visible=!1,t.push(n))})}_restoreVisibility(){const e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){const t=new Tv,n=e*e*4,i=new Uint8Array(n);for(let a=0;a<e;a++)for(let o=0;o<e;o++){const l=a,c=o;i[(a*e+o)*4]=(t.noise(l,c)*.5+.5)*255,i[(a*e+o)*4+1]=(t.noise(l+e,c)*.5+.5)*255,i[(a*e+o)*4+2]=(t.noise(l,c+e)*.5+.5)*255,i[(a*e+o)*4+3]=(t.noise(l+e,c+e)*.5+.5)*255}const s=new er(i,e,e,sn,wn);return s.wrapS=mn,s.wrapT=mn,s.needsUpdate=!0,s}}Ln.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};const Ev={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ne(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class gs extends Di{constructor(e,t=1,n,i){super(),this.strength=t,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new ae(e.x,e.y):new ae(256,256),this.clearColor=new Ne(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new rn(s,a,{type:dn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new rn(s,a,{type:dn});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const d=new rn(s,a,{type:dn});d.texture.name="UnrealBloomPass.v"+h,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),s=Math.round(s/2),a=Math.round(a/2)}const o=Ev;this.highPassUniforms=Nn.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Et({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new ae(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Nn.clone(Ri.uniforms),this.blendMaterial=new Et({uniforms:this.copyUniforms,vertexShader:Ri.vertexShader,fragmentShader:Ri.fragmentShader,blending:fo,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ne,this._oldClearAlpha=1,this._basic=new On,this._fsQuad=new pa(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new ae(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=gs.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=gs.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(n*n))/n);return new Et({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ae(.5,.5)},direction:{value:new ae(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;
					}
					gl_FragColor = vec4( diffuseSum, 1.0 );
				}`})}_getCompositeMaterial(e){return new Et({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}gs.BlurDirectionX=new ae(1,0);gs.BlurDirectionY=new ae(0,1);const Fr={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class wv extends Di{constructor(){super(),this.uniforms=Nn.clone(Fr.uniforms),this.material=new c0({name:Fr.name,uniforms:this.uniforms,vertexShader:Fr.vertexShader,fragmentShader:Fr.fragmentShader}),this._fsQuad=new pa(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},it.getTransfer(this._outputColorSpace)===ct&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Nh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Uh?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Fh?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===vl?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Bh?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===zh?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Oh&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const Av={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new ae(1/1024,1/512)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec2 resolution;
		varying vec2 vUv;

		#define EDGE_STEP_COUNT 6
		#define EDGE_GUESS 8.0
		#define EDGE_STEPS 1.0, 1.5, 2.0, 2.0, 2.0, 4.0
		const float edgeSteps[EDGE_STEP_COUNT] = float[EDGE_STEP_COUNT]( EDGE_STEPS );

		float _ContrastThreshold = 0.0312;
		float _RelativeThreshold = 0.063;
		float _SubpixelBlending = 1.0;

		vec4 Sample( sampler2D  tex2D, vec2 uv ) {

			return texture( tex2D, uv );

		}

		float SampleLuminance( sampler2D tex2D, vec2 uv ) {

			return dot( Sample( tex2D, uv ).rgb, vec3( 0.3, 0.59, 0.11 ) );

		}

		float SampleLuminance( sampler2D tex2D, vec2 texSize, vec2 uv, float uOffset, float vOffset ) {

			uv += texSize * vec2(uOffset, vOffset);
			return SampleLuminance(tex2D, uv);

		}

		struct LuminanceData {

			float m, n, e, s, w;
			float ne, nw, se, sw;
			float highest, lowest, contrast;

		};

		LuminanceData SampleLuminanceNeighborhood( sampler2D tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData l;
			l.m = SampleLuminance( tex2D, uv );
			l.n = SampleLuminance( tex2D, texSize, uv,  0.0,  1.0 );
			l.e = SampleLuminance( tex2D, texSize, uv,  1.0,  0.0 );
			l.s = SampleLuminance( tex2D, texSize, uv,  0.0, -1.0 );
			l.w = SampleLuminance( tex2D, texSize, uv, -1.0,  0.0 );

			l.ne = SampleLuminance( tex2D, texSize, uv,  1.0,  1.0 );
			l.nw = SampleLuminance( tex2D, texSize, uv, -1.0,  1.0 );
			l.se = SampleLuminance( tex2D, texSize, uv,  1.0, -1.0 );
			l.sw = SampleLuminance( tex2D, texSize, uv, -1.0, -1.0 );

			l.highest = max( max( max( max( l.n, l.e ), l.s ), l.w ), l.m );
			l.lowest = min( min( min( min( l.n, l.e ), l.s ), l.w ), l.m );
			l.contrast = l.highest - l.lowest;
			return l;

		}

		bool ShouldSkipPixel( LuminanceData l ) {

			float threshold = max( _ContrastThreshold, _RelativeThreshold * l.highest );
			return l.contrast < threshold;

		}

		float DeterminePixelBlendFactor( LuminanceData l ) {

			float f = 2.0 * ( l.n + l.e + l.s + l.w );
			f += l.ne + l.nw + l.se + l.sw;
			f *= 1.0 / 12.0;
			f = abs( f - l.m );
			f = clamp( f / l.contrast, 0.0, 1.0 );

			float blendFactor = smoothstep( 0.0, 1.0, f );
			return blendFactor * blendFactor * _SubpixelBlending;

		}

		struct EdgeData {

			bool isHorizontal;
			float pixelStep;
			float oppositeLuminance, gradient;

		};

		EdgeData DetermineEdge( vec2 texSize, LuminanceData l ) {

			EdgeData e;
			float horizontal =
				abs( l.n + l.s - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.se - 2.0 * l.e ) +
				abs( l.nw + l.sw - 2.0 * l.w );
			float vertical =
				abs( l.e + l.w - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.nw - 2.0 * l.n ) +
				abs( l.se + l.sw - 2.0 * l.s );
			e.isHorizontal = horizontal >= vertical;

			float pLuminance = e.isHorizontal ? l.n : l.e;
			float nLuminance = e.isHorizontal ? l.s : l.w;
			float pGradient = abs( pLuminance - l.m );
			float nGradient = abs( nLuminance - l.m );

			e.pixelStep = e.isHorizontal ? texSize.y : texSize.x;

			if (pGradient < nGradient) {

				e.pixelStep = -e.pixelStep;
				e.oppositeLuminance = nLuminance;
				e.gradient = nGradient;

			} else {

				e.oppositeLuminance = pLuminance;
				e.gradient = pGradient;

			}

			return e;

		}

		float DetermineEdgeBlendFactor( sampler2D  tex2D, vec2 texSize, LuminanceData l, EdgeData e, vec2 uv ) {

			vec2 uvEdge = uv;
			vec2 edgeStep;
			if (e.isHorizontal) {

				uvEdge.y += e.pixelStep * 0.5;
				edgeStep = vec2( texSize.x, 0.0 );

			} else {

				uvEdge.x += e.pixelStep * 0.5;
				edgeStep = vec2( 0.0, texSize.y );

			}

			float edgeLuminance = ( l.m + e.oppositeLuminance ) * 0.5;
			float gradientThreshold = e.gradient * 0.25;

			vec2 puv = uvEdge + edgeStep * edgeSteps[0];
			float pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
			bool pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !pAtEnd; i++ ) {

				puv += edgeStep * edgeSteps[i];
				pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
				pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			}

			if ( !pAtEnd ) {

				puv += edgeStep * EDGE_GUESS;

			}

			vec2 nuv = uvEdge - edgeStep * edgeSteps[0];
			float nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
			bool nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !nAtEnd; i++ ) {

				nuv -= edgeStep * edgeSteps[i];
				nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
				nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			}

			if ( !nAtEnd ) {

				nuv -= edgeStep * EDGE_GUESS;

			}

			float pDistance, nDistance;
			if ( e.isHorizontal ) {

				pDistance = puv.x - uv.x;
				nDistance = uv.x - nuv.x;

			} else {

				pDistance = puv.y - uv.y;
				nDistance = uv.y - nuv.y;

			}

			float shortestDistance;
			bool deltaSign;
			if ( pDistance <= nDistance ) {

				shortestDistance = pDistance;
				deltaSign = pLuminanceDelta >= 0.0;

			} else {

				shortestDistance = nDistance;
				deltaSign = nLuminanceDelta >= 0.0;

			}

			if ( deltaSign == ( l.m - edgeLuminance >= 0.0 ) ) {

				return 0.0;

			}

			return 0.5 - shortestDistance / ( pDistance + nDistance );

		}

		vec4 ApplyFXAA( sampler2D  tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData luminance = SampleLuminanceNeighborhood( tex2D, texSize, uv );
			if ( ShouldSkipPixel( luminance ) ) {

				return Sample( tex2D, uv );

			}

			float pixelBlend = DeterminePixelBlendFactor( luminance );
			EdgeData edge = DetermineEdge( texSize, luminance );
			float edgeBlend = DetermineEdgeBlendFactor( tex2D, texSize, luminance, edge, uv );
			float finalBlend = max( pixelBlend, edgeBlend );

			if (edge.isHorizontal) {

				uv.y += edge.pixelStep * finalBlend;

			} else {

				uv.x += edge.pixelStep * finalBlend;

			}

			return Sample( tex2D, uv );

		}

		void main() {

			gl_FragColor = ApplyFXAA( tDiffuse, resolution.xy, vUv );

		}`},Rv="./models/roary-meshy-animated.glb",Cv={url:Rv},Ls=new I;function cn(r,e,t,n,i,s){const a=2*Math.PI*i/4,o=Math.max(s-2*i,0),l=Math.PI/4;Ls.copy(e),Ls[n]=0,Ls.normalize();const c=.5*a/(a+o),h=1-Ls.angleTo(r)/l;return Math.sign(Ls[t])===1?h*c:o/(a+o)+c+c*(1-h)}class Wl extends di{constructor(e=1,t=1,n=1,i=2,s=.1){const a=i*2+1;if(s=Math.min(e/2,t/2,n/2,s),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:i,radius:s},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const l=new I,c=new I,h=new I(e,t,n).divideScalar(2).subScalar(s),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,m=u.length/6,x=new I,g=.5/a;for(let p=0,v=0;p<u.length;p+=3,v+=2)switch(l.fromArray(u,p),c.copy(l),c.x-=Math.sign(c.x)*g,c.y-=Math.sign(c.y)*g,c.z-=Math.sign(c.z)*g,c.normalize(),u[p+0]=h.x*Math.sign(l.x)+c.x*s,u[p+1]=h.y*Math.sign(l.y)+c.y*s,u[p+2]=h.z*Math.sign(l.z)+c.z*s,d[p+0]=c.x,d[p+1]=c.y,d[p+2]=c.z,Math.floor(p/m)){case 0:x.set(1,0,0),f[v+0]=cn(x,c,"z","y",s,n),f[v+1]=1-cn(x,c,"y","z",s,t);break;case 1:x.set(-1,0,0),f[v+0]=1-cn(x,c,"z","y",s,n),f[v+1]=1-cn(x,c,"y","z",s,t);break;case 2:x.set(0,1,0),f[v+0]=1-cn(x,c,"x","z",s,e),f[v+1]=cn(x,c,"z","x",s,n);break;case 3:x.set(0,-1,0),f[v+0]=1-cn(x,c,"x","z",s,e),f[v+1]=1-cn(x,c,"z","x",s,n);break;case 4:x.set(0,0,1),f[v+0]=1-cn(x,c,"x","y",s,e),f[v+1]=1-cn(x,c,"y","x",s,t);break;case 5:x.set(0,0,-1),f[v+0]=cn(x,c,"x","y",s,e),f[v+1]=1-cn(x,c,"y","x",s,t);break}}static fromJSON(e){return new Wl(e.width,e.height,e.depth,e.segments,e.radius)}}const Pv="./branding/roarys-dinner-logo-v1.png",Iv=2172,Lv=724,so={url:Pv,width:Iv,height:Lv};function Xl(r=173){let e=r>>>0;return()=>(e=Math.imul(e,1664525)+1013904223>>>0,e/4294967296)}function Dv(r=11.16,e=1.28,t=.34){const n=r/2,i=e/2,s=Math.min(t,i*.9),a=new gu;a.moveTo(-n+s,-i),a.lineTo(n-s,-i),a.quadraticCurveTo(n,-i,n,-i+s),a.lineTo(n,i-s),a.quadraticCurveTo(n,i,n-s,i),a.lineTo(-n+s,i),a.quadraticCurveTo(-n,i,-n,i-s),a.lineTo(-n,-i+s),a.quadraticCurveTo(-n,-i,-n+s,-i);const o=new zl(a,{depth:.095,bevelEnabled:!0,bevelSize:.025,bevelThickness:.02,bevelSegments:4,curveSegments:12,steps:1,material:0,extrudeMaterial:1});o.rotateX(-Math.PI/2);const l=o.attributes.position,c=o.attributes.uv;for(let h=0;h<l.count;h++)c.setXY(h,l.getX(h)/r+.5,-l.getZ(h)/e+.5);return c.needsUpdate=!0,o.computeBoundingBox(),o}function ro(r="plaster",e=173){const n=document.createElement("canvas");n.width=n.height=512;const i=n.getContext("2d"),s=Xl(e),a=i.createImageData(512,512);for(let l=0;l<512;l++)for(let c=0;c<512;c++){const h=(l*512+c)*4;let u=226+(s()-.5)*(r==="rubber"?18:24);r==="rubber"&&(u=105+(l%16<3?-28:0)+(s()-.5)*10),a.data[h]=u,a.data[h+1]=u,a.data[h+2]=u,a.data[h+3]=255}i.putImageData(a,0,0);for(let l=0;l<(r==="plaster"?110:60);l++){const c=s()*512,h=s()*512,u=8+s()*85,d=i.createRadialGradient(c,h,0,c,h,u);d.addColorStop(0,`rgba(59,43,22,${.015+s()*.1})`),d.addColorStop(1,"rgba(59,43,22,0)"),i.fillStyle=d,i.fillRect(c-u,h-u,u*2,u*2)}if(r==="tile"){const l=i.createLinearGradient(0,0,0,512);l.addColorStop(0,"#372f2355"),l.addColorStop(.045,"#372f2300"),l.addColorStop(.94,"#372f2300"),l.addColorStop(1,"#372f2366"),i.fillStyle=l,i.fillRect(0,0,512,512),i.strokeStyle="#28221b24",i.lineWidth=1;for(let c=0;c<70;c++){const h=s()*512,u=s()*512;i.beginPath(),i.moveTo(h,u),i.lineTo(h+s()*32,u+s()*5),i.stroke()}}if(r==="plaster")for(let l=0;l<24;l++)i.fillStyle=`rgba(65,46,22,${.015+s()*.045})`,i.fillRect(s()*512,330+s()*150,1+s()*6,100+s()*90);const o=new is(n);return o.colorSpace=gt,o.wrapS=o.wrapT=mn,o.anisotropy=4,o}function Nv(r,e,t){const n=Xl(141),i=34,s=24,a=.6,o=t.map(()=>[]);for(let c=0;c<i;c++)for(let h=0;h<s;h++){const u=n()<.66?0:n()<.86?1:2;o[u].push({x:1+(c-(i-1)/2)*a,z:(h-(s-1)/2)*a,h:(n()-.5)*.006,angle:Math.floor(n()*4)*Math.PI/2})}const l=new mt;return o.forEach((c,h)=>{const u=new la(e,t[h],c.length);u.name=`AgedFloorTiles${h}`,c.forEach((d,f)=>{l.position.set(d.x,.023+d.h,d.z),l.rotation.set(0,d.angle,0),l.updateMatrix(),u.setMatrixAt(f,l.matrix)}),u.receiveShadow=!0,u.castShadow=!1,r.add(u)}),i*s}const Os={burger:15907668,cola:6932674,fries:15760222},$e=(r,e=.55,t=0,n={})=>new An({color:r,roughness:e,metalness:t,...n}),de={cream:$e(16049610,.38),teal:$e(1526859,.38),dark:$e(1452843,.5),chrome:$e(11055018,.36,.82),brass:$e(10188873,.43,.65),red:$e(11747118,.55),white:$e(16249311,.48),rubber:$e(1647140,.85),wood:$e(9260081,.68),mustard:$e(16170053,.45),lettuce:$e(6657084,.78),tomato:$e(12924452,.4),patty:$e(4728601,.83),cheese:$e(15771680,.48),bun:$e(13142845,.72),seed:$e(16244401,.84),fry:$e(15316800,.65)},ao=new Map;function Nu(r,e,t,n=.05){const i=`${r},${e},${t},${n}`;return ao.has(i)||ao.set(i,new Wl(r,e,t,4,Math.min(n,r/3,e/3,t/3))),ao.get(i)}function Ht(r,e,t,n=[0,0,0],i=null,s=!0){const a=new _t(e,t);return a.position.set(...n),i&&a.rotation.set(...i),a.castShadow=s,a.receiveShadow=!0,r.add(a),a}function oe(r,e,t,n,i=.05,s=null,a=!0){return Ht(r,Nu(...n,i),e,t,s,a)}function Zt(r,e,t,n,i=18){const s=Ht(r,new kl(1,i,Math.floor(i*.66)),e,t);return s.scale.set(...n),s}function rt(r,e,t,n,i,s,a=24,o=null){return Ht(r,new ca(n,i,s,a),e,t,o)}function Uv(r,{background:e="#174c4b",color:t="#f5e9cf",width:n=512,height:i=128,subtitle:s="",border:a=!1}={}){const o=document.createElement("canvas");o.width=n,o.height=i;const l=o.getContext("2d");l.fillStyle=e,l.fillRect(0,0,n,i),a&&(l.strokeStyle="#dcb260",l.lineWidth=5,l.strokeRect(7,7,n-14,i-14)),l.textAlign="center",l.textBaseline="middle",l.fillStyle=t,l.font=`800 ${i*(s?.39:.48)}px system-ui,sans-serif`,l.fillText(r,n/2,i*(s?.38:.5),n*.91),s&&(l.font=`600 ${i*.12}px system-ui,sans-serif`,l.fillStyle="#c0d4cc",l.fillText(s,n/2,i*.77,n*.9));const c=new is(o);return c.colorSpace=gt,c}function Th(r,e,t,n,i={}){const s=Uv(e,i);return oe(r,new An({map:s,roughness:.6,emissive:16777215,emissiveMap:s,emissiveIntensity:.15}),t,[...n,.055],.035,null,!1)}function Eh(){const r=document.createElement("canvas");r.width=r.height=256;const e=r.getContext("2d");e.fillStyle="#b33f2e",e.fillRect(0,0,256,256),e.strokeStyle="#f7cc69",e.lineWidth=25,e.lineJoin="round",e.lineCap="square",e.beginPath(),e.moveTo(42,72),e.lineTo(82,180),e.lineTo(128,106),e.lineTo(174,180),e.lineTo(214,72),e.stroke();const t=new is(r);return t.colorSpace=gt,t}const oo=new Map;function Ws(r){return oo.has(r)||oo.set(r,Fv(r)),oo.get(r).clone(!0)}function Fv(r){const e=new Lt;if(r==="burger"){rt(e,de.bun,[0,.045,0],.22,.21,.08),rt(e,de.patty,[0,.105,0],.225,.23,.065),oe(e,de.cheese,[0,.147,0],[.4,.018,.4],.008,[0,.6,-.025]),rt(e,de.tomato,[0,.174,0],.208,.208,.025);const t=Ht(e,new Ai(.187,.033,6,28),de.lettuce,[0,.188,0],[Math.PI/2,0,0]),n=t.geometry.attributes.position;for(let i=0;i<n.count;i++)n.setZ(i,n.getZ(i)+Math.sin(i*2.3)*.013);n.needsUpdate=!0,t.geometry.computeVertexNormals(),Zt(e,de.bun,[0,.221,0],[.22,.12,.22],24);for(let i=0;i<28;i++){const s=i*2.39996,a=.19*Math.sqrt((i+.5)/28),o=Math.cos(s)*a,l=Math.sin(s)*a,c=Zt(e,de.seed,[o,.221+.12*Math.sqrt(1-a*a/.0484),l],[.015,.004,.006],7);c.rotation.y=s}}else if(r==="cola"){const t=new An({map:Eh(),roughness:.5});rt(e,t,[0,.24,0],.17,.125,.43,32),rt(e,de.white,[0,.46,0],.182,.18,.035,32),rt(e,de.white,[0,.485,0],.16,.16,.017,32);const n=rt(e,de.mustard,[.045,.65,.015],.018,.018,.35,10);n.rotation.z=-.12,rt(e,de.red,[.046,.65,.015],.0185,.0185,.033,10,[0,0,-.12])}else{const t=new An({map:Eh(),roughness:.6}),n=rt(e,t,[0,.145,0],.2,.145,.27,4,[0,Math.PI/4,0]);n.scale.z=.65;for(let i=0;i<18;i++){const s=(i*7%9-4)*.034,a=(Math.floor(i/9)-.5)*.07,o=.25+i*13%7*.014;oe(e,de.fry,[s,.25+o/2,a],[.039,o,.039],.008,[.04*Math.sin(i),0,.11*Math.sin(i*2)])}}return e}function wh(){const r=new Lt;return oe(r,de.red,[0,0,0],[.64,.035,.46],.045),oe(r,de.cream,[0,.018,0],[.55,.01,.38],.025),r}function Ov(r){const e=new Lt;r.add(e);const t=[],n=new Eu;function i(D,k,ie=16777215,Q=0,{folder:ne="polyhaven",extension:he="jpg"}={}){const ve={};for(const[w,_]of[["color","map"],["normal","normalMap"],["roughness","roughnessMap"]]){let U,H;t.push(new Promise((W,we)=>{U=W,H=we}));const $=n.load(`./textures/${ne}/${D}_${w}.${he}`,U,void 0,H);$.wrapS=$.wrapT=mn,$.repeat.set(...k),$.anisotropy=4,w==="color"&&($.colorSpace=gt),ve[_]=$}return $e(ie,1,Q,{...ve,normalScale:new ae(.45,.45)})}const s=i("dirty_tiles",[8,6]),a=i("fabric_leather_02",[2,1],16346467),o=i("rusty_painted_metal",[3,1],14340538,.48),l={folder:"diner-weathering",extension:"png"},c=i("counter",[1,1],16777215,0,l),h=i("kitchen",[1,1],16777215,.82,l),u=i("paint",[1,1],16777215,.08,l),d=h.clone();d.roughness=.78,d.color.set(13025453);const f=document.createElement("canvas");f.width=f.height=256;const m=f.getContext("2d");for(let D=0;D<8;D++)m.strokeStyle=`rgba(78,42,15,${.045+D*.012})`,m.lineWidth=1.5+D*.4,m.beginPath(),m.ellipse(128+D*.7,128,69+D*.5,73-D*.4,.12,.15+D*.07,5.7-D*.09),m.stroke();const x=new is(f);x.colorSpace=gt;const g=new An({map:x,transparent:!0,depthWrite:!1,roughness:.26,polygonOffset:!0,polygonOffsetFactor:-2}),p=ro("plaster");p.repeat.set(4,1);const v=$e(13024680,.94,0,{map:p,bumpMap:p,bumpScale:.018}),y=u.clone();y.color.set(11846065);const M=ro("rubber");M.repeat.set(2,18);const R=$e(4672578,.94,0,{map:M,bumpMap:M,bumpScale:.008}),E=ro("tile");s.normalMap.repeat.set(.5,.5),s.roughnessMap.repeat.set(.5,.5);const P=[11381140,9607818,12104091].map(D=>$e(D,.87,0,{map:E,normalMap:s.normalMap,normalScale:new ae(.18,.18),roughnessMap:s.roughnessMap})),N=Xl(1947);oe(e,de.dark,[1,-.27,0],[21,.55,15],.15),oe(e,$e(4012592,.98),[1,.019,0],[20.5,.025,14.5],.01,null,!1),Nv(e,Nu(.592,.028,.592,.008),P),oe(e,h,[-3.35,.24,0],[2.15,.48,12.7],.14),oe(e,R,[-3.35,.493,0],[1.85,.03,12.3],.06,null,!1),oe(e,u,[-2.27,.34,0],[.045,.075,12.2],.01,null,!1),oe(e,v,[1,2.25,-7.15],[20.5,4.5,.25],.05),oe(e,y,[1,.9,-6.99],[20.3,1.75,.06],.035),oe(e,de.brass,[1,1.82,-6.93],[20.2,.035,.06],.008),oe(e,v,[11.28,1.07,0],[.2,2.14,14.5],.04),oe(e,v,[11.28,4.31,0],[.2,.38,14.5],.04),oe(e,v,[11.28,3.13,-5.72],[.2,1.98,3.06],.04),oe(e,v,[11.28,3.13,4.02],[.2,1.98,6.46],.04),oe(e,y,[11.15,.9,0],[.045,1.75,14.4],.01),oe(e,v,[-9.28,2.25,0],[.2,4.5,14.5],.04),oe(e,y,[-9.15,.9,0],[.045,1.75,14.4],.01);for(const D of[-9.12,11.12])oe(e,h,[D,.12,0],[.05,.2,14.3],.02);oe(e,h,[1,.12,-6.9],[20.2,.2,.1],.025),oe(e,de.wood,[1,4.42,-6.92],[20.4,.12,.17],.03);const T=[];for(const D of[2.18,4.08])oe(e,de.wood,[11.08,D,-1.7],[.16,.1,4.95],.025);for(const D of[-4.13,.73])oe(e,de.wood,[11.08,3.13,D],[.16,1.94,.1],.025);oe(e,$e(1319981,.23,.25),[10.98,3.13,-1.7],[.025,1.77,4.72],.008,null,!1);for(const D of[-3.9,-1.7,.5])oe(e,de.brass,[10.94,3.13,D],[.03,1.76,.035],.008);const b=$e(11776156,.77,.1);for(let D=2.45;D<3.94;D+=.22)oe(e,b,[10.86,D,-1.7],[.19,.032,4.66],.01,[0,0,-.25]);oe(e,h,[10.79,2.17,-1.7],[.45,.1,5.05],.035);const C=new ia(10862291,260,27,Math.PI*.25,.52,2);C.position.set(14.3,4.5,-3.5),C.target.position.set(-3,.3,3.5),C.castShadow=!0,C.shadow.mapSize.set(1024,1024),C.shadow.normalBias=.012,C.shadow.bias=-15e-5,C.shadow.intensity=.62,e.add(C,C.target),T.push(C),oe(e,de.wood,[11.03,2.72,4.24],[.15,1.85,1.62],.06);const F=document.createElement("canvas");F.width=512,F.height=584;const z=F.getContext("2d");z.fillStyle="#202e29",z.fillRect(0,0,512,584),z.fillStyle="#d5d0b5",z.textAlign="center",z.font="italic 38px Georgia",z.fillText("Heute wie immer",256,70),z.strokeStyle="#d5d0b577",z.lineWidth=2,z.beginPath(),z.moveTo(45,101),z.lineTo(467,101),z.stroke();for(const[D,k]of["BURGER","COLA","POMMES"].entries())z.font="700 46px Georgia",z.fillText(k,256,185+D*125),z.font="24px Georgia",z.fillText(["frisch vom Grill","mit extra Eis","golden & knusprig"][D],256,225+D*125);z.font="19px Georgia",z.fillText("BITTE HIER BESTELLEN",256,552);const Y=new is(F);Y.colorSpace=gt,Ht(e,new bn(1.45,1.66),$e(16777215,.92,0,{map:Y}),[10.93,2.72,4.24],[0,-Math.PI/2,0],!1),oe(e,h,[-7.55,1.5,-6.82],[1.42,2.95,.16],.07),oe(e,de.rubber,[-7.55,1.5,-6.71],[1.24,2.78,.025],.035),oe(e,y,[-7.55,1.5,-6.68],[1.18,2.72,.025],.025),rt(e,de.chrome,[-7.55,2.1,-6.63],.25,.25,.045,36,[Math.PI/2,0,0]),rt(e,$e(1911596,.24,.28),[-7.55,2.1,-6.6],.21,.21,.02,36,[Math.PI/2,0,0]),oe(e,de.chrome,[-7.12,1.32,-6.6],[.06,.33,.07],.025);for(let D=.4;D<.85;D+=.075)oe(e,de.dark,[-7.55,D,-6.64],[.78,.018,.025],.006);const V=1.6,j=3.12,J=7.14,q=J*so.height/so.width;for(const D of[-1.5,4.7])oe(e,o,[D,2,-6.99],[.09,2.45,.08],.01);oe(e,o,[V,j,-6.98],[J+.3,q+.24,.12],.08),oe(e,de.brass,[V,j,-6.9],[J+.15,q+.14,.055],.055),oe(e,$e(16762995,.45,.25,{emissive:15312973,emissiveIntensity:.25}),[V,j,-6.86],[J+.035,q+.035,.025],.02);let se,le;t.push(new Promise((D,k)=>{se=D,le=k}));const Me=n.load(so.url,se,void 0,le);Me.colorSpace=gt,Me.anisotropy=8;const ke=Ht(e,new bn(J,q),new On({map:Me,toneMapped:!1}),[V,j,-6.84],null,!1);ke.name="RoarysDinnerSign";for(const D of[-1,1])for(const k of[-1,1])rt(e,de.chrome,[V+D*(J/2+.047),j+k*(q/2+.043),-6.835],.025,.025,.022,12,[Math.PI/2,0,0]);const qe=$e(1257787,.18,.25);for(const D of[-5,7.8]){oe(e,de.wood,[D,3.25,-6.9],[3.15,1.9,.1],.04),oe(e,qe,[D,3.25,-6.82],[2.96,1.71,.04],.01),oe(e,de.brass,[D,3.25,-6.77],[.035,1.71,.03],.005),oe(e,de.brass,[D,3.25,-6.77],[2.96,.035,.03],.005);for(let k=0;k<6;k++){const ie=.25+k*3%5*.12;oe(e,$e(728358,.9),[D-1.2+k*.46,2.54+ie/2,-6.77],[.35,ie,.02],.004,null,!1);for(let Q=0;Q<3;Q++)oe(e,$e(15254647,.4,0,{emissive:16038223,emissiveIntensity:.45}),[D-1.28+k*.46+Q%2*.13,2.6+Math.floor(Q/2)*.13,-6.74],[.045,.055,.01],.002,null,!1)}}const Ze=[],et=[],K=[];for(let D=0;D<3;D++){const k=Wt[D];oe(e,h,[3.8,.47,k],[11,.94,1.02],.17),Ht(e,Dv(),[c,d],[3.8,.95,k],null,!1);for(const _ of[-.45,2.3,7.1]){const U=Ht(e,new bn(.39,.39),g,[_,1.068,k+(_>2?.29:-.25)],[-Math.PI/2,0,_*.4],!1);U.renderOrder=2}oe(e,de.rubber,[3.8,.91,k+.515],[10.6,.055,.045],.018);const ie=[16777215,13226431,10794405].map(_=>{const U=u.clone();return U.color.set(_),U});for(let _=-.7;_<9;_+=1.4){const U=oe(e,ie[Math.floor(N()*3)],[_,.47+(N()-.5)*.012,k+.516],[1.2,.64,.035],.045,null,!1);U.rotation.z=(N()-.5)*.008;for(const H of[-1,1])Zt(e,de.chrome,[_+H*.51,.71,k+.542],[.018,.018,.008],8)}rt(e,de.chrome,[3.8,.21,k+.67],.035,.035,10.4,16,[0,0,Math.PI/2]);for(const _ of[-.8,2,5,8.5])rt(e,de.chrome,[_,.18,k+.59],.026,.026,.18,12,[Math.PI/2,0,0]);oe(e,de.chrome,[3.8,1.074,k-.3],[10.8,.012,.025],.003,null,!1);const Q=$e(Os[["burger","cola","fries"][D]],.5,0,{emissive:Os[["burger","cola","fries"][D]],emissiveIntensity:.4});oe(e,Q,[-1.7,.98,k],[.045,.1,1.15],.012,null,!1),Ze.push(Q),Th(e,`0${D+1}`,[-1.2,.51,k+.54],[.52,.38],{width:128,height:96,background:"#164b48",color:"#efce89"});for(const _ of[7.3,8.7]){rt(e,de.chrome,[_,.34,k-1.1],.045,.045,.66,12),rt(e,de.chrome,[_,.04,k-1.1],.24,.24,.06);const U=Zt(e,a,[_,.72,k-1.1],[.29,.095,.29],28);U.rotation.z=(N()-.5)*.055,Ht(e,new Ai(.268,.009,6,32),de.brass,[_,.7,k-1.1],[Math.PI/2,0,0]),Ht(e,new Ai(.16,.012,8,24),de.chrome,[_,.27,k-1.1],[Math.PI/2,0,0])}const ne=new Lt;ne.position.set(-5.45,.5,k),e.add(ne),K.push(ne),oe(ne,h,[-.91,.92,0],[.065,1.8,2.05],.025);for(let _=.25;_<1.65;_+=.35)oe(ne,de.chrome,[-.865,_,0],[.015,.012,1.95],.004);oe(ne,D===1?de.chrome:h,[0,.3,0],[1.63,.6,1.7],.06),oe(ne,D===1?de.dark:h,[0,.615,0],[1.73,.06,1.8],.025);const he=["burger","cola","fries"][D],ve=$e(Os[he],.4,0,{emissive:Os[he],emissiveIntensity:.5});oe(ne,ve,[.83,.36,0],[.04,.2,1.5],.015,null,!1),et.push(ve);const w=Th(ne,["BURGER","COLA","POMMES"][D],[0,1.4,-.55],[1.85,.42],{width:512,height:128,background:"#142e2f",color:["#f6c866","#82dbd0","#ffad8c"][D]});if(w.rotation.y=.12,D===0){oe(ne,de.rubber,[0,.68,.1],[1.38,.07,1.15],.03);for(let U=-.55;U<.6;U+=.1)oe(ne,de.chrome,[U,.73,.1],[.025,.025,1],.005);oe(ne,h,[0,1,-.65],[1.65,.5,.16],.03);for(const U of[-.5,0,.5])rt(ne,de.red,[U,.34,.86],.055,.055,.035,16,[Math.PI/2,0,0]);const _=Ws("burger");_.position.set(.12,.75,.12),_.scale.setScalar(1.1),ne.add(_),oe(ne,de.cream,[-.52,.76,.32],[.23,.04,.28],.025)}else if(D===1){oe(ne,de.chrome,[0,1.02,-.28],[1.3,.78,.64],.08),oe(ne,de.red,[0,1.11,.055],[1.12,.46,.055],.025);for(let U=-.37;U<=.4;U+=.37)rt(ne,de.rubber,[U,.82,.2],.04,.04,.17,10),oe(ne,de.white,[U,1.12,.095],[.2,.16,.025],.015);oe(ne,de.rubber,[0,.69,.38],[1.18,.035,.63],.025);const _=Ws("cola");_.position.set(.36,.71,.31),_.scale.setScalar(.78),ne.add(_)}else{for(const H of[-.38,.38]){oe(ne,de.rubber,[H,.66,-.04],[.61,.025,1.1],.03),oe(ne,h,[H,.71,-.04],[.53,.11,.9],.025);for(let $=0;$<6;$++)oe(ne,de.chrome,[H-.22+$*.088,.785,-.04],[.012,.012,.79],.002);oe(ne,de.rubber,[H,.81,.62],[.1,.06,.4],.025,[.1,0,0])}const _=Ws("fries");_.position.set(.05,.79,0),ne.add(_);const U=new sa(16759380,3.5,2,2);U.position.set(0,1.5,0),ne.add(U)}if(D!==1){oe(ne,h,[-.18,2.1,0],[1.85,.38,2.08],.13),oe(ne,de.rubber,[-.1,1.89,0],[1.58,.035,1.79],.045);for(let U=-.7;U<.8;U+=.15)oe(ne,de.chrome,[-.1,1.87,U],[1.42,.018,.022],.008);rt(ne,h,[-.5,2.7,0],.24,.29,.9,28),oe(ne,$e(16767393,.4,0,{emissive:16758875,emissiveIntensity:2.6}),[.4,1.86,0],[.05,.035,1.48],.009,null,!1);const _=new sa(16761213,11,5.2,2);_.position.set(.6,1.78,0),ne.add(_)}rt(ne,de.chrome,[-.66,.1,.88],.025,.025,.82,12),Ht(ne,new Ai(.09,.012,8,20),de.red,[-.66,.22,.94],[Math.PI/2,0,0])}oe(e,de.teal,[-6.63,.95,0],[.13,1.8,13.9],.04);for(const D of[.5,5.2]){oe(e,de.dark,[D,.24,-6],[2.8,.48,.92],.04),oe(e,a,[D,.54,-5.99],[2.85,.18,.95],.1),oe(e,a,[D,1.04,-6.36],[2.85,.91,.2],.1);for(let k=-1;k<=1;k++)oe(e,de.brass,[D+k*.7,1.1,-6.245],[.015,.65,.018],.004);oe(e,de.chrome,[D,.46,-5.12],[.06,.9,.06],.01),oe(e,de.cream,[D,.94,-5.12],[2,.13,.65],.055);for(const k of[-.8,0,.8])Zt(e,de.brass,[D+k,1.13,-6.245],[.028,.028,.012],12)}for(const D of Wt)oe(e,de.chrome,[4.4,1.24,D+.38],[.24,.32,.19],.025),oe(e,de.white,[4.4,1.3,D+.485],[.16,.12,.008],.002),rt(e,de.red,[4.78,1.25,D+.36],.055,.07,.34,16),rt(e,de.mustard,[4.78,1.45,D+.36],.012,.033,.08,12),rt(e,de.white,[5,1.17,D+.36],.037,.045,.18,16),rt(e,de.chrome,[5,1.27,D+.36],.042,.042,.025,12);for(let D=0;D<3;D++){const k=new Lt;k.position.set(D===0?7.4:3.2,4,Wt[D]),e.add(k),rt(k,de.dark,[0,.35,0],.018,.018,.75,8),rt(k,de.red,[0,0,0],.2,.5,.32,24),rt(k,$e(16765840,.4,0,{emissive:16765840,emissiveIntensity:4}),[0,-.16,0],.44,.44,.02,24);const ie=new ia(16766368,45,9.5,Math.PI*.3,.85,2);ie.position.set(0,-.18,0),ie.target.position.set(-.5,-3.8,.12),k.add(ie,ie.target)}const Z=document.createElement("canvas");Z.width=Z.height=128;const xe=Z.getContext("2d"),Ee=xe.createRadialGradient(64,64,8,64,64,64);Ee.addColorStop(0,"rgba(40,29,13,.40)"),Ee.addColorStop(.65,"rgba(40,29,13,.18)"),Ee.addColorStop(1,"rgba(40,29,13,0)"),xe.fillStyle=Ee,xe.fillRect(0,0,128,128);const Se=new is(Z);Se.colorSpace=gt;const We=new An({map:Se,transparent:!0,depthWrite:!1,roughness:.3,polygonOffset:!0,polygonOffsetFactor:-1});for(let D=0;D<24;D++){const k=Ht(e,new bn(.6+N()*1.2,.3+N()*.6),We,[-5.8+N()*1.7,.046,-5.4+N()*11],[-Math.PI/2,0,N()*Math.PI],!1);k.renderOrder=1}for(const D of Wt)for(let k=0;k<8;k++){const ie=Ht(e,new bn(.24,.13),We,[1+k*.96,.047,D-.96+(k%2?.09:-.09)],[-Math.PI/2,0,.12+N()*.3],!1);ie.renderOrder=1}for(let D=0;D<32;D++){const k=oe(e,D%3===0?de.white:de.fry,[-6.1+N()*1.6,.05,-5.4+N()*11],[.01+N()*.035,.012,.025+N()*.07],.006,[0,N()*6,N()*.2],!1);D%3===0&&k.scale.set(3,.5,3)}const st=rt(e,h,[-7.4,.42,3.7],.34,.28,.8,32),Le=st.geometry.attributes.position;for(let D=0;D<Le.count;D++){const k=Le.getX(D),ie=Le.getY(D),Q=Le.getZ(D),ne=Math.atan2(Q,k),he=1-.055*Math.sin(ne*3+ie*4)**4;Le.setXYZ(D,k*he,ie,Q*he)}Le.needsUpdate=!0,st.geometry.computeVertexNormals(),rt(e,de.rubber,[-7.4,.83,3.7],.35,.35,.06,32);const ee=new bn(.38,.63,12,16),A=ee.attributes.position;for(let D=0;D<A.count;D++){const k=A.getX(D),ie=A.getY(D);A.setZ(D,.025*Math.sin(k*47)*(1-(ie+.315)/.75)),A.setY(D,ie+Math.sin(k*31)*.009)}return ee.computeVertexNormals(),Ht(e,ee,$e(12236705,.98,0,{map:E,side:un}),[-6.35,1.18,1.3],[0,Math.PI/2,.08]),{world:e,laneLights:Ze,stationLights:et,stationRoots:K,shadowLights:T,ready:Promise.all(t)}}const lo=new Map;function Bv(r){lo.has(r)||lo.set(r,zv(r));const e=lo.get(r).clone(!0);return{group:e,armL:e.getObjectByName("ArmL"),armR:e.getObjectByName("ArmR"),legL:e.getObjectByName("LegL"),legR:e.getObjectByName("LegR"),head:e.getObjectByName("Head")}}function zv(r){const e=new Lt,t=$e([12024404,14463628,7685679,12949622,14859672,10382407][r],.76),n=$e([14254167,15055974,4554368,10184836,7112604,9346407][r],.82),i=$e([2440006,3491911,4209465,2703178,4931131,2374979][r],.86),s=$e([2759959,7097130,1447705,3811104,10057810,2235931][r],.9);rt(e,n,[0,1.17,0],.255,.205,.59,20),Zt(e,n,[0,1.45,0],[.24,.11,.17]),oe(e,i,[0,.83,0],[.43,.22,.3],.085),oe(e,de.rubber,[0,.925,.015],[.44,.055,.31],.02),oe(e,de.brass,[0,.925,.18],[.065,.05,.017],.005),rt(e,t,[0,1.53,0],.075,.085,.17,14);const a=new Lt;a.name="Head",a.position.y=1.68,e.add(a),Zt(a,t,[0,0,0],[.17,.21,.16],24),Zt(a,t,[0,-.065,.135],[.031,.045,.05],12),Zt(a,s,[0,.12,-.028],[.176,.115,.155],18),r%2===0&&(oe(a,s,[.1,.03,-.088],[.13,.22,.14],.06),oe(a,s,[-.1,.03,-.088],[.13,.22,.14],.06));for(const o of[-1,1])Zt(a,t,[o*.165,-.015,0],[.025,.047,.029],12),Zt(a,de.white,[o*.064,.018,.137],[.032,.022,.018],10),Zt(a,de.rubber,[o*.064,.018,.152],[.013,.016,.009],8),oe(a,s,[o*.064,.063,.144],[.062,.012,.014],.004,[0,0,o*.08]);if(oe(a,$e(7947062,.6),[0,-.102,.143],[.068,.012,.011],.005),r===1||r===4){for(const o of[-1,1])Ht(a,new Ai(.047,.006,6,20),de.dark,[o*.066,.02,.17]);oe(a,de.dark,[0,.025,.172],[.047,.008,.01],.002)}(r===2||r===5)&&(Zt(a,n,[0,.17,-.005],[.185,.1,.175]),oe(a,n,[0,.14,.16],[.3,.025,.24],.05));for(const o of[-1,1]){const l=new Lt;l.name=o<0?"ArmL":"ArmR",l.position.set(o*.255,1.37,0),e.add(l),rt(l,n,[o*.015,-.13,0],.075,.065,.28,14),rt(l,t,[o*.015,-.36,.015],.058,.047,.23,14),Zt(l,t,[o*.015,-.5,.025],[.05,.07,.044],12);const c=new Lt;c.name=o<0?"LegL":"LegR",c.position.set(o*.115,.79,0),e.add(c),rt(c,i,[0,-.32,0],.085,.065,.66,14),oe(c,de.rubber,[0,-.7,.045],[.17,.13,.31],.045),oe(c,de.white,[0,-.755,.045],[.174,.025,.31],.012);for(const h of[.04,.08,.12])oe(c,de.white,[0,-.633,h],[.09,.008,.012],.003)}return oe(e,de.white,[0,1.27,.18],[.12,.065,.018],.009),e}function kv(r){const e=new Map,t=new Map,n=r.clone();return Uu(r,n,function(i,s){e.set(s,i),t.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const s=i,a=e.get(i),o=a.skeleton.bones;s.skeleton=a.skeleton.clone(),s.bindMatrix.copy(a.bindMatrix),s.skeleton.bones=o.map(function(l){return t.get(l)}),s.bind(s.skeleton,s.bindMatrix)}),n}function Uu(r,e,t){t(r,e);for(let n=0;n<r.children.length;n++)Uu(r.children[n],e.children[n],t)}const Bs=.3,pl=.6,Fu=1.55,Vv=pl*Fu/Bs,ml=new I(-Math.sin(Kr),0,Math.cos(Kr)),Hv=new I(ml.z,0,-ml.x),Gv=r=>r*r*(3-2*r);function Wv(r){const e=(r%1+1)%1;if(e<Bs)return{offset:pl*(.5-e/Bs)-.14,lift:0,contact:!0};const t=(e-Bs)/(1-Bs);return{offset:pl*(Gv(t)-.5)-.14,lift:.14*Math.sin(Math.PI*t)**2,contact:!1}}function Xv(r,e,t,n,i,s){const a=r.getWorldPosition(new I),o=e.getWorldPosition(new I),l=t.getWorldPosition(new I),c=a.distanceTo(o),h=o.distanceTo(l),u=n.clone().sub(a),d=qt.clamp(u.length(),Math.abs(c-h)+.001,c+h-.001);u.normalize();const f=s.clone().addScaledVector(u,-s.dot(u)).normalize(),m=(c*c-h*h+d*d)/(2*d),x=a.clone().addScaledVector(u,m).addScaledVector(f,Math.sqrt(Math.max(0,c*c-m*m)));function g(p,v,y){const M=p.getWorldPosition(new I),R=v.getWorldPosition(new I).sub(M).normalize(),E=y.clone().sub(M).normalize(),P=new ut().setFromUnitVectors(R,E).multiply(p.getWorldQuaternion(new ut));p.quaternion.copy(p.parent.getWorldQuaternion(new ut).invert().multiply(P)),p.updateWorldMatrix(!1,!0)}g(r,e,x),g(e,t,a.clone().addScaledVector(u,d)),t.quaternion.copy(t.parent.getWorldQuaternion(new ut).invert().multiply(i)),t.updateWorldMatrix(!1,!0)}function qv(r,e){const t=kv(r);t.position.set(0,0,0),t.quaternion.identity(),t.scale.setScalar(1),t.updateMatrixWorld(!0);const n=new Map;t.traverse(c=>{c.isBone&&n.set(c.name.replaceAll(".",""),c)});for(const c of["Root","FrontUpperL","FrontLowerL","FrontFootL","FrontUpperR","FrontLowerR","FrontFootR","HindUpperL","HindStumpL","HindUpperR","HindStumpR"])if(!n.has(c))throw new Error(`Roary gait requires existing joint ${c}`);const i=new Map([...n.values()].map(c=>[c,{p:c.position.clone(),q:c.quaternion.clone(),s:c.scale.clone()}])),s={};for(const c of["L","R"]){const h=n.get("FrontUpper"+c),u=n.get("FrontLower"+c),d=n.get("FrontFoot"+c),f=h.getWorldPosition(new I),m=u.getWorldPosition(new I),x=d.getWorldPosition(new I),g=x.clone().sub(f).normalize(),p=m.clone().sub(f);p.addScaledVector(g,-p.dot(g)).normalize(),s[c]={upper:h,lower:u,foot:d,point:x,q:d.getWorldQuaternion(new ut),bend:p}}const a=Array.from({length:121},(c,h)=>h/120),o=new Map;for(const c of e.tracks)o.set(c.name,[]);function l(c,h){const u=n.get(c);if(!u)return;const d=new ut().setFromAxisAngle(Hv,h).multiply(u.getWorldQuaternion(new ut));u.quaternion.copy(u.parent.getWorldQuaternion(new ut).invert().multiply(d)),u.updateWorldMatrix(!1,!0)}for(const c of a){for(const[h,u]of i)h.position.copy(u.p),h.quaternion.copy(u.q),h.scale.copy(u.s);n.get("Root").position.y-=.11,t.updateMatrixWorld(!0),l("HindUpperL",-.13+.16*Math.sin(c*Math.PI*2+.55)),l("HindStumpL",.2+.09*Math.sin(c*Math.PI*2+1.1)),l("HindUpperR",.43*Math.sin(c*Math.PI*2+Math.PI*.8)),l("HindStumpR",-.27*Math.sin(c*Math.PI*2+Math.PI*.8));for(const[h,u]of[["L",0],["R",.47]]){const d=s[h],f=Wv(c+u),m=d.point.clone().addScaledVector(ml,f.offset);m.y+=f.lift,Xv(d.upper,d.lower,d.foot,m,d.q,d.bend)}for(const h of e.tracks){const[u,d]=h.name.split("."),f=n.get(u.replaceAll(".",""));if(!f)throw new Error(`Unbound gait track ${h.name}`);o.get(h.name).push(...f[d].toArray())}}return new Qs("Run",1,e.tracks.map(c=>new c.constructor(c.name,a,o.get(c.name),Pi)))}const oi=r=>(r=Math.max(0,Math.min(1,r)),r*r*(3-2*r)),Ah=["Idle","Run","Carry","RunCarry"];function jv(r,e){const t=new Map(r.map(h=>[h.name,h]));for(const h of["Idle","Run","Carry","Serve"])if(!t.has(h))throw new Error(`Missing Roary clip: ${h}`);e&&t.set("Run",qv(e,t.get("Idle")));const n=new Map([...t].map(([h,u])=>[h,new Map(u.tracks.map(d=>[d.name,d.createInterpolant()]))])),i=(h,u,d)=>Array.from(n.get(h).get(u).evaluate(d));function s(h,u,d,f){return f?new ut().fromArray(h).slerp(new ut().fromArray(u),d).toArray():h.map((m,x)=>qt.lerp(m,u[x],d))}function a(h,u,d){const f=Math.ceil(u*60),m=Array.from({length:f+1},(p,v)=>v*u/f),x=t.get("Idle").tracks.map(p=>{const v=m.flatMap(y=>d(p,y/u,i,s));return new p.constructor(p.name,m,v,Pi)}),g=new Qs(h,u,x);return t.set(h,g),g}const o=h=>/Front(Upper|Lower|Foot)[._]?L|Head|Neck|Spine/.test(h.name),l=h=>h.ValueTypeName==="quaternion";a("RunCarry",t.get("Run").duration,(h,u,d,f)=>{const m=d("Run",h.name,u*t.get("Run").duration),x=/Front/.test(h.name)?.15:.8;return o(h)?f(m,d("Carry",h.name,u*t.get("Carry").duration),x,l(h)):m}),a("Pickup",.58,(h,u,d,f)=>{const m=d("Idle",h.name,0),x=d("Carry",h.name,0),g=d("Serve",h.name,t.get("Serve").duration*.5);return u<.58?f(m,g,oi(u/.58),l(h)):f(g,x,oi((u-.58)/.42),l(h))});const c=t.get("Serve");return a("ServeSmooth",.72,(h,u,d)=>{let f;return u<.22?f=.06*oi(u/.22):u<.64?f=.06+.55*oi((u-.22)/.42):f=.61+.39*oi((u-.64)/.36),d("Serve",h.name,f*c.duration)}),a("Recover",.34,(h,u,d,f)=>f(d("Carry",h.name,0),d("Idle",h.name,0),oi(u),l(h))),a("Start",.24,(h,u,d,f)=>f(d("Idle",h.name,0),d("Run",h.name,u*.24),oi(u),l(h))),a("Stop",.3,(h,u,d,f)=>f(d("Run",h.name,u*.3),d("Idle",h.name,0),oi(u),l(h))),t.delete("Serve"),[...t.values()]}class Yv{constructor(e,t){this.mixer=new W0(e),this.actions=new Map,this.weights=new Map;for(const n of jv(t,e)){const i=this.mixer.clipAction(n);i.setLoop(Ah.includes(n.name)?Kh:Yh,Ah.includes(n.name)?1/0:1),i.clampWhenFinished=!0,i.setEffectiveWeight(0).play(),this.actions.set(n.name,i),this.weights.set(n.name,0)}this.weights.set("Idle",1),this.actions.get("Idle").setEffectiveWeight(1),this.motion=0,this.carry=0,this.gesture=null,this.state="Idle",this.gaitPhase=0}trigger(e){const t=this.actions.get(e);t&&(t.reset().setEffectiveTimeScale(1).play(),this.gesture={name:e,age:0,duration:t.getClip().duration})}update(e,{moving:t=!1,distance:n,held:i=!1,intro:s=!1}={}){if(e<=0)return;s&&(this.gesture=null,t=!1,i=!1);const a=s?0:Math.max(0,Number.isFinite(n)?n:t?8.2*e:0);t=a>1e-6,this.gaitPhase=(this.gaitPhase+a/Vv)%1,this.motion=qt.damp(this.motion,t?1:0,t?26:18,e),this.carry=qt.damp(this.carry,i?1:0,10,e);const o=this.motion,l=this.carry,c={Idle:(1-o)*(1-l),Carry:(1-o)*l,Run:o*(1-l),RunCarry:o*l};if(this.gesture){const d=this.gesture;if(d.age+=e,d.age>=d.duration&&(this.gesture=null,d.name==="ServeSmooth"&&!i&&this.trigger("Recover")),this.gesture){const f=this.gesture,m=t&&!["Start","Stop"].includes(f.name)?.4:1;for(const x of Object.keys(c))c[x]*=1-m;c[f.name]=m}}let h=0;for(const[d,f]of this.weights){const m=qt.damp(f,c[d]||0,14,e);this.weights.set(d,m),h+=m}let u=0;for(const[d,f]of this.weights)this.actions.get(d).setEffectiveWeight(f/h),f>u&&(u=f,this.state=d);for(const d of["Run","RunCarry"]){const f=this.actions.get(d);f.setEffectiveTimeScale(0),f.time=this.gaitPhase*f.getClip().duration}this.mixer.update(e)}}const Or=(r,e,t)=>{const n=qt.clamp((t-r)/(e-r),0,1);return n*n*(3-2*n)};function Kv(r){const e=r.clone(),t=e.attributes.position,n=new Float32Array(t.count*3),i=t.clone(),s=.835,a=.605,o=.2,l=Math.cos(o),c=Math.sin(o);let h=0,u=0;for(let v=0;v<t.count;v++){const y=t.getX(v),M=t.getY(v),R=t.getZ(v),E=Or(.59,.72,R)*Or(.69,.75,M)*(1-Or(.805,.85,M))*(1-Or(.22,.3,Math.abs(y-.015)));if(E<=0)continue;const P=M-s,N=R-a,T=(P*l-N*c-P)*E,b=(P*c+N*l-N)*E;n[v*3+1]=T,n[v*3+2]=b,i.setXYZ(v,y,M+T,R+b),h++,u=Math.max(u,Math.hypot(T,b))}const d=e.clone();d.setAttribute("position",i),d.computeVertexNormals();const f=new Float32Array(n.length),m=e.attributes.normal,x=d.attributes.normal;for(let v=0;v<t.count;v++)(n[v*3+1]!==0||n[v*3+2]!==0)&&(f[v*3]=x.getX(v)-m.getX(v),f[v*3+1]=x.getY(v)-m.getY(v),f[v*3+2]=x.getZ(v)-m.getZ(v));d.dispose();const g=new vt(n,3);g.name="RoarySpeechJaw";const p=new vt(f,3);return p.name="RoarySpeechJaw",e.morphTargetsRelative=!0,e.morphAttributes.position=[g],e.morphAttributes.normal=[p],e.computeBoundingBox(),e.computeBoundingSphere(),e.userData.speechJaw={affected:h,maxDisplacement:u},e}class $v{constructor(e){this.meshes=[],this.open=0,e.traverse(t=>{!t.isSkinnedMesh||!t.skeleton.bones.some(n=>n.name==="Head")||t.name.includes("Meshy")&&(t.geometry=Kv(t.geometry),t.updateMorphTargets(),this.meshes.push(t))})}update(e,t,n=!0){n?this.open=qt.damp(this.open,qt.clamp(e||0,0,1),e>this.open?32:24,t):this.open=0;for(const i of this.meshes)i.morphTargetInfluences[0]=this.open;return this.open}}const gl=new I(.526,0,.851).normalize(),Zv=Math.atan2(gl.x,gl.z);function Jv(r,e){return Math.atan2(e.x-r.x,e.z-r.z)-Zv}class Qv{constructor(e){if(this.root=e,this.time=0,this.blend=0,this.energy=0,this.gazeAlignment=1,this.bones=new Map,e.traverse(n=>{n.isBone&&this.bones.set(n.name.replaceAll(".",""),n)}),this.head=this.bones.get("Head"),this.saved=[],!this.head)return;e.updateMatrixWorld(!0);const t=this.head.getWorldQuaternion(new ut).invert();this.forwardLocal=gl.clone().applyQuaternion(e.getWorldQuaternion(new ut)).applyQuaternion(t),this.eyeLocal=this.head.worldToLocal(new I(-.08,1.01,.65).applyMatrix4(e.matrixWorld)),this.forward=new I,this.eye=new I,this.target=new I,this.headWorld=new ut,this.parentWorld=new ut,this.correction=new ut,this.wanted=new ut,this.identity=new ut,this.offset=new ut}restore(){for(const{bone:e,quaternion:t}of this.saved)e.quaternion.copy(t);this.saved=[]}save(e){e&&!this.saved.some(t=>t.bone===e)&&this.saved.push({bone:e,quaternion:e.quaternion.clone()})}offsetBone(e,t,n,i){const s=this.bones.get(e);s&&(this.save(s),this.offset.setFromEuler(new an(t,n,i)),s.quaternion.multiply(this.offset))}update(e,t,{enabled:n=!1,speech:i=0}={}){if(!this.head)return;if(this.time+=Math.max(0,t),this.blend=qt.damp(this.blend,n?1:0,n?5:10,t),this.energy=qt.damp(this.energy,i||0,7,t),this.blend<1e-4){this.blend=0,this.gazeAlignment=1;return}const s=this.time,a=this.blend,o=this.energy;this.offsetBone("Spine",.006*Math.sin(s*1.7)*a,0,.01*Math.sin(s*.85)*a),this.offsetBone("Neck",.012*Math.sin(s*1.5+.6)*a,0,.008*Math.sin(s*.93)*a),this.offsetBone("EarL",.012*Math.sin(s*2.1)*a,.018*o*Math.sin(s*4.4)*a,0),this.offsetBone("EarR",-.01*Math.sin(s*1.8+.8)*a,-.014*o*Math.sin(s*4+.5)*a,0),this.root.updateMatrixWorld(!0),this.save(this.head),this.head.getWorldQuaternion(this.headWorld),this.forward.copy(this.forwardLocal).applyQuaternion(this.headWorld).normalize(),this.eye.copy(this.eyeLocal),this.head.localToWorld(this.eye),this.target.copy(e).sub(this.eye).normalize(),this.correction.setFromUnitVectors(this.forward,this.target);const l=this.identity.angleTo(this.correction);l>.7&&this.correction.slerpQuaternions(this.identity,this.correction,.7/l),this.wanted.copy(this.correction).multiply(this.headWorld),this.head.parent.getWorldQuaternion(this.parentWorld).invert(),this.wanted.premultiply(this.parentWorld),this.head.quaternion.slerp(this.wanted,a);const c=(.012*Math.sin(s*1.9)+o*.025*Math.sin(s*3.5+.4))*a,h=(.018*Math.sin(s*.82+.3)+o*.012*Math.sin(s*1.7))*a;this.offset.setFromEuler(new an(c,0,h)),this.head.quaternion.multiply(this.offset),this.root.updateMatrixWorld(!0),this.head.getWorldQuaternion(this.headWorld),this.forward.copy(this.forwardLocal).applyQuaternion(this.headWorld).normalize(),this.eye.copy(this.eyeLocal),this.head.localToWorld(this.eye),this.target.copy(e).sub(this.eye).normalize(),this.gazeAlignment=this.forward.dot(this.target)}}const e1=`
varying vec2 vUv;varying vec3 vNormal,vViewPosition;
void main(){
  vUv=uv;vNormal=normalMatrix*normal;
  vec4 viewPosition=modelViewMatrix*vec4(position,1.0);
  vViewPosition=viewPosition.xyz;gl_Position=projectionMatrix*viewPosition;
}
`,t1=`
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
}
float cloud(vec2 p){return .57*noise(p)+.29*noise(p*2.03)+.14*noise(p*4.07);}
`;function co(r,e,t=!1){return new Et({uniforms:{time:{value:0},tint:{value:new Ne(r)},opacity:{value:e}},vertexShader:e1,fragmentShader:`
      uniform float time,opacity;uniform vec3 tint;varying vec2 vUv;varying vec3 vNormal,vViewPosition;
      ${t1}
      void main(){
        vec2 p=vUv;
        float n=cloud(p*vec2(4.0,3.0)+vec2(time*.035,-time*.065));
        ${t?`
          // Feather the silhouette in view space; no hard triangular cone edge
          // or visible UV seam as the camera moves from intro to gameplay.
          float edge=smoothstep(.02,.75,abs(dot(normalize(vNormal),normalize(-vViewPosition))));
          float ends=smoothstep(0.0,.22,p.y)*(1.0-smoothstep(.78,1.0,p.y));
          float a=opacity*edge*ends*(.65+.35*n);
        `:`
          float edge=1.0-smoothstep(.18,.5,length((p-.5)*vec2(1.0,.85)));
          float a=opacity*edge*smoothstep(.23,.78,n);
        `}
        gl_FragColor=vec4(tint,a);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,transparent:!0,depthWrite:!1,depthTest:!0,side:un,blending:wi})}class n1{constructor(e,{reducedMotion:t=!1}={}){this.group=new Lt,this.group.name="Kitchen atmosphere",e.add(this.group),this.time=0,this.reducedMotion=t,this.wisps=[],this.shafts=[],this.plane=new bn(1,1),this.cone=new ca(.3,1.25,3.05,32,1,!0);for(const n of[0,2])for(let i=0;i<3;i++){const s=co(13155742,.19),a=new _t(this.plane,s);this.group.add(a),this.wisps.push({mesh:a,steam:!0,lane:n,phase:i/3,seed:n*4+i})}for(let n=0;n<5;n++){const i=co(n%2?11847116:13220767,.065),s=new _t(this.plane,i);s.position.set(-1+n*2.4,2.8+n%2*.35,-4.7),s.scale.set(5.5,2.4,1),this.group.add(s),this.wisps.push({mesh:s,steam:!1,seed:n+10})}for(let n=0;n<3;n++){const i=new _t(this.cone,co(14991499,.035,!0));i.position.set(n===0?7.4:3.2,2.2,Wt[n]),this.group.add(i),this.shafts.push(i)}this.setQuality("high")}setQuality(e){this.quality=e,this.wisps.forEach((t,n)=>{t.mesh.visible=e==="high"||(t.steam?n%3===0:n%2===0)})}update(e,t){this.reducedMotion||(this.time+=Math.max(0,Math.min(e,.1)));for(const n of this.wisps){if(n.mesh.quaternion.copy(t.quaternion),n.mesh.material.uniforms.time.value=this.time+n.seed*7,!n.steam)continue;const i=(this.time*.16+n.phase)%1,s=Math.sin(Math.PI*i)**2;n.mesh.position.set(-5.35+.17*Math.sin(i*5+n.seed),1.32+i*1.05,Wt[n.lane]+.12*Math.sin(i*4+n.seed)),n.mesh.scale.set(.55+i*.65,.65+i*.9,1),n.mesh.material.uniforms.opacity.value=.19*s}for(const n of this.shafts)n.material.uniforms.time.value=this.time}dispose(){this.group.removeFromParent();for(const{mesh:e}of this.wisps)e.material.dispose();for(const e of this.shafts)e.material.dispose();this.plane.dispose(),this.cone.dispose()}}function i1(r,e=4){r.updateMatrixWorld(!0);const t=r.matrixWorld.clone().invert(),n=new Map,i=new I;let s=0;r.traverse(l=>{if(!l.isMesh)return;s++;for(let u=l;u;u=u.parent)if(!u.visible)return;if(l.isInstancedMesh||l.isSkinnedMesh||Array.isArray(l.material)||l.material.transparent||Object.keys(l.geometry.morphAttributes).length||Object.hasOwn(l,"onBeforeRender")||l.geometry.drawRange.start!==0||l.geometry.drawRange.count!==1/0||l.matrixWorld.determinant()<0)return;l.getWorldPosition(i).applyMatrix4(t);const c=Object.entries(l.geometry.attributes).map(([u,d])=>`${u}:${d.itemSize}:${d.normalized}:${d.array.constructor.name}`).sort().join("|"),h=[l.material.uuid,l.castShadow,l.receiveShadow,l.renderOrder,l.layers.mask,Math.floor(i.x/e),Math.floor(i.z/e),c].join("/");n.has(h)||n.set(h,[]),n.get(h).push(l)});let a=0,o=0;for(const l of n.values()){if(l.length<2)continue;const c=l.map(f=>{const m=f.geometry.index?f.geometry.toNonIndexed():f.geometry.clone();return m.applyMatrix4(new Ge().multiplyMatrices(t,f.matrixWorld)),m}),h=L_(c,!1);for(const f of c)f.dispose();if(!h)continue;h.computeBoundingBox(),h.computeBoundingSphere();const u=l[0],d=new _t(h,u.material);d.name="Static room batch",d.castShadow=u.castShadow,d.receiveShadow=u.receiveShadow,d.renderOrder=u.renderOrder,d.layers.mask=u.layers.mask,r.add(d);for(const f of l)f.removeFromParent();a+=l.length,o++}return r.updateMatrixWorld(!0),r.traverse(l=>{l.matrixAutoUpdate=!1,l.matrixWorldAutoUpdate=!1}),{originalMeshes:s,mergedMeshes:a,batches:o,resultMeshes:s-a+o}}const Br={auto:"Automatisch",high:"Hoch",standard:"Standard",low:"Sparsam"};function s1(r){return r==="low"?{pixelRatio:.75,shadow:512,secondaryShadow:256,post:!1}:r==="standard"?{pixelRatio:1,shadow:1024,secondaryShadow:512,post:!1}:{pixelRatio:1.6,shadow:2048,secondaryShadow:1024,post:!0}}class r1{constructor({cores:e=8,memory:t=8}={}){this.initial=e<=4||t<=4?"standard":"high",this.reset()}reset(){this.level=this.initial,this.warmup=0,this.samples=[],this.cooldown=0}sample(e,{active:t=!0,visible:n=!0}={}){if(!t||!n)return this.samples=[],null;if(!Number.isFinite(e)||e<=0||e>.25||(this.warmup+=e,this.cooldown=Math.max(0,this.cooldown-e),this.warmup<8||this.cooldown>0||this.level==="low")||(this.samples.push(e),this.samples.reduce((a,o)=>a+o,0)<3))return null;const i=[...this.samples].sort((a,o)=>a-o),s=i[Math.floor(i.length/2)];return this.samples=[],s>(this.level==="high"?.025:.032)?(this.level=this.level==="high"?"standard":"low",this.cooldown=8,this.level):null}}const Rh=(r,e,t)=>r+Math.atan2(Math.sin(e-r),Math.cos(e-r))*t;class a1{constructor(e,{onProgress:t,onReady:n,onError:i,quality:s="high"}){this.container=e,this.time=0,this.quality=s,this.adaptive=new r1({cores:navigator.hardwareConcurrency||8,memory:navigator.deviceMemory||8}),this.needsRender=!0,this.renderedFrames=0,this.scratch={project:new I,gameTarget:new I,gameOffset:new I,menuTarget:new I,menuPosition:new I,target:new I,pickup:new I,color:new Ne},this.customerObjects=new Map,this.projectileObjects=new Map,this.floating=[],this.roary=null,this.actions=new Map,this.currentAction=null,this.heldType=null,this.pickupAge=5,this.throwAge=5,this.flash=[0,0,0],this.scene=new ou,this.scene.background=new Ne("#1a1c1b"),this.scene.fog=new Il("#202522",23,57),this.renderer=new I_({antialias:!1,powerPreference:"high-performance"}),this.renderer.outputColorSpace=gt,this.renderer.toneMapping=vl,this.renderer.toneMappingExposure=1.1,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Lh,this.renderer.shadowMap.autoUpdate=!1,this.renderer.domElement.setAttribute("aria-label","Roarys Fast-Food-Restaurant mit drei Theken"),e.prepend(this.renderer.domElement),this.camera=new Gt(47,1,.1,100),this.camera.position.set(1.2,16,20),this.cameraTarget=new I(-4.6,.9,-.2),this.menuBlend=1,this.halfHeight=5,this.camera.lookAt(this.cameraTarget),this.scene.add(new E0(14276038,3486764,.52)),this.sun=new ll(13031140,1.9),this.sun.position.set(-7,10,-4),this.sun.target.position.set(-1,.4,1),this.sun.castShadow=!0,this.sun.shadow.camera.left=this.sun.shadow.camera.bottom=-13,this.sun.shadow.camera.right=this.sun.shadow.camera.top=13,this.sun.shadow.camera.near=1,this.sun.shadow.camera.far=45,this.sun.shadow.normalBias=.012,this.sun.shadow.bias=-15e-5,this.sun.shadow.intensity=.76,this.scene.add(this.sun,this.sun.target);const a=new ll(16766373,.38);a.position.set(0,4,9),this.scene.add(a);const o=new ia(16764564,55,15,Math.PI*.32,.9,2);o.position.set(-4,4.8,3.6),o.target.position.set(-3.35,.5,-.5),this.scene.add(o,o.target);const l=new pv,c=new cl(this.renderer);this.scene.environment=c.fromScene(l,.04).texture,this.scene.environmentIntensity=.24,l.dispose(),c.dispose(),this.restaurant=Ov(this.scene),this.staticBatching=i1(this.restaurant.world),this.atmosphere=new n1(this.scene,{reducedMotion:window.matchMedia("(prefers-reduced-motion: reduce)").matches}),this.restaurant.ready.catch(i),this.composer=new vv(this.renderer),this.composer.addPass(new yv(this.scene,this.camera)),this.aoPass=new Ln(this.scene,this.camera,512,512,void 0,{radius:.38,thickness:.24,distanceFallOff:1.1,samples:8},{radius:5,samples:8}),this.aoPass.blendIntensity=.6,this.composer.addPass(this.aoPass),this.bloomPass=new gs(new ae(512,512),.16,.35,1.6),this.composer.addPass(this.bloomPass),this.composer.addPass(new wv),this.fxaaPass=new fl(Av),this.composer.addPass(this.fxaaPass),this.gradePass=new fl({uniforms:{tDiffuse:{value:null}},vertexShader:"varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",fragmentShader:"uniform sampler2D tDiffuse;varying vec2 vUv;void main(){vec4 c=texture2D(tDiffuse,vUv);float l=dot(c.rgb,vec3(.2126,.7152,.0722));vec3 rgb=mix(vec3(l),c.rgb,.96);vec2 q=vUv-.5;rgb*=1.0-.12*dot(q,q)*2.0;gl_FragColor=vec4(rgb,c.a);}"}),this.composer.addPass(this.gradePass),this.heldGroup=wh(),this.heldGroup.visible=!1,this.scene.add(this.heldGroup),this.footWorld=new I,this.particles=[];const h=new On({vertexColors:!0});this.particleMesh=new la(new di(.055,.055,.025),h,120),this.particleMesh.instanceMatrix.setUsage(Pd),this.particleMesh.frustumCulled=!1,this.particleMesh.count=0,this.scene.add(this.particleMesh),this.dummy=new mt,this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),this.setQuality(s),this.resize(),new D_().load(Cv.url,u=>{this.roary=u.scene,this.roary.position.set(-3.35,.515,0),this.roary.rotation.y=.45,this.roary.scale.setScalar(Fu),this.roary.traverse(d=>{if(!d.isMesh)return;d.castShadow=d.receiveShadow=!0;const f=Array.isArray(d.material)?d.material:[d.material];for(const m of f)m.map&&(m.map.anisotropy=Math.min(8,this.renderer.capabilities.getMaxAnisotropy()))}),this.scene.add(this.roary),this.animator=new Yv(this.roary,u.animations),this.speechIdle=new Qv(this.roary),this.mouth=new $v(this.roary),this.actions=this.animator.actions,this.carryBone=this.roary.getObjectByName("FrontFootL")||this.roary.getObjectByName("FrontFoot.L"),this.carryBone||this.roary.traverse(d=>{d.isBone&&/FrontFoot.?L/.test(d.name)&&(this.carryBone=d)}),this.restaurant.ready.then(()=>n({animations:[...this.actions.keys()],skin:!!this.carryBone}),i)},u=>t(u.total?u.loaded/u.total:null),i)}get heading(){return this.roary?this.roary.rotation.y-Kr:0}setQuality(e){this.quality=e,e==="auto"&&this.adaptive.reset(),this.applyQuality(e==="auto"?this.adaptive.level:e)}applyQuality(e){this.effectiveQuality=e,this.needsRender=!0;const t=s1(e);this.atmosphere?.setQuality(e),this.renderer.setPixelRatio(Math.min(devicePixelRatio,t.pixelRatio));const n=t.shadow;this.sun.shadow.mapSize.set(n,n),this.sun.shadow.map&&(this.sun.shadow.map.dispose(),this.sun.shadow.map=null),this.aoPass&&(this.aoPass.enabled=t.post),this.bloomPass&&(this.bloomPass.enabled=t.post);for(const i of this.restaurant?.shadowLights||[])i.castShadow=!0,i.shadow.mapSize.set(t.secondaryShadow,t.secondaryShadow),i.shadow.map&&(i.shadow.map.dispose(),i.shadow.map=null);this.composer?.setPixelRatio(this.renderer.getPixelRatio()),this.resize()}resize(){this.needsRender=!0,this.width=Math.max(1,this.container.clientWidth),this.height=Math.max(1,this.container.clientHeight),this.renderer.setSize(this.width,this.height),this.aspect=this.width/this.height,this.composer?.setSize(this.width,this.height),this.aoPass?.setSize(Math.round(this.width*.75),Math.round(this.height*.75)),this.fxaaPass?.material.uniforms.resolution.value.set(1/(this.width*this.renderer.getPixelRatio()),1/(this.height*this.renderer.getPixelRatio()))}event(e){e.type==="pickup"&&(this.pickupAge=0,this.flash[e.lane]=1,this.animator?.trigger("Pickup")),e.type==="throw"&&(this.throwAge=0,this.animator?.trigger("ServeSmooth")),(e.type==="served"||e.type==="partial")&&this.burst(e.x,Wt[e.lane],Os.burger),(e.type==="wrong"||e.type==="miss")&&(this.flash[e.lane]=-1,this.burst(-1,Wt[e.lane],15562845,6))}burst(e,t,n,i=16){for(let s=0;s<i;s++)this.particles.push({x:e,y:1.7,z:t,age:0,life:.65+Math.random()*.4,vx:(Math.random()-.5)*2,vy:1.5+Math.random()*1.5,vz:(Math.random()-.5)*1.7,color:n,spin:Math.random()*6});this.particles=this.particles.slice(-120)}project(e,t,n){const i=this.scratch.project.set(e,t,n).project(this.camera);return{x:(i.x*.5+.5)*this.width,y:(-i.y*.5+.5)*this.height,visible:i.z<1&&i.z>-1}}update(e,t,n=0){const s=e.phase==="paused"?0:t;this.time+=s,this.pickupAge+=s,this.throwAge+=s;const a=e.phase==="menu"||e.phase==="intro";this.menuBlend=qt.damp(this.menuBlend,a?1:0,5,t),Math.abs(this.menuBlend-(a?1:0))<1e-4&&(this.menuBlend=a?1:0);const o=this.width<700,l=qt.lerp(47,o?43:38,this.menuBlend);(this.camera.aspect!==this.aspect||this.camera.fov!==l)&&(this.camera.aspect=this.aspect,this.camera.fov=l,this.camera.updateProjectionMatrix());const c=o?1:Math.max(1,1.55/this.aspect),{gameTarget:h,gameOffset:u,menuTarget:d,menuPosition:f,target:m}=this.scratch;if(h.set(o?-1.8:.8,.9,-.6),o?u.set(-4.8,5,11.5):u.set(-7.2,5.4,11.2),u.multiplyScalar(c),d.set(o?-3.35:-4.75,o?1.6:1.4,0),f.set(-3.1,o?2.55:2.35,o?5.9:5.2),m.copy(h).lerp(d,this.menuBlend),this.camera.position.copy(h).add(u).lerp(f,this.menuBlend),this.camera.lookAt(m),this.camera.updateMatrixWorld(),this.roary){const v=!a&&e.phase==="playing"&&this.lastPlayerZ!==void 0?Math.abs(e.player.z-this.lastPlayerZ):0;this.lastPlayerZ=e.player.z,this.roary.position.z=a?qt.damp(this.roary.position.z,0,24,s):e.player.z;const y=a?Jv(this.roary.position,this.camera.position)+.012*Math.sin(this.time*.85):e.player.facing+Kr;this.roary.rotation.y=a?Rh(this.roary.rotation.y,y,1-Math.exp(-s*7)):y,this.renderer.domElement.dataset.facing=e.player.facing.toFixed(3),this.speechIdle.restore(),this.animator.update(s,{distance:v,held:!!e.player.held,intro:a}),this.renderer.domElement.dataset.gaitPhase=this.animator.gaitPhase.toFixed(4),this.renderer.domElement.dataset.travelDistance=v.toFixed(4),this.speechIdle.update(this.camera.position,s,{enabled:a,speech:n}),this.renderer.domElement.dataset.gazeAlignment=this.speechIdle.gazeAlignment.toFixed(4);const M=this.mouth.update(n,s,e.phase==="intro");if(this.renderer.domElement.dataset.mouthOpen=M.toFixed(3),this.renderer.domElement.dataset.animation=this.animator.state,this.roary.updateMatrixWorld(!0),this.heldGroup.visible=!!e.player.held&&!a,this.heldType!==e.player.held&&(this.heldFood&&this.heldGroup.remove(this.heldFood),this.heldFood=e.player.held?Ws(e.player.held):null,this.heldFood&&(this.heldFood.position.y=.035,this.heldFood.scale.setScalar(.8),this.heldGroup.add(this.heldFood)),this.heldType=e.player.held),this.heldGroup.visible){if(this.carryBone?this.carryBone.getWorldPosition(this.footWorld):this.footWorld.set(-3,.9,e.player.z),this.footWorld.y+=.14,this.footWorld.x+=.06,this.heldGroup.position.copy(this.footWorld),this.pickupAge<.28){const R=1-Math.pow(1-this.pickupAge/.28,3);this.heldGroup.position.lerpVectors(this.scratch.pickup.set(-5,1.4,Wt[e.player.lane]),this.footWorld,R)}this.heldGroup.rotation.y=.15*Math.sin(this.time*3)}}for(let v=0;v<3;v++){this.flash[v]=qt.damp(this.flash[v],0,3,s);const y=e.player.targetLane===v&&!a;this.restaurant.stationLights[v].emissiveIntensity=y?1.1:.25,this.restaurant.laneLights[v].emissiveIntensity=.25+(y?.65:0)+Math.abs(this.flash[v])*.7}const x=new Set(e.customers.map(v=>v.id));for(const[v,y]of this.customerObjects)x.has(v)||(this.scene.remove(y.group),this.customerObjects.delete(v));for(const v of e.customers){let y=this.customerObjects.get(v.id);y||(y=Bv(v.variant),this.customerObjects.set(v.id,y),this.scene.add(y.group));const M=y.group;M.position.set(v.x,.025,Wt[v.lane]-.91);const R=v.state!=="waiting";M.rotation.y=Rh(M.rotation.y,R?Math.PI/2:-Math.PI/2,Math.min(1,s*8));const E=Math.sin(v.age*(R?11:5));y.legL.rotation.x=E*(R?.35:.12),y.legR.rotation.x=-y.legL.rotation.x,y.armL.rotation.x=-E*.1,y.armR.rotation.x=E*.1,y.head.rotation.y=v.frustration&&v.response?Math.sin(this.time*16)*.13:Math.sin(v.age*1.4)*.04,v.state==="happy"?(y.armL.rotation.x=-1.8,y.armL.rotation.z=.2*Math.sin(v.age*12)):y.armL.rotation.z=0,M.scale.setScalar(Math.min(1,v.age*3))}const g=new Set(e.projectiles.map(v=>v.id));for(const[v,y]of this.projectileObjects)g.has(v)||(this.scene.remove(y),this.projectileObjects.delete(v));for(const v of e.projectiles){let y=this.projectileObjects.get(v.id);if(!y){y=wh();const M=Ws(v.food);M.scale.setScalar(.8),M.position.y=.035,y.add(M),this.projectileObjects.set(v.id,y),this.scene.add(y)}y.position.set(v.x,1.09+Math.max(0,.1*(1-v.age/.25)),Wt[v.lane]+.08),y.rotation.y=Math.sin(v.age*7)*.04}this.particles=this.particles.filter(v=>v.age<v.life);let p=0;for(const v of this.particles)v.age+=s,v.x+=v.vx*s,v.y+=v.vy*s,v.z+=v.vz*s,v.vy-=5*s,this.dummy.position.set(v.x,v.y,v.z),this.dummy.rotation.set(v.spin+v.age*7,v.age*4,0),this.dummy.scale.setScalar(Math.max(.01,1-v.age/v.life)),this.dummy.updateMatrix(),this.particleMesh.setMatrixAt(p,this.dummy.matrix),this.particleMesh.setColorAt(p,this.scratch.color.set(v.color)),p++;this.particleMesh.count=p,this.particleMesh.instanceMatrix.needsUpdate=!0,this.particleMesh.instanceColor&&(this.particleMesh.instanceColor.needsUpdate=!0),this.atmosphere.update(s,this.camera),this.renderer.shadowMap.needsUpdate=!0,this.composer.render(t),this.renderedFrames++,this.needsRender=!1}}function o1(r,e,t){return Math.abs(e)<t||Math.abs(e)<Math.abs(r)*1.5?null:{direction:e<0?-1:1,steps:Math.abs(e)>=t*2.4?2:1}}const ho=r=>!!r?.closest?.('button,a,input,select,textarea,[contenteditable="true"],[role="button"]');class l1{constructor({root:e,stage:t,game:n,onUnlock:i=()=>{},onMode:s=()=>{},windowTarget:a=window,documentTarget:o=document}){Object.assign(this,{root:e,stage:t,game:n,onUnlock:i,onMode:s,windowTarget:a,documentTarget:o}),this.pointers=new Map,this.listeners=[],this.listen(e,"pointerdown",l=>this.mode(l.pointerType),!0),this.listen(t,"pointerdown",l=>this.startScene(l));for(const l of[t])this.listen(l,"pointermove",c=>this.move(c)),this.listen(l,"pointerup",c=>this.end(c)),this.listen(l,"pointercancel",c=>this.cancel(c)),this.listen(l,"lostpointercapture",c=>this.cancel(c));for(const l of["resize","orientationchange","blur","pagehide"])this.listen(a,l,()=>this.reset(!0));a.visualViewport&&this.listen(a.visualViewport,"resize",()=>this.reset(!0)),this.listen(o,"visibilitychange",()=>{o.hidden&&this.reset(!0)}),this.listen(t,"contextmenu",l=>{ho(l.target)||l.preventDefault()}),this.listen(t,"selectstart",l=>{ho(l.target)||l.preventDefault()})}listen(e,t,n,i){e.addEventListener(t,n,i),this.listeners.push(()=>e.removeEventListener(t,n,i))}mode(e){this.onMode(e==="touch"?"touch":e==="pen"?"pen":"mouse")}capture(e,t,n){this.pointers.set(e.pointerId,{...n,element:t});try{t.setPointerCapture(e.pointerId)}catch{}}startScene(e){if(this.game.phase!=="playing"||ho(e.target)||e.button>0||e.pointerType!=="touch")return;this.onUnlock();const t=this.stage.getBoundingClientRect();if(e.preventDefault(),e.clientX>=t.left+t.width/2){if([...this.pointers.values()].some(n=>n.kind==="action"))return;this.capture(e,this.stage,{kind:"action"}),this.game.requestAction()}else{if([...this.pointers.values()].some(n=>n.kind==="swipe"))return;e.preventDefault(),this.capture(e,this.stage,{kind:"swipe",x:e.clientX,y:e.clientY,steps:0,direction:0,threshold:Math.max(32,Math.min(56,t.height*.12)),rejected:!1}),this.stage.dataset.swiping="true"}}move(e){const t=this.pointers.get(e.pointerId);if(!t||t.kind!=="swipe")return;if(e.preventDefault(),this.game.phase!=="playing"){this.reset();return}const n=e.clientX-t.x,i=e.clientY-t.y;if(!t.direction&&Math.abs(n)>=t.threshold&&Math.abs(n)>=Math.abs(i)*.8&&(t.rejected=!0),t.rejected)return;const s=o1(n,i,t.threshold);if(s&&!(t.direction&&t.direction!==s.direction))for(t.direction=s.direction;t.steps<s.steps;)this.game.move(t.direction),t.steps++}end(e){const t=this.pointers.get(e.pointerId);t&&(t.kind==="swipe"&&this.move(e),this.drop(e.pointerId))}cancel(e){this.pointers.has(e.pointerId)&&(this.drop(e.pointerId),this.game.player.pending=!1)}drop(e){const t=this.pointers.get(e);if(t){this.pointers.delete(e);try{t.element.hasPointerCapture?.(e)&&t.element.releasePointerCapture(e)}catch{}t.kind==="swipe"&&delete this.stage.dataset.swiping}}reset(e=!1){for(const t of[...this.pointers.keys()])this.drop(t);e&&(this.game.player.pending=!1)}destroy(){this.reset(!0),this.listeners.forEach(e=>e()),this.listeners=[]}}const Ou={intro:["Ich wollte mal etwas aus meinem Leben machen. Jetzt rieche ich nach Fritteuse und mein Chef nennt das Berufung. Bitte, hilf mir durch diese Schicht. Allein schaffe ich das nicht.","Mittagsansturm. Natürlich. Die anderen haben eine Mittagspause. Ich habe nur diese Theke und ein Leben auf Stand-by. Bitte lass mich hier nicht allein. Hilfst du mir noch einmal?","Noch eine Schicht. Ich bin so müde davon, jeden Tag freundlich zu tun, während mein Leben zwischen Burgern und Pommes vorbeizieht. Bitte hilf mir. Bring mich irgendwie bis zum Feierabend."],fehler:["Falsche Bestellung. Immerhin bin ich konsequent überfordert.","Das war keine Cola. Das war mein letzter Rest Konzentration.","Na wunderbar. Jetzt ist sogar der Burger enttäuscht von mir.","Bitte sag mir, dass das niemand gesehen hat."],kunde_weg:["Der darf einfach gehen. Beneidenswert.","Ein Kunde weniger. Leider zählt mein Chef anders.","Bleib wenigstens du noch hier. Bitte."],ansturm:["Oh gut. Eine Reisegruppe. Mein persönlicher Endgegner.","Drei Theken. Zwei Vorderpfoten. Wer hat das geplant?","Sie kommen alle gleichzeitig. Haben die sich gegen mich verabredet?"],zufall:["Ich rieche inzwischen auch im Traum nach Pommes.","Mitarbeiter des Monats. Wir sind übrigens nur zu zweit. Der andere ist die Fritteuse.","Mein Chef sagt, ich soll mehr lächeln. Das hier ist schon die Vollversion.","Früher habe ich von Freiheit geträumt. Heute von einer Sitzgelegenheit.","Falls du einen Ausgang siehst: Merk ihn dir. Für später."],erfolg:["Richtige Bestellung. Das sollten wir kurz würdigen.","Mit dir fühlt sich dieser Job fast erträglich an.","Danke. Allein hätte ich längst mit der Cola diskutiert."],feierabend:["Wir haben es geschafft. Bitte sag meinem Chef nicht, dass ich noch Energie übrig habe."],gameover:["Heute hat es nicht gereicht. Lass mich kurz durchatmen. Dann versuchen wir es noch mal. Zusammen."]},Bu=Object.entries(Ou).flatMap(([r,e])=>e.map((t,n)=>{const i=`${r}_${String(n+1).padStart(2,"0")}`;return{id:i,group:r,text:t,url:`./audio/voices/${i}.mp3`}})),uo=Ou.intro;class c1{constructor(e,{random:t=Math.random}={}){this.channel=e,this.random=t,this.phase="menu",this.shift=0,this.clock=0,this.lastByGroup=new Map,this.cooldowns=new Map,this.nextAllowed=0,this.nextRandom=40,this.rushWasHigh=!1,this.played={},this.dropped=0}stop(){this.channel.stop()}intro(e){return this.say("intro",{index:e,priority:100})}say(e,{index:t,priority:n=0}={}){if(!this.channel.enabled)return!1;if(n<100&&(this.channel.request||this.clock<this.nextAllowed||this.clock<(this.cooldowns.get(e)||0)))return this.dropped++,!1;const i=Bu.filter(l=>l.group===e),s=i.filter(l=>l.id!==this.lastByGroup.get(e)),a=Number.isInteger(t)?i[t]:(s.length?s:i)[Math.floor(this.random()*(s.length||i.length))];if(!a)return!1;this.lastByGroup.set(e,a.id),this.channel.playSample(a,{priority:n,shift:e==="intro"?t:void 0}),this.played[a.id]=(this.played[a.id]||0)+1,this.nextAllowed=this.clock+12;const o={fehler:18,kunde_weg:20,ansturm:40,erfolg:25,zufall:30}[e]||0;return this.cooldowns.set(e,this.clock+o),!0}sync(e,{visible:t=!0}={}){const n=t?e.phase:"paused",i=e.shift||0,s=e.elapsed||0;if((n!==this.phase||i!==this.shift||s<this.clock)&&(this.stop(),this.phase==="paused"&&n==="playing"&&i===this.shift||(this.cooldowns.clear(),this.nextAllowed=s+4,this.nextRandom=s+30+this.random()*20,this.rushWasHigh=!1),this.phase=n,this.shift=i,this.clock=s,n==="won"&&this.say("feierabend",{priority:100}),n==="lost"&&this.say("gameover",{priority:100})),this.clock=s,n!=="playing")return;const o=(e.customers||[]).filter(c=>c.state==="waiting"),l=o.length>=5&&new Set(o.map(c=>c.lane)).size>=2;l&&!this.rushWasHigh&&this.say("ansturm"),this.rushWasHigh=l,s>=this.nextRandom&&(this.nextRandom=s+30+this.random()*20,l||this.say("zufall"))}event(e){return this.phase!=="playing"||Number.isFinite(e.time)&&this.clock-e.time>.3?!1:["wrong","waste"].includes(e.type)?this.say("fehler"):e.type==="miss"?this.say("kunde_weg"):e.type==="served"&&((e.combo||0)>=3||this.random()<.28)?this.say("erfolg"):!1}}function zr(r,e=!1){return`<svg viewBox="0 0 32 34" ${e?'aria-hidden="true"':`role="img" aria-label="${Pn[r]}"`}>${{burger:'<path fill="#d99b48" stroke="#80572f" stroke-width="1.2" d="M5 14C5 3 27 3 27 14Z"/><path fill="#f5dc9d" d="m12 8 2 1-.4 1-2-.8zm7-1 2 1-.5 1-2-1zm3 4 2 .8-.5 1-2-.8z"/><path fill="#76a64c" d="m4 16 4-2 4 2 4-1 5 1 5-2 2 3-3 2H7Z"/><path fill="#643a25" d="M5 18h22v5H5z"/><path fill="#f6c146" d="m5 18 22 1-9 5-7-3z"/><path fill="#d99b48" stroke="#80572f" stroke-width="1.2" d="M5 24h22v3c-5 3-17 3-22 0z"/>',cola:'<path fill="none" stroke="#f6c35e" stroke-width="2.5" d="m19 11 2-9h6"/><path fill="#bc4938" stroke="#803a2f" stroke-width="1.2" d="m7 10 3 20h13l3-20z"/><path fill="#f7e8c9" stroke="#897955" stroke-width="1" d="M5 8h23v4H5z"/><path fill="none" stroke="#ffdb80" stroke-width="2" d="m11 17 2 6 3-4 3 4 2-6"/>',fries:'<path fill="#f4c253" stroke="#ac7d2e" stroke-width="1" d="m7 21-2-15 4-1 3 17zm6 0V2h4v19zm6 1 3-18 4 1-3 18zm-9 1L9 9h4l2 14zm8 0 1-13h4l-1 14z"/><path fill="#c34835" stroke="#883c2a" stroke-width="1.2" d="m5 17 4 14h15l4-14c-7 5-16 4-23 0z"/><path fill="none" stroke="#ffdc80" stroke-width="1.8" d="m11 23 1.5 4 3-3 2 3 2-4"/>'}[r]||""}</svg>`}const h1='<svg viewBox="0 0 36 28" aria-hidden="true"><path fill="none" stroke="#91aa95" stroke-width="1.6" d="m3 12 6 12h18l6-12zm4 6h22M7 8h22"/><path fill="#91aa95" d="M17 3h2v3h-2z"/></svg>',u1=r=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4Z"/>${r?'<path fill="none" stroke="currentColor" stroke-width="1.6" d="M16 8c3 2 3 6 0 8m3-11c5 4 5 10 0 14"/>':'<path fill="none" stroke="currentColor" stroke-width="1.8" d="m16 8 6 8m0-8-6 8"/>'}</svg>`,d1=r=>`<svg class="heart ${r?"":"empty"}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21 3 12C-3 5 7-2 12 5c5-7 15 0 9 7Z"/></svg>`,Ye=r=>document.getElementById(r),Ot=(r,e)=>{r.textContent!==String(e)&&(r.textContent=e)},kr={keyboard:"↑ ↓ oder W / S wechseln · 1 2 3 direkt · Leertaste: Aktion",mouse:"Tastatur: ↑ ↓ / W S wechseln · Leertaste: Aktion · Q: Ablegen",pen:"Tastatur oder Finger: links wischen · rechts tippen",touch:"Links ↑ ↓ wischen · lang: 2 Stationen · rechts tippen: Aktion"};function Ei(r,e){try{const t=localStorage.getItem(`roary.${r}`);return t===null?e:JSON.parse(t)}catch{return e}}function Mi(r,e){try{localStorage.setItem(`roary.${r}`,JSON.stringify(e))}catch{}}class f1{constructor(e,t){this.game=e,this.audio=t,this.ready=!1,this.progress=0,this.help=!1,this.best=Number(Ei("best",0))||0,this.quality=Ei("quality","auto"),Br[this.quality]||(this.quality="auto"),this.toastTime=0,this.toasts=[],this.floatScores=[],this.lastModalKey="",this.modal=Ye("modal-layer"),this.stage=Ye("game-stage"),this.root=Ye("game-app"),this.subtitle=document.createElement("div"),this.subtitle.id="voice-subtitle",this.subtitle.className="voice-subtitle",this.subtitle.hidden=!0,this.subtitle.setAttribute("role","status"),this.subtitle.setAttribute("aria-live","polite"),this.stage.append(this.subtitle),this.orderKeys=["","",""],this.orderBubbles=new Map,this.orderButtons=[...document.querySelectorAll(".order-card")],this.root.dataset.touchAvailable=String(navigator.maxTouchPoints>0||window.matchMedia("(any-pointer: coarse)").matches),this.inputPhase=e.phase,this.input=new l1({root:this.root,stage:this.stage,game:e,onUnlock:()=>this.audio.unlock(),onMode:n=>this.setInputMode(n)}),this.setInputMode("keyboard"),Ye("sound-button").addEventListener("click",()=>this.toggleSound()),Ye("help-button").addEventListener("click",()=>this.openHelp()),Ye("pause-button").addEventListener("click",()=>this.togglePause()),this.modal.addEventListener("click",n=>{const i=n.target.closest("[data-command]");!i||i.disabled||this.command(i.dataset.command)}),this.modal.addEventListener("input",n=>{if(n.target.id==="voice-volume"){this.audio.unlock(),this.audio.setVoiceVolume(Number(n.target.value)/100),Mi("voiceVolume",this.audio.speech.volume);const s=this.modal.querySelector("#voice-volume-value");s&&(s.textContent=`${Math.round(this.audio.speech.volume*100)} %`);return}if(n.target.id==="sfx-volume"){this.audio.setSfxVolume(Number(n.target.value)/100),Mi("sfxVolume",this.audio.sfx.volume);const s=this.modal.querySelector("#sfx-volume-value");s&&(s.textContent=`${Math.round(this.audio.sfx.volume*100)} %`);return}if(n.target.id!=="music-volume")return;this.audio.music.setVolume(Number(n.target.value)/100),Mi("musicVolume",this.audio.music.volume);const i=this.modal.querySelector("#music-volume-value");i&&(i.textContent=`${Math.round(this.audio.music.volume*100)} %`)}),document.addEventListener("keydown",n=>this.key(n)),document.addEventListener("visibilitychange",()=>{document.hidden&&(this.audio.stopSpeech(),this.game.phase==="playing"&&this.game.pause(),this.audio.syncMusic(this.game))}),window.addEventListener("pagehide",()=>this.audio.stopAll()),this.updateSound(),this.renderModal(!0)}bindView(e){this.view=e}setInputMode(e){if(this.root.dataset.input===e)return;this.root.dataset.input=e,Ot(Ye("input-hint"),kr[e]);const t=this.modal.querySelector(".menu-shortcuts");t&&Ot(t,kr[e])}setProgress(e){this.progress=e===null?0:Math.round(e*100);const t=this.modal.querySelector(".load-progress i");t&&(t.style.width=`${Math.max(2,this.progress)}%`);const n=this.modal.querySelector(".load-caption");n&&(n.textContent=this.progress>=100?"Küche wird vorbereitet …":`Roary kommt in die Küche … ${this.progress||""}${this.progress?" %":""}`)}setReady(){this.ready=!0,this.renderModal(!0)}setError(){this.modal.className="modal-layer",this.modal.innerHTML='<section class="dialog-card" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="eyebrow">KURZE KÜCHENPAUSE</div><h2 id="modal-title">Die Küche fehlt noch.</h2><p>Das 3D-Modell oder eine Restauranttextur konnte nicht geladen werden. Lade die Seite bitte erneut. Wenn du die Dateien lokal öffnest, starte zuerst den lokalen Webserver.</p><button class="primary-button" data-command="reload">Erneut laden</button></section>'}toggleSound(){this.audio.unlock(),this.audio.setEnabled(!this.audio.enabled),Mi("sound",this.audio.enabled),this.updateSound();const e=this.modal.querySelector('[data-command="sound"]');e&&(e.textContent=this.audio.enabled?"An":"Aus")}updateSound(){Ye("sound-button").innerHTML=u1(this.audio.enabled),Ye("sound-button").setAttribute("aria-label",this.audio.enabled?"Ton ausschalten":"Ton einschalten"),Ye("sound-button").setAttribute("aria-pressed",String(this.audio.enabled))}togglePause(){if(this.help){this.closeHelp();return}this.game.phase==="playing"?this.game.pause():this.game.phase==="paused"&&this.game.resume(),this.audio.syncMusic(this.game)}openHelp(){this.audio.stopSpeech(),this.helpFrom=this.game.phase,this.game.phase==="playing"&&this.game.pause(),this.help=!0,this.renderModal(!0),this.audio.syncMusic(this.game)}closeHelp(){this.help=!1,this.helpFrom==="playing"&&this.game.phase==="paused"&&this.game.resume(),this.renderModal(!0),this.audio.syncMusic(this.game)}command(e){if(this.audio.unlock(),["start","restart","next","begin","menu"].includes(e)&&this.audio.stopSpeech(),e==="start"||e==="restart"){if(!this.ready)return;this.help=!1,this.game.start(),this.stage.focus({preventScroll:!0})}else if(e==="resume")this.help=!1,this.game.resume(),this.stage.focus({preventScroll:!0});else if(e==="next")this.game.nextShift(),this.stage.focus({preventScroll:!0});else if(e==="begin")this.game.beginShift(this.view?.heading??0),this.stage.focus({preventScroll:!0});else if(e==="repeat-line")this.audio.speakIntro(this.game.shift,uo[this.game.shift]);else if(e==="help")this.openHelp();else if(e==="close-help")this.closeHelp();else if(e==="sound")this.toggleSound();else if(e==="voice"){this.audio.setVoiceEnabled(!this.audio.voiceEnabled),Mi("voiceEnabled",this.audio.voiceEnabled);const t=this.modal.querySelector('[data-command="voice"]');t&&(t.textContent=this.audio.voiceEnabled?"An":"Aus")}else if(e==="quality"){const t=Object.keys(Br);this.quality=t[(t.indexOf(this.quality)+1)%t.length],Mi("quality",this.quality),this.view?.setQuality(this.quality);const n=this.modal.querySelector('[data-command="quality"]');n&&(n.textContent=Br[this.quality])}else e==="menu"?(this.help=!1,this.game.reset("menu")):e==="reload"&&location.reload();this.renderModal(),this.audio.syncMusic(this.game),this.inputPhase!==this.game.phase&&(this.input.reset(),this.inputPhase=this.game.phase),["start","restart","next"].includes(e)&&this.game.phase==="intro"&&this.audio.speakIntro(this.game.shift,uo[this.game.shift])}key(e){const t=e.code;if(!(e.ctrlKey||e.metaKey||e.altKey||e.isComposing)&&!e.target?.closest?.('input,textarea,select,[contenteditable="true"]')){if(t==="Tab"||t==="Enter"){this.setInputMode("keyboard");return}if(["ArrowUp","ArrowDown","Space","KeyW","KeyS","Digit1","Digit2","Digit3","KeyQ","KeyP","Escape"].includes(t)&&(this.setInputMode("keyboard"),!(t==="Space"&&e.target?.closest?.("button,a")))){if(["ArrowUp","ArrowDown","Space","KeyW","KeyS","Digit1","Digit2","Digit3","KeyQ","KeyP","Escape"].includes(t))e.preventDefault();else return;if(!(e.repeat&&!["ArrowUp","ArrowDown","KeyW","KeyS"].includes(t))){if(t==="Escape"||t==="KeyP"){this.togglePause();return}if(this.help){t==="Space"&&this.closeHelp();return}if(this.game.phase!=="playing"){t==="Space"&&(this.game.phase==="menu"&&this.ready?this.command("start"):this.game.phase==="intro"?this.command("begin"):this.game.phase==="intermission"?this.command("next"):this.game.phase==="paused"?this.command("resume"):["won","lost"].includes(this.game.phase)&&this.command("restart"));return}this.audio.unlock(),(t==="ArrowUp"||t==="KeyW")&&this.game.move(-1),(t==="ArrowDown"||t==="KeyS")&&this.game.move(1),/^Digit[123]$/.test(t)&&this.game.selectLane(Number(t.at(-1))-1),t==="Space"&&this.game.requestAction(),t==="KeyQ"&&this.game.discard()}}}}notify(e,t=!1,n=3.4){Ot(Ye("toast"),e),Ye("toast").classList.toggle("error",t),Ye("toast").classList.add("visible"),this.toastTime=n}event(e){if(e.type==="start"&&(this.notify("Erste Bestellung: Burger für Reihe 2. Oben holen, in der Mitte servieren.",!1,7),this.floatScores.forEach(t=>t.element.remove()),this.floatScores=[]),e.type==="customer"&&this.game.served===0&&e.lane===1&&this.notify("Reihe 2 möchte einen Burger. Oben abholen → zur Mitte → servieren.",!1,7),e.type==="pickup"&&this.game.served===0&&this.notify(`${Pn[e.food]} auf dem Tablett. Jetzt zur bestellenden Reihe wechseln!`,!1,5),e.type==="served"||e.type==="partial"){const t=document.createElement("div");t.className="score-float",t.textContent=`+${e.points}`,Ye("world-labels").append(t),this.floatScores.push({element:t,x:e.x,z:Wt[e.lane],age:0}),this.game.served===1&&this.notify("Gut serviert! Die Sprechblasen zeigen dir die nächsten Wünsche."),e.type==="partial"&&this.notify(`Ein Teil des Menüs ist da. Noch gewünscht: ${e.wanted.map(n=>Pn[n]).join(" + ")}.`)}e.type==="wrong"&&this.notify(`Das war ${Pn[e.food]}. Gewünscht: ${e.wanted.map(t=>Pn[t]).join(" + ")}.`,!0),e.type==="miss"&&this.notify("Ein Kunde ist unzufrieden gegangen. Ein Leben weniger.",!0),e.type==="waste"&&this.notify("Die Theke war leer. Schau zuerst nach der Bestellung.",!0),e.type==="discard"&&this.notify("Artikel abgelegt. Du kannst etwas Neues holen.",!1,2),e.type==="shift"&&this.notify(e.shift===1?"Jetzt gibt es auch Menüs: jeden gewünschten Artikel einzeln liefern.":"Volles Haus! Behalte alle drei Reihen im Blick.",!1,5),["won","lost","intermission"].includes(e.type)&&(this.game.score>this.best&&(this.best=this.game.score,Mi("best",this.best)),this.lastModalKey=""),this.renderModal()}renderModal(e=!1){const t=this.help?"help":this.game.phase,n=`${t}:${this.ready}`;if(!e&&this.lastModalKey===n)return;this.voiceCaptionState=null,this.lastModalKey=n,this.modal.className=`modal-layer ${t==="menu"?"start-layer":t==="intro"?"intro-layer":""}`,this.modal.innerHTML="";const i=this.game,s=`<div class="settings-row"><span>Sound</span><button data-command="sound">${this.audio.enabled?"An":"Aus"}</button><span>Grafik</span><button data-command="quality">${this.quality==="high"?"Hoch":"Standard"}</button></div><label class="music-setting" for="music-volume"><span>Hintergrundmusik</span><input id="music-volume" type="range" min="0" max="60" step="1" value="${Math.round(this.audio.music.volume*100)}"><output id="music-volume-value">${Math.round(this.audio.music.volume*100)} %</output></label><label class="music-setting" for="sfx-volume"><span>Küchengeräusche / Effekte</span><input id="sfx-volume" type="range" min="0" max="100" step="1" value="${Math.round(this.audio.sfx.volume*100)}"><output id="sfx-volume-value">${Math.round(this.audio.sfx.volume*100)} %</output></label>`;if(t==="menu")this.modal.innerHTML=`<section class="menu-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="eyebrow">EIN KLEINER HUND. EINE GROSSE SCHICHT.</div><h1 id="modal-title">Fast food.<em>Fast paws.</em></h1><p class="menu-copy">Burger oben. Cola in der Mitte. Pommes unten.<br>Hol die Bestellung und schick sie über die richtige Theke. Roary zählt auf dich!</p><div class="food-row">${Ji.map(l=>`<span>${zr(l,!0)}${Pn[l]}</span>`).join("")}</div><button id="start-game" class="primary-button" data-command="start" ${this.ready?"":"disabled"}>${this.ready?"Schicht starten":"Roary lädt …"} <span class="arrow">→</span></button><div class="load-progress" ${this.ready?"hidden":""}><i style="width:${Math.max(2,this.progress)}%"></i></div><div class="load-caption">${this.ready?"3 Schichten · 3 Leben · dein bester Service":`Roary kommt in die Küche … ${this.progress||""}${this.progress?" %":""}`}</div><div class="menu-links"><button class="text-button" data-command="help">So wird gespielt</button></div><div class="menu-shortcuts">↑ ↓ oder W / S wechseln · Leertaste holen & servieren<br>Auch mit Touch-Gesten spielbar.</div></section><div class="menu-model-note">ROARY / DER WIRT MIT DEM GROSSEN GRINSEN</div>`;else if(t==="intro")this.modal.innerHTML=`<section class="intro-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="eyebrow">VOR SCHICHT ${i.shift+1} · ${i.shiftConfig.name.toUpperCase()}</div><h2 id="modal-title">„Bitte.<br> Hilf mir da durch.“</h2><div class="speaker-name">ROARY <span>· Mitarbeiter des Monats. Angeblich.</span></div><blockquote id="roary-line">${uo[i.shift]}</blockquote><div class="intro-actions"><button class="primary-button" data-command="begin">Ich helfe dir. Los geht’s →</button><button class="text-button" data-command="repeat-line">Nochmal anhören</button></div><p class="intro-note">Die Küche wartet auf dich. Noch läuft keine Bestellung.<br>Roarys aufgenommene Stimme · Untertitel immer · Ton oben abschaltbar</p></section>`;else if(t==="help")this.modal.innerHTML=`<section class="dialog-card" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="eyebrow">SO WIRD GESPIELT</div><h2 id="modal-title">Immer der<br>Bestellung nach.</h2><ol class="tutorial-steps"><li><span><strong>Bestellung lesen.</strong> Die Sprechblase zeigt, was der erste Kunde einer Reihe möchte.</span></li><li><span><strong>Richtig abholen.</strong> Burger oben, Cola Mitte, Pommes unten. Mit ↑ ↓ / W S links mit dem Finger nach oben / unten wischen.</span></li><li><span><strong>Leertaste / Aktion:</strong> Bei leerem Tablett einen Artikel holen. Mit Artikel zur Kundenreihe wechseln und noch einmal drücken, um ihn zu servieren.</span></li><li><span><strong>Menüs einzeln liefern.</strong> Alle Symbole müssen erfüllt sein. Drei unzufriedene Kunden beenden die Schicht. Q legt einen falschen Artikel ab.</span></li></ol>${s}<button class="primary-button" data-command="close-help">Verstanden →</button></section>`;else if(t==="paused")this.modal.innerHTML=`<section class="dialog-card" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="eyebrow">DIE KÜCHE WARTET</div><h2 id="modal-title">Kurze Pause.</h2><p>Bestellungen und Geduld bleiben stehen. Atme durch – dann geht’s weiter.</p>${s}<button class="primary-button" data-command="resume">Weiter servieren →</button><button class="secondary-button" data-command="restart">Neu anfangen</button><button class="secondary-button" data-command="menu">Zum Hauptmenü</button></section>`;else if(t==="intermission")this.modal.innerHTML=`<section class="dialog-card" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="eyebrow">SCHICHT ${i.shift+1} GESCHAFFT</div><h2 id="modal-title">Gut bedient,<br>Roary!</h2><p>${i.wave.served} Kunden zufrieden. Für jedes übrige Leben gibt es 250 Bonuspunkte.</p><div class="result-score">${i.score.toLocaleString("de-DE")}</div><div class="result-caption">PUNKTE AUF DEM KASSENZETTEL</div><button class="primary-button" data-command="next">Schicht ${i.shift+2} starten →</button></section>`;else if(t==="won"||t==="lost"){const l=t==="won";this.modal.innerHTML=`<section class="dialog-card" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="eyebrow">${l?"FEIERABEND MIT GRINSEN":"HEUTE WAR VIEL LOS"}</div><h2 id="modal-title">${l?"Das war<br>Spitzenservice!":"Die Küche<br>macht kurz zu."}</h2><p>${l?"Alle drei Schichten geschafft. Roary hat sich eine Pause verdient.":"Drei Kunden sind unzufrieden gegangen. Beim nächsten Versuch läuft’s runder."}</p><div class="result-score" id="final-score">${i.score.toLocaleString("de-DE")}</div><div class="result-caption">PUNKTE · REKORD ${this.best.toLocaleString("de-DE")}</div><div class="result-stats"><div><strong>${i.served}</strong><span>KUNDEN BEDIENT</span></div><div><strong>${i.deliveries}</strong><span>ARTIKEL SERVIERT</span></div><div><strong>${i.maxCombo}×</strong><span>BESTE SERIE</span></div></div><button class="primary-button" data-command="restart">Noch eine Schicht →</button><button class="secondary-button" data-command="menu">Zum Hauptmenü</button></section>`}const a=this.modal.querySelector('[data-command="quality"]');a&&(a.textContent=Br[this.quality]),["help","paused"].includes(t)&&this.modal.querySelector(".settings-row").insertAdjacentHTML("afterend",`<div class="settings-row"><span>Roarys Stimme</span><button data-command="voice">${this.audio.voiceEnabled?"An":"Aus"}</button></div><label class="music-setting" for="voice-volume"><span>Sprachlautstärke</span><input id="voice-volume" type="range" min="0" max="100" step="1" value="${Math.round(this.audio.speech.volume*100)}"><output id="voice-volume-value">${Math.round(this.audio.speech.volume*100)} %</output></label>`);const o=this.modal.querySelector(".menu-shortcuts");if(o&&Ot(o,kr[this.root.dataset.input]||kr.keyboard),t==="help"&&this.modal.querySelector(".tutorial-steps").insertAdjacentHTML("afterend","<p>Touch: links auf freier Spielfläche ↑ / ↓ wischen; langer Wisch: zwei Stationen. Rechts auf die freie Spielfläche tippen: holen oder servieren – auch gleichzeitig mit dem zweiten Finger. Keine Stations- oder Aktionsbuttons; Q legt per Tastatur einen Artikel ab. Querformat bietet mehr Platz; Hochformat funktioniert ebenfalls.</p>"),this.modal.childElementCount){const l=this.modal.querySelector(".primary-button:not(:disabled)");l&&queueMicrotask(()=>l.focus({preventScroll:!0}))}}update(e,t){const n=this.game;this.updateVoiceSubtitle();const i=e.width,s=this.audio.music.caption;Ot(Ye("music-track"),s),Ye("music-track").hidden=!s,this.root.dataset.phase=n.phase,this.root.dataset.shift=String(n.shift+1),this.root.dataset.ready=String(this.ready),this.root.dataset.renderQuality=e.effectiveQuality,Ot(Ye("score"),String(n.score).padStart(4,"0")),Ot(Ye("best"),String(this.best).padStart(4,"0")),Ot(Ye("lives-count"),n.lives),Ye("lives").dataset.value!==String(n.lives)&&(Ye("lives").innerHTML=[0,1,2].map(c=>d1(c<n.lives)).join(""),Ye("lives").dataset.value=String(n.lives),Ye("lives").setAttribute("aria-label",`${n.lives} Leben`));const a=n.phase==="playing";this.inputPhase!==n.phase&&(this.input.reset(),this.inputPhase=n.phase),Ye("pause-button").disabled=!["playing","paused"].includes(n.phase),Ye("pause-button").textContent=n.phase==="paused"?"▶":"Ⅱ",Ye("pause-button").setAttribute("aria-label",n.phase==="paused"?"Spiel fortsetzen":"Spiel pausieren"),Ot(Ye("shift-label"),n.phase==="menu"?"FRISCH AUF DEM TABLETT":`SCHICHT ${n.shift+1} / 3 · ${n.shiftConfig.name.toUpperCase()}`),Ot(Ye("shift-progress"),n.phase==="menu"?"FAST FOOD. FAST PAWS.":`${n.wave.resolved} / ${n.shiftConfig.customers} KUNDEN`),Ye("combo").hidden=n.combo<2||!a,Ot(Ye("combo"),`${n.combo}× SERIE`);const o=n.player.held;(Ye("held").dataset.food!==(o||"none")||!Ye("held").querySelector(".held-icon").childElementCount)&&(Ye("held").dataset.food=o||"none",Ye("held").querySelector(".held-icon").innerHTML=o?zr(o,!0):h1),Ot(Ye("held-label"),o?Pn[o]:"Tablett leer");const l=o||Ji[n.player.targetLane];Ot(Ye("action-text"),n.player.pending?"Aktion vorgemerkt":`${Pn[l]} ${o?"servieren":"holen"}`),Ot(Ye("served-count"),n.deliveries),Ye("served-count").dataset.value=String(n.deliveries);for(let c=0;c<3;c++){const h=n.player.targetLane===c;this.orderButtons[c].classList.toggle("selected",h);const u=n.leading(c),d=u?u.order:[],f=d.join(","),m=this.orderButtons[c];m.dataset.order=f,m.setAttribute("aria-label",`Reihe ${c+1}: ${d.length?d.map(p=>Pn[p]).join(" und "):"noch kein Kunde"}.`),(f!==this.orderKeys[c]||!m.dataset.initialized)&&(m.querySelector(".order-items").innerHTML=d.length?d.map(p=>zr(p)).join("")+(d.length===1?`<span class="item-name">${Pn[d[0]]}</span>`:""):"Noch kein Kunde",this.orderKeys[c]=f,m.dataset.initialized="true");const x=u?Math.max(0,Math.min(1,(u.x+1.25)/9.8)):0;m.classList.toggle("urgent",!!u&&x<.3),m.querySelector(".patience-track i").style.width=`${x*100}%`;let g=this.orderBubbles.get(c);if(u){g||(g=document.createElement("div"),g.className="world-order",Ye("world-labels").append(g),this.orderBubbles.set(c,g));const p=n.customers.filter(R=>R.lane===c&&R.state==="waiting").length,v=`${f}|${p}`;g.dataset.content!==v&&(g.innerHTML='<i class="order-dot"></i>'+d.map(R=>zr(R,!0)).join("")+(p>1?`<span class="queue-number">+${p-1}</span>`:""),g.dataset.content=v);const y=e.project(u.x,2.25,Wt[c]-.91);g.style.left=`${Math.min(i-33,Math.max(33,y.x))}px`;const M=i<700?86+c*36:86;g.style.top=`${Math.max(M,y.y)}px`,g.classList.toggle("urgent",x<.3),g.hidden=!["playing","paused"].includes(n.phase)}else g&&(g.remove(),this.orderBubbles.delete(c))}for(const c of this.floatScores){c.age+=n.phase==="paused"?0:t;const h=e.project(c.x,2+c.age*.65,c.z);c.element.style.left=`${h.x}px`,c.element.style.top=`${h.y}px`,c.element.style.opacity=String(Math.max(0,1-c.age/1.1)),c.age>1.1&&c.element.remove()}this.floatScores=this.floatScores.filter(c=>c.age<=1.1),n.phase!=="paused"&&(this.toastTime-=t),Ye("toast").classList.toggle("visible",this.toastTime>0&&a),this.renderModal()}updateVoiceSubtitle(){const e=this.audio.speech.subtitle,t=this.game.phase,n=this.audio.speech.playing,i=this.voiceCaptionState;if(i&&i.subtitle===e&&i.phase===t&&i.playing===n)return;this.voiceCaptionState={subtitle:e,phase:t,playing:n},this.subtitle.hidden=!e||this.game.phase!=="playing",e&&Ot(this.subtitle,`Roary: ${e}`);const s=this.modal.querySelector("#roary-line");if(s&&(s.dataset.speaking=String(this.audio.speech.playing)),["won","lost"].includes(this.game.phase)){let a=this.modal.querySelector("#result-voice-line");!a&&e&&(a=document.createElement("blockquote"),a.id="result-voice-line",a.setAttribute("role","status"),this.modal.querySelector(".result-score")?.before(a)),a&&(a.hidden=!e,e&&Ot(a,`Roary: ${e}`))}}}const p1=[{title:"Bouncy Blues Shuffle",url:"./audio/music/bouncy-blues-shuffle.m4a"},{title:"Greasy Groove",url:"./audio/music/greasy-groove.m4a"},{title:"Held Phrase",url:"./audio/music/held-phrase.m4a"}];class m1{constructor(e,{enabled:t=!0,volume:n=.22,tracks:i=p1}={}){this.media=e,this.tracks=i,this.enabled=t,this.phase="menu",this.shift=0,this.track=null,this.pending=!1,this.blocked=!1,this.failed=!1,this.serial=0,this.duck=1,this.duckClock=null,e.loop=!0,e.preload="metadata",e.muted=!t,this.setVolume(n),e.addEventListener("error",()=>{this.failed=!0,this.pending=!1})}wantsPlayback(){return this.phase==="playing"&&this.enabled&&this.volume>0}setVolume(e){const t=Number(e);this.volume=Number.isFinite(t)?Math.max(0,Math.min(.6,t)):.22,this.media.volume=this.volume*this.duck,this.volume===0?this.pause(!1):this.retry()}setEnabled(e){this.enabled=e,this.media.muted=!e,e?this.retry():this.pause(!1)}updateDucking(e,t){const n=this.duckClock===null?0:Math.max(0,Math.min(.1,(t-this.duckClock)/1e3));this.duckClock=t;const i=e?.26:1,s=e?.16:.65;this.duck+=(i-this.duck)*(1-Math.exp(-n/s)),Math.abs(this.duck-i)<.001&&(this.duck=i),this.media.volume=this.volume*this.duck}setState(e,t=0){if(e===this.phase&&t===this.shift)return;if(this.phase=e,this.shift=t,e!=="playing"){this.pause(e!=="paused"),e!=="paused"&&(this.track=null);return}const n=this.tracks[(t%this.tracks.length+this.tracks.length)%this.tracks.length];this.track!==n&&(this.pause(!0),this.track=n,this.failed=!1,this.blocked=!1,this.media.getAttribute("src")!==n.url&&(this.media.src=n.url,this.media.load())),this.retry()}pause(e){if(this.serial++,this.pending=!1,this.blocked=!1,this.media.pause(),e)try{this.media.currentTime=0}catch{}}retry(){if(!this.wantsPlayback()||!this.track||this.pending||!this.media.paused)return;const e=++this.serial;this.pending=!0,this.blocked=!1,this.failed=!1;const t=n=>{e===this.serial&&(this.pending=!1,this.blocked=n?.name==="NotAllowedError",this.failed=!this.blocked&&n?.name!=="AbortError")};try{Promise.resolve(this.media.play()).then(()=>{e===this.serial&&(this.pending=!1,this.wantsPlayback()||this.media.pause())},t)}catch(n){t(n)}}get caption(){return this.track?!this.enabled||this.volume===0?"♪ Musik aus":this.phase==="paused"?`♪ ${this.track.title} · Pause`:this.failed?"♪ Musik nicht verfügbar":this.blocked?"♪ Musik mit nächster Eingabe starten":`♪ ${this.track.title}${this.pending?" · lädt …":""}`:""}}const g1=[1,2,3].map(r=>`./audio/voices/intro_0${r}.mp3`);class x1{constructor(e,{enabled:t=!0,fallback:n=()=>{},cancelFallback:i=()=>{},envelopes:s=[]}={}){this.media=e,this.enabled=t,this.fallback=n,this.cancelFallback=i,this.serial=0,this.pending=!1,this.blocked=!1,this.envelopes=s,e.loop=!1,e.preload="auto",e.volume=.9,this.volume=.9,this.lastError=null}stop(){this.serial++,this.pending=!1,this.blocked=!1,this.request=null,this.media.pause(),this.media.onended=null,this.media.onerror=null;try{this.media.currentTime=0}catch{}this.cancelFallback()}setEnabled(e){this.enabled=e,this.media.muted=!e,e||this.stop()}setVolume(e){this.volume=Math.max(0,Math.min(1,Number(e)||0)),this.media.volume=this.volume,this.volume===0&&this.stop()}get playing(){return!!(this.enabled&&this.request&&!this.media.paused&&!this.media.ended&&!this.media.muted&&this.media.readyState>=3)}get subtitle(){return this.playing?this.request.text:""}get mouthOpen(){const e=this.media;if(!this.enabled||!this.request||this.blocked||e.paused||e.ended||e.seeking||e.muted||e.readyState<3)return 0;const t=this.envelopes[this.request.shift];if(!t||e.currentTime<0||e.currentTime>=t.durationSeconds)return 0;const n=e.currentTime/t.stepSeconds,i=Math.floor(n),s=n-i,a=t.values[i]||0,o=t.values[i+1]||0;return a+(o-a)*s}play(e,t){const n=g1[e];if(!n){this.stop(),this.enabled&&this.fallback(t);return}return this.playSample({id:`intro_0${e+1}`,url:n,text:t},{shift:e,priority:100,legacyFallback:!0})}playSample(e,{shift:t,priority:n=0,legacyFallback:i=!1}={}){if(this.stop(),!this.enabled||this.volume===0)return;const{url:s,text:a,id:o}=e,l=this.serial;this.request={shift:t,text:a,id:o,priority:n},this.pending=!0,this.lastError=null,this.media.getAttribute("src")!==s&&(this.media.src=s,this.media.load());let c=!1;const h=u=>{l!==this.serial||c||(c=!0,this.pending=!1,u?.name!=="AbortError"&&(this.blocked=u?.name==="NotAllowedError",this.lastError={id:o,kind:this.blocked?"autoplay":"decode",message:String(u?.message||u?.code||"Media error")},this.media.pause(),this.request=null,!this.blocked&&i&&this.fallback(a)))};this.media.onerror=()=>h(this.media.error),this.media.onended=()=>{l===this.serial&&(this.pending=!1,this.request=null)};try{Promise.resolve(this.media.play()).then(()=>{l===this.serial&&(this.pending=!1)},h)}catch(u){h(u)}}}const _1=JSON.parse('[{"name":"intro_01","url":"/audio/voices/intro_01.mp3","sha256":"d004ca5c580f9f2df1880209b0c617fc99f488a16732d160c2f9a50067bc6cb9","durationSeconds":14.2663125,"stepSeconds":0.01,"referenceRms":0.16214621159159262,"values":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.036,0.153,0.274,0.351,0.371,0.37,0.382,0.398,0.399,0.394,0.384,0.36,0.323,0.28,0.238,0.232,0.438,0.625,0.759,0.861,0.921,0.954,0.974,0.985,0.991,0.995,0.997,0.998,0.999,0.999,0.958,0.834,0.693,0.567,0.48,0.458,0.45,0.424,0.584,0.718,0.806,0.874,0.914,0.951,0.972,0.984,0.991,0.995,0.997,0.998,0.99,0.985,0.977,0.969,0.965,0.968,0.97,0.971,0.967,0.953,0.947,0.938,0.914,0.883,0.826,0.718,0.605,0.506,0.419,0.356,0.303,0.252,0.229,0.306,0.482,0.675,0.785,0.852,0.873,0.828,0.756,0.683,0.619,0.562,0.512,0.464,0.416,0.426,0.546,0.658,0.66,0.641,0.627,0.585,0.538,0.501,0.473,0.443,0.397,0.341,0.284,0.228,0.183,0.275,0.39,0.508,0.614,0.7,0.747,0.739,0.723,0.702,0.699,0.712,0.71,0.707,0.719,0.758,0.763,0.748,0.738,0.731,0.725,0.719,0.707,0.697,0.702,0.702,0.689,0.681,0.698,0.72,0.721,0.694,0.674,0.688,0.687,0.685,0.69,0.714,0.736,0.715,0.684,0.683,0.667,0.631,0.594,0.514,0.432,0.4,0.414,0.454,0.455,0.461,0.475,0.485,0.495,0.52,0.559,0.556,0.576,0.579,0.56,0.541,0.527,0.523,0.5,0.473,0.456,0.434,0.394,0.347,0.29,0.241,0.193,0.154,0.124,0.099,0.079,0.063,0.051,0.041,0.033,0.026,0.021,0.017,0.013,0.011,0.009,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.309,0.504,0.57,0.706,0.801,0.789,0.733,0.674,0.596,0.489,0.392,0.314,0.268,0.256,0.275,0.311,0.334,0.336,0.323,0.313,0.444,0.54,0.559,0.647,0.773,0.87,0.925,0.957,0.975,0.986,0.961,0.892,0.802,0.72,0.648,0.587,0.532,0.481,0.433,0.387,0.358,0.476,0.615,0.64,0.63,0.617,0.581,0.54,0.497,0.452,0.391,0.313,0.251,0.207,0.199,0.331,0.492,0.644,0.689,0.729,0.763,0.717,0.672,0.617,0.54,0.467,0.414,0.369,0.318,0.276,0.243,0.212,0.186,0.164,0.147,0.134,0.126,0.12,0.115,0.112,0.104,0.094,0.375,0.58,0.729,0.795,0.711,0.596,0.493,0.395,0.316,0.253,0.203,0.162,0.148,0.194,0.244,0.247,0.227,0.447,0.679,0.768,0.798,0.865,0.872,0.854,0.85,0.834,0.805,0.797,0.777,0.737,0.7,0.659,0.594,0.526,0.48,0.447,0.414,0.373,0.325,0.261,0.246,0.264,0.36,0.416,0.391,0.361,0.318,0.269,0.222,0.178,0.143,0.114,0.091,0.073,0.059,0.047,0.038,0.03,0.024,0.019,0.015,0.012,0.01,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.16,0.253,0.21,0.168,0.135,0.108,0.086,0.069,0.055,0.044,0.036,0.028,0.023,0.095,0.29,0.496,0.644,0.796,0.883,0.933,0.953,0.959,0.939,0.888,0.806,0.751,0.72,0.695,0.669,0.644,0.626,0.617,0.612,0.592,0.557,0.538,0.718,0.838,0.88,0.931,0.928,0.885,0.815,0.713,0.604,0.495,0.397,0.318,0.254,0.204,0.163,0.136,0.298,0.527,0.714,0.806,0.849,0.882,0.878,0.86,0.819,0.775,0.778,0.76,0.672,0.581,0.502,0.412,0.33,0.264,0.212,0.169,0.22,0.298,0.408,0.513,0.523,0.513,0.528,0.519,0.484,0.45,0.42,0.389,0.36,0.323,0.269,0.215,0.172,0.138,0.111,0.089,0.071,0.057,0.045,0.253,0.388,0.437,0.487,0.526,0.585,0.58,0.532,0.471,0.436,0.468,0.481,0.591,0.707,0.702,0.683,0.686,0.692,0.659,0.607,0.561,0.493,0.424,0.352,0.29,0.241,0.207,0.176,0.154,0.136,0.113,0.097,0.078,0.062,0.05,0.049,0.055,0.044,0.035,0.028,0.023,0.018,0.015,0.012,0.009,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.245,0.567,0.751,0.857,0.918,0.953,0.973,0.954,0.881,0.759,0.616,0.493,0.395,0.316,0.253,0.225,0.223,0.241,0.245,0.233,0.214,0.403,0.583,0.655,0.654,0.615,0.559,0.512,0.447,0.375,0.301,0.241,0.193,0.154,0.124,0.099,0.079,0.063,0.051,0.041,0.033,0.026,0.021,0.017,0.013,0.011,0.009,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.025,0.089,0.138,0.176,0.527,0.729,0.844,0.911,0.949,0.971,0.983,0.99,0.994,0.997,0.981,0.933,0.851,0.739,0.637,0.541,0.464,0.403,0.352,0.306,0.26,0.21,0.168,0.135,0.108,0.086,0.362,0.634,0.79,0.879,0.931,0.96,0.977,0.987,0.993,0.996,0.998,0.967,0.899,0.821,0.746,0.689,0.636,0.593,0.654,0.802,0.886,0.935,0.963,0.979,0.988,0.985,0.953,0.896,0.817,0.732,0.652,0.586,0.524,0.462,0.393,0.315,0.252,0.202,0.162,0.155,0.167,0.184,0.364,0.592,0.766,0.866,0.923,0.956,0.975,0.965,0.935,0.892,0.858,0.828,0.791,0.75,0.718,0.705,0.748,0.822,0.87,0.881,0.866,0.825,0.773,0.72,0.664,0.62,0.588,0.558,0.536,0.521,0.509,0.5,0.492,0.486,0.479,0.463,0.448,0.434,0.407,0.607,0.775,0.871,0.926,0.957,0.934,0.899,0.86,0.822,0.736,0.654,0.581,0.521,0.47,0.428,0.394,0.365,0.34,0.317,0.289,0.253,0.203,0.162,0.13,0.104,0.083,0.067,0.053,0.043,0.034,0.027,0.022,0.018,0.014,0.011,0.009,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.126,0.305,0.44,0.487,0.541,0.674,0.777,0.814,0.842,0.857,0.89,0.909,0.921,0.914,0.896,0.898,0.897,0.891,0.887,0.889,0.889,0.884,0.865,0.833,0.805,0.774,0.748,0.714,0.682,0.669,0.642,0.594,0.527,0.44,0.352,0.282,0.226,0.181,0.145,0.116,0.093,0.074,0.06,0.048,0.038,0.031,0.024,0.02,0.016,0.013,0.01,0.008,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.059,0.286,0.474,0.541,0.524,0.466,0.394,0.315,0.253,0.202,0.162,0.13,0.113,0.239,0.374,0.413,0.379,0.334,0.303,0.299,0.323,0.334,0.317,0.254,0.203,0.163,0.13,0.104,0.084,0.067,0.054,0.043,0.034,0.028,0.022,0.018,0.014,0.011,0.009,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.073,0.177,0.286,0.382,0.447,0.472,0.46,0.421,0.543,0.738,0.85,0.859,0.854,0.75,0.638,0.542,0.465,0.399,0.345,0.312,0.284,0.269,0.414,0.544,0.659,0.804,0.868,0.854,0.858,0.856,0.818,0.723,0.624,0.518,0.414,0.332,0.266,0.249,0.248,0.347,0.482,0.629,0.753,0.785,0.762,0.706,0.62,0.548,0.476,0.392,0.314,0.251,0.211,0.214,0.368,0.593,0.682,0.607,0.564,0.538,0.493,0.423,0.359,0.302,0.251,0.21,0.175,0.142,0.114,0.091,0.073,0.058,0.047,0.037,0.03,0.024,0.019,0.015,0.012,0.01,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{"name":"intro_02","url":"/audio/voices/intro_02.mp3","sha256":"a03d52b03386e51a1e789ffe6d77cef24e7e8380222eba49417f4461483d6beb","durationSeconds":12.8623125,"stepSeconds":0.01,"referenceRms":0.1530680835639923,"values":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.243,0.552,0.743,0.852,0.915,0.951,0.972,0.984,0.991,0.994,0.971,0.879,0.757,0.639,0.535,0.485,0.464,0.448,0.492,0.584,0.739,0.85,0.914,0.918,0.946,0.969,0.979,0.956,0.917,0.834,0.697,0.562,0.479,0.447,0.441,0.442,0.442,0.438,0.43,0.413,0.39,0.381,0.616,0.78,0.874,0.927,0.958,0.976,0.986,0.992,0.995,0.997,0.999,0.999,1,0.999,0.923,0.892,0.891,0.883,0.856,0.852,0.853,0.838,0.796,0.708,0.58,0.464,0.372,0.344,0.375,0.401,0.394,0.48,0.577,0.739,0.842,0.877,0.895,0.891,0.929,0.918,0.866,0.79,0.779,0.764,0.676,0.636,0.599,0.543,0.486,0.429,0.369,0.296,0.237,0.19,0.152,0.122,0.097,0.078,0.062,0.05,0.04,0.032,0.026,0.021,0.016,0.013,0.011,0.008,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.21,0.454,0.657,0.803,0.887,0.935,0.955,0.957,0.939,0.839,0.708,0.58,0.506,0.484,0.472,0.458,0.455,0.451,0.458,0.495,0.636,0.789,0.879,0.93,0.96,0.977,0.987,0.977,0.948,0.926,0.889,0.835,0.792,0.761,0.725,0.686,0.647,0.614,0.557,0.501,0.454,0.415,0.384,0.357,0.329,0.3,0.268,0.228,0.189,0.151,0.121,0.097,0.078,0.062,0.05,0.04,0.032,0.026,0.02,0.016,0.013,0.011,0.008,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.011,0.06,0.096,0.173,0.383,0.632,0.789,0.879,0.896,0.914,0.908,0.944,0.968,0.95,0.945,0.955,0.954,0.969,0.982,0.99,0.994,0.997,0.998,0.999,0.994,0.98,0.963,0.953,0.949,0.948,0.951,0.947,0.934,0.933,0.959,0.971,0.938,0.898,0.885,0.87,0.854,0.844,0.84,0.83,0.825,0.809,0.786,0.784,0.795,0.772,0.75,0.748,0.733,0.734,0.79,0.814,0.824,0.853,0.851,0.826,0.809,0.82,0.802,0.784,0.784,0.78,0.768,0.771,0.786,0.767,0.749,0.768,0.752,0.75,0.821,0.82,0.802,0.823,0.85,0.831,0.826,0.858,0.838,0.813,0.773,0.671,0.578,0.478,0.383,0.306,0.271,0.269,0.282,0.279,0.279,0.333,0.452,0.553,0.615,0.667,0.677,0.652,0.598,0.519,0.421,0.337,0.297,0.293,0.332,0.357,0.355,0.358,0.348,0.305,0.244,0.196,0.157,0.125,0.1,0.096,0.155,0.204,0.231,0.261,0.29,0.372,0.539,0.648,0.669,0.654,0.625,0.599,0.567,0.532,0.469,0.417,0.37,0.34,0.312,0.283,0.258,0.23,0.212,0.199,0.184,0.167,0.143,0.115,0.113,0.121,0.11,0.097,0.078,0.062,0.05,0.04,0.032,0.026,0.021,0.016,0.013,0.011,0.008,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.071,0.163,0.249,0.318,0.365,0.385,0.376,0.469,0.639,0.756,0.84,0.887,0.874,0.868,0.837,0.759,0.692,0.619,0.609,0.68,0.745,0.819,0.896,0.94,0.966,0.976,0.953,0.926,0.932,0.95,0.966,0.954,0.919,0.884,0.826,0.756,0.746,0.763,0.763,0.805,0.857,0.856,0.816,0.776,0.746,0.697,0.656,0.624,0.592,0.596,0.666,0.751,0.765,0.735,0.687,0.602,0.523,0.422,0.338,0.271,0.217,0.209,0.257,0.305,0.33,0.34,0.34,0.332,0.349,0.483,0.68,0.816,0.846,0.837,0.833,0.829,0.848,0.884,0.92,0.918,0.903,0.866,0.817,0.762,0.665,0.535,0.429,0.343,0.303,0.288,0.291,0.3,0.282,0.25,0.225,0.227,0.276,0.316,0.339,0.331,0.31,0.304,0.287,0.254,0.238,0.235,0.233,0.22,0.192,0.159,0.127,0.102,0.081,0.065,0.052,0.042,0.033,0.027,0.021,0.017,0.014,0.011,0.009,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.159,0.434,0.611,0.695,0.8,0.842,0.867,0.891,0.868,0.858,0.87,0.852,0.868,0.895,0.874,0.876,0.858,0.824,0.843,0.888,0.936,0.963,0.963,0.958,0.941,0.933,0.961,0.96,0.959,0.959,0.913,0.795,0.704,0.622,0.59,0.623,0.729,0.816,0.827,0.829,0.844,0.838,0.819,0.799,0.785,0.757,0.715,0.672,0.602,0.527,0.475,0.445,0.431,0.48,0.586,0.661,0.656,0.617,0.552,0.463,0.394,0.362,0.346,0.534,0.705,0.75,0.767,0.765,0.777,0.772,0.71,0.589,0.471,0.377,0.302,0.242,0.194,0.155,0.152,0.187,0.189,0.19,0.374,0.535,0.591,0.622,0.61,0.576,0.55,0.496,0.441,0.393,0.339,0.286,0.237,0.19,0.152,0.122,0.097,0.078,0.062,0.05,0.04,0.032,0.026,0.021,0.016,0.013,0.011,0.008,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.077,0.369,0.638,0.792,0.881,0.875,0.814,0.739,0.634,0.532,0.458,0.413,0.38,0.356,0.343,0.523,0.726,0.843,0.91,0.919,0.895,0.849,0.878,0.922,0.896,0.904,0.945,0.968,0.982,0.967,0.945,0.893,0.818,0.757,0.677,0.61,0.554,0.501,0.456,0.409,0.355,0.316,0.31,0.417,0.586,0.714,0.744,0.735,0.791,0.828,0.793,0.747,0.702,0.67,0.665,0.651,0.612,0.582,0.687,0.803,0.793,0.814,0.884,0.866,0.887,0.935,0.934,0.927,0.958,0.976,0.965,0.978,0.987,0.965,0.887,0.818,0.766,0.712,0.66,0.611,0.569,0.524,0.486,0.581,0.759,0.812,0.808,0.839,0.812,0.813,0.804,0.798,0.8,0.753,0.767,0.77,0.764,0.792,0.782,0.772,0.766,0.751,0.745,0.742,0.716,0.668,0.609,0.555,0.499,0.458,0.415,0.363,0.33,0.3,0.24,0.192,0.154,0.123,0.099,0.079,0.063,0.051,0.041,0.033,0.026,0.021,0.017,0.013,0.011,0.009,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.04,0.238,0.547,0.734,0.847,0.912,0.95,0.971,0.968,0.932,0.86,0.795,0.706,0.654,0.621,0.595,0.574,0.553,0.521,0.477,0.426,0.362,0.29,0.232,0.186,0.22,0.294,0.506,0.717,0.828,0.815,0.835,0.893,0.898,0.882,0.878,0.864,0.844,0.84,0.841,0.837,0.823,0.827,0.824,0.845,0.869,0.843,0.798,0.741,0.676,0.604,0.544,0.471,0.405,0.341,0.273,0.219,0.175,0.14,0.112,0.09,0.072,0.058,0.046,0.037,0.03,0.024,0.019,0.015,0.012,0.01,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.02,0.053,0.11,0.19,0.287,0.403,0.563,0.662,0.7,0.695,0.695,0.721,0.684,0.641,0.633,0.626,0.613,0.594,0.559,0.516,0.465,0.423,0.387,0.336,0.289,0.251,0.207,0.166,0.133,0.106,0.085,0.068,0.055,0.044,0.035,0.028,0.022,0.018,0.014,0.012,0.009,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{"name":"intro_03","url":"/audio/voices/intro_03.mp3","sha256":"20daafae56453e747486341725b1f70870400f7b5ce07899cff2011c64f0ac09","durationSeconds":12.3163125,"stepSeconds":0.01,"referenceRms":0.14450086554313535,"values":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.055,0.155,0.282,0.566,0.748,0.855,0.917,0.952,0.973,0.984,0.991,0.995,0.997,0.97,0.914,0.85,0.788,0.742,0.737,0.835,0.906,0.946,0.962,0.962,0.978,0.988,0.993,0.996,0.998,0.998,0.999,0.999,0.977,0.97,0.966,0.943,0.931,0.897,0.837,0.78,0.703,0.658,0.655,0.718,0.76,0.778,0.776,0.777,0.836,0.839,0.797,0.734,0.645,0.564,0.509,0.495,0.535,0.575,0.579,0.566,0.544,0.538,0.534,0.522,0.498,0.452,0.408,0.365,0.334,0.309,0.293,0.292,0.292,0.281,0.264,0.224,0.179,0.144,0.115,0.092,0.079,0.08,0.064,0.052,0.041,0.033,0.026,0.021,0.017,0.014,0.011,0.009,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.013,0.08,0.176,0.238,0.235,0.202,0.162,0.13,0.104,0.083,0.084,0.156,0.332,0.593,0.748,0.822,0.898,0.941,0.966,0.981,0.989,0.964,0.923,0.881,0.825,0.771,0.725,0.681,0.713,0.815,0.84,0.84,0.869,0.853,0.86,0.92,0.918,0.925,0.957,0.953,0.95,0.971,0.972,0.965,0.98,0.988,0.981,0.989,0.994,0.996,0.987,0.99,0.994,0.986,0.967,0.965,0.944,0.875,0.787,0.716,0.688,0.731,0.75,0.746,0.761,0.738,0.704,0.664,0.607,0.559,0.527,0.512,0.555,0.604,0.596,0.57,0.536,0.526,0.511,0.462,0.424,0.384,0.332,0.284,0.245,0.214,0.19,0.172,0.158,0.144,0.127,0.111,0.147,0.271,0.378,0.423,0.434,0.43,0.436,0.432,0.411,0.39,0.36,0.328,0.287,0.23,0.184,0.147,0.118,0.095,0.076,0.061,0.049,0.039,0.031,0.025,0.02,0.016,0.013,0.01,0.008,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.029,0.147,0.263,0.383,0.487,0.659,0.804,0.888,0.936,0.963,0.979,0.988,0.993,0.996,0.973,0.94,0.905,0.834,0.783,0.788,0.879,0.93,0.96,0.977,0.987,0.966,0.944,0.923,0.848,0.713,0.571,0.495,0.46,0.44,0.42,0.435,0.562,0.71,0.804,0.863,0.898,0.892,0.889,0.887,0.861,0.837,0.82,0.792,0.777,0.743,0.661,0.577,0.473,0.379,0.311,0.269,0.24,0.213,0.196,0.19,0.182,0.179,0.185,0.183,0.174,0.16,0.15,0.232,0.446,0.672,0.808,0.866,0.923,0.956,0.939,0.917,0.91,0.891,0.849,0.806,0.747,0.647,0.547,0.453,0.366,0.297,0.277,0.334,0.414,0.48,0.534,0.57,0.599,0.621,0.612,0.601,0.577,0.504,0.437,0.377,0.321,0.289,0.273,0.263,0.251,0.224,0.18,0.144,0.115,0.092,0.074,0.059,0.074,0.138,0.203,0.24,0.245,0.231,0.292,0.375,0.449,0.464,0.43,0.395,0.339,0.272,0.218,0.174,0.157,0.158,0.166,0.164,0.148,0.13,0.123,0.202,0.276,0.291,0.304,0.295,0.254,0.225,0.201,0.18,0.152,0.121,0.097,0.078,0.062,0.05,0.04,0.032,0.026,0.021,0.016,0.013,0.011,0.008,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.01,0.105,0.202,0.423,0.59,0.653,0.711,0.746,0.754,0.737,0.729,0.76,0.755,0.711,0.629,0.534,0.443,0.377,0.324,0.303,0.316,0.44,0.636,0.791,0.87,0.869,0.883,0.919,0.937,0.924,0.913,0.911,0.902,0.886,0.901,0.94,0.932,0.926,0.936,0.931,0.903,0.863,0.862,0.913,0.939,0.933,0.939,0.965,0.98,0.988,0.98,0.968,0.957,0.916,0.83,0.698,0.585,0.528,0.493,0.511,0.566,0.647,0.695,0.659,0.592,0.532,0.475,0.434,0.405,0.385,0.382,0.375,0.354,0.343,0.368,0.464,0.533,0.53,0.553,0.627,0.694,0.7,0.683,0.648,0.575,0.523,0.551,0.635,0.709,0.782,0.796,0.779,0.762,0.718,0.634,0.584,0.572,0.573,0.629,0.709,0.743,0.772,0.849,0.893,0.878,0.873,0.895,0.874,0.851,0.829,0.776,0.715,0.653,0.609,0.611,0.665,0.711,0.761,0.796,0.779,0.742,0.711,0.691,0.687,0.677,0.66,0.642,0.633,0.629,0.623,0.622,0.603,0.584,0.554,0.46,0.369,0.295,0.236,0.189,0.152,0.121,0.097,0.078,0.143,0.194,0.196,0.229,0.339,0.465,0.592,0.665,0.709,0.749,0.726,0.677,0.649,0.619,0.61,0.665,0.694,0.692,0.694,0.674,0.647,0.617,0.561,0.528,0.53,0.542,0.527,0.505,0.469,0.42,0.366,0.307,0.252,0.205,0.164,0.136,0.115,0.102,0.099,0.183,0.264,0.386,0.505,0.564,0.594,0.585,0.55,0.519,0.492,0.464,0.435,0.396,0.363,0.351,0.387,0.409,0.404,0.401,0.385,0.371,0.357,0.338,0.327,0.311,0.29,0.268,0.237,0.215,0.197,0.169,0.136,0.109,0.087,0.07,0.056,0.045,0.068,0.134,0.179,0.188,0.184,0.181,0.177,0.165,0.149,0.124,0.099,0.088,0.096,0.09,0.072,0.058,0.046,0.037,0.03,0.024,0.019,0.015,0.012,0.01,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.098,0.175,0.177,0.343,0.493,0.633,0.692,0.644,0.584,0.49,0.392,0.314,0.308,0.315,0.301,0.282,0.274,0.377,0.516,0.62,0.734,0.806,0.796,0.764,0.745,0.721,0.698,0.69,0.677,0.664,0.629,0.597,0.574,0.53,0.49,0.447,0.391,0.336,0.29,0.263,0.246,0.232,0.218,0.202,0.186,0.164,0.136,0.132,0.134,0.131,0.15,0.276,0.381,0.475,0.548,0.547,0.534,0.509,0.468,0.416,0.363,0.323,0.293,0.258,0.21,0.169,0.135,0.108,0.087,0.069,0.055,0.044,0.036,0.028,0.023,0.018,0.015,0.012,0.009,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.057,0.113,0.154,0.22,0.277,0.382,0.548,0.741,0.851,0.915,0.909,0.92,0.954,0.974,0.985,0.991,0.995,0.986,0.992,0.995,0.979,0.966,0.981,0.958,0.866,0.784,0.708,0.649,0.614,0.596,0.577,0.54,0.516,0.636,0.714,0.707,0.808,0.858,0.915,0.951,0.957,0.947,0.961,0.931,0.894,0.86,0.806,0.803,0.832,0.851,0.849,0.868,0.877,0.836,0.784,0.726,0.642,0.557,0.465,0.379,0.307,0.253,0.215,0.195,0.274,0.345,0.392,0.433,0.425,0.446,0.468,0.445,0.419,0.386,0.325,0.26,0.209,0.192,0.183,0.299,0.397,0.409,0.427,0.416,0.387,0.373,0.377,0.402,0.405,0.395,0.371,0.337,0.3,0.264,0.237,0.218,0.206,0.207,0.252,0.289,0.278,0.234,0.229,0.29,0.344,0.352,0.35,0.345,0.339,0.331,0.316,0.287,0.236,0.194,0.155,0.124,0.1,0.09,0.087,0.086,0.087,0.091,0.1,0.102,0.101,0.1,0.104,0.103,0.093,0.095,0.105,0.108,0.166,0.235,0.25,0.244,0.248,0.238,0.218,0.198,0.183,0.168,0.149,0.143,0.142,0.135,0.128,0.122,0.118,0.112,0.104,0.088,0.07,0.062,0.049,0.039,0.032,0.025,0.02,0.016,0.013,0.01,0.046,0.1,0.125,0.128,0.141,0.176,0.191,0.182,0.174,0.169,0.154,0.123,0.099,0.079,0.063,0.051,0.043,0.044,0.036,0.029,0.023,0.019,0.015,0.012,0.01,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}]'),v1={tracks:_1},Vr={tray_slide:{url:"./audio/sfx/tray_slide.mp3",gain:.34,cooldown:.4},cola_pour:{url:"./audio/sfx/cola_pour.mp3",gain:.46,cooldown:1},fryer_bubbling:{url:"./audio/sfx/fryer_bubbling.wav",gain:.055,loop:!0},grill_sizzle:{url:"./audio/sfx/grill_sizzle.wav",gain:.05,loop:!0},door_bell:{url:"./audio/sfx/door_bell.mp3",gain:.18,cooldown:6},cash_register:{url:"./audio/sfx/cash_register.mp3",gain:.23,cooldown:1}},Ch=r=>Number.isFinite(Number(r))?Math.max(0,Math.min(1,Number(r))):.7;class y1{constructor({enabled:e=!0,volume:t=.7,fetcher:n=i=>globalThis.fetch(i)}={}){this.enabled=e,this.volume=Ch(t),this.fetcher=n,this.phase="menu",this.shift=0,this.context=null,this.buffers=new Map,this.loading=new Map,this.errors=new Map,this.sources=new Map,this.last=new Map,this.played={},this.dropped=0,this.ducked=!1}attach(e){if(!this.context){this.context=e,this.output=e.createGain(),this.output.gain.value=this.volume,this.output.connect(e.destination),this.loopBus=e.createGain(),this.loopBus.connect(this.output),this.shotBus=e.createGain(),this.shotBus.connect(this.output);for(const[t,n]of Object.entries(Vr)){const i=Promise.resolve().then(()=>this.fetcher(n.url)).then(s=>{if(!s.ok)throw new Error("HTTP "+s.status);return s.arrayBuffer()}).then(s=>e.decodeAudioData(s)).then(s=>{this.buffers.set(t,s)}).catch(s=>{this.errors.set(t,String(s.message||s))});this.loading.set(t,i)}}}allowed(){return this.enabled&&this.volume>0&&this.phase==="playing"&&this.context?.state==="running"}setVolume(e){this.volume=Ch(e),this.output&&this.output.gain.setTargetAtTime(this.volume,this.context.currentTime,.04),this.volume===0&&this.stop()}setEnabled(e){this.enabled=e,e||this.stop()}setState(e,t=0){(e!==this.phase||t!==this.shift)&&((e!=="playing"||t!==this.shift)&&this.stop(),(["menu","intro"].includes(e)||t!==this.shift)&&this.last.clear(),this.phase=e,this.shift=t)}sync({speaking:e=!1,stations:t=[0,2]}={}){if(this.context){if(this.ducked!==e){this.ducked=e;const n=this.context.currentTime;this.loopBus.gain.setTargetAtTime(e?.22:1,n,e?.16:.55),this.shotBus.gain.setTargetAtTime(e?.7:1,n,e?.1:.4)}if(this.allowed()){for(const[n,i]of Object.entries(Vr))if(i.loop)if(t.includes(n==="grill_sizzle"?0:2))!this.sources.has(n)&&this.buffers.has(n)&&this.start(n);else{const a=this.sources.get(n);a&&this.stopSource(a)}}}}start(e,{result:t=!1}={}){const n=Vr[e],i=this.buffers.get(e),s=t&&e==="cash_register"&&["intermission","won"].includes(this.phase)&&this.enabled&&this.volume>0&&this.context?.state==="running";if(!n||!i||!this.allowed()&&!s)return!1;const a=this.context,o=a.createBufferSource(),l=a.createGain(),c={source:o,gain:l,stopping:!1,loop:!!n.loop};o.buffer=i,o.loop=!!n.loop,o.connect(l),l.connect(n.loop?this.loopBus:this.shotBus);const h=a.currentTime;return l.gain.setValueAtTime(n.loop?0:n.gain,h),n.loop&&l.gain.setTargetAtTime(n.gain,h,.25),o.onended=()=>{o.disconnect(),l.disconnect(),this.sources.get(e)===c&&this.sources.delete(e)},this.sources.set(e,c),o.start(),this.played[e]=(this.played[e]||0)+1,!0}play(e,{result:t=!1}={}){const n=Vr[e],i=this.context?.currentTime??0,s=t&&e==="cash_register"&&["intermission","won"].includes(this.phase)&&this.enabled&&this.volume>0&&this.context?.state==="running";return!n||n.loop||!this.allowed()&&!s||!this.buffers.has(e)||this.sources.has(e)||i-(this.last.get(e)??-1/0)<n.cooldown||[...this.sources.values()].filter(a=>!a.loop).length>=3?(this.dropped++,!1):this.start(e,{result:t})?(this.last.set(e,i),!0):!1}event(e){return e.type==="throw"?this.play("tray_slide"):e.type==="pickup"&&e.food==="cola"?this.play("cola_pour"):e.type==="customer"?this.play("door_bell"):e.type==="served"?this.play("cash_register",{result:!0}):!1}stop(){if(this.context)for(const e of this.sources.values())this.stopSource(e)}stopSource(e){if(e.stopping)return;const t=this.context.currentTime;e.stopping=!0,e.gain.gain.cancelScheduledValues(t),e.gain.gain.setTargetAtTime(0,t,.012);try{e.source.stop(t+.07)}catch{}}get diagnostics(){return{phase:this.phase,context:this.context?.state||"locked",enabled:this.enabled,volume:this.volume,decoded:[...this.buffers.keys()],errors:Object.fromEntries(this.errors),active:[...this.sources.entries()].filter(([,e])=>!e.stopping).map(([e])=>e),retiring:[...this.sources.entries()].filter(([,e])=>e.stopping).map(([e])=>e),played:{...this.played},dropped:this.dropped,ducked:this.ducked,loopGain:this.loopBus?.gain.value??0}}}class b1{constructor(e=!0,t=.22,n=.7,i=!0,s=.9){this.enabled=e,this.context=null,this.master=null,this.sfx=new y1({enabled:e,volume:n}),this.notes=new Set,this.phase="menu",this.music=new m1(document.getElementById("background-music"),{enabled:e,volume:t}),this.voiceEnabled=i,this.speech=new x1(document.getElementById("intro-speech"),{enabled:e&&i,envelopes:v1.tracks,cancelFallback:()=>window.speechSynthesis?.cancel()}),this.speech.setVolume(s),this.refreshVoiceEnabled(),this.voiceDirector=new c1(this.speech)}unlock(){this.music.retry();const e=window.AudioContext||window.webkitAudioContext;e&&(this.context||=new e,this.master||(this.master=this.context.createGain(),this.master.gain.value=this.enabled?.18*this.sfx.volume:0,this.master.connect(this.context.destination)),this.sfx.attach(this.context),this.context.state==="suspended"&&this.context.resume().catch(()=>{}))}setEnabled(e){this.enabled=e,this.music.setEnabled(e),this.refreshVoiceEnabled(),this.sfx.setEnabled(e),e||this.stopSpeech(),e||this.stopNotes(),this.master&&this.master.gain.setTargetAtTime(e?.18*this.sfx.volume:0,this.context.currentTime,.03)}refreshVoiceEnabled(){this.speech.setEnabled(this.enabled&&this.voiceEnabled&&this.speech.volume>0)}setVoiceEnabled(e){this.voiceEnabled=e,this.refreshVoiceEnabled()}setVoiceVolume(e){this.speech.setVolume(e),this.refreshVoiceEnabled()}setSfxVolume(e){this.sfx.setVolume(e),this.master&&this.master.gain.setTargetAtTime(this.enabled?.18*this.sfx.volume:0,this.context.currentTime,.04),this.sfx.volume===0&&this.stopNotes()}stopNotes(){for(const e of this.notes)try{e.stop()}catch{}this.notes.clear()}syncMusic(e){const t=document.hidden?"paused":e.phase;t!==this.phase&&t!=="playing"&&this.stopNotes(),this.phase=t,this.elapsed=e.elapsed,this.music.setState(t,e.shift),this.sfx.setState(t,e.shift),this.voiceDirector.sync(e,{visible:!document.hidden});const n=this.speech.playing;this.music.updateDucking(n,performance.now()),this.sfx.sync({speaking:!!n,stations:e.activeStations})}stopAll(){this.stopSpeech(),this.stopNotes(),this.sfx.setState("paused"),this.music.pause(!1)}stopSpeech(){this.speech.stop()}speakIntro(e){this.voiceDirector.intro(e)}get voiceDiagnostics(){return{phase:this.voiceDirector.phase,enabled:this.voiceEnabled,volume:this.speech.volume,request:this.speech.request?.id||null,playing:this.speech.playing,blocked:this.speech.blocked,subtitle:this.speech.subtitle,error:this.speech.lastError,played:this.voiceDirector.played,dropped:this.voiceDirector.dropped,musicDuck:this.music.duck,sfxDuck:this.sfx.ducked,totalSamples:Bu.length}}note(e,t=.12,n=0,i="sine",s=.5){if(!this.enabled||!this.context||this.context.state!=="running")return;const a=this.context.currentTime+n,o=this.context.createOscillator(),l=this.context.createGain();o.type=i,o.frequency.value=e,l.gain.setValueAtTime(.001,a),l.gain.exponentialRampToValueAtTime(s,a+.008),l.gain.exponentialRampToValueAtTime(.001,a+t),o.connect(l),l.connect(this.master),this.notes.add(o),o.onended=()=>{this.notes.delete(o),o.disconnect(),l.disconnect()},o.start(a),o.stop(a+t+.02)}effect(e){typeof e=="string"&&(e={type:e});const{type:t}=e;Number.isFinite(e.time)&&this.elapsed-e.time>.3||(this.voiceDirector.event(e),this.sfx.event(e),t==="pickup"&&e.food!=="cola"?(this.note(440,.09,0,"triangle",.55),this.note(660,.11,.06,"triangle",.5)):t==="partial"?(this.note(784,.12,0,"sine",.6),this.note(1175,.18,.075,"sine",.5)):t==="wrong"||t==="waste"?(this.note(165,.18,0,"triangle",.55),this.note(130,.18,.12,"triangle",.5)):t==="miss"||t==="lost"?(this.note(220,.22,0,"triangle",.6),this.note(165,.22,.14,"triangle",.5),this.note(110,.35,.28,"triangle",.5)):["won","intermission","start","shift"].includes(t)?[392,494,587,784].forEach((n,i)=>this.note(n,.2,i*.09,"triangle",.45)):t==="move"?this.note(330,.035,0,"sine",.1):t==="discard"&&this.note(180,.1,0,"triangle",.15))}}const yn=new Zu,Yr=new b1(Ei("sound",!0),Ei("musicVolume",.22),Ei("sfxVolume",.7),Ei("voiceEnabled",!0),Ei("voiceVolume",.9)),ci=new f1(yn,Yr);let nn;try{nn=new a1(document.getElementById("game-stage"),{quality:ci.quality,onProgress:r=>ci.setProgress(r),onReady:()=>ci.setReady(),onError:r=>{console.error("Roary model failed to load",r),ci.setError()}}),ci.bindView(nn)}catch(r){console.error("Restaurant renderer could not start",r),document.getElementById("game-stage").innerHTML='<section class="fatal-message"><h1>Die Küche braucht WebGL.</h1><p>Aktiviere die Hardwarebeschleunigung deines Browsers und lade die Seite erneut. Roary wartet auf dich.</p><button class="primary-button" onclick="location.reload()">Erneut versuchen</button></section>'}if(nn){let r=performance.now(),e=0,t=0,n=null;const i=1/60,s=a=>{const o=Math.max(0,Math.min((a-r)/1e3,.1));if(r=a,yn.phase==="playing")for(e=Math.min(e+o,.15);e>=i;)yn.step(i),e-=i;else e=0;Yr.syncMusic(yn),ci.updateVoiceSubtitle();for(const u of yn.takeEvents())nn.event(u),ci.event(u),Yr.effect(u);if(nn.quality==="auto"){const u=nn.adaptive.sample(o,{active:yn.phase==="playing",visible:!document.hidden});u&&nn.applyQuality(u)}t+=o;const l=n!==yn.phase,c=yn.phase==="paused"&&nn.menuBlend===0&&!nn.needsRender&&!l,h=yn.phase==="menu"||nn.effectiveQuality==="low"?1/30:0;(c||document.hidden)&&(t=0),!document.hidden&&!c&&(l||nn.needsRender||t>=h)&&(nn.update(yn,Math.min(t,.1),Yr.speech.mouthOpen),ci.update(nn,Math.min(t,.1)),t=0,n=yn.phase),requestAnimationFrame(s)};requestAnimationFrame(s)}
