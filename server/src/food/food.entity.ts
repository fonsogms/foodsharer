import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/auth/user.entity';
@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  latitude: number;
  @Column()
  longitude: number;
  @Column()
  address: string;
  @Column('int', { array: true })
  pictures: string[];
  @ManyToOne(
    type => User,
    user => user.food,
    { eager: false },
  )
  owner: User;
}
