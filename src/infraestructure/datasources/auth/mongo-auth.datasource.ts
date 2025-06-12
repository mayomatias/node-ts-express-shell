import { BcryptsAdapter } from '../../../config/bcrypt.adapter';
import { UserModel } from '../../../config/data/mongo/model/user.model';
import { JwtAdapter } from '../../../config/jwt.adapter';
import { AuthDatasource } from '../../../domain/datasources/auth/auth.datasource';
import { RegisterUserDTO } from '../../../domain/dto/auth/register-user.dto';
import { CustomError } from '../../../domain/errors/custom.error';

export class MongoAuthDatasource implements AuthDatasource {
  async login(email: string, password: string): Promise<({ user: any; token: JwtAdapter })> {
    const existUser = await UserModel.findOne({email});
    if (!existUser) throw CustomError.badRequest('User or password incorrect.')
    
      if (BcryptsAdapter.compare(password, existUser.password)) {
                        
            const token = await JwtAdapter.generateToken({ id: existUser.id, email: existUser.email });
            if(!token) throw CustomError.internalServer('Error while creating JWT');

            return {
                user: existUser,
                token: token
            }

        }
        
        throw CustomError.badRequest('User or password incorrect.');
  }

  async register(registerUserDto: RegisterUserDTO): Promise<(any | null)> {
    
    const existUser = await UserModel.findOne({email: registerUserDto.email})
    if (existUser) throw CustomError.badRequest('Email already exist.')

        try {
            
            const user = new UserModel(registerUserDto);
            
            //Aqui faltan pasos
            //Encriptar contraseña
            user.password = BcryptsAdapter.hash(registerUserDto.password)
            const userFromMongo = await user.save();
            // JWT <---- Para mantener la autenticación del usuario
            const tokenResult = await JwtAdapter.generateToken({ id: user.id, email: user.email });
            
            
            let token: string;
            if (typeof tokenResult === 'string') {
                token = tokenResult;
            } else if (tokenResult && typeof tokenResult === 'object' && 'token' in tokenResult && typeof (tokenResult as any).token === 'string') {
                token = (tokenResult as { token: string }).token;
            } else {
                throw CustomError.internalServer('Error while creating JWT');
            }
            if(!token) throw CustomError.internalServer('Error while creating JWT');
            
            // Email de confirmación 
            // this.sendEmailWithValidationLink(user.email)

            return {
                user: userFromMongo,
                token: token
            }

        } catch (error) {    
            throw CustomError.internalServer('Error while registering user');
        } 

  }

  async logout(): Promise<void> {
    // In a real application, you might handle session management or token invalidation here.
    // For this example, we'll just return void.
    return;
  }

  async getCurrentUser(): Promise<null> {
    // This method would typically retrieve the user from the session or token.
    // For this example, we'll return null to indicate no user is currently logged in.
    // In a real application, you would implement logic to retrieve the current user based on the session or token.
    return null;
  }
}
