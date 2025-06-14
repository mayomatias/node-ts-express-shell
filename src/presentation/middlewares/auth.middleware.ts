import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../../domain/errors/custom.error';
import { JwtAdapter } from '../../config/jwt.adapter';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserModel } from '../../config/data/mongo/model/user.model';

export class AuthMiddleware {
    
    static async validateJWT(req: Request, res:Response, next: NextFunction){

        const authorization = req.header('Authorization')
        
        if(!authorization) return res.status(401).json({ error: 'No token provided'});
        if( !authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid bearer token'});

        const token = authorization.split(' ').at(1) || '';


        try {

            const payload = await JwtAdapter.validateToken<{id: string}>(token);
            if(!payload) return res.status(401).json({ error: 'Invalid token'});

            const user = await UserModel.findById(payload.id)
            if (!user) return res.status(401).json({error: 'Invalid token - user'}) 
            
            //TODO: Valorar si el usuario esta activo
            const {password, ...restOfUser} = UserEntity.fromObject(user)
            req.body.user =  restOfUser//Cargo el usuario en elbody de la req y quiero que sea desde mi entidad
            
            next()

        } catch(error) {
            console.log(error);
            CustomError.internalServer('Internal server error')
            
        }
        
        
    }
}