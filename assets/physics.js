(function(root){
'use strict';
const W=2160,H=670,G=180,DT=1/120,MOVE_BUDGET=60,MOVE_SPEED=36;
const WEAPONS=[
 {id:'shell',name:'Shell',desc:'Standard explosive',glyph:'↗',radius:49,damage:36,speed:1,wind:1,ammo:Infinity},
 {id:'heavy',name:'Heavy',desc:'High damage',glyph:'◈',radius:67,damage:57,speed:.89,wind:.5,ammo:3},
 {id:'scatter',name:'Cluster',desc:'Three projectiles',glyph:'⋔',radius:39,damage:23,speed:1,wind:1.2,ammo:3},
 {id:'digger',name:'Digger',desc:'Deep terrain damage',glyph:'⌄',radius:94,damage:24,speed:1.04,wind:.8,ammo:2}
];
const MAPS={valley:{name:'Night Valley',wind:9,description:'A deep valley with elevated starting positions. Moderate, changing wind.'},ridge:{name:'Broken Ridge',wind:6,description:'A central ridge blocks low shots. Use high arcs or dig through it.'},dunes:{name:'Rolling Hills',wind:15,description:'Open rolling ground, longer sight lines and stronger changing wind.'}};
function terrain(kind='valley',seed=1){return Array.from({length:W},(_,x)=>{const u=x/1.5;if(kind==='ridge')return 490-240*Math.exp(-(((u-720)/180)**2))+12*Math.sin(u/70+seed);if(kind==='dunes')return 455+30*Math.sin(u/115+seed)+18*Math.sin(u/53);return 305+285*Math.exp(-(((u-745)/330)**2))+12*Math.sin(u/49+seed)+9*Math.sin(u/19);});}
// One world-space gun transform shared by rendering, aiming and ballistics.
function pose(tank){const slope=tank.slope||0,r=tank.angle*Math.PI/180,pivot={x:tank.x+29.5*Math.sin(slope),y:tank.y-29.5*Math.cos(slope)},length=35*1.18;return {slope,r,pivot,muzzle:{x:pivot.x+Math.cos(r)*length,y:pivot.y-Math.sin(r)*length}};}
function slopeAt(tank,ground){return Math.max(-.32,Math.min(.32,Math.atan2(ground[Math.min(W-1,Math.round(tank.x+17))]-ground[Math.max(0,Math.round(tank.x-17))],34)));}
function move(tank,direction,dt,ground,tanks){
 if(!direction||tank.hp<=0||tank.moveLeft<=0)return 0;
 const distance=Math.min(MOVE_SPEED*dt,tank.moveLeft),sign=Math.sign(direction);let spent=0;
 // Substeps prevent crossing walls or another tank on a slow frame.
 while(spent<distance-1e-8){const step=Math.min(1,distance-spent),x=tank.x+sign*step;
  if(x<35||x>W-36||tanks.some(t=>t.id!==tank.id&&Math.abs(t.x-x)<70))break;
  const y=ground[Math.round(x)],ahead=ground[Math.round(Math.max(0,Math.min(W-1,x+sign*8)))];
  if(tank.y-y>3||y-ahead>8)break;
  tank.x=x;tank.y=Math.min(tank.y,y);spent+=step;
 }
 tank.moveLeft=Math.max(0,tank.moveLeft-spent);return spent;
}
function launch(tank,angle,power,weapon,offset=0){const gun=pose({...tank,angle}),r=(angle+offset)*Math.PI/180,v=(110+power*6)*weapon.speed;return {x:gun.muzzle.x,y:gun.muzzle.y,vx:Math.cos(r)*v,vy:-Math.sin(r)*v,t:0,path:[[gun.muzzle.x,gun.muzzle.y]],weapon,owner:tank.id};}
function step(p,ground,wind,tanks,dt=DT){p.vx+=wind*p.weapon.wind*dt;p.vy+=G*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.t+=dt;if(p.x<0||p.x>=W||p.y>H+50||p.t>14)return {out:true,x:p.x,y:p.y};for(const t of tanks){if(p.t<.16&&t.id===p.owner)continue;if(Math.abs(p.x-t.x)<21&&p.y>t.y-33&&p.y<t.y+5)return {x:p.x,y:p.y,direct:t.id};}if(p.y>=ground[Math.floor(p.x)])return {x:p.x,y:p.y};return null;}
function crater(ground,x,y,radius){for(let i=Math.max(0,Math.floor(x-radius));i<Math.min(W,Math.ceil(x+radius));i++){const d=i-x,bottom=y+Math.sqrt(Math.max(0,radius*radius-d*d));ground[i]=Math.min(H-34,Math.max(ground[i],bottom));}}
function impactDamage(tank,hit,weapon){const d=Math.hypot(tank.x-hit.x,tank.y-15-hit.y);if(hit.direct===tank.id)return weapon.damage;return Math.round(weapon.damage*Math.max(0,1-d/(weapon.radius+22)));}
function simulate(tank,angle,power,weapon,ground,wind,tanks){const p=launch(tank,angle,power,weapon);for(let i=0;i<1800;i++){const hit=step(p,ground,wind,tanks);if(hit)return hit;}return {out:true,x:p.x,y:p.y};}
const api={W,H,G,DT,MOVE_BUDGET,MOVE_SPEED,WEAPONS,MAPS,pose,slopeAt,terrain,move,launch,step,crater,impactDamage,simulate};root.Artillery=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
