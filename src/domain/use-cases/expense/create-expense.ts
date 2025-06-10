import { CreateExpenseDTO } from '../../dto/expense/create-expense.dto';
import { ExpenseEntity } from '../../entities/expense.entity';

interface CreateExpenseUseCase {
  execute(dto: CreateExpenseDTO): Promise<ExpenseEntity>;
}

export class CreateExpense implements CreateExpenseUseCase {

 
  //constructor(private readonly expenseRepository: ExpenseRepository) {}

  execute(dto: CreateExpenseDTO): Promise<ExpenseEntity> {
    const expense = new ExpenseEntity({
      id: dto.id,
      amount: dto.amount,
      description: dto.description,
      date: dto.date,
      category: dto.category,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

   // await this.expenseRepository.create(expense);
    return Promise.resolve(expense);
  }
}