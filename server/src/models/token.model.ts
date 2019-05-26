import { DetailsModel } from './details.model';
import { TransfersModel } from './transfers.model';
import { UserModel } from './user.model';

export interface TokenModel {
  tokenId: number;
  owner: [UserModel];
  details: DetailsModel;
  transfers: TransfersModel;
  openSellOrders: any;
  title: string;
  description: string;
  addressContract?: string;
  addressMarketContract?: string;
  filePath: string;
}
