-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "password" TEXT NOT NULL DEFAULT '1893d0a0fa1b608de784327a39856244fa850f7a37079d6f44e20a891642b312e32e7bde5aa8310b16d5a0677b6f3953ca19f23590281acf4f7c2c65eaf06a1c',
    "salt" TEXT NOT NULL DEFAULT 'e734f141a782ccf5c09f8e2604454680'
);
INSERT INTO "new_User" ("email", "firstName", "id", "lastName") SELECT "email", "firstName", "id", "lastName" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
