import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async (options) => {
  console.log('mail optioness ' , options.mailgenContent);
  
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Authentication System",
      link: "https://mailgen.js/",
    },
  });
  const emailText = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailBody = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    secure: false, // Use true for port 465, false for port 587
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });
  
  const mail = {
    from: "mail.authentication@gmail.com",
    to: options.email,
    subject: options.subject,
    text: emailText, // Plain-text version of the message
    html: emailBody,
  };

  try {
    const info = await transporter.sendMail(mail);
  } catch (error) {
    console.error("Email failed", error);
  }
};

const forgotPasswordMailGenContent = (username, forgortPasswordUrl) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset your password",
      action: {
        instructions: "To change your password, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "reset password",
          link: forgortPasswordUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const emailVerificationMailGenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro:
        "Welcome to authentication App! We're very excited to have you on board.",
      action: {
        instructions: "To get started with our Auth, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Verify your account",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

// sendMail({
//   email: user.email,
//   subject: "what is our subject ",
//   mailGenContect: emailVerificationMailGenContent(username, ""),
// });

export { sendMail  , emailVerificationMailGenContent};
