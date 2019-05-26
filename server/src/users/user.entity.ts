import { Column, Entity, Index, ObjectIdColumn } from 'typeorm';
import { UserModel } from 'src/models/user.model';

@Entity({
  name: 'users',
})
export class User implements UserModel {
  @ObjectIdColumn({ unique: true })
  id: string;

  @Column()
  nonce: number = Math.floor(Math.random() * 10000);

  @Column({ unique: true })
  @Index({ unique: true })
  publicAddress: string;

  @Column()
  username: string = null;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column()
  description: string;
}
