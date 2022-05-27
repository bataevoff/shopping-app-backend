const Product = require('../models/Product.model')
const Category = require('../models/Category.model')

module.exports.productsController = {
  getAll: async (req, res) => {
    try {
      const products = await Product.find().populate('category', 'name')

      return res.json(products)
    } catch (e) {
      return res.status(400).json({
        error: e.toString()
      })
    }
  },

  getProductsByCategoryId: async (req, res) => {
    const { id } = req.params

    try {
      const products = await Product.find({ category: id }).populate(
        'category',
        'name'
      )

      return res.json(products)
    } catch (e) {
      return res.status(400).json({
        error: e.toString()
      })
    }
  },

  getProductById: async (req, res) => {
    const { id } = req.params

    try {
      const product = Product.findById(id).populate('category', 'name')

      if (!product) {
        return res.status(404).json({
          error: 'Продукт с таким ID не найден'
        })
      }

      return res.json(product)
    } catch (e) {
      return res.status(400).json({
        error: e.toString()
      })
    }
  },

  createProduct: async (req, res) => {
    const { name, price, category, image } = req.body

    if (!name) {
      return res.status(400).json({
        error: 'Необходимо указать название нового продукта',
      });
    }

    if (!price || price < 0) {
      return res.status(400).json({
        error: 'Необходимо указать цену нового продукта',
      });
    }

    if (!category) {
      return res.status(400).json({
        error: 'Необходимо указать категорию нового продукта',
      });
    }

    try {
      const categoryExists = await Category.findById(category);

      if (!categoryExists) {
        return res.status(400).json({
          error: 'Категории с таким ID не существует',
        });
      }

      const product = await new Product({
        name,
        price,
        category,
      });

      if (image) {
        product.image = image;
      }

      await product.save();

      return res.json(product);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  removeProduct: async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = await Product.findByIdAndRemove(id);

      if (!deleted) {
        return res.status(400).json({
          error: 'Не удалось удалить продукт. Укажите верный ID',
        });
      }

      return res.json({
        message: 'Продукт успешно удален',
      });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  editProduct: async (req, res) => {
    const { name, price, category } = req.body;
    const { id } = req.params;

    if (!name) {
      return res.status(400).json({
        error: 'Необходимо указать новое название продукта',
      });
    }

    if (!price || price < 0) {
      return res.status(400).json({
        error: 'Неверно указана цена продукта',
      });
    }

    try {
      const categoryExists = await Category.findById(category);

      if (!categoryExists) {
        return res.status(400).json({
          error: `Категории с ID ${category} не существует`,
        });
      }
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }

    try {
      const edited = await Product.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );

      if (!edited) {
        return res.status(400).json({
          error: 'Не удалось изменить название. Проверь правильность ID',
        });
      }

      return res.json(edited);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },
}