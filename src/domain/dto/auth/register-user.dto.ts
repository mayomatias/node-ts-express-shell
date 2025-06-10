import { regularExps } from '../../../config/regular-exp';

export class RegisterUserDTO {


    private constructor(
        public name: string,
        public email: string,
        public password: string
    ){}

    static create( object: { [key:string]:any}):[string?, RegisterUserDTO?] {

        const { name, email, password } = object;

        if(!name) return ['Missing name', undefined]
        if(!email) return ['Missing email', undefined]
        if(!regularExps.email.test(email)) return ['Email is not valid', undefined]
        if(!password) return ['Missing password', undefined]
        if(password.length < 6 ) return ['Password too short', undefined]

        return [undefined, new RegisterUserDTO(name, email, password)]
        
    }
}