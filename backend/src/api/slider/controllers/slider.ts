/**
 * slider controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::slider.slider', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entity = await strapi.db.query('api::slider.slider').findOne({
        populate: ['slides.image']
      });
      return { data: entity };
    } catch (error) {
      ctx.throw(500, error);
    }
  }
})); 