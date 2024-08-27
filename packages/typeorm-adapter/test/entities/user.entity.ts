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
  @Column({ name: 'user_country' })
  country: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'is_admin' })
  isAdmin: boolean;

  @Column({ name: 'social_number' })
  socialNumber: number;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @Column()
  username: string;
}
