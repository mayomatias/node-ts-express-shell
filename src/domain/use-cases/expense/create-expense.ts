import { ExpenseRepositoryImpl } from '../../../infraestructure/repositories/expense/expense.repository.impl';
import { CreateExpenseDTO } from '../../dto/expense/create-expense.dto';
import { ExpenseEntity } from '../../entities/expense.entity';

interface CreateExpenseUseCase {
  execute(dto: CreateExpenseDTO): Promise<ExpenseEntity>;
}

export class CreateExpense implements CreateExpenseUseCase {

 
  constructor(private readonly expenseRepository: ExpenseRepositoryImpl) {}

  async execute(dto: CreateExpenseDTO): Promise<ExpenseEntity> {
    

    const res = await this.expenseRepository.createExpense(dto);
        
    const expense = ExpenseEntity.fromObject(res);
    return expense;
  }
}