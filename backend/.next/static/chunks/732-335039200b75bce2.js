(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[732],{6232:function(e,t,i){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,i,r){void 0===r&&(r=i);var s=Object.getOwnPropertyDescriptor(t,i);(!s||("get"in s?!t.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return t[i]}}),Object.defineProperty(e,r,s)}:function(e,t,i,r){void 0===r&&(r=i),e[r]=t[i]}),s=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&r(t,e,i);return s(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.useMicVAD=t.defaultReactRealTimeVADOptions=t.utils=void 0;let n=i(4455),a=o(i(2265));var u=i(4455);Object.defineProperty(t,"utils",{enumerable:!0,get:function(){return u.utils}});let l={startOnLoad:!0,userSpeakingThreshold:.6};t.defaultReactRealTimeVADOptions={...n.defaultRealTimeVADOptions,...l};let c=Object.keys(l),h=Object.keys(n.defaultRealTimeVADOptions),_filter=(e,t)=>e.reduce((e,i)=>(e[i]=t[i],e),{});function useEventCallback(e){let t=a.default.useRef(e);return d(()=>{t.current=e}),a.default.useCallback((...e)=>t.current.apply(void 0,e),[])}t.useMicVAD=function(e){let[i,r]=function(e){e={...t.defaultReactRealTimeVADOptions,...e};let i=_filter(c,e),r=_filter(h,e);return[i,r]}(e),[s,o]=(0,a.useReducer)((e,t)=>t>i.userSpeakingThreshold,!1),[u,l]=(0,a.useState)(!0),[d,p]=(0,a.useState)(!1),[f,m]=(0,a.useState)(!1),[g,v]=(0,a.useState)(null);useEventCallback(r.onFrameProcessed),r.onFrameProcessed=useEventCallback(e=>{o(e.isSpeech)});let{onSpeechEnd:S,onSpeechStart:_,onVADMisfire:y}=r,w=useEventCallback(S),b=useEventCallback(_),A=useEventCallback(y);r.onSpeechEnd=w,r.onSpeechStart=b,r.onVADMisfire=A,(0,a.useEffect)(()=>{let setup=async()=>{let e;try{e=await n.MicVAD.new(r)}catch(e){l(!1),e instanceof Error?p({message:e.message}):p({message:e});return}v(e),l(!1),i.startOnLoad&&(e?.start(),m(!0))};return setup().catch(e=>{console.log("Well that didn't work")}),function(){u||d||(g?.pause(),m(!1))}},[]);let pause=()=>{u||d||(g?.pause(),m(!1))},start=()=>{u||d||(g?.start(),m(!0))};return{listening:f,errored:d,loading:u,userSpeaking:s,pause,start,toggle:()=>{f?pause():start()}}};let d="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement?a.default.useLayoutEffect:a.default.useEffect},1898:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FrameProcessor=t.validateOptions=t.defaultFrameProcessorOptions=void 0;let r=i(3592),s=i(4649),o=[512,1024,1536];t.defaultFrameProcessorOptions={positiveSpeechThreshold:.5,negativeSpeechThreshold:.35,preSpeechPadFrames:1,redemptionFrames:8,frameSamples:1536,minSpeechFrames:3},t.validateOptions=function(e){o.includes(e.frameSamples)||s.log.warn("You are using an unusual frame size"),(e.positiveSpeechThreshold<0||e.negativeSpeechThreshold>1)&&s.log.error("postiveSpeechThreshold should be a number between 0 and 1"),(e.negativeSpeechThreshold<0||e.negativeSpeechThreshold>e.positiveSpeechThreshold)&&s.log.error("negativeSpeechThreshold should be between 0 and postiveSpeechThreshold"),e.preSpeechPadFrames<0&&s.log.error("preSpeechPadFrames should be positive"),e.redemptionFrames<0&&s.log.error("preSpeechPadFrames should be positive")};let concatArrays=e=>{let t=e.reduce((e,t)=>(e.push(e.at(-1)+t.length),e),[0]),i=new Float32Array(t.at(-1));return e.forEach((e,r)=>{let s=t[r];i.set(e,s)}),i};t.FrameProcessor=class{constructor(e,t,i){this.modelProcessFunc=e,this.modelResetFunc=t,this.options=i,this.speaking=!1,this.redemptionCounter=0,this.active=!1,this.reset=()=>{this.speaking=!1,this.audioBuffer=[],this.modelResetFunc(),this.redemptionCounter=0},this.pause=()=>{this.active=!1,this.reset()},this.resume=()=>{this.active=!0},this.endSegment=()=>{let e=this.audioBuffer;this.audioBuffer=[];let t=this.speaking;this.reset();let i=e.reduce((e,t)=>e+ +t.isSpeech,0);if(t){if(!(i>=this.options.minSpeechFrames))return{msg:r.Message.VADMisfire};{let t=concatArrays(e.map(e=>e.frame));return{msg:r.Message.SpeechEnd,audio:t}}}return{}},this.process=async e=>{if(!this.active)return{};let t=await this.modelProcessFunc(e);if(this.audioBuffer.push({frame:e,isSpeech:t.isSpeech>=this.options.positiveSpeechThreshold}),t.isSpeech>=this.options.positiveSpeechThreshold&&this.redemptionCounter&&(this.redemptionCounter=0),t.isSpeech>=this.options.positiveSpeechThreshold&&!this.speaking)return this.speaking=!0,{probs:t,msg:r.Message.SpeechStart};if(t.isSpeech<this.options.negativeSpeechThreshold&&this.speaking&&++this.redemptionCounter>=this.options.redemptionFrames){this.redemptionCounter=0,this.speaking=!1;let e=this.audioBuffer;this.audioBuffer=[];let i=e.reduce((e,t)=>e+ +t.isSpeech,0);if(!(i>=this.options.minSpeechFrames))return{probs:t,msg:r.Message.VADMisfire};{let i=concatArrays(e.map(e=>e.frame));return{probs:t,msg:r.Message.SpeechEnd,audio:i}}}if(!this.speaking)for(;this.audioBuffer.length>this.options.preSpeechPadFrames;)this.audioBuffer.shift();return{probs:t}},this.audioBuffer=[],this.reset()}}},8239:function(e,t,i){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,i,r){void 0===r&&(r=i);var s=Object.getOwnPropertyDescriptor(t,i);(!s||("get"in s?!t.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return t[i]}}),Object.defineProperty(e,r,s)}:function(e,t,i,r){void 0===r&&(r=i),e[r]=t[i]}),s=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&r(t,e,i);return s(t,e),t},n=this&&this.__exportStar||function(e,t){for(var i in e)"default"===i||Object.prototype.hasOwnProperty.call(t,i)||r(t,e,i)};Object.defineProperty(t,"__esModule",{value:!0}),t.utils=void 0;let a=o(i(79));t.utils={minFramesForTargetMS:a.minFramesForTargetMS,arrayBufferToBase64:a.arrayBufferToBase64,encodeWAV:a.encodeWAV},n(i(1883),t),n(i(1898),t),n(i(3592),t),n(i(4649),t),n(i(7440),t),n(i(1917),t)},4649:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.log=t.LOG_PREFIX=void 0,t.LOG_PREFIX="[VAD]";let i=["error","debug","warn"].reduce((e,i)=>(e[i]=(...e)=>{console[i](t.LOG_PREFIX,...e)},e),{});t.log=i},3592:function(e,t){"use strict";var i;Object.defineProperty(t,"__esModule",{value:!0}),t.Message=void 0,(i=t.Message||(t.Message={})).AudioFrame="AUDIO_FRAME",i.SpeechStart="SPEECH_START",i.VADMisfire="VAD_MISFIRE",i.SpeechEnd="SPEECH_END"},7440:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Silero=void 0;let r=i(4649);let Silero=class Silero{constructor(e,t){this.ort=e,this.modelFetcher=t,this.init=async()=>{r.log.debug("initializing vad");let e=await this.modelFetcher();this._session=await this.ort.InferenceSession.create(e),this._sr=new this.ort.Tensor("int64",[16000n]),this.reset_state(),r.log.debug("vad is initialized")},this.reset_state=()=>{let e=Array(128).fill(0);this._h=new this.ort.Tensor("float32",e,[2,1,64]),this._c=new this.ort.Tensor("float32",e,[2,1,64])},this.process=async e=>{let t=new this.ort.Tensor("float32",e,[1,e.length]),i={input:t,h:this._h,c:this._c,sr:this._sr},r=await this._session.run(i);this._h=r.hn,this._c=r.cn;let[s]=r.output.data;return{notSpeech:1-s,isSpeech:s}}}};t.Silero=Silero,Silero.new=async(e,t)=>{let i=new Silero(e,t);return await i.init(),i}},1883:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PlatformAgnosticNonRealTimeVAD=t.defaultNonRealTimeVADOptions=void 0;let r=i(1898),s=i(3592),o=i(7440),n=i(1917);t.defaultNonRealTimeVADOptions={...r.defaultFrameProcessorOptions},t.PlatformAgnosticNonRealTimeVAD=class{static async _new(e,i,r={}){let s=new this(e,i,{...t.defaultNonRealTimeVADOptions,...r});return await s.init(),s}constructor(e,t,i){this.modelFetcher=e,this.ort=t,this.options=i,this.init=async()=>{let e=await o.Silero.new(this.ort,this.modelFetcher);this.frameProcessor=new r.FrameProcessor(e.process,e.reset_state,{frameSamples:this.options.frameSamples,positiveSpeechThreshold:this.options.positiveSpeechThreshold,negativeSpeechThreshold:this.options.negativeSpeechThreshold,redemptionFrames:this.options.redemptionFrames,preSpeechPadFrames:this.options.preSpeechPadFrames,minSpeechFrames:this.options.minSpeechFrames}),this.frameProcessor.resume()},this.run=async function*(e,t){let i,r;let o={nativeSampleRate:t,targetSampleRate:16e3,targetFrameSize:this.options.frameSamples},a=new n.Resampler(o),u=a.process(e);for(let e of[...Array(u.length)].keys()){let t=u[e],{msg:o,audio:n}=await this.frameProcessor.process(t);switch(o){case s.Message.SpeechStart:i=e*this.options.frameSamples/16;break;case s.Message.SpeechEnd:r=(e+1)*this.options.frameSamples/16,yield{audio:n,start:i,end:r}}}let{msg:l,audio:c}=this.frameProcessor.endSegment();l==s.Message.SpeechEnd&&(yield{audio:c,start:i,end:u.length*this.options.frameSamples/16})},(0,r.validateOptions)(i)}}},1917:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Resampler=void 0;let r=i(4649);t.Resampler=class{constructor(e){this.options=e,this.process=e=>{let t=[];for(let t of e)this.inputBuffer.push(t);for(;this.inputBuffer.length*this.options.targetSampleRate/this.options.nativeSampleRate>this.options.targetFrameSize;){let e=new Float32Array(this.options.targetFrameSize),i=0,r=0;for(;i<this.options.targetFrameSize;){let t=0,s=0;for(;r<Math.min(this.inputBuffer.length,(i+1)*this.options.nativeSampleRate/this.options.targetSampleRate);)t+=this.inputBuffer[r],s++,r++;e[i]=t/s,i++}this.inputBuffer=this.inputBuffer.slice(r),t.push(e)}return t},e.nativeSampleRate<16e3&&r.log.error("nativeSampleRate is too low. Should have 16000 = targetSampleRate <= nativeSampleRate"),this.inputBuffer=[]}}},79:function(e,t){"use strict";function writeString(e,t,i){for(var r=0;r<i.length;r++)e.setUint8(t+r,i.charCodeAt(r))}Object.defineProperty(t,"__esModule",{value:!0}),t.encodeWAV=t.arrayBufferToBase64=t.minFramesForTargetMS=void 0,t.minFramesForTargetMS=function(e,t,i=16e3){return Math.ceil(e*i/1e3/t)},t.arrayBufferToBase64=function(e){for(var t="",i=new Uint8Array(e),r=i.byteLength,s=0;s<r;s++)t+=String.fromCharCode(i[s]);return btoa(t)},t.encodeWAV=function(e,t=3,i=16e3,r=1,s=32){var o=s/8,n=r*o,a=new ArrayBuffer(44+e.length*o),u=new DataView(a);return writeString(u,0,"RIFF"),u.setUint32(4,36+e.length*o,!0),writeString(u,8,"WAVE"),writeString(u,12,"fmt "),u.setUint32(16,16,!0),u.setUint16(20,t,!0),u.setUint16(22,r,!0),u.setUint32(24,i,!0),u.setUint32(28,i*n,!0),u.setUint16(32,n,!0),u.setUint16(34,s,!0),writeString(u,36,"data"),u.setUint32(40,e.length*o,!0),1===t?function(e,t,i){for(var r=0;r<i.length;r++,t+=2){var s=Math.max(-1,Math.min(1,i[r]));e.setInt16(t,s<0?32768*s:32767*s,!0)}}(u,44,e):function(e,t,i){for(var r=0;r<i.length;r++,t+=4)e.setFloat32(t,i[r],!0)}(u,44,e),a}},3049:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.assetPath=void 0;let i=window.document.currentScript,r="";i&&(r=i.src.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/")),t.assetPath=e=>r+e},4455:function(e,t,i){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,i,r){void 0===r&&(r=i);var s=Object.getOwnPropertyDescriptor(t,i);(!s||("get"in s?!t.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return t[i]}}),Object.defineProperty(e,r,s)}:function(e,t,i,r){void 0===r&&(r=i),e[r]=t[i]}),s=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&r(t,e,i);return s(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.defaultRealTimeVADOptions=t.AudioNodeVAD=t.MicVAD=t.NonRealTimeVAD=t.Message=t.FrameProcessor=t.utils=void 0;let n=o(i(2582)),a=i(8239);Object.defineProperty(t,"FrameProcessor",{enumerable:!0,get:function(){return a.FrameProcessor}}),Object.defineProperty(t,"Message",{enumerable:!0,get:function(){return a.Message}});let u=i(6950),l=i(4021);let NonRealTimeVAD=class NonRealTimeVAD extends a.PlatformAgnosticNonRealTimeVAD{static async new(e={}){return await this._new(u.modelFetcher,n,e)}};t.NonRealTimeVAD=NonRealTimeVAD,t.utils={audioFileToArray:l.audioFileToArray,...a.utils};var c=i(8451);Object.defineProperty(t,"MicVAD",{enumerable:!0,get:function(){return c.MicVAD}}),Object.defineProperty(t,"AudioNodeVAD",{enumerable:!0,get:function(){return c.AudioNodeVAD}}),Object.defineProperty(t,"defaultRealTimeVADOptions",{enumerable:!0,get:function(){return c.defaultRealTimeVADOptions}})},6950:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.modelFetcher=void 0;let r=i(3049),modelFetcher=async()=>{let e=(0,r.assetPath)("silero_vad.onnx");return await fetch(e).then(e=>e.arrayBuffer())};t.modelFetcher=modelFetcher},8451:function(e,t,i){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,i,r){void 0===r&&(r=i);var s=Object.getOwnPropertyDescriptor(t,i);(!s||("get"in s?!t.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return t[i]}}),Object.defineProperty(e,r,s)}:function(e,t,i,r){void 0===r&&(r=i),e[r]=t[i]}),s=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&r(t,e,i);return s(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.AudioNodeVAD=t.MicVAD=t.defaultRealTimeVADOptions=void 0;let n=o(i(2582)),a=i(8239),u=i(6950),l=i(3049);t.defaultRealTimeVADOptions={...a.defaultFrameProcessorOptions,onFrameProcessed:e=>{},onVADMisfire:()=>{a.log.debug("VAD misfire")},onSpeechStart:()=>{a.log.debug("Detected speech start")},onSpeechEnd:()=>{a.log.debug("Detected speech end")},workletURL:(0,l.assetPath)("vad.worklet.bundle.min.js"),stream:void 0};let MicVAD=class MicVAD{static async new(e={}){let i=new MicVAD({...t.defaultRealTimeVADOptions,...e});return await i.init(),i}constructor(e){this.options=e,this.listening=!1,this.init=async()=>{void 0===this.options.stream?this.stream=await navigator.mediaDevices.getUserMedia({audio:{...this.options.additionalAudioConstraints,channelCount:1,echoCancellation:!0,autoGainControl:!0,noiseSuppression:!0}}):this.stream=this.options.stream,this.audioContext=new AudioContext;let e=new MediaStreamAudioSourceNode(this.audioContext,{mediaStream:this.stream});this.audioNodeVAD=await AudioNodeVAD.new(this.audioContext,this.options),this.audioNodeVAD.receive(e)},this.pause=()=>{this.audioNodeVAD.pause(),this.listening=!1},this.start=()=>{this.audioNodeVAD.start(),this.listening=!0},(0,a.validateOptions)(e)}};t.MicVAD=MicVAD;let AudioNodeVAD=class AudioNodeVAD{static async new(e,i={}){let r=new AudioNodeVAD(e,{...t.defaultRealTimeVADOptions,...i});return await r.init(),r}constructor(e,t){this.ctx=e,this.options=t,this.pause=()=>{this.frameProcessor.pause()},this.start=()=>{this.frameProcessor.resume()},this.receive=e=>{e.connect(this.entryNode)},this.processFrame=async e=>{let{probs:t,msg:i,audio:r}=await this.frameProcessor.process(e);switch(void 0!==t&&this.options.onFrameProcessed(t),i){case a.Message.SpeechStart:this.options.onSpeechStart();break;case a.Message.VADMisfire:this.options.onVADMisfire();break;case a.Message.SpeechEnd:this.options.onSpeechEnd(r)}},this.init=async()=>{await this.ctx.audioWorklet.addModule(this.options.workletURL);let e=new AudioWorkletNode(this.ctx,"vad-helper-worklet",{processorOptions:{frameSamples:this.options.frameSamples}});this.entryNode=e;let t=await a.Silero.new(n,u.modelFetcher);this.frameProcessor=new a.FrameProcessor(t.process,t.reset_state,{frameSamples:this.options.frameSamples,positiveSpeechThreshold:this.options.positiveSpeechThreshold,negativeSpeechThreshold:this.options.negativeSpeechThreshold,redemptionFrames:this.options.redemptionFrames,preSpeechPadFrames:this.options.preSpeechPadFrames,minSpeechFrames:this.options.minSpeechFrames}),e.port.onmessage=async e=>{if(e.data?.message===a.Message.AudioFrame){let t=e.data.data,i=new Float32Array(t);await this.processFrame(i)}}},(0,a.validateOptions)(t)}};t.AudioNodeVAD=AudioNodeVAD},4021:function(e,t){"use strict";async function audioFileToArray(e){let t=new OfflineAudioContext(1,1,44100),i=new FileReader,r=null;if(await new Promise(s=>{i.addEventListener("loadend",e=>{let o=i.result;t.decodeAudioData(o,e=>{r=e,t.startRendering().then(e=>{console.log("Rendering completed successfully"),s()}).catch(e=>{console.error(`Rendering failed: ${e}`)})},e=>{console.log(`Error with decoding audio data: ${e}`)})}),i.readAsArrayBuffer(e)}),null===r)throw Error("some shit");let s=r,o=new Float32Array(s.length);for(let e=0;e<s.length;e++)for(let t=0;t<s.numberOfChannels;t++)o[e]+=s.getChannelData(t)[e];return{audio:o,sampleRate:s.sampleRate}}Object.defineProperty(t,"__esModule",{value:!0}),t.audioFileToArray=void 0,t.audioFileToArray=audioFileToArray},2601:function(e,t,i){"use strict";var r,s;e.exports=(null==(r=i.g.process)?void 0:r.env)&&"object"==typeof(null==(s=i.g.process)?void 0:s.env)?i.g.process:i(8960)},8960:function(e){!function(){var t={229:function(e){var t,i,r,s=e.exports={};function defaultSetTimout(){throw Error("setTimeout has not been defined")}function defaultClearTimeout(){throw Error("clearTimeout has not been defined")}function runTimeout(e){if(t===setTimeout)return setTimeout(e,0);if((t===defaultSetTimout||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(i){try{return t.call(null,e,0)}catch(i){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:defaultSetTimout}catch(e){t=defaultSetTimout}try{i="function"==typeof clearTimeout?clearTimeout:defaultClearTimeout}catch(e){i=defaultClearTimeout}}();var o=[],n=!1,a=-1;function cleanUpNextTick(){n&&r&&(n=!1,r.length?o=r.concat(o):a=-1,o.length&&drainQueue())}function drainQueue(){if(!n){var e=runTimeout(cleanUpNextTick);n=!0;for(var t=o.length;t;){for(r=o,o=[];++a<t;)r&&r[a].run();a=-1,t=o.length}r=null,n=!1,function(e){if(i===clearTimeout)return clearTimeout(e);if((i===defaultClearTimeout||!i)&&clearTimeout)return i=clearTimeout,clearTimeout(e);try{i(e)}catch(t){try{return i.call(null,e)}catch(t){return i.call(this,e)}}}(e)}}function Item(e,t){this.fun=e,this.array=t}function noop(){}s.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var i=1;i<arguments.length;i++)t[i-1]=arguments[i];o.push(new Item(e,t)),1!==o.length||n||runTimeout(drainQueue)},Item.prototype.run=function(){this.fun.apply(null,this.array)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=noop,s.addListener=noop,s.once=noop,s.off=noop,s.removeListener=noop,s.removeAllListeners=noop,s.emit=noop,s.prependListener=noop,s.prependOnceListener=noop,s.listeners=function(e){return[]},s.binding=function(e){throw Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(e){throw Error("process.chdir is not supported")},s.umask=function(){return 0}}},i={};function __nccwpck_require__(e){var r=i[e];if(void 0!==r)return r.exports;var s=i[e]={exports:{}},o=!0;try{t[e](s,s.exports,__nccwpck_require__),o=!1}finally{o&&delete i[e]}return s.exports}__nccwpck_require__.ab="//";var r=__nccwpck_require__(229);e.exports=r}()}}]);