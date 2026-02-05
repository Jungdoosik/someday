-- CreateTable
CREATE TABLE "Thought" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "knockDt" TEXT,
    "deleteYn" TEXT NOT NULL DEFAULT 'N',

    CONSTRAINT "Thought_pkey" PRIMARY KEY ("id")
);
