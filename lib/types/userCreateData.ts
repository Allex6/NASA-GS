import { users } from "@prisma/client";

export type userCreateData = Omit<users, "id" | "createdAt">;