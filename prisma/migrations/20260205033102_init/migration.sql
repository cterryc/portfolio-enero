-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "long_description" TEXT NOT NULL,
    "live_url" TEXT NOT NULL,
    "repo_url" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "technologies" JSONB NOT NULL,
    "features" JSONB NOT NULL,
    "code_snippet" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_stats" (
    "id" SERIAL NOT NULL,
    "project_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "val" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "project_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commits" (
    "id" SERIAL NOT NULL,
    "hash" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "head" BOOLEAN NOT NULL DEFAULT false,
    "branch" TEXT NOT NULL,
    "merge" BOOLEAN NOT NULL DEFAULT false,
    "details" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "commits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "val" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "commits_hash_key" ON "commits"("hash");

-- AddForeignKey
ALTER TABLE "project_stats" ADD CONSTRAINT "project_stats_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
