self.importScripts('./service-worker-assets.js');
self.addEventListener('install', event => event.waitUntil(onInstall(event)));
self.addEventListener('activate', event => event.waitUntil(onActivate(event)));
self.addEventListener('fetch', event => event.respondWith(onFetch(event)));

const cacheNamePrefix = 'sssb-';
const cacheName = `${cacheNamePrefix}${self.assetsManifest.version}`;
const offlineAssetsInclude = [ /\.wasm/, /\.html/, /\.js$/, /\.json$/, /\.css$/, /\.mjs$/ ];
const offlineAssetsExclude = [ /^service-worker\.js$/ ];

async function onInstall(event) {
    self.skipWaiting();
    const assetsRequests = self.assetsManifest.assets
        .filter(asset => offlineAssetsInclude.some(pattern => pattern.test(asset)))
        .filter(asset => !offlineAssetsExclude.some(pattern => pattern.test(asset)))
        .map(asset => new Request(asset, {credentials: 'same-origin', redirect: 'follow'}));
    await caches.open(cacheName).then(cache => cache.addAll(assetsRequests));
}

async function onActivate(event) {
    const cacheKeys = await caches.keys();
    await Promise.all(cacheKeys
        .filter(key => key.startsWith(cacheNamePrefix) && key !== cacheName)
        .map(key => caches.delete(key)));
}

async function onFetch(event) {
    let cachedResponse = null;
    if (event.request.method === 'GET') {
        // For all navigation requests, try to serve index.html from cache
        // If you need some URLs to be server-rendered, edit the following check to exclude those URLs
        const shouldServeIndexHtml = event.request.mode === 'navigate';

        const request = shouldServeIndexHtml ? 'index.html' : event.request;
        const cache = await caches.open(cacheName);
        cachedResponse = await cache.match(request);
    }

    return cachedResponse || fetch(event.request);
}

async function cachebust(){
    const cacheKeys = await caches.keys();
    await Promise.all(cacheKeys.map(key => caches.delete(key)));
}

self.onmessage = async (event) => {
    const { type } = event.data;
    switch (type){
        case "reinstall":
            await cachebust();
            break;
        default:
            break;
    }
}