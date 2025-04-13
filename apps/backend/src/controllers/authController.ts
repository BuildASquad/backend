import { User } from '@db' 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

const createToken = (_id,email) => {
    return jwt.sign({_id,email} , process.env.JWT_SECRET , {expiresIn:'3d'})
}

const loginUser = async (req, res) => {
    try {
    let { email, password } = req.body;

    if (email) email = email.trim();
    if (password) password = password.trim();

    if (!email || !password) {
      return res.status(400).json({ error: 'All fields must be filled' });
    }
  
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(400).json({ error: 'Email not valid' });
    }
  
    
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ error: 'Incorrect Password' });
      }
  
      const token = createToken(user._id,user.email);
      return res.status(200).json({ email, token });
    } catch (error) {
        return res.status(500).json({ error: error.message });
      }
  };
  

  const signupUser = async (req, res) => {
    try {
    let { first_name, last_name, email, password } = req.body;

    if (email) email = email.trim();
    if (password) password = password.trim();
  
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: 'All fields must be filled' });
    }
  
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Email is not valid' });
    }
  
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: 'Password is not strong enough' });
    }
  
    
      const exists = await User.findOne({ email });
  
      if (exists) {
        return res.status(400).json({ error: 'Email already in database' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
  
      const user = await User.create({
        first_name,
        last_name,
        email,
        password: hash,
      });
  
      const token = createToken(user._id,user.email);
      res.status(200).json({ email, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  export { loginUser, signupUser };