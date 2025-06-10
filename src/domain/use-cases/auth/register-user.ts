import { AuthRepositoryImpl } from '../../../infraestructure/repositories/auth/auth.repository.impl';
import { RegisterUserDTO } from '../../dto/auth/register-user.dto';
import { UserEntity } from '../../entities/user.entity';

interface RegisterUserUseCase {
  execute(dto: RegisterUserDTO): Promise<{userEntity: UserEntity, token: string}>;
}

export class RegisterUser implements RegisterUserUseCase {
  
  constructor(private readonly authRepository: AuthRepositoryImpl) {}


  async execute(dto: RegisterUserDTO): Promise<{userEntity: UserEntity, token: string}> {
    
    const res = await this.authRepository.register(dto);

    if (!res) {
      throw new Error('Registration failed: response is null');
    }
    const { user, token } = res;
    
    
    const userEntity = UserEntity.fromObject(user)


    
    // await this.userRepository.create(user);
    return {userEntity, token};
  }
}