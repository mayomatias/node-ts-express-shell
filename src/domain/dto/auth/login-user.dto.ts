import { regularExps } from '../../../config/regular-exp'


export class LoginUserDTO {

    private constructor(
        public email: string,
        public password: string
    ){}

    static create( object: { [key:string]:any}):[string?, LoginUserDTO?] {

        const {email, password} = object

        if(!email) return ['Missing email', undefined]
        if(!regularExps.email.test(email)) return ['Email is not valid', undefined]
        if(!password) return ['Missing password', undefined]    

        return [undefined, new LoginUserDTO(email, password)]
    }
}