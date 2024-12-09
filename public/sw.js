!function(){"use strict";var e={913:function(){try{self["workbox:core:7.2.0"]&&_()}catch(e){}},977:function(){try{self["workbox:precaching:7.2.0"]&&_()}catch(e){}},80:function(){try{self["workbox:routing:7.2.0"]&&_()}catch(e){}},873:function(){try{self["workbox:strategies:7.2.0"]&&_()}catch(e){}}},t={};function s(a){var i=t[a];if(void 0!==i)return i.exports;var n=t[a]={exports:{}},r=!0;try{e[a](n,n.exports,s),r=!1}finally{r&&delete t[a]}return n.exports}!function(){var e,t,a;let i,n,r;s(913);let l=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class o extends Error{constructor(e,t){super(l(e,t)),this.name=e,this.details=t}}let c=new Set,h={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},u=e=>[h.prefix,e,h.suffix].filter(e=>e&&e.length>0).join("-"),d=e=>e||u(h.precache),f=e=>e||u(h.runtime);function g(e,t){let s=new URL(e);for(let e of t)s.searchParams.delete(e);return s.href}async function p(e,t,s,a){let i=g(t.url,s);if(t.url===i)return e.match(t,a);let n=Object.assign(Object.assign({},a),{ignoreSearch:!0});for(let r of(await e.keys(t,n)))if(i===g(r.url,s))return e.match(r,a)}class y{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}async function w(){for(let e of c)await e()}let m=e=>new URL(String(e),location.href).href.replace(RegExp(`^${location.origin}`),"");function v(e,t){let s=t();return e.waitUntil(s),s}async function R(e,t){let s=null;if(e.url&&(s=new URL(e.url).origin),s!==self.location.origin)throw new o("cross-origin-copy-response",{origin:s});let a=e.clone(),n={headers:new Headers(a.headers),status:a.status,statusText:a.statusText},r=t?t(n):n,l=!function(){if(void 0===i){let e=new Response("");if("body"in e)try{new Response(e.body),i=!0}catch(e){i=!1}i=!1}return i}()?await a.blob():a.body;return new Response(l,r)}s(977);class C{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){let e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class b{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{let s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}function L(e){return"string"==typeof e?new Request(e):e}s(873);class U{constructor(e,t){for(let s of(this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new y,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map,this._plugins))this._pluginStateMap.set(s,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){let{event:t}=this,s=L(e);if("navigate"===s.mode&&t instanceof FetchEvent&&t.preloadResponse){let e=await t.preloadResponse;if(e)return e}let a=this.hasCallback("fetchDidFail")?s.clone():null;try{for(let e of this.iterateCallbacks("requestWillFetch"))s=await e({request:s.clone(),event:t})}catch(e){if(e instanceof Error)throw new o("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}let i=s.clone();try{let e;for(let a of(e=await fetch(s,"navigate"===s.mode?void 0:this._strategy.fetchOptions),this.iterateCallbacks("fetchDidSucceed")))e=await a({event:t,request:i,response:e});return e}catch(e){throw a&&await this.runCallbacks("fetchDidFail",{error:e,event:t,originalRequest:a.clone(),request:i.clone()}),e}}async fetchAndCachePut(e){let t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){let t;let s=L(e),{cacheName:a,matchOptions:i}=this._strategy,n=await this.getCacheKey(s,"read"),r=Object.assign(Object.assign({},i),{cacheName:a});for(let e of(t=await caches.match(n,r),this.iterateCallbacks("cachedResponseWillBeUsed")))t=await e({cacheName:a,matchOptions:i,cachedResponse:t,request:n,event:this.event})||void 0;return t}async cachePut(e,t){let s=L(e);await new Promise(e=>setTimeout(e,0));let a=await this.getCacheKey(s,"write");if(!t)throw new o("cache-put-with-no-response",{url:m(a.url)});let i=await this._ensureResponseSafeToCache(t);if(!i)return!1;let{cacheName:n,matchOptions:r}=this._strategy,l=await self.caches.open(n),c=this.hasCallback("cacheDidUpdate"),h=c?await p(l,a.clone(),["__WB_REVISION__"],r):null;try{await l.put(a,c?i.clone():i)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await w(),e}for(let e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:n,oldResponse:h,newResponse:i.clone(),request:a,event:this.event});return!0}async getCacheKey(e,t){let s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let a=e;for(let e of this.iterateCallbacks("cacheKeyWillBeUsed"))a=L(await e({mode:t,request:a,event:this.event,params:this.params}));this._cacheKeys[s]=a}return this._cacheKeys[s]}hasCallback(e){for(let t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(let s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(let t of this._strategy.plugins)if("function"==typeof t[e]){let s=this._pluginStateMap.get(t),a=a=>{let i=Object.assign(Object.assign({},a),{state:s});return t[e](i)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(let e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return!s&&t&&200!==t.status&&(t=void 0),t}}class k{constructor(e={}){this.cacheName=f(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){let[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});let t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a=new U(this,{event:t,request:s,params:"params"in e?e.params:void 0}),i=this._getResponse(a,s,t),n=this._awaitComplete(i,a,s,t);return[i,n]}async _getResponse(e,t,s){let a;await e.runCallbacks("handlerWillStart",{event:s,request:t});try{if(!(a=await this._handle(t,e))||"error"===a.type)throw new o("no-response",{url:t.url})}catch(i){if(i instanceof Error){for(let n of e.iterateCallbacks("handlerDidError"))if(a=await n({error:i,event:s,request:t}))break}if(a);else throw i}for(let i of e.iterateCallbacks("handlerWillRespond"))a=await i({event:s,request:t,response:a});return a}async _awaitComplete(e,t,s,a){let i,n;try{i=await e}catch(e){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:i}),await t.doneWaiting()}catch(e){e instanceof Error&&(n=e)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:i,error:n}),t.destroy(),n)throw n}}class T extends k{constructor(e={}){e.cacheName=d(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(T.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){return await t.cacheMatch(e)||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let s;let a=t.params||{};if(this._fallbackToNetwork){let i=a.integrity,n=e.integrity,r=!n||n===i;s=await t.fetch(new Request(e,{integrity:"no-cors"!==e.mode?n||i:void 0})),i&&r&&"no-cors"!==e.mode&&(this._useDefaultCacheabilityPluginIfNeeded(),await t.cachePut(e,s.clone()))}else throw new o("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return s}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();let s=await t.fetch(e);if(!await t.cachePut(e,s.clone()))throw new o("bad-precaching-response",{url:e.url,status:s.status});return s}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(let[s,a]of this.plugins.entries())a!==T.copyRedirectedCacheableResponsesPlugin&&(a===T.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(T.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}T.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},T.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await R(e):e};class K{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new T({cacheName:d(e),plugins:[...t,new b({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){let t=[];for(let s of e){"string"==typeof s?t.push(s):s&&void 0===s.revision&&t.push(s.url);let{cacheKey:e,url:a}=function(e){if(!e)throw new o("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){let t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}let{revision:t,url:s}=e;if(!s)throw new o("add-to-cache-list-unexpected-type",{entry:e});if(!t){let e=new URL(s,location.href);return{cacheKey:e.href,url:e.href}}let a=new URL(s,location.href),i=new URL(s,location.href);return a.searchParams.set("__WB_REVISION__",t),{cacheKey:a.href,url:i.href}}(s),i="string"!=typeof s&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(a)&&this._urlsToCacheKeys.get(a)!==e)throw new o("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(a),secondEntry:e});if("string"!=typeof s&&s.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==s.integrity)throw new o("add-to-cache-list-conflicting-integrities",{url:a});this._cacheKeysToIntegrities.set(e,s.integrity)}this._urlsToCacheKeys.set(a,e),this._urlsToCacheModes.set(a,i),t.length>0&&console.warn(`Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`)}}install(e){return v(e,async()=>{let t=new C;for(let[s,a]of(this.strategy.plugins.push(t),this._urlsToCacheKeys)){let t=this._cacheKeysToIntegrities.get(a),i=this._urlsToCacheModes.get(s),n=new Request(s,{integrity:t,cache:i,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:a},request:n,event:e}))}let{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}})}activate(e){return v(e,async()=>{let e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(let i of t)s.has(i.url)||(await e.delete(i),a.push(i.url));return{deletedURLs:a}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){let t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){let t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s)return(await self.caches.open(this.strategy.cacheName)).match(s)}createHandlerBoundToURL(e){let t=this.getCacheKeyForURL(e);if(!t)throw new o("non-precached-url",{url:e});return s=>(s.request=new Request(e),s.params=Object.assign({cacheKey:t},s.params),this.strategy.handle(s))}}let P=()=>(n||(n=new K),n);s(80);let x=e=>e&&"object"==typeof e?e:{handle:e};class q{constructor(e,t,s="GET"){this.handler=x(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=x(e)}}class E extends q{constructor(e,t,s){super(({url:t})=>{let s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}class N{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{let{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){let{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(t=>{"string"==typeof t&&(t=[t]);let s=new Request(...t);return this.handleRequest({request:s,event:e})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){let s;let a=new URL(e.url,location.href);if(!a.protocol.startsWith("http"))return;let i=a.origin===location.origin,{params:n,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:i,url:a}),l=r&&r.handler,o=e.method;if(!l&&this._defaultHandlerMap.has(o)&&(l=this._defaultHandlerMap.get(o)),!l)return;try{s=l.handle({url:a,request:e,event:t,params:n})}catch(e){s=Promise.reject(e)}let c=r&&r.catchHandler;return s instanceof Promise&&(this._catchHandler||c)&&(s=s.catch(async s=>{if(c)try{return await c.handle({url:a,request:e,event:t,params:n})}catch(e){e instanceof Error&&(s=e)}if(this._catchHandler)return this._catchHandler.handle({url:a,request:e,event:t});throw s})),s}findMatchingRoute({url:e,sameOrigin:t,request:s,event:a}){for(let i of this._routes.get(s.method)||[]){let n;let r=i.match({url:e,sameOrigin:t,request:s,event:a});if(r)return Array.isArray(n=r)&&0===n.length?n=void 0:r.constructor===Object&&0===Object.keys(r).length?n=void 0:"boolean"==typeof r&&(n=void 0),{route:i,params:n}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,x(e))}setCatchHandler(e){this._catchHandler=x(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new o("unregister-route-but-not-found-with-method",{method:e.method});let t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new o("unregister-route-route-not-registered")}}let W=()=>(r||((r=new N).addFetchListener(),r.addCacheListener()),r);class M extends q{constructor(e,t){super(({request:s})=>{let a=e.getURLsToCacheKeys();for(let i of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:a=!0,urlManipulation:i}={}){let n=new URL(e,location.href);n.hash="",yield n.href;let r=function(e,t=[]){for(let s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(n,t);if(yield r.href,s&&r.pathname.endsWith("/")){let e=new URL(r.href);e.pathname+=s,yield e.href}if(a){let e=new URL(r.href);e.pathname+=".html",yield e.href}if(i)for(let e of i({url:n}))yield e.href}(s.url,t)){let t=a.get(i);if(t){let s=e.getIntegrityForCacheKey(t);return{cacheKey:t,integrity:s}}}},e.strategy)}}let I="-precache-",O=async(e,t=I)=>{let s=(await self.caches.keys()).filter(s=>s.includes(t)&&s.includes(self.registration.scope)&&s!==e);return await Promise.all(s.map(e=>self.caches.delete(e))),s};self.skipWaiting(),self.addEventListener("activate",()=>self.clients.claim()),t=[{'revision':'c155cce658e53418dec34664328b51ac','url':'/_next/static/bRLAwb8-iZl1Y9dw_IOY-/_buildManifest.js'},{'revision':'b6652df95db52feb4daf4eca35380933','url':'/_next/static/bRLAwb8-iZl1Y9dw_IOY-/_ssgManifest.js'},{'revision':'bRLAwb8-iZl1Y9dw_IOY-','url':'/_next/static/chunks/117-6e81695f51cc22e6.js'},{'revision':'bRLAwb8-iZl1Y9dw_IOY-','url':'/_next/static/chunks/464-55ce9f01e5336577.js'},{'revision':'bRLAwb8-iZl1Y9dw_IOY-','url':'/_next/static/chunks/app/_not-found/page-dcb83ba3e4d0aafd.js'},{'revision':'bRLAwb8-iZl1Y9dw_IOY-','url':'/_next/static/chunks/app/layout-3a6d80f97838027e.js'},{'revision':'bRLAwb8-iZl1Y9dw_IOY-','url':'/_next/static/chunks/app/page-a2227edfd3c5c39f.js'},{'revision':'bRLAwb8-iZl1Y9dw_IOY-','url':'/_next/static/chunks/fd9d1056-aa94ea5c2eabf904.js'},{'revision':'bRLAwb8-iZl1Y9dw_IOY-','url':'/_next/static/chunks/framework-f66176bb897dc684.js'},{'revision':'bRLAwb8-iZl1Y9dw_IOY-','url':'/_next/static/chunks/main-app-70862f17a34f7a26.js'},{'revision':'bRLAwb8-iZl1Y9dw_IOY-','url':'/_next/static/chunks/main-b95f657601a5db37.js'},{'revision':'bRLAwb8-iZl1Y9dw_IOY-','url':'/_next/static/chunks/pages/_app-72b849fbd24ac258.js'},{'revision':'bRLAwb8-iZl1Y9dw_IOY-','url':'/_next/static/chunks/pages/_error-7ba65e1336b92748.js'},{'revision':'846118c33b2c0e922d7b3a7676f81f6f','url':'/_next/static/chunks/polyfills-42372ed130431b0a.js'},{'revision':'bRLAwb8-iZl1Y9dw_IOY-','url':'/_next/static/chunks/webpack-8b7b29a7f6b09944.js'},{'revision':'b20da50ca16cc51d','url':'/_next/static/css/b20da50ca16cc51d.css'},{'revision':'78e6fc13ea317b55ab0bd6dc4849c110','url':'/_next/static/media/4473ecc91f70f139-s.p.woff'},{'revision':'cbeb6d2d96eaa268b4b5beb0b46d9632','url':'/_next/static/media/463dafcda517f24f-s.p.woff'},{'revision':'97974be8a96f303f4a808e9b228f77b6','url':'/icon.png'},{'revision':'0add89e276286454f3560c6df3daf5df','url':'/sw.js'}],P().precache(t),a=void 0,function(e,t,s){let a;if("string"==typeof e){let t=new URL(e,location.href);a=new q(({url:e})=>e.href===t.href,void 0,void 0)}else if(e instanceof RegExp)a=new E(e,void 0,void 0);else if("function"==typeof e)a=new q(e,void 0,void 0);else if(e instanceof q)a=e;else throw new o("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});W().registerRoute(a)}(new M(P(),a)),self.addEventListener("activate",e=>{let t=d();e.waitUntil(O(t).then(e=>{}))}),self.addEventListener("install",e=>{console.log("install",e.target),self.skipWaiting()}),null===(e=self)||void 0===e||e.addEventListener("activate",function(e){var t,s;console.log("activate",e.target),null==e||e.waitUntil(null===(s=caches)||void 0===s?void 0:null===(t=s.keys())||void 0===t?void 0:t.then(function(e){var t;return Promise.all(null==e?void 0:null===(t=e.filter(function(){}))||void 0===t?void 0:t.map(function(e){return caches.delete(e)}))}))}),self.addEventListener("message",e=>{console.log("message",e),e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),self.addEventListener("fetch",e=>{e.request.url.includes("/_next/")&&e.respondWith(fetch(e.request))}),self.addEventListener("push",e=>{if(console.log("Push event received:",e),!(null==e?void 0:e.data)){console.log("No data in the push event.");return}let t=e.data.json();console.log("Push payload:",t);let{title:s,message:a,icon:i,image:n,badge:r,url:l}=t;e.waitUntil(self.registration.showNotification(s||"Default Title",{body:a||"Default body text.",icon:i||"/icon.png",image:n||null,badge:r||"/default-badge.png",data:{url:l||"/"}}).then(()=>{console.log("Notification displayed."),console.log("Push event received:",e)}).catch(e=>console.error("Error showing notification:",e)))}),self.addEventListener("notificationclick",e=>{console.log("Notification clicked:",e),e.notification.close(),e.waitUntil(clients.matchAll({type:"window",includeUncontrolled:!0}).then(t=>{let s=e.notification.data.url;if(!s){console.log("No URL found in notification data.");return}for(let e of t)if(e.url===s&&"focus"in e)return console.log("Focusing existing client."),e.focus();if(clients.openWindow)return console.log("Opening a new window:",s),clients.openWindow(s)}))})}()}();