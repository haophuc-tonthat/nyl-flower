/**
 * featureSection controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::feature-section.feature-section', ({ strapi }) => ({
  async find(ctx) {
    const entity = await strapi.db.query('api::feature-section.feature-section').findOne({
      populate: ['features']
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  }
})); 