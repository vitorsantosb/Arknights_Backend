export interface IUserPasswordEmail {
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