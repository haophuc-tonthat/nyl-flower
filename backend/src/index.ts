import type { Core } from "@strapi/strapi";

const defaultProducts = [
  {
    name: 'Bó hoa hồng đỏ',
    price: '500.000đ',
    description: 'Bó hoa hồng đỏ tươi thắm, phù hợp cho các dịp đặc biệt',
    details: [
      'Hoa hồng đỏ tươi',
      'Bó tròn cổ điển',
      'Được bọc bằng giấy kraft',
      'Kèm thiệp chúc mừng'
    ]
  },
  {
    name: 'Bó hoa hướng dương',
    price: '450.000đ',
    description: 'Bó hoa hướng dương tươi tắn, mang đến năng lượng tích cực',
    details: [
      'Hoa hướng dương tươi',
      'Kết hợp với hoa phụ',
      'Bó tự nhiên',
      'Được bọc bằng giấy màu nâu'
    ]
  },
  {
    name: 'Bó hoa mix',
    price: '600.000đ',
    description: 'Bó hoa mix nhiều loại hoa tươi, phù hợp cho mọi dịp',
    details: [
      'Nhiều loại hoa tươi',
      'Kết hợp hài hòa',
      'Bó tự nhiên',
      'Được bọc bằng giấy màu trắng'
    ]
  }
];

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      // Check if admin user already exists
      const adminUser = await strapi.query("admin::user").findOne({
        where: { email: "admin@cinhnyl.com" },
      });

      if (!adminUser) {
        // Create admin user if it doesn't exist
        const hashedPassword = await strapi
          .service("admin::auth")
          .hashPassword("Admin@123");

        await strapi.query("admin::user").create({
          data: {
            email: "admin@cinhnyl.com",
            password: hashedPassword,
            firstname: "Admin",
            lastname: "User",
            isActive: true,
            blocked: false,
            roles: [1], // Super Admin role
          },
        });
        console.log("Default admin user created successfully");
      }

      // Check if products exist
      const existingProducts = await strapi
        .query("api::product.product")
        .findMany();

      if (existingProducts.length === 0) {
        // Create products if none exist
        for (const product of defaultProducts) {
          await strapi.query("api::product.product").create({
            data: {
              ...product,
              publishedAt: new Date(),
            },
          });
        }
        console.log("Default products created successfully");
      }
    } catch (error) {
      console.error("Error during bootstrap:", error);
    }
  },
};
