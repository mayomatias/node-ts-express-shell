import { AuthDatasource } from '../../../domain/datasources/auth/auth.datasource';
import { RegisterUserDTO } from '../../../domain/dto/auth/register-user.dto';
import { UserEntity } from '../../../domain/entities/user.entity';
import { AuthRepository } from '../../../domain/repository/auth/expense.repository';


export class AuthRepositoryImpl implements AuthRepository {
  // This class implements the AuthRepository interface, providing concrete methods for authentication operations.
  // It uses an AuthDatasource to perform the actual data operations, allowing for separation of concerns.
  // The methods include login, register, logout, and getCurrentUser, which interact with the datasource to perform the necessary actions.
  // This implementation allows for easy swapping of the underlying data source without affecting the business logic,
  // making it flexible and testable.
  
  constructor(private readonly authDatasource: AuthDatasource) {}

  async login(email: string, password: string): Promise<{ user: UserEntity; token: any } | null> {
    return this.authDatasource.login(email, password);
  }

  async register(registerUserDto: RegisterUserDTO): Promise<({ user: UserEntity; token: string } | null)>{
    return this.authDatasource.register(registerUserDto);
  }

  async logout(): Promise<void> {
    return this.authDatasource.logout();
  }

  async getCurrentUser(): Promise<UserEntity | null> {
    return this.authDatasource.getCurrentUser();
  }
}