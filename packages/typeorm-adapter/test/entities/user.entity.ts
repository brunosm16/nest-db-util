import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @CreateDateColumn()
  createdAt: string;

  @DeleteDateColumn()
  deletedAt: string;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isAdmin: boolean;

  @Column()
  socialNumber: number;

  @UpdateDateColumn()
  updatedAt: string;

  @Column()
  username: string;
}
