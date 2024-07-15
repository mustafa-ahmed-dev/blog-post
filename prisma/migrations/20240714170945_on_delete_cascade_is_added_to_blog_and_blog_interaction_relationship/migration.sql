-- DropForeignKey
ALTER TABLE "blog_interactions" DROP CONSTRAINT "blog_interactions_blog_id_fkey";

-- AddForeignKey
ALTER TABLE "blog_interactions" ADD CONSTRAINT "blog_interactions_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
