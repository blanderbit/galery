import { Column, Entity, ObjectIdColumn } from 'typeorm';

import { TokenModel } from 'src/models/token.model';
import { UserModel } from 'src/models/user.model';

@Entity('tokens')
export class Token implements Partial<TokenModel> {
  @ObjectIdColumn({ unique: true })
  id: string;

  @Column()
  tokenId: number;

  @Column()
  owner: [UserModel];

  @Column()
  price: number;

  @Column()
  author: [UserModel];

  @Column()
  authorAddress: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  ownerAddress: string;

  @Column()
  addressContract: string;

  @Column()
  addressMarketContract: string;

  @Column()
  openSellOrders: any;

  @Column()
  details?: any;

  @Column()
  filePath: string;

  @Column()
  transfers?: any;
}
