"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  async create(ctx) {
    const data = ctx.is("multipart")
      ? parseMultipartData(ctx).data
      : ctx.request.body;

    let entity = await strapi.services["launch-subscriber"].findOne({
      email: data.email,
    });

    if (!entity)
      entity = await strapi.services["launch-subscriber"].create(
        ctx.request.body
      );

    if (process.env.NODE_ENV === "production")
      await strapi.plugins.email.services.email.send({
        to: entity.email,
        from: "orlantquijada@gmail.com",
        subject: "new subject",
        text: "message",
      });

    return sanitizeEntity(entity, {
      model: strapi.models["launch-subscriber"],
    });
  },
};
