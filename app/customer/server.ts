"use server";;
// import AWS from 'aws-sdk';

import { SNSClient, SNS } from '@aws-sdk/client-sns';

// JS SDK v3 does not support global configuration.
// Codemod has attempted to pass values to each service client in this file.
// You may need to update clients outside of this file, if they use global config.
// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: 'us-east-1',
// });

const config = {
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
};

const snsclient = new SNSClient([config]);
const sns = new SNS(snsclient);

export async function sendSms(): Promise<void> {
    const phoneNumber = process.env.RECEIVER_PHONE;
    const message = process.env.SAMPLE_MESSAGE;
    const params = {
        Message: message,
        PhoneNumber: phoneNumber,
    };

    try {
        await sns.publish(params);
        console.log(`Message sent to ${phoneNumber}`);
    } catch (error) {
        console.error(`Failed to send message to ${phoneNumber}`, error);
    }
}
