/*
  Warnings:

  - Added the required column `objetivoId` to the `Entrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objetivoId` to the `Meta` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Escola" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "prioritario" BOOLEAN NOT NULL DEFAULT false
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entrega" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "descricao" TEXT NOT NULL,
    "indicador" TEXT,
    "objetivoId" TEXT NOT NULL,
    CONSTRAINT "Entrega_objetivoId_fkey" FOREIGN KEY ("objetivoId") REFERENCES "Objetivo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Entrega" ("descricao", "id", "indicador") SELECT "descricao", "id", "indicador" FROM "Entrega";
DROP TABLE "Entrega";
ALTER TABLE "new_Entrega" RENAME TO "Entrega";
CREATE TABLE "new_Meta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "percentual" INTEGER NOT NULL,
    "prazo" DATETIME,
    "objetivoId" TEXT NOT NULL,
    CONSTRAINT "Meta_objetivoId_fkey" FOREIGN KEY ("objetivoId") REFERENCES "Objetivo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Meta" ("descricao", "id", "percentual", "status") SELECT "descricao", "id", "percentual", "status" FROM "Meta";
DROP TABLE "Meta";
ALTER TABLE "new_Meta" RENAME TO "Meta";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
