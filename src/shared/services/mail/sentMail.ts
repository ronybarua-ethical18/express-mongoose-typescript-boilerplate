const { transporter } = require("./mailConfig");

interface IMailContext{
  subject:string,
  data:any
}

const sendEmail = async (
  receiverEmail: Array<string>,
  context: IMailContext,
  template: string,
): Promise<void> => {
  try {
    let reports = await transporter.sendMail({
      from: '"Corexlab Limited" <registration@usend.com>',
      to: receiverEmail,
      subject: context.subject,
      template: template,
      context: context.data,
    });
    console.log(reports)
  } catch (err) {
    console.log(err)
    console.log("EMAIL SEND FAILED");
  }
};

export default sendEmail;
