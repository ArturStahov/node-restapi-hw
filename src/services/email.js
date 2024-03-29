const Mailgen = require('mailgen');
const sgMail = require('@sendgrid/mail');
const config = require('../config/email.json')
require('dotenv').config();

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

class EmailService {

    #sender = sgMail
    #GenerateTemplate = Mailgen

    constructor(env) {
        switch (env) {
            case 'development':
                this.link = config.dev
                break;
            case 'production':
                this.link = config.prod
                break;

            default:
                this.link = config.dev
                break;
        }
    }

    #createTemplate(verifyToken, name = 'Guest') {

        const mailGenerator = new this.#GenerateTemplate({
            theme: 'default',
            product: {

                name: 'Task-keeper',
                link: this.link
            }
        });

        const template = {
            body: {
                name,
                intro: 'Welcome ! We\'re very excited to have you on board.',
                action: {
                    instructions: 'To get started  please click here:',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Confirm your account',
                        link: `${this.link}/api/users/verify/${verifyToken}`
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        };

        return mailGenerator.generate(template)
    }

    async sendEmail(verifyToken, email, name) {
        const emailBody = this.#createTemplate(verifyToken, name)
        this.#sender.setApiKey(SENDGRID_API_KEY)

        const msg = {
            to: email,
            from: 'stakhov.artur@gmail.com',//add email and verify it in settings/sender authentication in sengrid
            subject: 'verify in Task-keeper',
            html: emailBody,
        };

        try {
            await sgMail.send(msg);
        } catch (error) {
            return error
        }
    }
}


module.exports = EmailService
