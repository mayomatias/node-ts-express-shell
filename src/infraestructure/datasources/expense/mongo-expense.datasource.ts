import { ExpenseModel } from '../../../config/data/mongo/model/expense.model';
import { ExpenseDatasource } from '../../../domain/datasources/expense/expense.datasource';
import { CreateExpenseDTO } from '../../../domain/dto/expense/create-expense.dto';
import { CustomError } from '../../../domain/errors/custom.error';

export class MongoExpenseDatasource implements ExpenseDatasource{
  async createExpense(createExpenseDTO: CreateExpenseDTO): Promise<any> {
      
  try {              
      const expense = new ExpenseModel(createExpenseDTO);
      const result = await expense.save()      
      return result;
      
  } catch (error) {
      console.log(error);
      
      throw CustomError.internalServer('Error while creating expense');
  }    
    
  }
  
}