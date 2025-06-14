import { CreateExpenseDTO } from '../../dto/expense/create-expense.dto';

export abstract class ExpenseRepository {
  abstract createExpense(dto: CreateExpenseDTO): Promise<any>;
}