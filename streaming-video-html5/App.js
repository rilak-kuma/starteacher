import { createTransport } from "nodemailer";

//smtp 서버를 사용하기 위한 모듈이다. 
import smtpPool from "nodemailer-smtp-pool";

const a = () => {
  return 2;
};

//nodemailer의 createTransport는 transporter 객체를 만드는 메소드
//아래 메소드 참조값 변소  smtpTrasport 는 nodemailer-smtp-pool
//객체의 인스턴스에 인자값으로 쓰인다.
var smtpTransport = createTransport({
  service: "gmail",
  // host: 'localhost',
  // port: '465',
  // tls: {
  //   rejectUnauthorize: false
  // },
  auth: {
    user: "catdogscat@gmail.com",
    pass: "***"
  },
  maxConnections: 5,
  maxMessages: 10
});

var mailOpt = {
  from: "catdogscat@gmail.com",
  to: "catdogscat@gmail.com",
  subject: "Nodemailer TTT",
  html: "<h1> Node Mailer Test </h1>"
};

smtpTransport.sendMail(mailOpt, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log("message send : " + res);
  }

  smtpTransport.close();

  const a = 1;
  a = 5;
});
