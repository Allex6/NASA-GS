import { usersImages } from "@prisma/client";

export type usersImagesCreateData = Omit<usersImages, "id">;