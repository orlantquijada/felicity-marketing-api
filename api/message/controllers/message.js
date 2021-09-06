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

    const entity = await strapi.services.message.create(data);

    // IMPORTANT: currently not possible to send emails from any email ad since it requires domain authentication
    // domain authentication can only be achieved on a custom doman/subdomain where you can edit DNS records
    // not possible because domain is currently not configured yet (currently using heroku's default free domain)
    // if (process.env.NODE_ENV === "production")
    //     await strapi.plugins.email.services.email.send({
    //       to: process.env.DEFAULT_EMAIL,
    //       from: entity.email,

    //       // subject to change
    //       subject: "new subject",
    //       text: "message",
    //     });

    return sanitizeEntity(entity, { model: strapi.models.message });
  },
};
