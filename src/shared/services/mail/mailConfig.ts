import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import handlebarOptions from "./viewEngine";

// mail sender
export const transporter: nodemailer.Transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525, // upgrade later with STARTTLS
  auth: {
    user: "099197e15c3b52",
    pass: "d2fec6d29cec5b",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.use("compile", hbs(handlebarOptions));

