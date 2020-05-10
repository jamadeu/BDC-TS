import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('equipments')
export default class Equipment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  partnumber: string;

  @Column()
  serial: string;

  @Column({ unique: true })
  partnumber_serial: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
