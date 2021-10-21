const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      user_name: req.body.username,
      password: req.body.password,
    });

    const userData = await User.findOne({
      where: { user_name: req.body.username },
    });

    // if(userData) {
    //   res.status(400).json({message: "User alredy exists"});
    //   return;
    // }

    res.status(200).json({ success: true, newUser });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { user_name: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const token = await jwt.sign(
      {
        user_id: userData.id,
      },
      'Secretkey',
    );
    
    res.cookie('idToken',token);
    res.json({ user: userData, message: 'Logged in', idToken: token });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
