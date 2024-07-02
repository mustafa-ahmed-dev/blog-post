import { Role } from '@prisma/client';

export type LoginType = {
  id: number;
  username: string;
  email: string;
  password: string;
  role: Role;
};
