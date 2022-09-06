import { IPost } from './Post';

export interface IUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  posts?: IPost;
}
