-- CreateTable
CREATE TABLE "DeliveryCountry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DeliveryCountry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryCity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "DeliveryCity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryCountry_name_key" ON "DeliveryCountry"("name");

-- AddForeignKey
ALTER TABLE "DeliveryCity" ADD CONSTRAINT "DeliveryCity_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "DeliveryCountry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
