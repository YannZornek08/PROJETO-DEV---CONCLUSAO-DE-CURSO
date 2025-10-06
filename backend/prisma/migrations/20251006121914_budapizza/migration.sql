/*
  Warnings:

  - You are about to drop the column `adicionado` on the `ingredients_products` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `mtdo_pagto` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `tables` table. All the data in the column will be lost.
  - Added the required column `items_additionals_id` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `items_ingredients_id` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mtdo_pagto_id` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."items" DROP CONSTRAINT "items_product_id_fkey";

-- AlterTable
ALTER TABLE "public"."costumers" ALTER COLUMN "cpf" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "public"."ingredients_products" DROP COLUMN "adicionado";

-- AlterTable
ALTER TABLE "public"."items" DROP COLUMN "product_id",
ADD COLUMN     "items_additionals_id" TEXT NOT NULL,
ADD COLUMN     "items_ingredients_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."payments" DROP COLUMN "mtdo_pagto",
ADD COLUMN     "mtdo_pagto_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."tables" DROP COLUMN "status";

-- CreateTable
CREATE TABLE "public"."payment_methods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."additionals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "additionals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categories_additionals" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "additionals_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "categories_additionals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."items_additionals" (
    "id" TEXT NOT NULL,
    "adicionado" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categories_additionals_id" TEXT NOT NULL,

    CONSTRAINT "items_additionals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."items_ingredients" (
    "id" TEXT NOT NULL,
    "adicionado" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ingredient_product_id" TEXT NOT NULL,

    CONSTRAINT "items_ingredients_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."items" ADD CONSTRAINT "items_items_additionals_id_fkey" FOREIGN KEY ("items_additionals_id") REFERENCES "public"."items_additionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."items" ADD CONSTRAINT "items_items_ingredients_id_fkey" FOREIGN KEY ("items_ingredients_id") REFERENCES "public"."items_ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_mtdo_pagto_id_fkey" FOREIGN KEY ("mtdo_pagto_id") REFERENCES "public"."payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."categories_additionals" ADD CONSTRAINT "categories_additionals_additionals_id_fkey" FOREIGN KEY ("additionals_id") REFERENCES "public"."additionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."categories_additionals" ADD CONSTRAINT "categories_additionals_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."items_additionals" ADD CONSTRAINT "items_additionals_categories_additionals_id_fkey" FOREIGN KEY ("categories_additionals_id") REFERENCES "public"."categories_additionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."items_ingredients" ADD CONSTRAINT "items_ingredients_ingredient_product_id_fkey" FOREIGN KEY ("ingredient_product_id") REFERENCES "public"."ingredients_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
