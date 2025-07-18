/*
  Warnings:

  - You are about to drop the column `specialty` on the `doctors` table. All the data in the column will be lost.
  - Added the required column `speciality` to the `doctors` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_doctors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "avatar_img_url" TEXT NOT NULL,
    "speciality" TEXT NOT NULL,
    "appointment_price_in_cents" INTEGER NOT NULL,
    "available_from_week_day" INTEGER NOT NULL,
    "available_to_week_day" INTEGER NOT NULL,
    "available_from_time" TEXT NOT NULL,
    "available_to_time" TEXT NOT NULL,
    "clinic_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "doctors_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_doctors" ("appointment_price_in_cents", "available_from_time", "available_from_week_day", "available_to_time", "available_to_week_day", "avatar_img_url", "clinic_id", "created_at", "id", "name", "updated_at") SELECT "appointment_price_in_cents", "available_from_time", "available_from_week_day", "available_to_time", "available_to_week_day", "avatar_img_url", "clinic_id", "created_at", "id", "name", "updated_at" FROM "doctors";
DROP TABLE "doctors";
ALTER TABLE "new_doctors" RENAME TO "doctors";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
