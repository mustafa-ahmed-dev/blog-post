import { Role } from '@prisma/client';
import { Expose } from 'class-transformer';

export class JwtPayload {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  role: Role;
}
