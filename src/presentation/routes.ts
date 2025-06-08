import { Router } from 'express';
import { ExpenseRoutes } from './expense/expense.routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/expense', ExpenseRoutes.routes);
    


    return router;
  }


}

