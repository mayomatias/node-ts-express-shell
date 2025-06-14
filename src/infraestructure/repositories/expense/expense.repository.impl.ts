import { ExpenseDatasource } from '../../../domain/datasources/expense/expense.datasource';
import { CreateExpenseDTO } from '../../../domain/dto/expense/create-expense.dto';
import { ExpenseEntity } from '../../../domain/entities/expense.entity';
import { ExpenseRepository } from '../../../domain/repository/expense/expense.repository';

export class ExpenseRepositoryImpl implements ExpenseRepository{

  constructor(private readonly expenseDatasource: ExpenseDatasource){}

  async createExpense(dto: CreateExpenseDTO): Promise<any> {
    return this.expenseDatasource.createExpense(dto)
  }
  
}