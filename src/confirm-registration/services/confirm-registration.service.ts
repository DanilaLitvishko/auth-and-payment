import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/repositories/user.entity';
import { UsersRepository } from 'src/auth/repositories/users.repository';
const nodemailer = require('nodemailer')

@Injectable()
export class ConfirmRegistrationService {
    
    constructor(private usersRepository:UsersRepository){}
    
    async confirmRegistration(confirmationCode:string):Promise<User>{
        const user:User = await this.usersRepository.findOne({confirmationCode})
        user.isConfirm = true;
        return this.usersRepository.save(user)
    }

    async resendEmail(email:string):Promise<void>{
        const user:User = await this.usersRepository.findOne({username:email})

        const {username, confirmationCode} = user;

        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "danila.litvishko30@gmail.com",
                pass: "Xren3001"
            }
        });

        let result = await transporter.sendMail({
            from: "Node js",
            to: `${username}, ${username}`,
            subject: 'Confirm Registration',
            text: 'This message was sent from Node js server.',
            html:
            `<h1>Email Confirmation</h1>
            <h2>Hello ${username}</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <a href=http://localhost:3000/activateEmail/${confirmationCode}> Click here</a>
            </div>`,
        })
    }
}
