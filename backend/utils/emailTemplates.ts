export const verifyEmailTemplate = (code: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verify your email</title>
      </head>
      <body style="margin:0;padding:0;background-color:#0b1220;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';color:#e5e7eb;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0b1220;padding:24px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#0f172a;border:1px solid #1d4ed8;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:28px 28px 8px 28px;text-align:center;">
                    <div style="font-size:14px;letter-spacing:0.08em;color:#93c5fd;text-transform:uppercase;">Action Required</div>
                    <h1 style="margin:8px 0 0 0;font-size:22px;line-height:1.3;color:#bfdbfe;">Verify your email address</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 28px 0 28px;">
                    <p style="margin:0 0 12px 0;font-size:14px;line-height:1.6;color:#cbd5e1;">
                      Use the verification code below to finish setting up your account. For your security, this code expires in 10 minutes.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 28px 4px 28px;">
                    <div style="background-color:#0b1220;border:1px solid #1d4ed8;border-radius:10px;padding:18px;text-align:center;">
                      <div style="font-size:12px;color:#93c5fd;margin-bottom:8px;letter-spacing:0.08em;text-transform:uppercase;">Your verification code</div>
                      <div style="display:inline-block;background:#111827;border:1px solid #1f2937;border-radius:8px;padding:14px 18px;color:#f8fafc;font-weight:700;font-size:22px;letter-spacing:0.35em;">
                        ${code}
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 28px 0 28px;">
                    <p style="margin:0 0 12px 0;font-size:13px;line-height:1.6;color:#9ca3af;">
                      If you didn’t request this, you can safely ignore this email.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 28px 28px 28px;text-align:center;border-top:1px solid #1f2937;">
                    <p style="margin:8px 0 0 0;font-size:12px;color:#64748b;">
                      Sent securely from our authentication service
                    </p>
                  </td>
                </tr>
              </table>
              <div style="max-width:560px;margin-top:12px;text-align:center;color:#6b7280;font-size:11px;">
                © ${new Date().getFullYear()} — All rights reserved
              </div>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};

export const resetPasswordTemplate = () => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Password reset successful</title>
      </head>
      <body style="margin:0;padding:0;background-color:#0b1220;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';color:#e5e7eb;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0b1220;padding:24px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#0f172a;border:1px solid #10b981;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:28px 28px 8px 28px;text-align:center;">
                    <div style="font-size:14px;letter-spacing:0.08em;color:#6ee7b7;text-transform:uppercase;">Security Notice</div>
                    <h1 style="margin:8px 0 0 0;font-size:22px;line-height:1.3;color:#a7f3d0;">Your password was reset</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 28px 0 28px;">
                    <p style="margin:0 0 12px 0;font-size:14px;line-height:1.6;color:#cbd5e1;">
                      This is a confirmation that your account password was successfully changed.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 28px 0 28px;">
                    <div style="background-color:#0b1220;border:1px solid #064e3b;border-radius:10px;padding:16px;">
                      <p style="margin:0;font-size:13px;line-height:1.6;color:#9ca3af;">
                        If you did not perform this action, please secure your account immediately by resetting your password again and reviewing your account activity.
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 28px 28px 28px;text-align:center;border-top:1px solid #1f2937;">
                    <p style="margin:8px 0 0 0;font-size:12px;color:#64748b;">
                      Sent securely from our authentication service
                    </p>
                  </td>
                </tr>
              </table>
              <div style="max-width:560px;margin-top:12px;text-align:center;color:#6b7280;font-size:11px;">
                © ${new Date().getFullYear()} — All rights reserved
              </div>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};
