const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../Models/User'); 


// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { userName, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Hashed password:', hashedPassword);

    const newUser = new User({
      userName,
      password: hashedPassword,
    });

    console.log('New user:', newUser);

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: "An error occurred" });
  }
});


// Login route
router.post('/login', async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, username: user.userName}, process.env.JWT_SECRET);
    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
