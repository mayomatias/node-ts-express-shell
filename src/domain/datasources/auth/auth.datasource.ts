import { RegisterUserDTO } from '../../dto/auth/register-user.dto';
import { UserEntity } from '../../entities/user.entity';

export abstract class AuthDatasource {
  abstract login(email: string, password: string): Promise<any>;
  abstract register(registerUserDto: RegisterUserDTO): Promise<({ user: any; token: string } | null)>;
  abstract logout(): Promise<void>;
  abstract getCurrentUser(): Promise<UserEntity | null>;
}
// This abstract class defines the contract for authentication data sources.
// It includes methods for logging in, registering a user, logging out, and retrieving the current user.
// Implementations of this class will provide the actual logic for these operations,
// allowing for different data sources (e.g., REST API, GraphQL, etc.) to be used interchangeably.
// This design allows for flexibility and testability in the authentication process,
// as different implementations can be swapped without changing the business logic.
// The `UserEntity` is used to represent the user data structure, ensuring consistency across the application.
// The methods return promises, indicating that they are asynchronous operations, 