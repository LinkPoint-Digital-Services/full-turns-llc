import { Schema, model } from 'mongoose';

export const BlogSchema = new Schema({
  blog_id: { type: String, required: true },
  featured_image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

