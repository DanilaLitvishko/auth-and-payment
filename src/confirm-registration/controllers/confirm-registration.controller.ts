import { Controller, Get, Param } from '@nestjs/common';
import { User } from 'src/auth/repositories/user.entity';
import { UserDto } from '../dto/user.dto';
import { ConfirmRegistrationService } from '../services/confirm-registration.service';

@Controller('confirm-registration')
export class ConfirmRegistrationController {
    
    constructor(private confirmRegistrationService:ConfirmRegistrationService){}

    @Get('/:confirmationCode')
    confirmRegistration(@Param('confirmationCode') confirmationCode:string):Promise<UserDto>{
        return this.confirmRegistrationService.confirmRegistration(confirmationCode);
    }

    @Get('/resend-email/:email')
    resendEmail(@Param('email') email:string):Promise<void>{
        return this.confirmRegistrationService.resendEmail(email);
    }
}
