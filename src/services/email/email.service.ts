import nodemailer, { Transporter } from 'nodemailer';
import { Message } from '@services/email/setupEmailMessages';
import { ApiLogMessage } from '@configs/logs/logMessages';

// Configuração do transportador de email
export function CreateTransporter(): Transporter {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com', // Defina o host para o Gmail
    port: 587,
    secure: false, // Utilizar SSL
    auth: {
      user: process.env.APP_EMAIL as string,
      pass: process.env.APP_EMAIL_KEY as string,
    },
  });
}

export function ExampleTestEmail() {
  const transporter = CreateTransporter();
  const _loadedMessage = Message('SEND_EMAIL_CONFIRMATION');
  
  transporter.sendMail({
    from: process.env.APP_EMAIL,
    to: 'exampleEmail@gmail.com',
    subject: _loadedMessage.content.subject,
    html: _loadedMessage.content.html({ username: 'exampleUser', email: 'exemple@gmail.com' ,password: 'examplePassword' }),
  }).then((r) => {
    if (r) {
      return ApiLogMessage('[EMAIL_SERVICE]-[SEND_EMAIL_CONFIRMATION]', 'Queue email successfully');
    }
  }).catch(err => {
    ApiLogMessage('[EMAIL_SERVICE]-[ERROR]', `Failed to send email: ${err.message}`);
    throw new Error(err);
  });
}

