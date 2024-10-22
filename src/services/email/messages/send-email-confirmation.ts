import configFile from '@configs/config.json';
import { GetDateTimeFormatted } from '@services/timestamp.service';
import { IUserPasswordEmail } from '@services/email/email-interfaces';


module.exports = {
  'message_type': 'SEND_EMAIL_CONFIRMATION',
  'lang': 'pt-BR',
  'content': {
    'title': 'Arknights API - Senha Primária',
    'subject': 'Informações Importantes sobre sua Conta',
    'html': (user: IUserPasswordEmail) => `
      <div style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center;">
          <img src="${configFile.assets.logo.url}" alt="arknights_api_logo" style="max-width: 350px; height: auto;">
        </div>
        
        <p style="font-size: 16px; color: #333; margin-top: 20px;">
          Prezado(a) ${user.username},<br>
          Sua conta no Arknights-App foi criada com sucesso! Seu login é ${user.email} e sua senha é:
        </p>
        
        <p style="font-size: 18px; margin-top: 10px; color: aqua">
          <b>${user.password}</b>
        </p>

        <p style="font-size: 16px; color: #333;">
          Se enfrentar algum problema ao realizar o login, entre em contato com os administradores.<br>
          Estaremos sempre informando sobre qualquer atualização importante relacionadas à sua conta estamos sempre trabalhando para garantir a segurança e a integridade de suas informações.<br>
          Se houver alguma dúvida ou preocupação, não hesite em entrar em contato conosco. Estamos aqui para ajudar.<br>
        </p>
      </div>
      <p style="font-size: 14px; color: #333; text-align: center; margin-top: 20px;">
        Arknights API - ${GetDateTimeFormatted()}
      </p>
    `,
  },
};


