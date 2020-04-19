import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class Equipment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  partnumber: string;

  @Column()
  serial: string;

  @Column()
  partnumber_serial: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
