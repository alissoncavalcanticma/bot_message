-- CreateTable
CREATE TABLE `cadpeople` (
    `id` VARCHAR(191) NOT NULL,
    `cod` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
