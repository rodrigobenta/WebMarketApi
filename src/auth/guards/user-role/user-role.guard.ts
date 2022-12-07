import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(private readonly reflector: Reflector){}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //trae los roles permitidos desde el metodo del controller
    //con la propiedad @SetMetaData()
    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler());
    //si no vienen roles, retorna true para seguir con el programa, porque no necesita permisos ese metodo.
    if(!validRoles) return true;
    if(validRoles.length === 0) return true;
    
    //tomamos el request.. de donde le asignamos previamente
    //con un decorator el usuario que ejecuta el metodo..
    const req = context.switchToHttp().getRequest();
    //extraemos user del request.
    const user = req.user; 
    if(!user) throw new BadRequestException('User not found');
    
    //recorremos los roles del usuario
    for(const role of user.roles){
      if(validRoles.includes(role)){
        return true;
      }
    }
    throw new ForbiddenException(
      `User ${user.fullName} need a valid role: [${validRoles}]`)
  }
}
