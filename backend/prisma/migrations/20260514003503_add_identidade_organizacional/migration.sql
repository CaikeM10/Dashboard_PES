-- CreateTable
CREATE TABLE "IdentidadeOrganizacional" (
    "id" TEXT NOT NULL,
    "missao" TEXT,
    "visao" TEXT,
    "valores" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IdentidadeOrganizacional_pkey" PRIMARY KEY ("id")
);
