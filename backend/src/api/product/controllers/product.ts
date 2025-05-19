import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
  async find(ctx) {
    try {
      ctx.query = {
        ...ctx.query,
        populate: { images: true }
      };
      const { results, pagination } = await strapi.service('api::product.product').find(ctx.query);
      
      const formattedResults = results.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        details: product.details,
        images: product.images
      }));

      return { data: formattedResults, meta: { pagination } };
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  async findOne(ctx) {
    try {
      console.log('=== Product FindOne Debug ===');
      console.log('Request params:', ctx.params);
      console.log('Request query:', ctx.query);
      
      ctx.query = {
        ...ctx.query,
        populate: { images: true }
      };
      const { id } = ctx.params;
      console.log('Raw ID from params:', id);
      
      // Thử tìm sản phẩm trực tiếp từ database
      const product = await strapi.db.query('api::product.product').findOne({
        where: { id: parseInt(id, 10) },
        populate: ['images']
      });
      
      console.log('Product from direct query:', product);
      
      if (!product) {
        console.log('Product not found in direct query');
        return ctx.notFound('Product not found');
      }

      const formattedProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        details: product.details,
        images: product.images
      };
      
      console.log('=== End Product FindOne Debug ===');
      return { data: formattedProduct };
    } catch (error) {
      console.error('Error in findOne:', error);
      ctx.throw(500, error);
    }
  }
})); 