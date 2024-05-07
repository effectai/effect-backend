-- CreateTable
CREATE TABLE "Keys" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "redeemedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Keys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Keys_key_key" ON "Keys"("key");
