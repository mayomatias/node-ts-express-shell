import { UserEntity } from '../../entities/user.entity';

export abstract class AuthRepository {
  // This abstract class defines the contract for authentication repositories.
  // It includes methods for logging in, registering a user, logging out, and retrieving the current user.
  // Implementations of this class will provide the actual logic for these operations,
  // allowing for different data sources (e.g., REST API, GraphQL, etc.) to be used interchangeably.
  // This design allows for flexibility and testability in the authentication process,
  // as different implementations can be swapped without changing the business logic.
  // The `UserEntity` is used to represent the user data structure, ensuring consistency across the application.
  // The methods return promises, indicating that they are asynchronous operations,
  // which is typical in modern JavaScript applications, especially when dealing with I/O operations like network requests.
  // This repository pattern helps in separating concerns, making the codebase cleaner and easier to maintain.
  // The `AuthRepository` serves as an abstraction layer between the application logic and the data source,
  // allowing for easier unit testing and mocking of authentication operations.
  // The `login` method takes an email and password, returning a promise that resolves to a `UserEntity`.
  // The `register` method takes a `UserEntity` and returns a promise that resolves to the created user.  
  abstract login(email: string, password: string): Promise<UserEntity>;
  abstract register(user: UserEntity): Promise<UserEntity>;
  abstract logout(): Promise<void>;
  abstract getCurrentUser(): Promise<UserEntity | null>;
}