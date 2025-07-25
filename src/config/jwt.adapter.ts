import jwt from 'jsonwebtoken';
import { envs } from './envs';

//Importaremos la env pero generara una depndencia
const JWT_SEED = envs.JWT_SEED

export class JwtAdapter {

    static generateToken( payload:any, duration: string = '2h' ){

        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SEED, {expiresIn: duration}, (err, token) => {
                if(err) return resolve(null);

                return resolve(token)
            }) 
        })
    }

    static validateToken<T>( token:string ):Promise<T|null> {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SEED, (err, decoded)=> {
                if(err) return resolve(null);
                resolve(decoded as T)
            })
        })
    }

}