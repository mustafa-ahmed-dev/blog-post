import { faker } from '@faker-js/faker';
import { Prisma, Role, PrismaClient } from '@prisma/client';
import { hash } from 'argon2';
import { promises as fs } from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

export type UsersArgs = {
  superAdmins: number;
  admins: number;
  users: number;
};

export const PASSWORD = '@User#12345@';

const USERS_SEED_FILE_PATH = path.join(__dirname, '..', 'data', 'users.json');

type GeneratedUsersData = Omit<
  Omit<Omit<Omit<Prisma.UserCreateInput, 'updatedAt'>, 'createdAt'>, 'blogs'>,
  'isActive'
>;

const generateUser = async (role: Role = Role.User) => {
  const firstName: string = faker.person.firstName();
  const middleName: string = faker.person.middleName();
  const lastName: string = faker.person.lastName();
  const dateOfBirth: Date = faker.date.birthdate();

  const username: string = faker.internet
    .userName({
      firstName,
      lastName,
    })
    .toLowerCase();

  const email: string = faker.internet
    .email({
      firstName,
      lastName,
      provider: 'gmail.com',
    })
    .toLowerCase();

  const hashedPassword: string = await hash(PASSWORD);

  const data: Prisma.UserCreateInput = {
    username,
    email,
    password: hashedPassword,
    role,
    details: {
      create: {
        firstName,
        middleName,
        lastName,
        dateOfBirth,
      },
    },
  };

  return data;
};

const getUsersData = async () => {
  const data = await fs.readFile(USERS_SEED_FILE_PATH, {
    encoding: 'utf8',
  });

  const users = JSON.parse(data) as unknown as GeneratedUsersData[];

  return users;
};

const generateUsersData = async (
  length: number = 1,
  role: Role = Role.User,
) => {
  const promises = Array.from({ length }).map(() => {
    return generateUser(role);
  });

  const users = await Promise.all(promises);

  return users;
};

export const writeGeneratedUsersData = async (args: UsersArgs) => {
  const usersPromises = [
    generateUsersData(args.superAdmins, Role.SuperAdmin),
    generateUsersData(args.admins, Role.Admin),
    generateUsersData(args.users, Role.User),
  ];

  const users = (await Promise.all(usersPromises)).flat();

  await fs.writeFile(USERS_SEED_FILE_PATH, JSON.stringify(users));
};

export const generateUsers = async () => {
  const usersData = await getUsersData();

  const promises = usersData.map((userData) => {
    return prisma.user.create({
      data: userData,
    });
  });

  return await Promise.all(promises);
};
