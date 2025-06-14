import { Request, Response } from 'express';
import { CreateExpense } from '../../../domain/use-cases/expense/create-expense';
import { CreateExpenseDTO } from '../../../domain/dto/expense/create-expense.dto';
import { MongoExpenseDatasource } from '../../../infraestructure/datasources/expense/mongo-expense.datasource';
import { ExpenseRepositoryImpl } from '../../../infraestructure/repositories/expense/expense.repository.impl';
import { CustomError } from '../../../domain/errors/custom.error';

export class ExpenseController {

  private readonly mongoExpenseDatasource = new MongoExpenseDatasource();
  private readonly expenseRepository = new ExpenseRepositoryImpl(this.mongoExpenseDatasource)  

  private handleError = (error: unknown, res: Response ) => {
      if ( error instanceof CustomError ) {
        return res.status(error.statusCode).json({ error: error.message });
      }
  
      console.log(`${ error }`);
      return res.status(500).json({ error: 'Internal server error' })
  } 

  createExpense = async (req: Request, res: Response) => {



    const [error, createExpenseDTO] = CreateExpenseDTO.create(req.body)
    if (error) {
      return res.status(400).json({ error });
    }
    
    // Call the use case to create the expense


    new CreateExpense(this.expenseRepository)
      .execute(createExpenseDTO!)
      .then(expense => res.json(expense))
      .catch( error => this.handleError(error, res))

  }

  //GET methods for retrieving expenses
  async getExpenses(req: Request, res: Response): Promise<Response> {
    // Logic to get all expenses
    return res.status(200).json({ message: 'Expenses retrieved successfully' });
  }
    async getExpenseById(req: Request, res: Response): Promise<Response> {
    // Logic to get an expense by ID
    const { id } = req.params;
    return res.status(200).json({ message: `Expense with ID ${id} retrieved successfully` });
  }
  async getExpensesByCategory(req: Request, res: Response): Promise<Response> {
    // Logic to get expenses by category
    const { category } = req.params;
    return res.status(200).json({ message: `Expenses in category ${category} retrieved successfully` });
  }
  async getExpensesByDate(req: Request, res: Response): Promise<Response> {
    // Logic to get expenses by date
    const { date } = req.params;
    return res.status(200).json({ message: `Expenses on date ${date} retrieved successfully` });
  }
  async getExpensesByAmountRange(req: Request, res: Response): Promise<Response> {
    // Logic to get expenses by amount range
    const { min, max } = req.query;
    return res.status(200).json({ message: `Expenses in amount range ${min} - ${max} retrieved successfully` });
  }


  //update and delete methods for managing expenses
  
  async updateExpense(req: Request, res: Response): Promise<Response> {
    // Logic to update an expense
    return res.status(200).json({ message: 'Expense updated successfully' });
  }
  async deleteExpense(req: Request, res: Response): Promise<Response> {
    // Logic to delete an expense
    return res.status(200).json({ message: 'Expense deleted successfully' });
  }

}