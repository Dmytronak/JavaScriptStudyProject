import * as nodemailer from 'nodemailer';

export const sendEmailHelper = async (fullName:string, email: string, link: string) => {
    const transporter = nodemailer.createTransport({
      service:process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASSWORD,
      },
    });
  

    const info = await transporter.sendMail({
      from: '"Admin NestJsProject 👻" <dmytronakwork@gmail.com>', // sender address
      to: email, // list of receivers
      subject: `Hello ${fullName} ✔`, // Subject line
      text: `Hello, dear ${fullName} click on the link to change your password!!!!!`, // plain text body
      html: `<b>Hello, dear ${fullName} your password was discarded and you cant login to site with your old password,click on the link to get a new password</b>
      <a href="${link}" style="background-color:#e60909;border:1px solid #e60909;border-radius:4px;
      color:#ffffff;display:inline-block;font-family:Google Sans,Roboto,Arial;font-size:16px;line-height:25px;
      text-decoration:none;padding:7px 24px 7px 24px;font-weight:500;text-align:center;
      word-break:normal;direction:ltr;margin:5px;">Reset Password</a> `, // html body
    });
    console.log('Message sent: %s', info.messageId);
  };