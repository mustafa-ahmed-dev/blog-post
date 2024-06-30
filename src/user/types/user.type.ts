import { BlogType, Role } from '@prisma/client';
import {
  PageNumberCounters,
  PageNumberPagination,
} from 'prisma-extension-pagination/dist/types';

export type FindSingleUser = {
  details: {
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: Date;
    imageId: string;
    userId: number;
  };
} & {
  username: string;
  email: string;
  password: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  id: number;
};

export type FindSingleUserWithProfile = {
  blogs: {
    id: number;
    title: string;
    type: BlogType;
    description: string;
    text: string;
    createdAt: Date;
  }[];
} & {
  details: {
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: Date;
    imageId: string;
    userId: number;
  };
} & {
  username: string;
  email: string;
  password: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  id: number;
};

export type FindManyUsers = [
  ({
    details: {
      firstName: string;
      middleName: string;
      lastName: string;
      dateOfBirth: Date;
      imageId: string;
      userId: number;
    };
  } & {
    id: number;
    username: string;
    email: string;
    password: string;
    role: Role;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  })[],
  PageNumberPagination & PageNumberCounters,
];
