'use strict';

/**
 * platform-event router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::platform-event.platform-event');
