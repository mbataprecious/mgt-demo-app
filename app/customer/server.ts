"use server";
import twilio from "twilio"
const nodemailer = require('nodemailer');


export async function sendEmail(to:string, text:string) {
  
    const subject = 'Vehicle Service Due';

    // Configure the transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    try {
      // Send the email
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject,
        text,
      });

        console.log(`Email sent to ${to}`);
        return true;
    } catch (error) {
        console.error(`Failed to send email to ${to}`, error);
        return false;
    }
}

export async function sendSms(phoneNumber: string, message: string): Promise<void> {  
    // add '+' to the phone number if it's missing
    const phone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`; 

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
    if (!accountSid || !authToken || !twilioPhoneNumber) {
        throw new Error('Twilio environment variables are not set');
    }

    const client = twilio(accountSid, authToken);

    try {
      const messageResponse = await client.messages.create({
        body: message,
        from: twilioPhoneNumber,
        to: phone,
      });
      console.log(`Message sent: ${messageResponse.sid}`);
    } catch (error) {
      console.error('Failed to send SMS:', error);
    }
}