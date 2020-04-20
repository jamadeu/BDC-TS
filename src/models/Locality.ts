import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('localities')
export default class Locality {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  locality: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
