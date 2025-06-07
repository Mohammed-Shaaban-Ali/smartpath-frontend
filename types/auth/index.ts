export type IUser = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
};

export type IAuthState = {
  user: IUser | null;
  token: string | null;
};

export type ILoginDTO = {
  email: string;
  password: string;
};
