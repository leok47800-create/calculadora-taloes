// Service worker: deixa o app instalável e funcionando sem internet.
// A página (HTML) busca primeiro na rede, para pegar a versão nova assim que publicada;
// sem rede, usa a cópia salva. Ícones e fontes vêm do cache e se atualizam por trás.
// Ao mudar os arquivos fixos abaixo, troque o número da versão do cache.
const CACHE = "taloes-v1";
const BASE = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASE)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(nomes => Promise.all(nomes.filter(n => n !== CACHE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;

  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then(r => { const copia = r.clone(); caches.open(CACHE).then(c => c.put("index.html", copia)); return r; })
        .catch(() => caches.match("index.html"))
    );
    return;
  }

  const url = new URL(req.url);
  const fonte = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (url.origin !== location.origin && !fonte) return;

  e.respondWith(
    caches.match(req).then(salvo => {
      const rede = fetch(req)
        .then(r => {
          if (r.ok || r.type === "opaque") { const copia = r.clone(); caches.open(CACHE).then(c => c.put(req, copia)); }
          return r;
        })
        .catch(() => salvo);
      return salvo || rede;
    })
  );
});
