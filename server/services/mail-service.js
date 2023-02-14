import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import handlebars from "handlebars";
import { config } from 'dotenv';
config();

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            service: 'gmail',
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        })
    }

    async sendActivationMail(to, link) {
        const __dirname = path.resolve();
        const filePath = path.join(__dirname, './emails/template.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
        const replacements = { link: link };
        const htmlToSend = template(replacements);

        await this.transporter.sendMail({
            from: `Recipes App <${process.env.SMTP_USER}>`,
            to,
            subject: 'Activate your \'Recipes App\' account',
            text: '',
            html: htmlToSend,
        } );
    }
}

export default new MailService();