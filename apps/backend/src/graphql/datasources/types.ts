export interface IDataSource {
  user: IUserDataSource;
}

export interface IUserDataSource {
  getUsers: () => Promise<unknown>;
}
