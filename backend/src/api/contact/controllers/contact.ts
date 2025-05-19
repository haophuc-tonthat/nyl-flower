import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::contact.contact', ({ strapi }) => ({
  async find(ctx) {
    try {
      ctx.query = {
        ...ctx.query,
        populate: { logo: true }
      };
      const { data, meta } = await super.find(ctx);
      return { data, meta };
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  async findOne(ctx) {
    try {
      ctx.query = {
        ...ctx.query,
        populate: { logo: true }
      };
      const { data } = await super.findOne(ctx);
      return { data };
    } catch (error) {
      ctx.throw(500, error);
    }
  }
})); 