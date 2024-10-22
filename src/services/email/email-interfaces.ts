export interface IUserSendPasswordOnEmail {
  username: string;
  email: string;
  password: string;
}

export interface IResetPasswordEmail {
  email: string
  username: string
}

export interface IUserChangePassword {
  username: string;
}

export interface IUserResetPasswordToken {
  username: string;
  linkToResetToken: string;
}

export interface EmailMessage<T = any> {
  message_type: string;
  lang: string;
  content: {
    title: string;
    subject: string;
    html: (data: T) => string;
    footer: string;
  };
}
export type MessageType<K extends keyof IMessageTypes> = IMessageTypes[K];
export interface IMessageTypes {
  SEND_EMAIL_CONFIRMATION: IUserSendPasswordOnEmail;
  USER_PASSWORD_RESET: IResetPasswordEmail;
  RECOVERY_PASSWORD: IUserChangePassword;
  RESET_PASSWORD_TOKEN: IUserResetPasswordToken;
}