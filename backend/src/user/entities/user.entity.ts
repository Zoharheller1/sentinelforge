import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Company } from '../../company/entities/company.entity.js';
import { UserRole } from '../enums/user-role.enum.js';
@Check(
   ` ("role" ='PLATFORM_ADMIN' AND "companyId" IS NULL )
    OR
    ("role" IN ('COMPANY_ADMIN', 'SECURITY_ANALYST') AND "companyId" IS NOT NULL )`
)
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email!: string;

  @Column({
    type: 'varchar',
  })
  passwordHash!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role!: UserRole;

  @ManyToOne(() => Company, {
    nullable: true,
  })
  @JoinColumn({
    name: 'companyId',
  })
  company!: Company | null;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt!: Date;
}