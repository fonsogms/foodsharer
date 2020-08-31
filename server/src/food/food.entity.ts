import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { User } from 'src/auth/user.entity';
interface Pictures {
  url: string;
  public_id: string;
}
@Entity()
export class Food extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column('date')
  expiryDate: string;
  @Column()
  description: string;
  @Column('float8')
  latitude: number;
  @Column('float8')
  longitude: number;
  @Column()
  address: string;
  @Column('simple-array')
  pictures: Pictures[];
  @ManyToOne(
    type => User,
    user => user.food,
    { eager: false },
  )
  owner: User;
}
