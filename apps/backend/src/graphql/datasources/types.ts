export interface IDataSource {
  user: IUserDataSource;
  s3: IS3DataSource;
}

export interface IUserDataSource {
  getUsers: () => Promise<unknown>;
  getUserById: (userId: string) => Promise<unknown>; // doubtfull abt this unknown type
  updateUserPhoto: (userId: string, photoUrl: string) => Promise<unknown>;
  deletePhoto: (userId: string) => Promise<unknown>;
}

export interface IS3DataSource {
  getPresignedUrl: (fileType: string, folder?: string) => Promise<{
    upload_url: string;
    file_url: string;
  }>;
  deleteProfilePhoto: (photoUrl: string) => Promise<boolean>;
}