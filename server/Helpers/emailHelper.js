const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(to, subject, html) {
  try {
    await transporter.sendMail({
      from: `"JuriTech" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log('E-mail enviado com sucesso');
  } catch (err) {
    console.error('Erro ao enviar e-mail:', err);
  }
}

module.exports = sendEmail;
