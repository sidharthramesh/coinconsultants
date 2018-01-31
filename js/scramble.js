"use strict";!function(n){if("undefined"==typeof Promise)throw new Error("scramblejs requires the Promise API");"object"==typeof module&&"object"==typeof module.exports?module.exports=n():"function"==typeof define?define([],n):window.Scramble=n()}(function(){var n=Object.create(null),e={exports:n},t={minFlip:1,maxFlip:7,minInterval:150,maxInterval:100,minDelay:10,maxDelay:50},r=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","0","&excl;","&quest;","&midast;","&lpar;","&rpar;","&commat;","&pound","&dollar;","&percnt;","&Hat;","&amp;","&UnderBar;","-","&plus;","&equals;","&lsqb;","&rbrack;","&lcub;","&rcub;","&colon;","&semi;","&bsol;","&apos;","&QUOT;","&VerticalLine;","&LT","&GT","&comma;","&period;","&sol;","~","&DiacriticalGrave;","&NewLine;"],o=function(n){return JSON.parse(JSON.stringify(n))},i=function(n){return'<span data-ch="'+n+'">'+n+"</span>"},a=function(n){if(!(n instanceof Element)){var e="scramble: not a DOM Element";throw console.warn(e),new Error(e)}if(!u(n,"js-scramble")){var t=n.innerHTML.split(""),r="";t.forEach(function(n){r+=i(n)}),n.innerHTML=r;var o=n.className.split(" ");o.push("js-scramble"),n.className=o.join(" ")}},c=function(n){for(var e=[],t=0;t<n;++t){var o=Math.floor(Math.random()*r.length);e.push(r[o])}return e},s=function(n,e){return n+Math.floor(Math.random()*(e-n))},u=function(n,e){var t=new RegExp("\\b"+e+"\\b");return t.test(n.className)},f=function(n){return Array.prototype.slice.call(n,0)},l=function(n,e,t){a(n);var r=f(n.children);r.forEach(function(n){var r=s(t.minDelay,t.maxDelay);setTimeout(function(){var r=s(t.minFlip,t.maxFlip),o=c(r),i=s(t.minInterval,t.maxInterval);setTimeout(function(){e(n,o,i)},i)},r)})},m=function(n,e){if(n=o(n),"object"!=typeof e||e.hasOwnProperty("length"))return void console.error("scramble: config: was expecting an object, got "+e);var t=["delay","flip","interval"];for(var r in e){var i=r[0].toUpperCase()+r.slice(1);t.indexOf(r)===-1?console.warn("scramble: config: unrecognized config parameter: "+r):"number"==typeof e[r]?(n["min"+i]=e[r],n["max"+i]=e[r]):"object"==typeof e[r]?(n["min"+i]=e[r].min||n["min"+i],n["max"+i]=e[r].max||n["max"+i]):console.warn("scramble: config: config field values must be a number or an object")}return n},h=function(n,e){if(!(this instanceof h))throw Error("objects must be constructed using the new keyword");e=e||t,this._origin=Promise.resolve(n),this._config=e};h.prototype.enscramble=function(){var n=this,e=this._origin.then(function(e){a(e);var t=e.children.length;return new Promise(function(r,o){function i(n,o,a){return 0===o.length?(--t,void(0===t&&r(e))):(n.innerHTML=o.pop(),void setTimeout(function(){i(n,o,a)},a))}l(e,i,n._config)})});return new h(e,this._config)},h.prototype.descramble=function(){var n=this,e=this._origin.then(function(e){a(e);var t=e.children.length;return new Promise(function(r,o){function i(n,o,a){return 0===o.length?(n.innerHTML=n.dataset.ch,--t,void(0===t&&r(e))):(n.innerHTML=o.pop(),void setTimeout(function(){i(n,o,a)},a))}l(e,i,n._config)})});return new h(e,this._config)},h.prototype.then=function(n,e){return this._origin.then(n,e)},h.prototype.catch=function(n){return this._origin.catch(n)},h.prototype.wait=function(n){var e=this._origin.then(function(e){return new Promise(function(t,r){setTimeout(function(){t(e)},n)})});return new h(e,this._config)},h.prototype.setConfig=function(n){return this._config=m(this._config,n),this};var p=n.align={left:function(n,e){for(var t=0;t<n.length;++t)n[t].dataset.ch=e[t]||"&nbsp"},right:function(n,e){for(var t=n.length-e.length,r=0;r<n.length;++r){var o;o=r<t?"&nbsp":e[r-t],n[r].dataset.ch=o}},center:function(n,e){for(var t=n.length-e.length,r=t/2,o=n.length-t+r,i=0;i<n.length;++i){var a;a=i<r||i>=o?"&nbsp":e[i-r],n[i].dataset.ch=a}}};h.prototype.setText=function(n,e){var t=this._origin.then(function(t){return new Promise(function(r,o){if("string"!=typeof n)return console.error("scramble: setText: text must be a string, got: "+typeof n),o("error");var i;a(t);var c=t.children;if(n.length>c.length){var s=n.length-c.length;for(i=0;i<s;++i)t.appendChild(document.createElement("span"))}return e=e||p.left,"function"!=typeof e&&(console.warn("scramble: setText: 'align' must be a function (fallback to left alignment)"),e=p.left),e(c,n),r(t)})});return new h(t,this._config)},h.prototype.createEmpty=function(n,e){e=e||"&nbsp;";var t=this._origin.then(function(t){return new Promise(function(r,o){if("number"!=typeof n)return void console.error("scramble: createEmpty: length must be a number, got: "+typeof n);for(var a="",c=0;c<n;++c)a+=i(e);if(t.innerHTML=a,!u(t,"js-scramble")){var s=t.className.split(" ");s.push("js-scramble"),t.className=s.join(" ")}return r(t)})});return new h(t,this._config)};var g=function(n){var e;return e=n instanceof Element?n:document.querySelector(n)};return h.prototype.select=function(n){var e=this._origin.then(function(e){return g(n)});return new h(e,this._config)},n.select=function(n){var e=g(n);return new h(e)},n.setConfigGlobal=function(n){t=m(t,n)},e.exports});
