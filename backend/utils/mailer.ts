import nodemailer from "nodemailer";
import { envConfig } from "../config/env.config";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: envConfig.EMAIL_USER,
    pass: envConfig.EMAIL_PASSWORD,
  },
});

// Wrap in an async IIFE so we can use await.
export const verifyEmail = async (email: string, subject: string, text: string, html: string) => {
  const info = await transporter.sendMail({
    from: "StudyFlow",
    to: email,
    subject: subject,
    text: text,
    html: html, 
  });

  console.log("Message sent:", info.messageId);
};

export const successResetPasswordEmail = async (email: string, subject: string, text: string, html: string) => {
  const info = await transporter.sendMail({
    from: "StudyFlow",
    to: email,
    subject: subject,
    text: text,
    html: html,
  });

  console.log("Message sent:", info.messageId);
};