!function(){"use strict";var e={913:function(){try{self["workbox:core:7.2.0"]&&_()}catch(e){}},977:function(){try{self["workbox:precaching:7.2.0"]&&_()}catch(e){}},80:function(){try{self["workbox:routing:7.2.0"]&&_()}catch(e){}},873:function(){try{self["workbox:strategies:7.2.0"]&&_()}catch(e){}}},t={};function s(i){var a=t[i];if(void 0!==a)return a.exports;var r=t[i]={exports:{}},n=!0;try{e[i](r,r.exports,s),n=!1}finally{n&&delete t[i]}return r.exports}!function(){var e,t,i;let a,r,n;s(913);let l=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class o extends Error{constructor(e,t){super(l(e,t)),this.name=e,this.details=t}}let c=new Set,h={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},u=e=>[h.prefix,e,h.suffix].filter(e=>e&&e.length>0).join("-"),d=e=>e||u(h.precache),f=e=>e||u(h.runtime);function p(e,t){let s=new URL(e);for(let e of t)s.searchParams.delete(e);return s.href}async function g(e,t,s,i){let a=p(t.url,s);if(t.url===a)return e.match(t,i);let r=Object.assign(Object.assign({},i),{ignoreSearch:!0});for(let n of(await e.keys(t,r)))if(a===p(n.url,s))return e.match(n,i)}class w{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}async function y(){for(let e of c)await e()}let m=e=>new URL(String(e),location.href).href.replace(RegExp(`^${location.origin}`),"");function v(e,t){let s=t();return e.waitUntil(s),s}async function R(e,t){let s=null;if(e.url&&(s=new URL(e.url).origin),s!==self.location.origin)throw new o("cross-origin-copy-response",{origin:s});let i=e.clone(),r={headers:new Headers(i.headers),status:i.status,statusText:i.statusText},n=t?t(r):r,l=!function(){if(void 0===a){let e=new Response("");if("body"in e)try{new Response(e.body),a=!0}catch(e){a=!1}a=!1}return a}()?await i.blob():i.body;return new Response(l,n)}s(977);class C{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){let e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class b{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{let s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}function L(e){return"string"==typeof e?new Request(e):e}s(873);class U{constructor(e,t){for(let s of(this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new w,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map,this._plugins))this._pluginStateMap.set(s,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){let{event:t}=this,s=L(e);if("navigate"===s.mode&&t instanceof FetchEvent&&t.preloadResponse){let e=await t.preloadResponse;if(e)return e}let i=this.hasCallback("fetchDidFail")?s.clone():null;try{for(let e of this.iterateCallbacks("requestWillFetch"))s=await e({request:s.clone(),event:t})}catch(e){if(e instanceof Error)throw new o("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}let a=s.clone();try{let e;for(let i of(e=await fetch(s,"navigate"===s.mode?void 0:this._strategy.fetchOptions),this.iterateCallbacks("fetchDidSucceed")))e=await i({event:t,request:a,response:e});return e}catch(e){throw i&&await this.runCallbacks("fetchDidFail",{error:e,event:t,originalRequest:i.clone(),request:a.clone()}),e}}async fetchAndCachePut(e){let t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){let t;let s=L(e),{cacheName:i,matchOptions:a}=this._strategy,r=await this.getCacheKey(s,"read"),n=Object.assign(Object.assign({},a),{cacheName:i});for(let e of(t=await caches.match(r,n),this.iterateCallbacks("cachedResponseWillBeUsed")))t=await e({cacheName:i,matchOptions:a,cachedResponse:t,request:r,event:this.event})||void 0;return t}async cachePut(e,t){let s=L(e);await new Promise(e=>setTimeout(e,0));let i=await this.getCacheKey(s,"write");if(!t)throw new o("cache-put-with-no-response",{url:m(i.url)});let a=await this._ensureResponseSafeToCache(t);if(!a)return!1;let{cacheName:r,matchOptions:n}=this._strategy,l=await self.caches.open(r),c=this.hasCallback("cacheDidUpdate"),h=c?await g(l,i.clone(),["__WB_REVISION__"],n):null;try{await l.put(i,c?a.clone():a)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await y(),e}for(let e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:r,oldResponse:h,newResponse:a.clone(),request:i,event:this.event});return!0}async getCacheKey(e,t){let s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let i=e;for(let e of this.iterateCallbacks("cacheKeyWillBeUsed"))i=L(await e({mode:t,request:i,event:this.event,params:this.params}));this._cacheKeys[s]=i}return this._cacheKeys[s]}hasCallback(e){for(let t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(let s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(let t of this._strategy.plugins)if("function"==typeof t[e]){let s=this._pluginStateMap.get(t),i=i=>{let a=Object.assign(Object.assign({},i),{state:s});return t[e](a)};yield i}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(let e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return!s&&t&&200!==t.status&&(t=void 0),t}}class k{constructor(e={}){this.cacheName=f(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){let[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});let t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,i=new U(this,{event:t,request:s,params:"params"in e?e.params:void 0}),a=this._getResponse(i,s,t),r=this._awaitComplete(a,i,s,t);return[a,r]}async _getResponse(e,t,s){let i;await e.runCallbacks("handlerWillStart",{event:s,request:t});try{if(!(i=await this._handle(t,e))||"error"===i.type)throw new o("no-response",{url:t.url})}catch(a){if(a instanceof Error){for(let r of e.iterateCallbacks("handlerDidError"))if(i=await r({error:a,event:s,request:t}))break}if(i);else throw a}for(let a of e.iterateCallbacks("handlerWillRespond"))i=await a({event:s,request:t,response:i});return i}async _awaitComplete(e,t,s,i){let a,r;try{a=await e}catch(e){}try{await t.runCallbacks("handlerDidRespond",{event:i,request:s,response:a}),await t.doneWaiting()}catch(e){e instanceof Error&&(r=e)}if(await t.runCallbacks("handlerDidComplete",{event:i,request:s,response:a,error:r}),t.destroy(),r)throw r}}class T extends k{constructor(e={}){e.cacheName=d(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(T.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){return await t.cacheMatch(e)||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let s;let i=t.params||{};if(this._fallbackToNetwork){let a=i.integrity,r=e.integrity,n=!r||r===a;s=await t.fetch(new Request(e,{integrity:"no-cors"!==e.mode?r||a:void 0})),a&&n&&"no-cors"!==e.mode&&(this._useDefaultCacheabilityPluginIfNeeded(),await t.cachePut(e,s.clone()))}else throw new o("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return s}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();let s=await t.fetch(e);if(!await t.cachePut(e,s.clone()))throw new o("bad-precaching-response",{url:e.url,status:s.status});return s}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(let[s,i]of this.plugins.entries())i!==T.copyRedirectedCacheableResponsesPlugin&&(i===T.defaultPrecacheCacheabilityPlugin&&(e=s),i.cacheWillUpdate&&t++);0===t?this.plugins.push(T.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}T.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},T.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await R(e):e};class K{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new T({cacheName:d(e),plugins:[...t,new b({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){let t=[];for(let s of e){"string"==typeof s?t.push(s):s&&void 0===s.revision&&t.push(s.url);let{cacheKey:e,url:i}=function(e){if(!e)throw new o("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){let t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}let{revision:t,url:s}=e;if(!s)throw new o("add-to-cache-list-unexpected-type",{entry:e});if(!t){let e=new URL(s,location.href);return{cacheKey:e.href,url:e.href}}let i=new URL(s,location.href),a=new URL(s,location.href);return i.searchParams.set("__WB_REVISION__",t),{cacheKey:i.href,url:a.href}}(s),a="string"!=typeof s&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(i)&&this._urlsToCacheKeys.get(i)!==e)throw new o("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(i),secondEntry:e});if("string"!=typeof s&&s.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==s.integrity)throw new o("add-to-cache-list-conflicting-integrities",{url:i});this._cacheKeysToIntegrities.set(e,s.integrity)}this._urlsToCacheKeys.set(i,e),this._urlsToCacheModes.set(i,a),t.length>0&&console.warn(`Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`)}}install(e){return v(e,async()=>{let t=new C;for(let[s,i]of(this.strategy.plugins.push(t),this._urlsToCacheKeys)){let t=this._cacheKeysToIntegrities.get(i),a=this._urlsToCacheModes.get(s),r=new Request(s,{integrity:t,cache:a,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:i},request:r,event:e}))}let{updatedURLs:s,notUpdatedURLs:i}=t;return{updatedURLs:s,notUpdatedURLs:i}})}activate(e){return v(e,async()=>{let e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),i=[];for(let a of t)s.has(a.url)||(await e.delete(a),i.push(a.url));return{deletedURLs:i}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){let t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){let t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s)return(await self.caches.open(this.strategy.cacheName)).match(s)}createHandlerBoundToURL(e){let t=this.getCacheKeyForURL(e);if(!t)throw new o("non-precached-url",{url:e});return s=>(s.request=new Request(e),s.params=Object.assign({cacheKey:t},s.params),this.strategy.handle(s))}}let P=()=>(r||(r=new K),r);s(80);let q=e=>e&&"object"==typeof e?e:{handle:e};class x{constructor(e,t,s="GET"){this.handler=q(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=q(e)}}class E extends x{constructor(e,t,s){super(({url:t})=>{let s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}class N{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{let{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){let{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(t=>{"string"==typeof t&&(t=[t]);let s=new Request(...t);return this.handleRequest({request:s,event:e})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){let s;let i=new URL(e.url,location.href);if(!i.protocol.startsWith("http"))return;let a=i.origin===location.origin,{params:r,route:n}=this.findMatchingRoute({event:t,request:e,sameOrigin:a,url:i}),l=n&&n.handler,o=e.method;if(!l&&this._defaultHandlerMap.has(o)&&(l=this._defaultHandlerMap.get(o)),!l)return;try{s=l.handle({url:i,request:e,event:t,params:r})}catch(e){s=Promise.reject(e)}let c=n&&n.catchHandler;return s instanceof Promise&&(this._catchHandler||c)&&(s=s.catch(async s=>{if(c)try{return await c.handle({url:i,request:e,event:t,params:r})}catch(e){e instanceof Error&&(s=e)}if(this._catchHandler)return this._catchHandler.handle({url:i,request:e,event:t});throw s})),s}findMatchingRoute({url:e,sameOrigin:t,request:s,event:i}){for(let a of this._routes.get(s.method)||[]){let r;let n=a.match({url:e,sameOrigin:t,request:s,event:i});if(n)return Array.isArray(r=n)&&0===r.length?r=void 0:n.constructor===Object&&0===Object.keys(n).length?r=void 0:"boolean"==typeof n&&(r=void 0),{route:a,params:r}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,q(e))}setCatchHandler(e){this._catchHandler=q(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new o("unregister-route-but-not-found-with-method",{method:e.method});let t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new o("unregister-route-route-not-registered")}}let W=()=>(n||((n=new N).addFetchListener(),n.addCacheListener()),n);class M extends x{constructor(e,t){super(({request:s})=>{let i=e.getURLsToCacheKeys();for(let a of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:i=!0,urlManipulation:a}={}){let r=new URL(e,location.href);r.hash="",yield r.href;let n=function(e,t=[]){for(let s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(r,t);if(yield n.href,s&&n.pathname.endsWith("/")){let e=new URL(n.href);e.pathname+=s,yield e.href}if(i){let e=new URL(n.href);e.pathname+=".html",yield e.href}if(a)for(let e of a({url:r}))yield e.href}(s.url,t)){let t=i.get(a);if(t){let s=e.getIntegrityForCacheKey(t);return{cacheKey:t,integrity:s}}}},e.strategy)}}let I="-precache-",O=async(e,t=I)=>{let s=(await self.caches.keys()).filter(s=>s.includes(t)&&s.includes(self.registration.scope)&&s!==e);return await Promise.all(s.map(e=>self.caches.delete(e))),s};self.skipWaiting(),self.addEventListener("activate",()=>self.clients.claim()),t=[{'revision':'16ef5e5bae02a2c5f41e71011a1415ec','url':'/_next/app-build-manifest.json'},{'revision':'c155cce658e53418dec34664328b51ac','url':'/_next/static/SRnjt8Fu4KdeQoHTgCMcO/_buildManifest.js'},{'revision':'b6652df95db52feb4daf4eca35380933','url':'/_next/static/SRnjt8Fu4KdeQoHTgCMcO/_ssgManifest.js'},{'revision':'SRnjt8Fu4KdeQoHTgCMcO','url':'/_next/static/chunks/117-6e81695f51cc22e6.js'},{'revision':'SRnjt8Fu4KdeQoHTgCMcO','url':'/_next/static/chunks/464-55ce9f01e5336577.js'},{'revision':'SRnjt8Fu4KdeQoHTgCMcO','url':'/_next/static/chunks/app/_not-found/page-dcb83ba3e4d0aafd.js'},{'revision':'SRnjt8Fu4KdeQoHTgCMcO','url':'/_next/static/chunks/app/layout-3a6d80f97838027e.js'},{'revision':'SRnjt8Fu4KdeQoHTgCMcO','url':'/_next/static/chunks/app/page-a2227edfd3c5c39f.js'},{'revision':'SRnjt8Fu4KdeQoHTgCMcO','url':'/_next/static/chunks/fd9d1056-aa94ea5c2eabf904.js'},{'revision':'SRnjt8Fu4KdeQoHTgCMcO','url':'/_next/static/chunks/framework-f66176bb897dc684.js'},{'revision':'SRnjt8Fu4KdeQoHTgCMcO','url':'/_next/static/chunks/main-app-70862f17a34f7a26.js'},{'revision':'SRnjt8Fu4KdeQoHTgCMcO','url':'/_next/static/chunks/main-b95f657601a5db37.js'},{'revision':'SRnjt8Fu4KdeQoHTgCMcO','url':'/_next/static/chunks/pages/_app-72b849fbd24ac258.js'},{'revision':'SRnjt8Fu4KdeQoHTgCMcO','url':'/_next/static/chunks/pages/_error-7ba65e1336b92748.js'},{'revision':'846118c33b2c0e922d7b3a7676f81f6f','url':'/_next/static/chunks/polyfills-42372ed130431b0a.js'},{'revision':'SRnjt8Fu4KdeQoHTgCMcO','url':'/_next/static/chunks/webpack-8b7b29a7f6b09944.js'},{'revision':'b20da50ca16cc51d','url':'/_next/static/css/b20da50ca16cc51d.css'},{'revision':'78e6fc13ea317b55ab0bd6dc4849c110','url':'/_next/static/media/4473ecc91f70f139-s.p.woff'},{'revision':'cbeb6d2d96eaa268b4b5beb0b46d9632','url':'/_next/static/media/463dafcda517f24f-s.p.woff'},{'revision':'97974be8a96f303f4a808e9b228f77b6','url':'/icon.png'},{'revision':'965e8e27601ac80bfddb00389b7f6d30','url':'/sw.js'}],P().precache(t),i=void 0,function(e,t,s){let i;if("string"==typeof e){let t=new URL(e,location.href);i=new x(({url:e})=>e.href===t.href,void 0,void 0)}else if(e instanceof RegExp)i=new E(e,void 0,void 0);else if("function"==typeof e)i=new x(e,void 0,void 0);else if(e instanceof x)i=e;else throw new o("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});W().registerRoute(i)}(new M(P(),i)),self.addEventListener("activate",e=>{let t=d();e.waitUntil(O(t).then(e=>{}))}),self.addEventListener("install",e=>{console.log("install",e.target),self.skipWaiting()}),null===(e=self)||void 0===e||e.addEventListener("activate",function(e){var t,s;console.log("activate",e.target),null==e||e.waitUntil(null===(s=caches)||void 0===s?void 0:null===(t=s.keys())||void 0===t?void 0:t.then(function(e){var t;return Promise.all(null==e?void 0:null===(t=e.filter(function(){}))||void 0===t?void 0:t.map(function(e){return caches.delete(e)}))}))}),self.addEventListener("message",e=>{console.log("message",e),e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),self.addEventListener("fetch",e=>{e.request.url.includes("/_next/")&&e.respondWith(fetch(e.request))}),self.addEventListener("push",e=>{if(console.log("Push event received:",e),!(null==e?void 0:e.data)){console.log("No data in the push event.");return}let t=e.data.json();console.log("Push payload:",t);let{body:s,icon:i,image:a,badge:r,url:n,title:l}=t;e.waitUntil(self.registration.showNotification(l||"Default Title",{body:s,icon:i,image:a,badge:r,data:{url:n}}).then(()=>{console.log("Notification displayed."),console.log("Push event received:",e)}).catch(e=>console.error("Error showing notification:",e)))}),self.addEventListener("notificationclick",e=>{console.log("Notification clicked:",e),e.notification.close(),e.waitUntil(clients.matchAll({type:"window",includeUncontrolled:!0}).then(t=>{let s=e.notification.data.url;if(!s){console.log("No URL found in notification data.");return}for(let e of t)if(e.url===s&&"focus"in e)return console.log("Focusing existing client."),e.focus();if(clients.openWindow)return console.log("Opening a new window:",s),clients.openWindow(s)}))})}()}();