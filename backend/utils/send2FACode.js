const nodemailer = require("nodemailer");

const send2FACode = async (email, code) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.mailersend.net",
    port: 587,
    secure: false, // usar true si usas el puerto 465
    auth: {
      user: process.env.MAILERSEND_SENDER_EMAIL, // tu correo verificado en MailerSend
      pass: process.env.MAILERSEND_API_KEY        // la API key SMTP de MailerSend
    }
  });

  const mailOptions = {
    from: `"Soporte App" <${process.env.MAILERSEND_SENDER_EMAIL}>`,
    to: email,
    subject: "Código de verificación 2FA",
    text: `Tu código de verificación es: ${code}`
  };

  await transporter.sendMail(mailOptions);
};

module.exports = send2FACode;
