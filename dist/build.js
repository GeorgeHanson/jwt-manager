var asyncGenerator=function(){function e(e){this.value=e}function t(t){function n(o,i){try{var a=t[o](i),u=a.value;u instanceof e?Promise.resolve(u.value).then(function(e){n("next",e)},function(e){n("throw",e)}):r(a.done?"return":"normal",a.value)}catch(e){r("throw",e)}}function r(e,t){switch(e){case"return":o.resolve({value:t,done:!0});break;case"throw":o.reject(t);break;default:o.resolve({value:t,done:!1})}(o=o.next)?n(o.key,o.arg):i=null}var o,i;this._invoke=function(e,t){return new Promise(function(r,a){var u={key:e,arg:t,resolve:r,reject:a,next:null};i?i=i.next=u:(o=i=u,n(e,t))})},"function"!=typeof t.return&&(this.return=void 0)}return"function"==typeof Symbol&&Symbol.asyncIterator&&(t.prototype[Symbol.asyncIterator]=function(){return this}),t.prototype.next=function(e){return this._invoke("next",e)},t.prototype.throw=function(e){return this._invoke("throw",e)},t.prototype.return=function(e){return this._invoke("return",e)},{wrap:function(e){return function(){return new t(e.apply(this,arguments))}},await:function(t){return new e(t)}}}(),classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),Local=function(){function e(){classCallCheck(this,e)}return createClass(e,[{key:"store",value:function(e){localStorage.setItem("jwt",e)}},{key:"retrieve",value:function(){var e=localStorage.getItem("jwt");return e||""}},{key:"forget",value:function(){localStorage.removeItem("jwt")}}]),e}(),Cookie=function(){function e(){classCallCheck(this,e)}return createClass(e,[{key:"store",value:function(e){var t=this.getExpiryDate();document.cookie="jwt="+e+";expires="+t.toUTCString()+";path=/"}},{key:"retrieve",value:function(){for(var e=decodeURIComponent(document.cookie).split(";"),t=e.length,n=0;n<t;n++){for(var r=e[n];" "==r.charAt(0);)r=r.substring(1);if(0==r.indexOf("jwt="))return r.substring("jwt=".length,r.length)}return""}},{key:"forget",value:function(){document.cookie="jwt=; expires=Thu, 01-Jan-70 00:00:01 GMT;"}},{key:"getExpiryDate",value:function(){var e=new Date;return new Date(e.getTime()+864e5)}}]),e}(),Token=function(){function e(t){classCallCheck(this,e),this.decoded=t,this.expiry=t.exp}return createClass(e,[{key:"getPayload",value:function(){return this.decoded}},{key:"getExpiry",value:function(){return this.expiry}}]),e}(),Decoder=function(){function e(){classCallCheck(this,e),this.store=new Cookie}return createClass(e,[{key:"useLocalStore",value:function(){this.store=new Local}},{key:"decode",value:function(){var e=this.store.retrieve();if(e){var t=e.split(".")[1].replace("-","+").replace("_","/"),n=JSON.parse(window.atob(t));return new Token(n)}throw new TypeError("No token has been set")}}]),e}(),JWTManager=function(){function e(){classCallCheck(this,e),this.secondsInterval=10,this.store=new Cookie,this.decoder=new Decoder}return createClass(e,[{key:"setToken",value:function(e){this.store.store(e)}},{key:"getToken",value:function(){return this.store.retrieve()}},{key:"forget",value:function(){this.store.forget()}},{key:"refresh",value:function(e){this.store.forget(),this.store.store(e)}},{key:"decode",value:function(){return this.decoder.decode()}},{key:"monitor",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:60;setInterval(function(){try{t.decode().getExpiry()-Date.now()/1e3<=n&&e(t.getToken())}catch(e){}},this.getSecondsInterval())}},{key:"useLocalStore",value:function(){this.store=new Local,this.decoder.useLocalStore()}},{key:"getSecondsInterval",value:function(){return 1e3*this.secondsInterval}}]),e}();export default JWTManager;