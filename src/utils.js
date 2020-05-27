import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = email => {
    const client = nodemailer.createTransport({
        host: "smtp.naver.com",
        secure: true,
        auth: {
            user: process.env.NAVER_USERNAME,
            pass: process.env.NAVER_PASSWORD
        }
    });
    return client.sendMail(email);
};

export const sendSecretMail = (adress, secret) => {
    const email = {
        from: "thinction-a@naver.com",
        to: adress,
        subject: "🔒Login Secret for Prismagram🔒",
        html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy & paste on the app/website to login`
    }
    return sendMail(email);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);




// const client = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.GMAIL_USERNAME,
//         pass: process.env.GMAIL_PASSWORD
//     }
// });

// const data = {
//     from: "mail.thinction.com",
//     to: "jakuro94@gmail.com",
//     subject: "🔒Login Secret for prismagram🔒",
//     text: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy & paste on the app/website to login.`
// };
// mgun.messages().send(data, function (error, body) {
//     console.log(body);
// });


// const sendMail = (email) => {
//     const options = {
//         auth: {
//             api_key: process.env.MAILGUN_KEY,
//             domain: "sandbox0f8114ca4cc24fdd9892445d383b061e.mailgun.org"
//         },
//         host: "api.us.mailgun.net"
//     };
//     const client = nodemailer.createTransport(mg(auth));
//     return client.sendMail(email);
// };

// const auth = {
//     auth: {
//         api_key: process.env.MAILGUN_KEY,
//         domain: "mail.thinction.com"
//     }
// };

// const sendMail = (email) => {
//     const client = nodemailer.createTransport(mg(auth));
//     return client.sendMail(email);
// }

// const mgun = mailgun({
//     api_key: "e6f45639713743e2858c136ef2d0fa8b-e5e67e3e-8598481e", 
//     domain: "mail.thinction.com"
// });