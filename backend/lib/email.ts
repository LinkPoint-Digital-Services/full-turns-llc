import nodemailer from 'nodemailer';
import type {Attachment} from 'nodemailer/lib/mailer';
import {readFileSync} from 'fs';
import path from 'path';
import {envConfig} from '../config/env.config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: envConfig.EMAIL_USER,
    pass: envConfig.EMAIL_PASSWORD
  }
});

export interface OrderData {
  name: string;
  address: string;
  orderDetails: string;
  // add new fields here if new changes in the frontend
}

interface SendOrderEmailParams {
  orderData: OrderData;
  imageAttachments: Attachment[];
  recipientEmail: string;
}

function getEmailTemplate(orderData: OrderData): string {
  // Resolve template path - works in both dev (ts-node) and production (compiled)
  const templatePath = path.resolve(
    process.cwd(),
    'api',
    'templates',
    'order-email.html'
  );

  try {
    let template = readFileSync(templatePath, 'utf-8');
    // Replace placeholders with actual data
    template = template.replace(/{{name}}/g, escapeHtml(orderData.name));
    template = template.replace(/{{address}}/g, escapeHtml(orderData.address));
    template = template.replace(
      /{{orderDetails}}/g,
      escapeHtml(orderData.orderDetails)
    );
    return template;
  } catch (error) {
    console.error('Error reading email template, using fallback:', error);
    // Fallback HTML template
    return `
      <h2>New Order Received</h2>
      <p><strong>Name:</strong> ${escapeHtml(orderData.name)}</p>
      <p><strong>Address:</strong> ${escapeHtml(orderData.address)}</p>
      <p><strong>Order Details:</strong> ${escapeHtml(
        orderData.orderDetails
      )}</p>
    `;
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function getEmailText(orderData: OrderData): string {
  return `
    New Order Received
    
    Order Details:
    Name: ${orderData.name}
    Address: ${orderData.address}
    Order Details: ${orderData.orderDetails}
    
    Testing email from node mailer
  `;
}

export async function sendOrderEmail({
  orderData,
  imageAttachments,
  recipientEmail
}: SendOrderEmailParams): Promise<void> {
  const emailContent = getEmailText(orderData);
  const emailHtml = getEmailTemplate(orderData);

  await transporter.sendMail({
    from: envConfig.EMAIL_USER,
    to: recipientEmail, // Fixed recipient email
    subject: `New Order from ${orderData.name}`,
    text: emailContent,
    html: emailHtml,
    attachments: imageAttachments
  });
}
