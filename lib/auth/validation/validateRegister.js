'use server';

import validateUsername from '../validation/validateUsername';
import validatePassword from '../validation/validatePassword';
import validateEmail from '../validation/validateEmail';

const nodemailer = require('nodemailer');
import hashData from '../security/hashData';

export default async function register(username, email, password) {
    try {
        const vusresult = await validateUsername(username);
        const vpwresult = await validatePassword(password);
        const velresult = await validateEmail(email);

        if (vusresult != 'success') {
            return vusresult;
        }

        if (vpwresult != 'success') {
            return vpwresult;
        }

        if (velresult != 'success') {
            return velresult;
        }

        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_URL,
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
            tls: { rejectUnauthorized: false },
        });
        const code = await hashData(email);

        let mailOptions = {
            from: '"noreply" <noreply@polarlab.app>',
            to: email,
            subject: 'Email Verification',
            text: `To finish creating your account, click the link below\n https://polarlab.app/login/register?email=${email}?code=${code}`,
            html: `<p>To finish creating your account, click the link below\n <strong>https://polarlab.app/login/register?email=${email}?code=${code}</strong></p>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return error;
            }
            console.log(info);
            return 'success';
        });

        /*const hashedPassword = await hashPassword(password);
        const id = await crypto.randomUUID();

        await userAccount.create({
            id: id,
            username: username,
            password: hashedPassword,
            role: 'user',
            token: 'PTKN00',
        });*/

        return 'success';
    } catch (error) {
        console.log(error);
        return 'fail';
    }
}
