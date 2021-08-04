import { CanActivate, ExecutionContext, Injectable, NotAcceptableException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class CheckUserRoleGuard implements CanActivate{

    constructor(){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
        return context.switchToHttp().getRequest().user.isAdmin
    }
}