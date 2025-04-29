-- CreateTable
CREATE TABLE "ProductGallery" (
    "id" TEXT NOT NULL,
    "images" TEXT[],
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductGallery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductGallery_productId_key" ON "ProductGallery"("productId");

-- AddForeignKey
ALTER TABLE "ProductGallery" ADD CONSTRAINT "ProductGallery_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
