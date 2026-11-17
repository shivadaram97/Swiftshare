const V="ss-v1";
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(["./","index.html","manifest.json","icon-192.png"])));self.skipWaiting()});
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);
 if(r.method==="POST"&&u.pathname.endsWith("/share")){e.respondWith((async()=>{const f=await r.formData(),c=await caches.open("share");
  const t=[f.get("title"),f.get("text"),f.get("url")].filter(Boolean).join("\n");await c.put("t",new Response(t));
  const fs=f.getAll("files");let i=0;for(const x of fs)await c.put("f"+i++,new Response(x,{headers:{"x-name":encodeURIComponent(x.name),"content-type":x.type}}));
  await c.put("n",new Response(String(i)));return Response.redirect("./?share=1",303)})());return}
 if(r.method!=="GET"||!(u.origin===location.origin||u.host==="www.gstatic.com"))return;
 e.respondWith(fetch(r).then(x=>{if(x.ok)caches.open(V).then(c=>c.put(r,x.clone()));return x}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match("index.html"))))});
