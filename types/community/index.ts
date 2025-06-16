export type IMessage = {
  _id: string;
  sender: {
    _id: string;
    name: string;
    avatar: string;
    isBlocked: boolean;
  };
  image: string | null;
  content: string;
  createdAt: string;
};

export type IGroup = {
  _id: string;
  name: string;
  image: string;
  messagesCount: number;
  usersCount: number;
  createdAt: string;
};
