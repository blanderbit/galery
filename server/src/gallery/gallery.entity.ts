import { Entity, ObjectIdColumn, ObjectID, Column, Index } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('gallery')
export class Gallery {
  @ObjectIdColumn({ unique: true })
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column({ unique: true })
  @Index({ unique: true })
  address: string;

  @Column()
  ownerAddress: string;

  @Column()
  price: number;

  @Column()
  owner: [User];
}
