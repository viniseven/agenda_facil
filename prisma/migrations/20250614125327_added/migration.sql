-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UsersInClinics" (
    "user_id" TEXT NOT NULL,
    "clinic_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,

    PRIMARY KEY ("user_id", "clinic_id"),
    CONSTRAINT "UsersInClinics_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UsersInClinics_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UsersInClinics" ("clinic_id", "created_at", "updated_at", "user_id") SELECT "clinic_id", "created_at", "updated_at", "user_id" FROM "UsersInClinics";
DROP TABLE "UsersInClinics";
ALTER TABLE "new_UsersInClinics" RENAME TO "UsersInClinics";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
