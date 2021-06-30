import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/repositories/user.entity';
import { UsersRepository } from 'src/auth/repositories/users.repository';

@Injectable()
export class ConfirmRegistrationService {
    
    constructor(private usersRepository:UsersRepository){}
    
    async confirmRegistration(confirmationCode:string):Promise<User>{
        const user:User = await this.usersRepository.findOne({confirmationCode})
        user.isConfirm = true;
        return this.usersRepository.save(user)
    }
}
