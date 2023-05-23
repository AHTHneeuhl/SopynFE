import { Request, Response } from "express";
import bcrypt from "bcrypt";
import client from "../utils/prismadb";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    await client.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "Sign up successful" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    res.status(200).json({ message: "Sign in successful" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
