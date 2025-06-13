import { Request, Response } from 'express';
import { CreateExpense } from '../../../domain/use-cases/expense/create-expense';
import { CreateExpenseDTO } from '../../../domain/dto/expense/create-expense.dto';

export class ExpenseController {

  async createExpense(req: Request, res: Response){

    const [error, createExpenseDTO] = CreateExpenseDTO.create(req.body)
    if (error) {
      return res.status(400).json({ error });
    }
    console.log(req);
    
    // Call the use case to create the expense

    new CreateExpense()
      .execute(createExpenseDTO!)
      .then(expense => res.json(expense))
      .catch(error => res.status(400).json({error}))

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