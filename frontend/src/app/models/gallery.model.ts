import { UserModel } from './user.model';

export interface Gallery {
  id: string;
  title: string;
  description: string;
  image: string;
  address: string;
  owner: [UserModel];
  ownerAddress: string;
  price: number;
}
