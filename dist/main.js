!function(e){function t(t){for(var r,a,c=t[0],u=t[1],l=t[2],f=0,h=[];f<c.length;f++)a=c[f],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&h.push(i[a][0]),i[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);for(s&&s(t);h.length;)h.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,c=1;c<n.length;c++){var u=n[c];0!==i[u]&&(r=!1)}r&&(o.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},i={0:0},o=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var c=window.webpackJsonp=window.webpackJsonp||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var s=u;o.push([16,1]),n()}([function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return l}));var r=n(2),i=n(13),o=n(14),a=n(15);function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}e.PIXI=r;var l=function(){function e(){var t=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),e.app=new r.Application({antialias:!0,autoDensity:!0,height:window.innerHeight,width:window.innerWidth,backgroundColor:4540222}),document.body.appendChild(e.app.view),r.settings.SCALE_MODE=r.SCALE_MODES.NEAREST;var n=new r.Container;e.sceneManager=new i.a(n),e.app.stage.addChild(n),console.info("Loading assets ..."),Object(a.a)(e.app.loader,(function(){console.info("Assets loaded !"),e.app.ticker.add((function(e){return t.update(e)})),e.sceneManager.addScene(new o.a,"test"),e.sceneManager.activeScene="test"}))}var t,n,u;return t=e,(n=[{key:"update",value:function(t){e.sceneManager.activeScene&&e.sceneManager.getScene(e.sceneManager.activeScene).update(t)}}])&&c(t.prototype,n),u&&c(t,u),e}();u(l,"app",void 0),u(l,"sceneManager",void 0),u(l,"gameplayState",{isGravityEnabled:!0,gravityForce:2})}).call(this,n(3))},,,,,function(e,t,n){"use strict";t.a=n.p+"images/ee0762d9f99e6ad23ac956ae5699c0c9.png"},function(e,t,n){"use strict";t.a=n.p+"images/ab913da421ec22a5ad4eb0902f92d892.png"},function(e,t,n){"use strict";t.a=n.p+"images/c5873e0e23386f347da578a498540ce6.png"},,,,,,function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return o}));var o=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),i(this,"_scenes",{}),i(this,"_activeScene",""),i(this,"_parentContainer",void 0),this._parentContainer=t}var t,n,o;return t=e,(n=[{key:"addScene",value:function(e,t){this._scenes[t]=e}},{key:"getScene",value:function(e){if(this._scenes[e])return this._scenes[e];throw new TypeError("Scene ".concat(e," doesnt exists"))}},{key:"activeScene",get:function(){return""===this._activeScene?void 0:this._activeScene},set:function(e){if(!this._scenes[e])throw new TypeError("Scene ".concat(e," doesnt exists"));this._activeScene&&(this._scenes[this._activeScene].onSceneEnd(),this._parentContainer.removeChild(this._scenes[this._activeScene].getContainer())),this._activeScene=e,this._parentContainer.addChild(this._scenes[e].getContainer()),this._scenes[e].onSceneStart()}}])&&r(t.prototype,n),o&&r(t,o),e}()},function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.d(t,"a",(function(){return $}));var i=function(){function e(){var t,n,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r=void 0,(n="sceneContainer")in(t=this)?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,this.sceneContainer=new PIXI.Container}var t,n,i;return t=e,(n=[{key:"update",value:function(e){}},{key:"getContainer",value:function(){return this.sceneContainer}},{key:"onSceneStart",value:function(){}},{key:"onSceneEnd",value:function(){}}])&&r(t.prototype,n),i&&r(t,i),e}(),o=n(0);function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),c(this,"texture",void 0),c(this,"tileSize",void 0),c(this,"tileTextures",[]),this.texture=o.a.app.loader.resources[t].texture,this.tileSize=n,this.generateTileSpriteArray()}var t,n,r;return t=e,(n=[{key:"generateTileSpriteArray",value:function(){for(var e=Math.floor(this.texture.width/this.tileSize.x),t=Math.floor(this.texture.height/this.tileSize.y),n=0;n<t;n++)for(var r=0;r<e;r++){var i=new PIXI.Rectangle(this.tileSize.x*r,this.tileSize.y*n,this.tileSize.x,this.tileSize.y);this.texture.frame=i,this.tileTextures.push(this.texture.clone())}}},{key:"getSprite",value:function(e){if(e>this.tileTextures.length)throw new TypeError("Cannot find ".concat(e,"th element in the tileset, maximum: ").concat(this.tileTextures.length));return new PIXI.Sprite(this.tileTextures[e])}}])&&a(t.prototype,n),r&&a(t,r),e}(),l=(n(7),n(5));function s(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return f(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,c=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return a=e.done,e},e:function(e){c=!0,o=e},f:function(){try{a||null==n.return||n.return()}finally{if(c)throw o}}}}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var y=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),p(this,"container",new PIXI.Container),p(this,"tileset",new u(l.a,{x:32,y:32})),p(this,"tilemap",[]),p(this,"spriteList",[]),p(this,"width",0),p(this,"height",0),p(this,"tileRenderSize",0);for(var r=t.tileMap.split("\n"),i=0;i<r.length;i++){var o=r[i].split(",").map((function(e){return Number(e)}));0===o.length||1===o.length&&0===o[0]||this.tilemap.push(o)}this.width=this.tilemap[0].length,this.height=this.tilemap.length,this.tileRenderSize=Math.round(n/this.height),this.dumpTilemap(),this.generateTilemapContent()}var t,n,r;return t=e,(n=[{key:"dumpTilemap",value:function(){console.group("Tilemap"),console.info("Map:"),console.table(this.tilemap),console.info("width:",this.width,"height:",this.height),console.groupEnd()}},{key:"isColliding",value:function(e){var t,n,r,i,o,a,c,u=s(this.spriteList);try{for(u.s();!(t=u.n()).done;){var l=t.value;if(!(l.x>e.x+200||l.x<e.x-200||l.y>e.y+200||l.y<e.y-200)){var f=new PIXI.Rectangle(l.x,l.y,l.width,l.height);if(r=f,i=void 0,o=void 0,a=void 0,c=void 0,(n=e).centerX=n.x+n.width/2,n.centerY=n.y+n.height/2,r.centerX=r.x+r.width/2,r.centerY=r.y+r.height/2,n.halfWidth=n.width/2,n.halfHeight=n.height/2,r.halfWidth=r.width/2,r.halfHeight=r.height/2,a=n.centerX-r.centerX,c=n.centerY-r.centerY,i=n.halfWidth+r.halfWidth,o=n.halfHeight+r.halfHeight,Math.abs(a)<i&&Math.abs(c)<o)return f}}}catch(e){u.e(e)}finally{u.f()}}},{key:"generateTilemapContent",value:function(){for(var e=0;e<this.height;e++)for(var t=0;t<this.width;t++)if(-1!==this.tilemap[e][t]){var n=this.tileset.getSprite(this.tilemap[e][t]);n.x=this.tileRenderSize*t,n.y=this.tileRenderSize*e,n.width=this.tileRenderSize,n.height=this.tileRenderSize,this.container.addChild(n),this.spriteList.push(n)}}}])&&h(t.prototype,n),r&&h(t,r),e}();function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var b=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),v(this,"container",new PIXI.Container),v(this,"_velocity",{x:0,y:0}),v(this,"tilemap",void 0),this.tilemap=t}var t,n,r;return t=e,(n=[{key:"update",value:function(e){o.a.gameplayState.isGravityEnabled&&(this._velocity.y+=.005*o.a.gameplayState.gravityForce*this.tilemap.tileRenderSize*e);var t,n,r=this.getPosition(),i=this.getVelocity();r.x,r.x+=i.x*e,t=new PIXI.Rectangle(r.x,r.y,this.container.width,this.container.height),(n=this.tilemap.isColliding(t))&&(n.centerX>t.centerX?r.x=n.x-this.container.width:r.x=n.x+n.width,o.a.gameplayState.isGravityEnabled?i.x=0:i.x=i.x/2*-1),r.y,r.y+=i.y*e,t=new PIXI.Rectangle(r.x,r.y,this.container.width,this.container.height),(n=this.tilemap.isColliding(t))&&(n.centerY>t.centerY?(r.y=n.y-this.container.height,o.a.gameplayState.isGravityEnabled&&i.y>0?i.y=0:i.y=i.y/2*-1,this.onLanded(),0!==i.x&&o.a.gameplayState.isGravityEnabled&&(i.x>.15?i.x-=.35*e:i.x<-.15?i.x+=.35*e:i.x=0)):(r.y=n.y+n.height,o.a.gameplayState.isGravityEnabled&&i.y<0?i.y=0:i.y=i.y/2*-1)),this.setPosition(r),this.setVelocity(i)}},{key:"jump",value:function(){this.getVelocity().y=-.21*this.tilemap.tileRenderSize}},{key:"setPosition",value:function(e){var t=e.x,n=e.y;this.container.x=t,this.container.y=n}},{key:"getPosition",value:function(){return{x:this.container.x,y:this.container.y}}},{key:"setVelocity",value:function(e){var t=e.x,n=e.y;this._velocity.x=t,this._velocity.y=n}},{key:"getVelocity",value:function(){return this._velocity}},{key:"onLanded",value:function(){}}])&&d(t.prototype,n),r&&d(t,r),e}(),g=n(6);function m(e){var t={};t.value=e,t.isDown=!1,t.isUp=!0,t.press=void 0,t.release=void 0,t.downHandler=function(e){e.key===t.value&&(t.isUp&&t.press&&t.press(),t.isDown=!0,t.isUp=!1,e.preventDefault())},t.upHandler=function(e){e.key===t.value&&(t.isDown&&t.release&&t.release(),t.isDown=!1,t.isUp=!0,e.preventDefault())};var n=t.downHandler.bind(t),r=t.upHandler.bind(t);return window.addEventListener("keydown",n,!1),window.addEventListener("keyup",r,!1),t.unsubscribe=function(){window.removeEventListener("keydown",n),window.removeEventListener("keyup",r)},t}function w(e){return(w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function S(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function x(e,t,n){return(x="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=C(e)););return e}(e,t);if(r){var i=Object.getOwnPropertyDescriptor(r,t);return i.get?i.get.call(n):i.value}})(e,t,n||e)}function k(e,t){return(k=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function O(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=C(e);if(t){var i=C(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return P(this,n)}}function P(e,t){return!t||"object"!==w(t)&&"function"!=typeof t?j(e):t}function j(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function C(e){return(C=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var E=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&k(e,t)}(a,e);var t,n,r,i=O(a);function a(e){var t;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),_(j(t=i.call(this,e)),"playerSize",3),_(j(t),"playerSprite",void 0),_(j(t),"keysHandlers",{top:null,left:null,right:null,bottom:null}),_(j(t),"isSneaked",!1),_(j(t),"remainingJumps",2),_(j(t),"maxSpeed",8),t.playerSprite=new PIXI.Sprite(o.a.app.loader.resources[g.a].texture);var n=e.tileRenderSize*t.playerSize/t.playerSprite.height;t.playerSprite.width;return t.playerSprite.scale.set(n),t.container.y=500,t.container.x=65,t.container.addChild(t.playerSprite),t}return t=a,(n=[{key:"startKeyboardListening",value:function(){this.keysHandlers.top=m(" "),this.keysHandlers.bottom=m("ctrl"),this.keysHandlers.left=m("q"),this.keysHandlers.right=m("d"),this.keysHandlers.top.press=this.jump.bind(this),this.keysHandlers.bottom.press=this.startSneack.bind(this),this.keysHandlers.bottom.release=this.stopSneack.bind(this)}},{key:"stopKeyboardListening",value:function(){this.keysHandlers.top.unsubscribe(),this.keysHandlers.bottom.unsubscribe(),this.keysHandlers.left.unsubscribe(),this.keysHandlers.right.unsubscribe()}},{key:"jump",value:function(){if(o.a.gameplayState.isGravityEnabled){if(this.remainingJumps<=0)return;this.remainingJumps--,x(C(a.prototype),"jump",this).call(this)}}},{key:"startSneack",value:function(){this.isSneaked=!0}},{key:"stopSneack",value:function(){this.isSneaked=!1}},{key:"update",value:function(e){if(x(C(a.prototype),"update",this).call(this,e),o.a.gameplayState.isGravityEnabled){if(this.keysHandlers.right.isDown){var t=this.getVelocity();t.x<this.maxSpeed&&(t.x+=.7*e)}if(this.keysHandlers.left.isDown){var n=this.getVelocity();n.x>-1*this.maxSpeed&&(n.x-=.7*e)}this.isSneaked&&(this.getVelocity().y+=.2*e)}}},{key:"onLanded",value:function(){x(C(a.prototype),"onLanded",this).call(this),this.remainingJumps=2}}])&&S(t.prototype,n),r&&S(t,r),a}(b);function R(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function T(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var H=function(){function e(t,n){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),T(this,"container",new PIXI.Container),T(this,"sceneContainer",void 0),T(this,"followedContainer",void 0),T(this,"maxPadding",50),T(this,"screenSize",{x:o.a.app.renderer.width,y:o.a.app.renderer.height}),this.container.addChild(n),this.sceneContainer=n,this.followedContainer=t,this.sceneContainer.x=100,setInterval((function(){console.group(""),console.log(r.screenSize),console.log(Math.round(-1*r.followedContainer.x+r.screenSize.x/2)),console.groupEnd()}),500)}var t,n,r;return t=e,(n=[{key:"getRelativePosition",value:function(e,t){var n=e.getBounds(),r=t.getBounds();return{x:r.x-n.x,y:r.y-n.y}}},{key:"update",value:function(){this.sceneContainer.x=Math.round(-1*this.followedContainer.x+this.screenSize.x/2)}}])&&R(t.prototype,n),r&&R(t,r),e}();function I(e){return(I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function M(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function z(e,t,n){return(z="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=G(e)););return e}(e,t);if(r){var i=Object.getOwnPropertyDescriptor(r,t);return i.get?i.get.call(n):i.value}})(e,t,n||e)}function D(e,t){return(D=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function A(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=G(e);if(t){var i=G(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return L(this,n)}}function L(e,t){return!t||"object"!==I(t)&&"function"!=typeof t?X(e):t}function X(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function G(e){return(G=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function V(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var J={test:{tileMap:"-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,24,-1,-1,-1,-1,24,-1,-1,-1,-1,-1,-1,-1,-1\n-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,24,-1,-1,-1,-1\n-1,-1,-1,0,1,1,1,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n-1,-1,-1,14,15,15,15,16,-1,-1,-1,-1,21,22,22,22,23,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1\n-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,1,1,1,1,1,1,1,1,2,-1\n-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,8,4,5,15,15,15,15,15,5,6,19\n-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,8,9,-1,-1,-1,-1,-1,-1,-1,7,8\n2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,14,15,16,-1,-1,-1,-1,-1,-1,-1,7,8\n18,1,1,1,1,1,1,1,1,1,1,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,8\n8,8,8,8,8,8,8,8,8,8,8,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,13,8\n8,8,8,8,8,8,8,8,8,8,8,18,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,19,20,8\n0\n",dynamicObjectsMap:{}}};function U(e){return(U="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function Y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function W(e,t,n){return(W="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=N(e)););return e}(e,t);if(r){var i=Object.getOwnPropertyDescriptor(r,t);return i.get?i.get.call(n):i.value}})(e,t,n||e)}function K(e,t){return(K=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function B(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=N(e);if(t){var i=N(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return F(this,n)}}function F(e,t){return!t||"object"!==U(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function N(e){return(N=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var $=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&K(e,t)}(o,e);var t,n,r,i=B(o);function o(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),i.call(this,J.test)}return t=o,(n=[{key:"update",value:function(e){W(N(o.prototype),"update",this).call(this,e)}}])&&Y(t.prototype,n),r&&Y(t,r),o}(function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&D(e,t)}(a,e);var t,n,r,i=A(a);function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),V(X(t=i.call(this)),"player",void 0),V(X(t),"tilemap",void 0),V(X(t),"keysHandlers",{gravitySwitch:null}),V(X(t),"cameraHandledContainer",new PIXI.Container),V(X(t),"camera",void 0),t.tilemap=new y(e,o.a.app.screen.height),t.player=new E(t.tilemap),t.cameraHandledContainer.addChild(t.tilemap.container),t.cameraHandledContainer.addChild(t.player.container),t.camera=new H(t.player.container,t.cameraHandledContainer),t.sceneContainer.addChild(t.camera.container),t}return t=a,(n=[{key:"update",value:function(e){z(G(a.prototype),"update",this).call(this,e),this.player.update(e),this.camera.update()}},{key:"onSceneStart",value:function(){o.a.gameplayState.isGravityEnabled=!0,z(G(a.prototype),"onSceneStart",this).call(this),this.player.startKeyboardListening(),this.keysHandlers.gravitySwitch=m("e"),this.keysHandlers.gravitySwitch.press=this.switchGravity.bind(this)}},{key:"onSceneEnd",value:function(){z(G(a.prototype),"onSceneEnd",this).call(this),this.player.stopKeyboardListening(),this.keysHandlers.gravitySwitch.unsubscribe()}},{key:"switchGravity",value:function(){console.log("Gravity switch"),o.a.gameplayState.isGravityEnabled=!o.a.gameplayState.isGravityEnabled}}])&&M(t.prototype,n),r&&M(t,r),a}(i))},function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var r=n.p+"images/22c5f11edadebb669e9464b10c20f3c5.png",i=n(6),o=n(7),a=n(5);function c(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,c=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return a=e.done,e},e:function(e){c=!0,o=e},f:function(){try{a||null==n.return||n.return()}finally{if(c)throw o}}}}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var l=[r,i.a,o.a,a.a];function s(e,t){var n,r=e,i=c(l);try{for(i.s();!(n=i.n()).done;){var o=n.value;r=r.add(o)}}catch(e){i.e(e)}finally{i.f()}r.load(t)}},function(e,t,n){"use strict";n.r(t);var r=n(0);n(26);new r.a},,,,,,,,,,function(e,t,n){}]);
//# sourceMappingURL=main.js.map