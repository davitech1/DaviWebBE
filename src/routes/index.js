'use strict'

const express = require('express');
const router = express.Router();

router.use('/v1/api', require('./access'))
router.use('/v1/api', require('./customer'))
router.use('/v1/api', require('./post'))
module.exports = router

