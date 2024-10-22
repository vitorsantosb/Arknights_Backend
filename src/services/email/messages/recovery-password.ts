import { GetDateTimeFormatted } from '@services/timestamp.service';
import configFile from '@configs/config.json';
import { IUserChangePassword } from '@services/email/email-interfaces';

module.exports = {
  message_type: 'RECOVERY_PASSWORD',
  lang: 'pt-BR',
  content: {
    title: 'Arknights API - Mudança de Senha',
    subject: 'Arknights API - Mudança de Senha',
    html: (user: IUserChangePassword, newPassword: string) => `
      <div style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center;">
          <img src="${configFile.assets.logo.url}" alt="Mevi_API_logo" style="max-width: 250px; height: auto;">
          <h2 style="color: #333; margin-top: 10px;">Mevi API</h2>
        </div>
        
        <p style="font-size: 16px; color: #333; margin-top: 20px;">
          Prezado(a) ${user.username},<br>
          Sua senha foi alterada com sucesso! Sua nova senha é:
        </p>
        
        <p style="font-size: 18px; margin-top: 10px;">
          <b>${newPassword}</b>
        </p>

        <p style="font-size: 16px; color: #333; margin-top: 20px;">
          Se houver alguma dúvida ou preocupação, não hesite em entrar em contato conosco. 
          Estamos sempre trabalhando para garantir a segurança e a integridade de suas informações.
        </p>
      </div>
    `,
    footer: `Arknights - API - ${GetDateTimeFormatted()}`,
  },
};
