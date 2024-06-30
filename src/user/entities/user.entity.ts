import { Role } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class UserEntity {
  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  middleName: string;

  @Expose()
  lastName: string;

  @Expose()
  dateOfBirth: Date;

  @Expose()
  imageId: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Expose()
  isActive: boolean;

  @Expose()
  role: Role;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
