import nodemailer from 'nodemailer';
import {accountEmail, EMAIL_PASSWORD} from "./env.js";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: accountEmail,
        pass: EMAIL_PASSWORD
    }
})
export default transporter;