/* Local CC0 samples. See audio/CREDITS.md. */
window.BattleAudio=(()=>{
 const files={fire:'fire.ogg',impact:'impact.ogg',armor:'armor.ogg',engine:'engine.mp3'},buffers={},active=new Set();
 let context,master,engine,enabled=true,ready,generation=0;
 const downloads=Object.fromEntries(Object.entries(files).map(([key,file])=>[key,fetch('assets/audio/'+file).then(res=>{if(!res.ok)throw Error(file);return res.arrayBuffer();}).catch(()=>null)]));
 function unlock(){if(!context){context=new(window.AudioContext||window.webkitAudioContext)();master=context.createGain();master.gain.value=enabled?.65:0;master.connect(context.destination);ready=Promise.all(Object.entries(files).map(async([key,file])=>{try{const data=await downloads[key];if(!data)throw Error(file);buffers[key]=await context.decodeAudioData(data);}catch(error){console.warn('Sound unavailable:',file,error);}})).then(()=>{document.getElementById('sound').dataset.audioStatus=Object.keys(buffers).length===4?'ready':'unavailable';});}context.resume();return ready;}
 function play(key,x=.5,volume=1,rate=1,loop=false){if(!context||!enabled)return null;if(!buffers[key]){if(!loop&&ready){const token=generation;ready.then(()=>{if(buffers[key]&&token===generation)play(key,x,volume,rate);});}return null;}const source=context.createBufferSource(),gain=context.createGain(),pan=context.createStereoPanner();source.buffer=buffers[key];source.playbackRate.value=rate;source.loop=loop;gain.gain.value=volume;pan.pan.value=Math.max(-.8,Math.min(.8,(x-.5)*1.6));source.connect(gain);gain.connect(pan);pan.connect(master);active.add(source);source.onended=()=>{active.delete(source);source.disconnect();gain.disconnect();pan.disconnect();};source.start();if(key==='engine'&&!loop)source.stop(context.currentTime+.24);return source;}
 function movement(moving,x){if(moving&&!engine)engine=play('engine',x,.22,.72,true);else if(!moving&&engine){engine.stop();engine=null;}}
 function stop(){generation++;movement(false);for(const source of active)try{source.stop();}catch{}active.clear();}
 function toggle(){enabled=!enabled;if(master)master.gain.value=enabled?.65:0;if(!enabled)movement(false);return enabled;}
 return {unlock,play,movement,stop,toggle};
})();
