"use strict";exports.id=766,exports.ids=[766],exports.modules={766:(e,o,l)=>{l.r(o),l.d(o,{VadVideoPlayer:()=>VadVideoPlayer,default:()=>i});var t=l(784),s=l(4914),d=l(9885);let VadVideoPlayer=({videoRef:e})=>{let[o,l]=(0,d.useState)(null),[i,a]=(0,d.useState)(!1);return(0,s.useMicVAD)({onSpeechEnd:e=>{let o=s.utils.encodeWAV(e),t=new File([o],"audio.wav");s.utils.arrayBufferToBase64(o),l(t),console.log("Speach ends")}}),(0,d.useEffect)(()=>{if(console.log(i),!i){let fn=async()=>{try{if(a(!0),console.log("useEffect"),o){let l=new FormData;l.append("file",o);let t=await fetch("http://127.0.0.1:3000/audio",{method:"POST",body:l});if(console.log(t),t.ok){let o=await t.json();console.log(o),e.current.currentTime=o.time,e.current.play(),console.log("video is playing")}else console.log("errored")}}catch(e){alert(e)}l(null),a(!1)};fn()}},[o]),(0,t.jsxs)("div",{children:[t.jsx("video",{id:"video",ref:e,src:"videos/S1720001.MP4",controls:!0,autoPlay:!0,muted:!0}),i?t.jsx("div",{children:"処理待ち中"}):t.jsx("div",{children:"喋っていいよ"})]})},i=VadVideoPlayer}};