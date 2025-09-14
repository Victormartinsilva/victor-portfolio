// Service Worker para PWA - Victor Martins Portfolio
const CACHE_NAME = 'victor-portfolio-v1.0.0';
const STATIC_CACHE = 'victor-static-v1';
const DYNAMIC_CACHE = 'victor-dynamic-v1';

// Recursos para cache estático
const STATIC_ASSETS = [
    '/',
    '/static/style.css',
    '/static/script.js',
    '/static/manifest.json',
    '/assets/avatar.png',
    '/assets/bg.png',
    'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
    console.log('SW: Installing Service Worker');
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('SW: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .catch(err => console.log('SW: Cache error:', err))
    );
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
    console.log('SW: Activating Service Worker');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== STATIC_CACHE && cache !== DYNAMIC_CACHE) {
                        console.log('SW: Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Interceptação de requisições (Fetch)
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Cache First Strategy para recursos estáticos
    if (STATIC_ASSETS.includes(url.pathname) || request.destination === 'style' || request.destination === 'script') {
        event.respondWith(
            caches.match(request).then(response => {
                return response || fetch(request).then(fetchResponse => {
                    return caches.open(STATIC_CACHE).then(cache => {
                        cache.put(request, fetchResponse.clone());
                        return fetchResponse;
                    });
                });
            }).catch(() => {
                // Fallback para páginas offline
                if (request.destination === 'document') {
                    return caches.match('/');
                }
            })
        );
    }
    // Network First Strategy para conteúdo dinâmico
    else if (url.pathname.startsWith('/contato') || url.pathname.startsWith('/api/')) {
        event.respondWith(
            fetch(request).then(response => {
                const responseClone = response.clone();
                caches.open(DYNAMIC_CACHE).then(cache => {
                    cache.put(request, responseClone);
                });
                return response;
            }).catch(() => {
                return caches.match(request);
            })
        );
    }
    // Cache First para tudo mais
    else {
        event.respondWith(
            caches.match(request).then(response => {
                if (response) {
                    return response;
                }
                return fetch(request).then(fetchResponse => {
                    return caches.open(DYNAMIC_CACHE).then(cache => {
                        if (request.method === 'GET') {
                            cache.put(request, fetchResponse.clone());
                        }
                        return fetchResponse;
                    });
                });
            })
        );
    }
});

// Background Sync para formulário de contato
self.addEventListener('sync', event => {
    if (event.tag === 'contact-form') {
        event.waitUntil(
            // Implementar sincronização do formulário
            syncContactForm()
        );
    }
});

// Push Notifications (futuro)
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'Nova atualização no portfólio!',
        icon: '/assets/avatar.png',
        badge: '/assets/avatar.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Ver Portfólio',
                icon: '/assets/avatar.png'
            },
            {
                action: 'close',
                title: 'Fechar',
                icon: '/assets/avatar.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Victor Martins Portfolio', options)
    );
});

// Função auxiliar para sincronização
async function syncContactForm() {
    try {
        const cache = await caches.open(DYNAMIC_CACHE);
        const requests = await cache.keys();
        
        for (let request of requests) {
            if (request.url.includes('/contato') && request.method === 'POST') {
                await fetch(request);
                await cache.delete(request);
            }
        }
    } catch (error) {
        console.log('SW: Sync error:', error);
    }
}

// Performance monitoring
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('SW: Service Worker loaded successfully');
