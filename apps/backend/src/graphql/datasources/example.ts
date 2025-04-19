// import { User } from '@db';
import { IUserDataSource } from './types';

export default class UserDataSource implements IUserDataSource {
  getUsers = async () => {
    // const user = await User.find({});
    // return user;
    return null;
  };
}
