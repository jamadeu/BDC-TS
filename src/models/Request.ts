import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import Equipemnts from './Equipment';

@Entity()
export default class Request {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  request: string;

  @Column()
  reserveds_date: Date;

  @Column()
  seal: string;

  @Column()
  expedition_date: Date;

  @Column()
  invoice: string;

  @Column()
  locality_id: number;

  @Column()
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
