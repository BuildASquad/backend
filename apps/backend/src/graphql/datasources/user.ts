import { User } from '@db';
import { IUserDataSource } from './types';

export default class UserDataSource implements IUserDataSource {
  getUsers = async () => {
    const users = await User.find({}).sort({ created_at: -1 }); //latest created users at top
    return users;
  };

  getUserById = async(userId: string) => {
    try {
      const user = await User.findById(userId);
      
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }
      
      return user;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  }

  updateUserPhoto = async (userId: string, photoUrl: string) => {
    try {
      const user = await User.findByIdAndUpdate(
        userId, 
        { photo: photoUrl },
        { new: true }
      );
      
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }
      
      return user;
    } catch (error) {
      console.error('Error updating user photo:', error);
      throw error;
    }
  }

  deletePhoto = async (userId: string) => {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $unset: { photo: 1 } }, 
        { new: true }
      );
      
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }
      
      return user;
    } catch (error) {
      console.error('Error deleting user photo field:', error);
      throw error;
    }
  }
}