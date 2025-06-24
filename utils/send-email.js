import {emailTemplates} from "./email-template.js";
import dayjs from "dayjs";
import {accountEmail} from "../config/env.js";
import transporter from "nodemailer/lib/mailer/index.js";

export const sendReminderEmail = async (to, type, Subscription) => {
    if(!to || !type || !Subscription) {
        throw new Error("Missing required parameters to send email");
    }
    const template = emailTemplates.find((t) => t.label === type);
    if (!template) {
        throw new Error(`Email template for type "${type}" not found`);
    }
    const mailInfo = {
        userName: Subscription.user.name,
        subscriptionName: Subscription.name,
        renewalDate: dayjs(Subscription.renewalDate).format('YYYY-MM-DD'),
        planName: Subscription.name,
        price: `${Subscription.currency} ${Subscription.price} ${Subscription.frequency}`,
        paymentMethod: Subscription.paymentMethod,
    }

    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);

    const mailOptions = {
        from: accountEmail,
        to: to,
        subject: subject,
        html: message,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.error(error);
        console.log(`Email sent: ${info.response}`);
    })

}