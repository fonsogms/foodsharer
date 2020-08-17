import {
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Food } from 'src/food/food.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column({ default: null })
  phone: string | null;
  @Column({ default: null })
  mail: string | null;
  @Column({ default: null })
  latitude: number | null;
  @Column({ default: null })
  longitude: number | null;
  @OneToMany(
    type => Food,
    food => food.owner,
    { eager: true },
  )
  food: Food[];
}
