export default {
  async bootstrap({ strapi }) {
    // Configure permissions for Product collection
    const actions = [
      {
        section: 'plugins::content-manager.explorer',
        displayName: 'Read',
        uid: 'read',
        pluginName: 'content-manager',
      },
      {
        section: 'plugins::content-manager.explorer',
        displayName: 'Create',
        uid: 'create',
        pluginName: 'content-manager',
      },
      {
        section: 'plugins::content-manager.explorer',
        displayName: 'Update',
        uid: 'update',
        pluginName: 'content-manager',
      },
      {
        section: 'plugins::content-manager.explorer',
        displayName: 'Delete',
        uid: 'delete',
        pluginName: 'content-manager',
      },
    ];

    // Get or create the authenticated role
    const authenticatedRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'authenticated' } });

    if (authenticatedRole) {
      // Update permissions for authenticated role
      await strapi
        .query('plugin::users-permissions.role')
        .update({
          where: { id: authenticatedRole.id },
          data: {
            permissions: {
              ...authenticatedRole.permissions,
              'api::product.product': {
                controllers: {
                  product: {
                    find: { enabled: true },
                    findOne: { enabled: true },
                    create: { enabled: true },
                    update: { enabled: true },
                    delete: { enabled: true },
                  },
                },
              },
              'plugins::content-manager.explorer': {
                actions: {
                  read: { enabled: true },
                  create: { enabled: true },
                  update: { enabled: true },
                  delete: { enabled: true },
                },
              },
            },
          },
        });
    }

    // Get or create the public role
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (publicRole) {
      // Update permissions for public role
      await strapi
        .query('plugin::users-permissions.role')
        .update({
          where: { id: publicRole.id },
          data: {
            permissions: {
              ...publicRole.permissions,
              'api::product.product': {
                controllers: {
                  product: {
                    find: { enabled: true },
                    findOne: { enabled: true },
                  },
                },
              },
              'plugins::content-manager.explorer': {
                actions: {
                  read: { enabled: true },
                },
              },
            },
          },
        });
    }
  },
}; 