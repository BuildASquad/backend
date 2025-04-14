import { UserModel } from '@db';
import { IUserDataSource } from './types';

export default class UserDataSource implements IUserDataSource {
  getUsers = async () => {
    const user = await UserModel.find({});
    return user;
  };
}
