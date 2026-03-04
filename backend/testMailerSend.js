const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.mailersend.net",
  port: 587,
  secure: false, // true para SSL (puerto 465), false para TLS (puerto 587)
  auth: {
    user: "MS_jneh4K@trial-jpzkmgq1jmnl059v.mlsender.net", // Reemplaza con tu usuario SMTP
    pass: "mssp.olFcpBQ.neqvygm93zdl0p7w.4uUMEvc" // Reemplaza con tu clave SMTP
  },
  debug: true, // Muestra logs detallados
  logger: true  // Registra información en consola
});

transporter.sendMail({
  from: "noreply@trial-jpzkmgq1jmnl059v.mlsender.net", // Usa un correo verificado en MailerSend
  to: "rsalazvi@gmail.com",
  subject: "Prueba de MailerSend",
  text: "Este es un correo de prueba desde MailerSend con Node.js"
}, (error, info) => {
  if (error) {
    console.error("Error al enviar:", error);
  } else {
    console.log("Correo enviado:", info.response);
  }
});
