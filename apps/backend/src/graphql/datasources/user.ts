import { User } from '@db';
import { IUserDataSource } from './types';

export default class UserDataSource implements IUserDataSource {
  getUsers = async () => {
    const user = await User.find({});
    return user;
  };

  async updateUserPhoto(userId: string, photoUrl: string) {
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

  async deletePhoto(userId: string) {
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