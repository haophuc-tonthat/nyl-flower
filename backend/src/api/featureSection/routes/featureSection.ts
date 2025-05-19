/**
 * featureSection router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::feature-section.feature-section', {
  config: {
    find: {
      auth: false,
    },
  },
}); 