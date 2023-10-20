import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import {Observable} from "rxjs";
import { ROLE_KEY } from "./roleDecorator";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private jwtService: JwtService,  private reflector: Reflector) {
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const args = ctx.getContext()
        const req = args.req
        try{
            const requiredRole = this.reflector.getAllAndOverride(ROLE_KEY, [
                context.getHandler(),
                context.getClass()
            ])
            if(!requiredRole){
                return false
            }
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            if(bearer !== 'Bearer' || !token){
                throw new ForbiddenException("Don't allow")
            }
            const user = this.jwtService.verify(token)
            req.user = user;
            return requiredRole.includes(user.role)
        }catch (e){
            console.log(e)
            throw new ForbiddenException("Don't allow")
        }
    }

}