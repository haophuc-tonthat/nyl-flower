/**
 * welcome controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::welcome.welcome', ({ strapi }) => ({
  async find(ctx) {
    try {
      const entity = await strapi.db.query('api::welcome.welcome').findOne({
        populate: ['image', 'features']
      });
      return { data: entity };
    } catch (error) {
      ctx.throw(500, error);
    }
  }
})); 