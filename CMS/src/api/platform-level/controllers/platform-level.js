'use strict';

/**
 *  platform-level controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::platform-level.platform-level');
