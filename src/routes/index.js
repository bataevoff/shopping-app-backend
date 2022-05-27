const { Router } = require('express');

const router = Router();

router.use('/api', require('./user.route'));
router.use('/api', require('./categories.route'))
router.use('/api', require('./products.route'))

module.exports = router;
