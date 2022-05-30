'use strict';

/**
 * platform-level router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::platform-level.platform-level');
