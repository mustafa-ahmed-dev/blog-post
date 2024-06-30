import { Prisma, PrismaClient } from '@prisma/client';
import { promises as fs } from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

const INTERACTION_TYPE_SEED_FILE_PATH = path.join(
  __dirname,
  '..',
  'data',
  'interactionTypes.json',
);

type InteractionType = Omit<
  Omit<Omit<Prisma.InteractionTypeCreateInput, 'updatedAt'>, 'createdAt'>,
  'blogs'
>;

const INTERACTION_TYPES: InteractionType[] = [
  {
    name: 'like',
    interaction: '👍',
  },
  {
    name: 'dislike',
    interaction: '👎',
  },
  {
    name: 'love',
    interaction: '❤',
  },
  {
    name: 'wow',
    interaction: '😮',
  },
  {
    name: 'angry',
    interaction: '😡',
  },
  {
    name: 'sad',
    interaction: '😢',
  },
  {
    name: 'laugh',
    interaction: '😂',
  },
  {
    name: 'neutral',
    interaction: '😐',
  },
];

Object.freeze(INTERACTION_TYPES);

export const writeInteractionTypes = async () => {
  const interactionTypes = JSON.stringify(INTERACTION_TYPES);

  await fs.writeFile(INTERACTION_TYPE_SEED_FILE_PATH, interactionTypes);
};

const getInteractionTypes = async () => {
  const interactionTypesData = await fs.readFile(
    INTERACTION_TYPE_SEED_FILE_PATH,
    {
      encoding: 'utf8',
    },
  );

  const interactionTypes = JSON.parse(
    interactionTypesData,
  ) as unknown as InteractionType[];

  return interactionTypes;
};

export const generateInteractionTypes = async () => {
  const interactionTypesData = await getInteractionTypes();

  const promises = interactionTypesData.map((interactionTypeData) => {
    return prisma.interactionType.create({
      data: interactionTypeData,
    });
  });

  return await Promise.all(promises);
};
