"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { transporter } = require("./mailConfig");
const sendEmail = async (receiverEmail, context, template) => {
    try {
        let reports = await transporter.sendMail({
            from: '"Corexlab Limited" <registration@usend.com>',
            to: receiverEmail,
            subject: context.subject,
            template: template,
            context: context.data
        });
        console.log(reports);
    }
    catch (err) {
        console.log(err);
        console.log("EMAIL SEND FAILED");
    }
};
exports.default = sendEmail;
//# sourceMappingURL=index.js.map