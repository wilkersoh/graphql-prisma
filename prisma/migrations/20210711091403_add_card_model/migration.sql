-- CreateTable
CREATE TABLE `card` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `biography` VARCHAR(191) NOT NULL,
    `cardId` VARCHAR(191) NOT NULL,
    `twitter` VARCHAR(191) NOT NULL,
    `github` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
