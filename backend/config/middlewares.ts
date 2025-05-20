export default [
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        'http://localhost:3000',
        'http://localhost:1337',
        'https://*.vercel.app',
        'https://sunflower-parisian.vercel.app',
        'https://*.onrender.com',
        'https://sunflower-parisian.onrender.com',
        'https://api.sunflower-parisian.cloud',
        'https://www.sunflower-parisian.cloud',
        'https://nyl-flower.vercel.app',
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'https://market-assets.strapi.io',
            'https://res.cloudinary.com',
          ],
        },
      },
    },
  },
];
