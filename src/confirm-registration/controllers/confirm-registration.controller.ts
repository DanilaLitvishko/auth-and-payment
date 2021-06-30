import { Controller, Get, Param } from '@nestjs/common';
import { User } from 'src/auth/repositories/user.entity';
import { ConfirmRegistrationService } from '../services/confirm-registration.service';

@Controller('confirm-registration')
export class ConfirmRegistrationController {
    
    constructor(private confirmRegistrationService:ConfirmRegistrationService){}

    @Get('/:confirmationCode')
    confirmRegistration(@Param('confirmationCode') confirmationCode:string):Promise<User>{
        return this.confirmRegistrationService.confirmRegistration(confirmationCode);
    }
}
