import { Request, Response } from 'express';

import { User, IUser } from '@db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { IAuthController } from './types';

export class AuthController implements IAuthController {
  private createToken(_id: string, email: string): string {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    return jwt.sign({ _id, email }, process.env.JWT_SECRET, {
      expiresIn: '3d',
    });
  }

  loginUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      let { email, password } = req.body;

      if (email) email = email.trim();
      if (password) password = password.trim();

      if (!email || !password) {
        return res.status(400).json({ error: 'All fields must be filled' });
      }

      const user: IUser | null = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: 'Email not valid' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ error: 'Incorrect Password' });
      }

      const token = this.createToken(user._id, user.email);
      return res.status(200).json({ email, token });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  public async signupUser(req: Request, res: Response): Promise<Response> {
    try {
      // eslint-disable-next-line prefer-const
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

      const exists: IUser | null = await User.findOne({ email });

      if (exists) {
        return res.status(400).json({ error: 'Email already in database' });
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const user: IUser = await User.create({
        first_name,
        last_name,
        email,
        password: hash,
      });

      const token = this.createToken(user._id, user.email);
      return res.status(200).json({ email, token });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
