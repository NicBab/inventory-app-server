import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
     const search = req.query.search?.toString();
    const users = await prisma.users.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined, // return all if no search
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users" });
  }
};