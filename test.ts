import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async () => {
  const id: number = 1;

  const data = await prisma.$queryRaw`
      SELECT
        interactions.interaction_type_id AS id,
        interaction_types.name,
        interaction_types.interaction,
        COUNT(interaction_types.interaction) 
      FROM blog_interactions AS interactions
      JOIN interaction_types
        ON interaction_types.id = interactions.interaction_type_id
      WHERE blog_id = ${id}
      GROUP BY interactions.interaction_type_id, interaction_types.name, interaction_types.interaction
    `;

  console.log('data:', data);
})();
