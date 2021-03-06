import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/auth/repositories/user.entity';
import { UsersRepository } from 'src/auth/repositories/users.repository';
import { UserDto } from '../dto/user.dto';
const nodemailer = require('nodemailer')
const legit = require('legit');

@Injectable()
export class ConfirmRegistrationService {
    
    constructor(private usersRepository:UsersRepository){}
    
    async confirmRegistration(confirmationCode:string):Promise<UserDto>{
        await this.usersRepository.update({confirmationCode}, {isConfirm: true})
        const userEntity:User = await this.usersRepository.findOne({confirmationCode})
        return new UserDto(userEntity);
    }

    async resendEmail(email:string):Promise<void>{
        const user:User = await this.usersRepository.findOne({username:email})

        const {username, confirmationCode} = user;

        const {isValid} = await legit(username)
        if(!isValid){
            throw new BadRequestException('domain of email is incorrect');
        }

        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "danila.litvishko30@gmail.com",
                pass: "Xren3001"
            }
        });

        await transporter.sendMail({
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
        }, (error, result) => {
            if (error) console.error(error);
        })
    }
}
