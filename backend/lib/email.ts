import nodemailer from 'nodemailer';
import type {Attachment} from 'nodemailer/lib/mailer';
import {readFileSync} from 'fs';
import path from 'path';
import {envConfig} from '../config/env.config';
import { IOrderItem, OrderStatus } from '../interfaces/manager/IOrder';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: envConfig.EMAIL_USER,
    pass: envConfig.EMAIL_PASSWORD
  }
});

export interface OrderEmailData {
  orderId: string;
  managerId: string;
  name: string;
  email: string;
  items: IOrderItem[];
  totalAmount: number;
  status: OrderStatus | string;
}

interface SendOrderEmailParams {
  orderData: OrderEmailData;
  imageAttachments: Attachment[];
  recipientEmail: string;
}

function formatItems(items: IOrderItem[]): string {
  return items.map((item, index) => {
    const itemLines = [
      `Item ${index + 1}: ${item.name}`,
      `  Price: $${item.price.toFixed(2)}`,
      `  Quantity: ${item.quantity}`,
    ];
    
    if (item.details) {
      itemLines.push(`  Details: ${item.details}`);
    }
    
    return itemLines.join('\n');
  }).join('\n\n');
}

function getEmailTemplate(orderData: OrderEmailData, imageCount: number): string {
  const templatePath = path.resolve(
    __dirname,
    "../templates/order-email.html",
  );

  try {
    let template = readFileSync(templatePath, "utf-8");

    template = template.replace(/{{orderId}}/g, escapeHtml(orderData.orderId));
    template = template.replace(
      /{{managerId}}/g,
      escapeHtml(orderData.managerId),
    );
    template = template.replace(/{{name}}/g, escapeHtml(orderData.name));
    template = template.replace(/{{email}}/g, escapeHtml(orderData.email));
    template = template.replace(/{{status}}/g, escapeHtml(orderData.status));
    template = template.replace(
      /{{totalAmount}}/g,
      escapeHtml(orderData.totalAmount.toFixed(2)),
    );
    
    // Format items as readable list
    const formattedItems = formatItems(orderData.items);
    template = template.replace(
      /{{items}}/g,
      escapeHtml(formattedItems),
    );
    
    // Handle images - show count and note they're attached
    const imageText = imageCount > 0 
      ? `${imageCount} image(s) attached to this email`
      : 'No images provided';
    template = template.replace(
      /{{images}}/g,
      escapeHtml(imageText),
    );

    return template;
  } catch (error) {
    console.error("Error reading email template, using fallback:", error);

    return `
      <h2>New Order Received</h2>
      <p><strong>Order ID:</strong> ${escapeHtml(orderData.orderId)}</p>
      <p><strong>Manager ID:</strong> ${escapeHtml(orderData.managerId)}</p>
      <p><strong>Name:</strong> ${escapeHtml(orderData.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(orderData.email)}</p>
      <p><strong>Status:</strong> ${escapeHtml(orderData.status)}</p>
      <p><strong>Total Amount:</strong> $${escapeHtml(orderData.totalAmount.toFixed(2))}</p>
      <p><strong>Items:</strong></p>
      <pre>${escapeHtml(formatItems(orderData.items))}</pre>
      <p><strong>Images:</strong> ${imageCount} attached</p>
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

function getEmailText(orderData: OrderEmailData, imageCount: number): string {
  const formattedItems = formatItems(orderData.items);
  
  return `
    New Order Received
    
    Order ID: ${orderData.orderId}
    Manager ID: ${orderData.managerId}
    Name: ${orderData.name}
    Email: ${orderData.email}
    Status: ${orderData.status}
    Total Amount: $${orderData.totalAmount.toFixed(2)}
    
    Items:
    ${formattedItems}
    
    Images: ${imageCount} image(s) attached
  `;
}

export async function sendOrderEmail({
  orderData,
  imageAttachments,
  recipientEmail
}: SendOrderEmailParams): Promise<void> {
  const imageCount = imageAttachments.length;
  const emailContent = getEmailText(orderData, imageCount);
  const emailHtml = getEmailTemplate(orderData, imageCount);

  await transporter.sendMail({
    from: envConfig.EMAIL_USER,
    to: recipientEmail,
    subject: `New Order from ${orderData.name}`,
    text: emailContent,
    html: emailHtml,
    attachments: imageAttachments
  });
}
