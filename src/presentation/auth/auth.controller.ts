import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors/custom.error';
import { RegisterUserDTO } from '../../domain/dto/auth/register-user.dto';
import { LoginUserDTO } from '../../domain/dto/auth/login-user.dto';
import { AuthRepositoryImpl } from '../../infraestructure/repositories/auth/auth.repository.impl';
import { MongoAuthDatasource } from '../../infraestructure/datasources/auth/mongo-auth.datasource';
import { LoginUser, RegisterUser } from '../../domain/use-cases/auth';



export class AuthController {

    private readonly mongoAuthDatasouce = new MongoAuthDatasource();
    private readonly authRepository = new AuthRepositoryImpl(this.mongoAuthDatasouce);
    
    constructor(){}
    
    private handleError = (error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
          return res.status(error.statusCode).json({ error: error.message });
        }
    
        console.log(`${ error }`);
        return res.status(500).json({ error: 'Internal server error' })
    } 

    registrerUser = (req: Request, res: Response) => {
        
        const [error, registerDto] = RegisterUserDTO.create(req.body)
        if(error) return res.status(400).json({error})

        new RegisterUser(this.authRepository).execute(registerDto!)
            .then((userData) => {
                const {password, ...userDataWithoutPassword} = userData.userEntity;
                res.json({user: userDataWithoutPassword, token: userData.token});
            })
            .catch( error => this.handleError(error, res) );

    }

    loginUser = (req: Request, res: Response) => {
        const[error, loginDto] = LoginUserDTO.create(req.body)
        if(error) return res.status(400).json({error})
        
        new LoginUser(this.authRepository).execute(loginDto!)
            .then((userData) => {
                const {password, ...userDataWithoutPassword} = userData.userEntity;
                res.json({user: userDataWithoutPassword, token: userData.token});
            })
            .catch( error => this.handleError(error, res) );

    }
    
    validateMail = (req: Request, res: Response) => {
        const token = req.params.token
        //res.json('validateMail with token: ' + token)

/*         this.authService.validateEmail( token )
            .then(() => res.json('Email Validated'))
            .catch( error => this.handleError(error, res) ); */
    }
}