import { Request, Response } from "express";
import asynchandler from "express-async-handler";

export const logout = asynchandler(async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none", //set sameSite none if ready for production
  });

  res.status(200).json({ message: "Logged out successfully" });
});
