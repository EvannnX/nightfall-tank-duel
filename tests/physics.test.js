const assert=require('node:assert/strict'),P=require('../assets/physics.js'),w=P.WEAPONS[0];
assert.equal(P.W,1440*1.5);assert.equal(P.terrain().length,2160);
const ground=Array(P.W).fill(515),tank={id:0,x:278,y:515,hp:100,moveLeft:P.MOVE_BUDGET};
assert(P.simulate(tank,45,65,w,ground,0,[]).x>P.simulate(tank,45,35,w,ground,0,[]).x);
assert(P.simulate(tank,60,60,w,ground,15,[]).x>P.simulate(tank,60,60,w,ground,-15,[]).x);
P.move(tank,1,1,ground,[tank]);assert.equal(tank.x,314);P.move(tank,-1,10,ground,[tank]);assert.equal(tank.x,290);assert.equal(tank.moveLeft,0);assert.equal(P.move(tank,1,1,ground,[tank]),0);
tank.moveLeft=60;assert.equal(P.move(tank,1,10,ground,[tank]),60);
tank.x=35;tank.moveLeft=60;assert.equal(P.move(tank,-1,10,ground,[tank]),0);
tank.x=278;const enemy={id:1,x:350};assert(P.move(tank,1,10,ground,[tank,enemy])<=2);
const wall=ground.slice();wall.fill(400,280);tank.x=278;tank.moveLeft=60;assert.equal(P.move(tank,1,1,wall,[tank]),0);
const damaged=ground.slice();P.crater(damaged,1800,515,80);assert(damaged[1800]>515);assert.equal(damaged[1500],515);assert(damaged.every(y=>y<=P.H-34));
assert.equal(P.impactDamage({id:1,x:700,y:515},{x:700,y:495,direct:1},w),36);
assert.equal(P.impactDamage({id:1,x:1000,y:515},{x:700,y:495},w),0);
assert(P.impactDamage({id:0,x:278,y:515},{x:278,y:500},w)>0);
for(const seed of [1,2,3])for(const wind of [-9,0,9])for(const id of [0,1]){
 const g=P.terrain('duel',seed),tanks=[{id:0,x:278,y:g[278]},{id:1,x:1785,y:g[1785]}],shooter=tanks[id],target=tanks[1-id];let found=false;
 for(let a=15;a<85&&!found;a+=2)for(let p=30;p<=100;p++){const hit=P.simulate(shooter,id?180-a:a,p,w,g,wind,tanks);if(!hit.out&&P.impactDamage(target,hit,w)>0){found=true;break;}}
 assert(found,'Both tanks can hit across expanded map: '+seed+'/'+wind+'/'+id);
}
for(const weapon of P.WEAPONS){const p=P.launch({id:0,x:278,y:515},90,100,weapon);let hit;for(let i=0;i<2000&&!hit;i++)hit=P.step(p,ground,0,[]);assert(hit);}
for(const slope of [-.32,0,.32])for(const angle of [0,30,48,90,132,180]){
 const tank={id:0,x:278.5,y:400,angle,slope},gun=P.pose(tank),shot=P.launch(tank,angle,66,w),r=angle*Math.PI/180;
 assert.equal(shot.x,gun.muzzle.x);assert.equal(shot.y,gun.muzzle.y);assert.deepEqual(shot.path[0],[gun.muzzle.x,gun.muzzle.y]);
 assert(Math.abs((gun.muzzle.x-gun.pivot.x)*shot.vy-(gun.muzzle.y-gun.pivot.y)*shot.vx)<1e-8,'barrel and velocity are collinear');
 for(const spread of [-5,5]){const cluster=P.launch(tank,angle,66,P.WEAPONS[2],spread);assert.equal(cluster.x,shot.x);assert.equal(cluster.y,shot.y);}
}
for(const map of Object.keys(P.MAPS))for(const wind of [-P.MAPS[map].wind,0,P.MAPS[map].wind])for(const id of [0,1]){
 const g=P.terrain(map,2),tanks=[{id:0,x:278,y:g[278]},{id:1,x:1785,y:g[1785]}];for(const t of tanks)t.slope=P.slopeAt(t,g);let reachable=false;
 for(let angle=16;angle<86&&!reachable;angle+=2)for(let power=30;power<=100;power++){const hit=P.simulate(tanks[id],id?180-angle:angle,power,w,g,wind,tanks);if(!hit.out&&P.impactDamage(tanks[1-id],hit,w)>0){reachable=true;break;}}
 assert(reachable,map+' must support combat from both sides at wind '+wind);
}
console.log('PASS: movement/collision/damage, muzzle and velocity alignment at 18 slope/angle combinations, common cluster origin, all 3 maps reachable from both sides at wind extremes.');
