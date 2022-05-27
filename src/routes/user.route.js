const { Router } = require('express');
const { userController } = require('../controllers/users.controller');

const router = Router();

router.post('/registration', userController.registerUser);
router.post('/login', userController.authUser);

module.exports = router;
