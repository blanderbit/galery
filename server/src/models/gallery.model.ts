import { UserModel } from './user.model';

export interface GalleryModel {
  id: string;
  title: string;
  description: string;
  image: string;
  address: string;
  price: number;
  ownerAddress: string;
  owner: UserModel;
}
