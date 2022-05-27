const { Router } = require('express');
const {
  productsController,
} = require('../controllers/products.controller');

const router = Router();

router.get('/products', productsController.getAll);
router.get('/products/:id', productsController.getProductById);
router.get('/products/category/:id', productsController.getProductsByCategoryId)

router.post('/products', productsController.createProduct);
router.delete('/products/:id', productsController.removeProduct);
router.put('/products/:id', productsController.editProduct);

module.exports = router;