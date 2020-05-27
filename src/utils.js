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