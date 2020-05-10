import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Equipment from '@modules/equipment/infra/typeorm/entities/Equipment';
import Locality from '@modules/locality/infra/typeorm/entities/Locality';
import User from '@modules/user/infra/typeorm/entities/User';

@Entity('requests')
export default class Request {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  request_reference: string;

  @Column({ nullable: true })
  reserveds_date: Date;

  @Column({ nullable: true })
  seal: string;

  @Column({ nullable: true })
  expedition_date: Date;

  @Column({ nullable: true })
  invoice: string;

  @Column()
  locality_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => Locality)
  @JoinColumn({ name: 'locality_id' })
  locality: Locality;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Equipment)
  @JoinTable()
  assigns: Equipment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
