import { CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import {Observable} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const args = ctx.getContext()
        const req = args.req
        try{
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            if(bearer !== 'Bearer' || !token){
                throw new UnauthorizedException("User is not logined")
            }
            const user = this.jwtService.verify(token)
            req.user = user;
            return true
        }catch (e){
            console.log(e)
            throw new UnauthorizedException("User is not logined")
        }
    }

}