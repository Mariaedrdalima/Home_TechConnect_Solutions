-- CreateTable
CREATE TABLE "DownHistory" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "hostName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DownHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImmediateFailureNotification" (
    "id" TEXT NOT NULL,
    "downHistoryId" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL,

    CONSTRAINT "ImmediateFailureNotification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImmediateFailureNotification" ADD CONSTRAINT "ImmediateFailureNotification_downHistoryId_fkey" FOREIGN KEY ("downHistoryId") REFERENCES "DownHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
