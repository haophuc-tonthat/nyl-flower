import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::gallery.gallery', ({ strapi }) => ({
  async find(ctx) {
    try {
      ctx.query = {
        ...ctx.query,
        populate: { image: true }
      };
      const { results, pagination } = await strapi.service('api::gallery.gallery').find(ctx.query);
      
      const formattedResults = results.map(gallery => ({
        id: gallery.id,
        title: gallery.title,
        category: gallery.category,
        image: gallery.image
      }));

      return { data: formattedResults, meta: { pagination } };
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  async findOne(ctx) {
    try {
      ctx.query = {
        ...ctx.query,
        populate: { image: true }
      };
      const { id } = ctx.params;
      
      const gallery = await strapi.db.query('api::gallery.gallery').findOne({
        where: { id: parseInt(id, 10) },
        populate: ['image']
      });
      
      if (!gallery) {
        return ctx.notFound('Gallery image not found');
      }

      const formattedGallery = {
        id: gallery.id,
        title: gallery.title,
        category: gallery.category,
        image: gallery.image
      };
      
      return { data: formattedGallery };
    } catch (error) {
      ctx.throw(500, error);
    }
  }
})); 