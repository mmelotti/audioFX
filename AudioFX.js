!function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?module.exports=e():t.AudioFX=e()}(this,function(){"use strict";var t=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},e=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),n=function(){function n(e,i,o){t(this,n),this["const"]={QUALITY_MULTIPLIER:30};var r={loop:!1};n.isObject(o)&&(this.options=n.extend(r,o)),this.playing=!1;try{window.AudioContext=window.AudioContext||window.webkitAudioContext,this.context=new AudioContext}catch(s){n.error("Web Audio API is not supported in this browser")}this.url=e,n.isFunction(i)?this.onload=i:n.error("Supplied callback is not a function."),this.buffer=null,this.source=null,this.context.createGain||(this.context.createGain=this.context.createGainNode),this.gainNode=this.context.createGain(),this.filter=this.context.createBiquadFilter(),this.filter.type="string"==typeof this.filter.type?"lowpass":0,this.filter.frequency.value=this.options.filterFrequency||this.context.sampleRate,this.loadFile(e)}return e(n,[{key:"loadFile",value:function(t){this.request=new XMLHttpRequest,this.request.open("GET",t,!0),this.request.responseType="arraybuffer";var e=this;this.request.onload=function(){e.context.decodeAudioData(e.request.response,function(n){return n?(e.buffer=n,void e.onload(e)):void e.error("Error decoding file data: "+t)},function(t){e.error("Error at decodeAudioData",t)})},this.request.onerror=function(){n.error("XMLHttpRequest errored.")},this.request.send()}},{key:"createAndConnectNodes",value:function(){this.source=this.context.createBufferSource(),this.source.buffer=this.buffer,this.source.connect(this.filter),this.filter.connect(this.gainNode),this.gainNode.connect(this.context.destination)}},{key:"play",value:function(){var t=void 0===arguments[0]?0:arguments[0];return this.playing===!0&&this.stop(),this.createAndConnectNodes(),this.options.loop&&(this.source.loop=!0),this.source.start||(this.source.start=this.source.noteOn),this.source.start(t),this.playing=!0,this}},{key:"stop",value:function(){var t=void 0===arguments[0]?0:arguments[0];return this.source.stop||(this.source.stop=this.source.noteOff),this.source.stop(t),this.playing=!1,this}},{key:"toggle",value:function(){return this.playing===!0?this.stop():this.play(),this}},{key:"changeVolume",value:function(t){var e=parseFloat(t);return e>1?e=1:0>e&&(e=0),this.gainNode.gain.value=e*e,this}},{key:"changeFilter",value:function(t,e){var n=40,i=this.context.sampleRate/2,o=Math.log(i/n)/Math.LN2,r=Math.pow(2,o*(t-1));return this.filter.frequency.value=i*r,this.filter.Q.value=e*this["const"].QUALITY_MULTIPLIER,this}},{key:"destroy",value:function(){this.stop();var t=this;t=null}},{key:"volume",value:function(t){return this.changeVolume(t)}},{key:"filter",value:function(t,e){return this.changeFilter(t,e)}},{key:"kill",value:function(){return this.destroy()}},{key:"remove",value:function(){return this.destroy()}}],[{key:"extend",value:function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}},{key:"isObject",value:function(t){return null!==t&&"object"==typeof t}},{key:"isFunction",value:function(t){var e={};return t&&"[object Function]"===e.toString.call(t)}},{key:"error",value:function(t){return console.error("AudioFX: Error! "+t)}}]),n}();return n});