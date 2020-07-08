'use strict'
const express = require('express')
const router = express.Router()

router.use('/api/config', require('./config'))
router.use('/api/status', require('./status'))

module.exports = router
