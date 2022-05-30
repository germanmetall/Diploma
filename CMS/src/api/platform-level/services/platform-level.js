'use strict';

/**
 * platform-level service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::platform-level.platform-level');
