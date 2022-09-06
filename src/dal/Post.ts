import { IUser } from './User';

export interface IPost {
  id: string;
  title: string;
  author?: IUser;
  authorId?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
