import { Request, Response } from "express";
import prismadb from "../utils/prismadb";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await prismadb.book.findMany();
    res.status(200).json(books);
  } catch (e: any) {
    res.status(404).json({ message: e.message });
  }
};

export const getUserBooks = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const posts = await prismadb.book.findMany({
      where: { userId },
    });
    res.status(200).json(posts);
  } catch (e) {
    res.status(404).json({ error_message: e.message });
  }
};
