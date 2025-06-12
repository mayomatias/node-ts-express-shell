import { AuthRepositoryImpl } from '../../../infraestructure/repositories/auth/auth.repository.impl';
import { LoginUserDTO } from '../../dto/auth/login-user.dto';
import { UserEntity } from '../../entities/user.entity';

interface LoginUserUseCase {
  execute(dto: LoginUserDTO): Promise<{userEntity: UserEntity, token: string}>;
}

export class LoginUser implements LoginUserUseCase {
  
  constructor(private readonly authRepository: AuthRepositoryImpl) {}

  
  async execute(dto: LoginUserDTO): Promise<{userEntity: UserEntity, token: string}> {
    
    
    const data = await this.authRepository.login(dto.email, dto.password)
    
    if (!data) {
      throw new Error('Login failed: response is null');
    }
    const{user, token} = data;
    const userEntity = UserEntity.fromObject(user)
    // await this.userRepository.create(user);
    return {userEntity, token};
  }
}