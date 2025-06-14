import { CreateExpenseDTO } from '../../dto/expense/create-expense.dto';

export abstract class ExpenseDatasource {
  abstract createExpense(createExpenseDTO: CreateExpenseDTO): Promise<any>;
}