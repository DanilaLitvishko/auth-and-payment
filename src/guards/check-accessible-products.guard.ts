import { CanActivate, ExecutionContext, Injectable, NotAcceptableException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class CheckAssesibleProductsGuard implements CanActivate{

    constructor(){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
        const user = context.switchToHttp().getRequest().user;
        const products = context.switchToHttp().getRequest().body;
        if(!user.isSubscribing && products.find((product) => product.forSubscribers === true)){
            throw new NotAcceptableException('You tried to buy products for subscribers without subscribe!')
        }
        return true;
    }
}