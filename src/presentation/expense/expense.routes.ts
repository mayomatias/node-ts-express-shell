import { Router } from 'express'; 
import { ExpenseController } from './expense.controller';

export class ExpenseRoutes {

  static get routes(): Router {
    const router = Router();
    
    const expenseController = new ExpenseController(/* DI expenseRepositoryImpl */);

    router.post('/', expenseController.createExpense);
    router.get('/', expenseController.getExpenses);
    router.get('/:id', expenseController.getExpenseById);
    router.get('/category/:category', expenseController.getExpensesByCategory);
    router.get('/date/:date', expenseController.getExpensesByDate);
    router.get('/amount-range', expenseController.getExpensesByAmountRange);
    router.put('/:id', expenseController.updateExpense);
    router.delete('/:id', expenseController.deleteExpense);

    return router;
  }
}
// This code defines the routes for the expense management system using Express.js.