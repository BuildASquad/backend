const { User:userModel } = require('../../../../libs/db/src/lib/user.model');

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')


const createToken = (_id) => {
    return jwt.sign({_id} , process.env.JWT_SECRET , {expiresIn:'3d'})
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    console.log("Request Body:", req.body); 
  
    if (!email || !password) {
      return res.status(400).json({ error: 'All fields must be filled' });
    }
  
    const user = await userModel.findOne({ email });
    console.log("User found in DB:", user); 
  
    if (!user) {
      return res.status(400).json({ error: 'Email not valid' });
    }
  
    console.log("Password from client:", password);
    console.log("Password from DB:", user.password); 
  
    try {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ error: 'Incorrect Password' });
      }
  
      const token = createToken(user._id);
      return res.status(200).json({ email, token });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  };
  

  const signupUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
  
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: 'All fields must be filled' });
    }
  
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Email is not valid' });
    }
  
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: 'Password is not strong enough' });
    }
  
    try {
      const exists = await userModel.findOne({ email });
  
      if (exists) {
        return res.status(400).json({ error: 'Email already in database' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
  
      const user = await userModel.create({
        first_name,
        last_name,
        email,
        password: hash,
      });
  
      const token = createToken(user._id);
      res.status(200).json({ email, token });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

module.exports = {
    loginUser,signupUser
}