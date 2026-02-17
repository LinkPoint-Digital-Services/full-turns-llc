import multer, {FileFilterCallback} from "multer";
import {Request} from "express";
import path from "path";
import {promises as fs} from "fs";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const tempDir = path.join(process.cwd(), "tmp");
    try {
      await fs.mkdir(tempDir, {recursive: true});
      cb(null, tempDir);
    } catch (error) {
      cb(error as Error, tempDir);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, `order-${uniqueSuffix}${fileExtension}`);
  },
});

// File filter to accept only images
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  const allowedMimes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images are allowed."));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit per file
  },
});
