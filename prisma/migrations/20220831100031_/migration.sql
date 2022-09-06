-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TagsOnPosts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "postId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,
    CONSTRAINT "TagsOnPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TagsOnPosts_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TagsOnPosts" ("assignedAt", "assignedBy", "id", "postId", "tagId") SELECT "assignedAt", "assignedBy", "id", "postId", "tagId" FROM "TagsOnPosts";
DROP TABLE "TagsOnPosts";
ALTER TABLE "new_TagsOnPosts" RENAME TO "TagsOnPosts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- RedefineIndex
DROP INDEX "User.email_unique";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
