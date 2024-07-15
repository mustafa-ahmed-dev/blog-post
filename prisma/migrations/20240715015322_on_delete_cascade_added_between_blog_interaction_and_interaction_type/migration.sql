-- DropForeignKey
ALTER TABLE "blog_interactions" DROP CONSTRAINT "blog_interactions_interaction_type_id_fkey";

-- AddForeignKey
ALTER TABLE "blog_interactions" ADD CONSTRAINT "blog_interactions_interaction_type_id_fkey" FOREIGN KEY ("interaction_type_id") REFERENCES "interaction_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
