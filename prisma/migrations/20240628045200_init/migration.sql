-- CreateEnum
CREATE TYPE "role" AS ENUM ('user', 'admin', 'super_admin');

-- CreateEnum
CREATE TYPE "blog_type" AS ENUM ('regular', 'group', 'page');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(35) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" CHAR(97) NOT NULL,
    "role" "role" NOT NULL DEFAULT 'user',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_details" (
    "userId" INTEGER NOT NULL,
    "first_name" VARCHAR(20) NOT NULL,
    "middle_name" VARCHAR(20) NOT NULL,
    "last_name" VARCHAR(20) NOT NULL,
    "date_of_birth" DATE NOT NULL,
    "image_id" UUID,

    CONSTRAINT "user_details_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "blogs" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" VARCHAR NOT NULL,
    "text" TEXT NOT NULL,
    "type" "blog_type" NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "author_id" INTEGER NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interaction_types" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "interaction" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "interaction_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_interactions" (
    "interaction_type_id" INTEGER NOT NULL,
    "blog_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "blog_interactions_pkey" PRIMARY KEY ("interaction_type_id","blog_id")
);

-- CreateTable
CREATE TABLE "attachments" (
    "id" UUID NOT NULL,
    "mimetype" VARCHAR(10) NOT NULL,
    "size" BIGINT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "attachments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_is_active_idx" ON "users"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "user_details_image_id_key" ON "user_details"("image_id");

-- CreateIndex
CREATE INDEX "user_details_first_name_idx" ON "user_details"("first_name");

-- CreateIndex
CREATE INDEX "user_details_middle_name_idx" ON "user_details"("middle_name");

-- CreateIndex
CREATE INDEX "user_details_last_name_idx" ON "user_details"("last_name");

-- CreateIndex
CREATE INDEX "user_details_date_of_birth_idx" ON "user_details"("date_of_birth");

-- CreateIndex
CREATE INDEX "blogs_author_id_idx" ON "blogs"("author_id");

-- CreateIndex
CREATE INDEX "blogs_created_at_idx" ON "blogs"("created_at");

-- CreateIndex
CREATE INDEX "blogs_title_idx" ON "blogs"("title");

-- AddForeignKey
ALTER TABLE "user_details" ADD CONSTRAINT "user_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_details" ADD CONSTRAINT "user_details_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "attachments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_interactions" ADD CONSTRAINT "blog_interactions_interaction_type_id_fkey" FOREIGN KEY ("interaction_type_id") REFERENCES "interaction_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_interactions" ADD CONSTRAINT "blog_interactions_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
