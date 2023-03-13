import nodemailer from "nodemailer";
import * as dotenv from "dotenv";

const env = dotenv.config().parsed ?? {};

console.log("env", env);

async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: env.host,
    port: 465,
    secure: true, //true, // true for 465, false for other ports
    auth: {
      user: env.user, // generated ethereal user
      pass: env.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${env.user}`, // sender address
    // from: `"node email 发送 👻" <${env.user}>`, // sender address
    to: env.sendUser, // list of receivers
    subject: " node mail 发送✔", // Subject line
    // text: "Hello world?", // plain text body
    html: "<b>通过使用 node mail 进行邮件发送。</b>这可以用来对外发送信息", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
