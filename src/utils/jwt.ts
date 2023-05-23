import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export const generateAccessToken = (user: User) => {
  return jwt.sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "15m",
    }
  );
};

export const generateRefreshToken = (user: User, jti: string) => {
  return jwt.sign(
    { userId: user.id, jti },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
};

export const generateTokens = (user: User, jti: string) => {
  return {
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user, jti),
  };
};
