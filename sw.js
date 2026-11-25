const scope = new URL(self.registration.scope);
const cachePrefix = `woordenboek:${scope.pathname}:`;
const cacheName = `${cachePrefix}v1`;
const appPage = new URL('index.html', scope);
const assets = [
  'index.html', 'words.js', 'sentences.js', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png', 'icons/favicon.png'
].map(path => new URL(path, scope).href);
const audioPath = new URL('audio/', scope).pathname;

self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(cachePrefix) && name !== cacheName)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

async function loadPageAsset(request, key) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) {
      await cache.put(key, response.clone()).catch(() => {});
    }
    return response;
  } catch {
    return await cache.match(key) || Response.error();
  }
}

async function loadAudio(request) {
  const cache = await caches.open(cacheName);
  const range = request.headers.get('Range');
  let response = await cache.match(request.url);
  if (!response) {
    // Safari can request a byte range on the first play. Store the full MP3.
    const headers = new Headers(request.headers);
    headers.delete('Range');
    response = await fetch(new Request(request, { headers }));
    if (response.status !== 200) return response;
    await cache.put(request.url, response.clone()).catch(() => {});
  }
  if (!range) return response;

  const bytes = await response.arrayBuffer();
  const match = /^bytes=(\d*)-(\d*)$/i.exec(range);
  const start = match?.[1] ? Number(match[1]) : Math.max(0, bytes.byteLength - Number(match?.[2]));
  const end = match?.[1] && match[2] ? Math.min(Number(match[2]), bytes.byteLength - 1) : bytes.byteLength - 1;
  if (!match || !(start <= end) || start >= bytes.byteLength) {
    return new Response(null, {
      status: 416,
      headers: { 'Content-Range': `bytes */${bytes.byteLength}` }
    });
  }
  return new Response(bytes.slice(start, end + 1), {
    status: 206,
    headers: {
      'Content-Type': 'audio/mpeg',
      'Accept-Ranges': 'bytes',
      'Content-Length': String(end - start + 1),
      'Content-Range': `bytes ${start}-${end}/${bytes.byteLength}`
    }
  });
}

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== scope.origin) return;

  if (request.mode === 'navigate' && (url.pathname === scope.pathname || url.pathname === appPage.pathname)) {
    event.respondWith(loadPageAsset(request, appPage.href));
  } else if (assets.includes(url.href)) {
    event.respondWith(loadPageAsset(request, url.href));
  } else if (url.pathname.startsWith(audioPath) && url.pathname.endsWith('.mp3')) {
    event.respondWith(loadAudio(request));
  }
});
