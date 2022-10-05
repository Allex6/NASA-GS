-- CreateEnum
CREATE TYPE "cameras" AS ENUM ('Front Hazard Avoidance Camera', 'Rear Hazard Avoidance Camera', 'Mast Camera', 'Chemistry and Camera Complex', 'Mars Hand Lens Imager', 'Mars Descent Imager', 'Navigation Camera', 'Panoramic Camera', 'Miniature Thermal Emission Spectrometer (Mini-TES)');

-- CreateEnum
CREATE TYPE "mediaTypes" AS ENUM ('image', 'video');

-- CreateEnum
CREATE TYPE "rovers" AS ENUM ('Curiosity', 'Opportunity', 'Spirit');

-- CreateTable
CREATE TABLE "APODImages" (
    "id" SERIAL NOT NULL,
    "photoDate" TIMESTAMP(6) NOT NULL,
    "url" TEXT NOT NULL,
    "views" INTEGER NOT NULL,

    CONSTRAINT "APODImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarsImages" (
    "id" SERIAL NOT NULL,
    "photoDate" TIMESTAMP(6) NOT NULL,
    "url" TEXT NOT NULL,
    "views" INTEGER NOT NULL,
    "rover" "rovers" NOT NULL,
    "camera" "cameras" NOT NULL,

    CONSTRAINT "MarsImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NASAGallery" (
    "id" SERIAL NOT NULL,
    "photoDate" TIMESTAMP(6) NOT NULL,
    "url" TEXT NOT NULL,
    "views" INTEGER NOT NULL,
    "mediaType" "mediaTypes" NOT NULL,

    CONSTRAINT "NASAGallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "birthDate" TIMESTAMP(6) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT '2022-10-01 09:08:48.020477'::timestamp without time zone,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usersImages" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "photoDate" TIMESTAMP(6) NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "usersImages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "APODImages_url_key" ON "APODImages"("url");

-- CreateIndex
CREATE UNIQUE INDEX "MarsImages_url_key" ON "MarsImages"("url");

-- CreateIndex
CREATE UNIQUE INDEX "NASAGallery_url_key" ON "NASAGallery"("url");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usersImages_url_key" ON "usersImages"("url");

-- AddForeignKey
ALTER TABLE "usersImages" ADD CONSTRAINT "usersImages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
