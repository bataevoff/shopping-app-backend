const { Router } = require('express');
const {
  categoriesController,
} = require('../controllers/categories.controller');

const router = Router();

router.get('/categories', categoriesController.getAll);
router.get('/categories/:id', categoriesController.getCategoryById);
router.post('/categories', categoriesController.createCategory);
router.delete('/categories/:id', categoriesController.removeCategory);
router.put('/categories/:id', categoriesController.editCategory);

module.exports = router;