import nodemailer from "nodemailer";

type Email = { to: string; subject: string; text: string };

export async function sendEmail({ to, subject, text }: Email) {
  if (!process.env.SMTP_HOST) {
    // No SMTP configured yet: print the email so you can test the flow locally.
    console.info(`[email not sent: SMTP_HOST is empty]\nTo: ${to}\nSubject: ${subject}\n${text}`);
    return;
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({ from: process.env.EMAIL_FROM, to, subject, text });
}
