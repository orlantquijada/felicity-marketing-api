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

    let entity = await strapi.services.subscriber.findOne({
      email: data.email,
    });

    if (!entity)
      entity = await strapi.services.subscriber.create(ctx.request.body);

    if (process.env.NODE_ENV === "production")
      await strapi.plugins.subscriber.services.email.send({
        to: entity.email,
        from: "felicityincorporated@gmail.com",
        subject: "new subject",
        text: "message",
      });

    return sanitizeEntity(entity, { model: strapi.models.subscriber });
  },
};
