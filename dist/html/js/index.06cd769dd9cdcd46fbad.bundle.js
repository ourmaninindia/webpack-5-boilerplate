"use strict";(self.webpackChunkwebpack_boilerplate=self.webpackChunkwebpack_boilerplate||[]).push([[826],{126:function(n,t,e){function r(n){document.querySelector("#response").innerHTML=n.message}e(874),document.querySelector("input").addEventListener("click",(function(){fetch("/api/getMessage").then((function(n){return n.json()})).then(r)})),console.log("index.js loaded")},211:function(n,t,e){function r(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}e.d(t,{Z:function(){return r}})},913:function(n,t,e){function r(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}e.d(t,{Z:function(){return r}})},296:function(n,t,e){function r(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function o(n,t,e){return t&&r(n.prototype,t),e&&r(n,e),n}e.d(t,{Z:function(){return o}})},270:function(n,t,e){function r(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}e.d(t,{Z:function(){return r}})},327:function(n,t,e){e.d(t,{Z:function(){return o}});var r=e(311);function o(n,t,e){return o="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(n,t,e){var o=function(n,t){for(;!Object.prototype.hasOwnProperty.call(n,t)&&null!==(n=(0,r.Z)(n)););return n}(n,t);if(o){var u=Object.getOwnPropertyDescriptor(o,t);return u.get?u.get.call(e):u.value}},o(n,t,e||n)}},311:function(n,t,e){function r(n){return r=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)},r(n)}e.d(t,{Z:function(){return r}})},342:function(n,t,e){function r(n,t){return r=Object.setPrototypeOf||function(n,t){return n.__proto__=t,n},r(n,t)}function o(n,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&r(n,t)}e.d(t,{Z:function(){return o}})},183:function(n,t,e){e.d(t,{Z:function(){return o}});var r=e(521);function o(n,t){if(t&&("object"===(0,r.Z)(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(n){if(void 0===n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}(n)}},655:function(n,t,e){e.d(t,{Z:function(){return o}});var r=e(883);function o(n,t){return function(n){if(Array.isArray(n))return n}(n)||function(n,t){var e=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=e){var r,o,u=[],i=!0,c=!1;try{for(e=e.call(n);!(i=(r=e.next()).done)&&(u.push(r.value),!t||u.length!==t);i=!0);}catch(n){c=!0,o=n}finally{try{i||null==e.return||e.return()}finally{if(c)throw o}}return u}}(n,t)||(0,r.Z)(n,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},226:function(n,t,e){e.d(t,{Z:function(){return u}});var r=e(211),o=e(883);function u(n){return function(n){if(Array.isArray(n))return(0,r.Z)(n)}(n)||function(n){if("undefined"!=typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||(0,o.Z)(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},521:function(n,t,e){function r(n){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},r(n)}e.d(t,{Z:function(){return r}})},883:function(n,t,e){e.d(t,{Z:function(){return o}});var r=e(211);function o(n,t){if(n){if("string"==typeof n)return(0,r.Z)(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);return"Object"===e&&n.constructor&&(e=n.constructor.name),"Map"===e||"Set"===e?Array.from(n):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?(0,r.Z)(n,t):void 0}}}},function(n){n.O(0,[874,925],(function(){return 126,n(n.s=126)})),n.O()}]);