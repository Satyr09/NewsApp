importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');
const staticAssets = [
  './',
  './index.php',
  './style.css',
  './app.js',
  './fallback.json',
];
workbox.precaching.precacheAndRoute(staticAssets
);

workbox.routing.registerRoute(
  new RegExp('.*\.js'),


  workbox.strategies.networkFirst({

  })
);
workbox.routing.registerRoute(
  new RegExp ('https://newsapi.org/'),

  workbox.strategies.networkFirst({

  })
);


workbox.routing.registerRoute(
  /.*\.(png|jpg|jpeg|svg|gif)/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'news-images',
    plugins : [ new workbox.expiration.Plugin({  maxEntries: 20,
      }),
    ]


  })
);
