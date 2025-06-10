import { LoginUserDTO } from '../../dto/auth/login-user.dto';
import { UserEntity } from '../../entities/user.entity';

interface LoginUserUseCase {
  execute(dto: LoginUserDTO): Promise<UserEntity>;
}

export class RegisterUser implements LoginUserUseCase {
  
  // constructor(private readonly userRepository: UserRepository) {}



  async execute(dto: LoginUserDTO): Promise<UserEntity> {
    const user = UserEntity.fromObject(dto)

    

    // await this.userRepository.create(user);
    return user;
  }
}