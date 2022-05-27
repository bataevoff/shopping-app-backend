const bcrypt = require('bcrypt');
const User = require('../models/User.model');
const generateToken = require('../config/generate.token');

module.exports.userController = {
  registerUser: async (req, res) => {
    try {
      const { name, pic, email, password, birthDate, sex } = req.body;
      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );

      if (!name || !email || !password || !birthDate || !sex) {
        res.status(400).json({
          error: 'Пожалуйста заполните все поля!',
        });
      }

      const userExist = await User.findOne({ email });
      if (userExist) {
        res
          .status(400)
          .json({ registrationError: 'Такой эл. адрес уже существует' });
      }

      const user = await User.create({
        name,
        email,
        password: hash,
        pic,
        birthDate,
        sex,
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          email: email,
          name: name,
          pic: pic,
          birthDate: birthDate,
          sex: sex,
          token: generateToken(user._id),
        });
        res.status(200).json('Регистрация прошла успешно');
      }
    } catch (e) {
      res.status(400).json({
        registrationError: 'Не удалось зарегистрироваться' + e.toString(),
      });
    }
  },

  authUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (email.length === 0) {
        res.status(401).json({ authorizationError: 'необходимо ввести email' });
      }
      if (password.length === 0) {
        res
          .status(401)
          .json({ authorizationError: 'необходимо ввести пароль' });
      }
      if (!user) {
        res.status(401).json({ authorizationError: 'неверный email' });
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        res.status(401).json({ authorizationError: 'неверный пароль' });
      }

      if (user && valid) {
        res.status(200).json({
          _id: user._id,
          email: user.email,
          name: user.name,
          pic: user.pic,
          birthDate: user.birthDate,
          sex: user.sex,
          token: generateToken(user._id),
        });
      }
    } catch (e) {
      res.status(400).json(`Не удалось авторизоватсья: ${e.toString()}`);
    }
  },
};
