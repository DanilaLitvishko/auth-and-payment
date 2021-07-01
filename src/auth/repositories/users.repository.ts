import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt'
import { AuthCredentialsDto } from "../dto/auth-credentials.dto";
const nodemailer = require('nodemailer')

const code = () => {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 25; i++) {
        token += characters[Math.floor(Math.random() * characters.length )];
    }
    return token;
}

@EntityRepository(User)
export class UsersRepository extends Repository<User>{
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>{

        const {username, password} = authCredentialsDto;

        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "danila.litvishko30@gmail.com",
                pass: "Xren3001"
            }
        });

        const confirmationCode = code();

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
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = this.create({username, password:hashedPassword, confirmationCode, isConfirm:false});
        try{
            await this.save(user);
        }catch(err){
            if(err.code === '23505'){ //duplicate username
                throw new ConflictException('Username already exists');
            }else{
                throw new InternalServerErrorException();
            }
        }
    }
}