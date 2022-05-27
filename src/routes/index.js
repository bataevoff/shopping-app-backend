const { Router } = require('express');

const router = Router();

router.use('/api', require('./user.route'));

module.exports = router;
