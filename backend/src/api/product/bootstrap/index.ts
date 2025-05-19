import type { Core } from '@strapi/strapi';

export default async ({ strapi }: { strapi: Core.Strapi }) => {
  try {
    // Check if the content type exists
    const contentType = strapi.contentTypes['api::product.product'];
    if (!contentType) {
      console.error('Product content type not found');
      return;
    }

    // Check if products exist
    const existingProducts = await strapi.entityService.findMany('api::product.product');
    
    if (!existingProducts || existingProducts.length === 0) {
      const defaultProducts = [
        {
          name: "Bó Hoa Hướng Dương",
          price: "1.200.000đ",
          description: "Bó hoa hướng dương tươi tắn kết hợp với hoa baby trắng, mang đến vẻ đẹp rực rỡ và tươi mới cho không gian của bạn.",
          details: [
            "Hướng dương tươi cao cấp",
            "Kết hợp với hoa baby trắng cao cấp",
            "Bó hoa được thiết kế bởi nghệ nhân",
            "Được bảo quản và vận chuyển trong điều kiện tối ưu",
            "Thời gian tươi: 7-10 ngày"
          ],
          publishedAt: new Date()
        }
      ];

      for (const product of defaultProducts) {
        await strapi.entityService.create('api::product.product', {
          data: product
        });
      }
      console.log('Default products created successfully');
    }
  } catch (error) {
    console.error('Error in product bootstrap:', error);
  }
}; 