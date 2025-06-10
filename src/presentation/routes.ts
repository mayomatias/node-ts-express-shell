import { Router } from 'express';
import { ExpenseRoutes } from './expense/expense.routes';
import { AuthRoutes } from './auth/auth.routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/expense', ExpenseRoutes.routes);
    router.use('/api/auth', AuthRoutes.routes);
    


    return router;
  }


}

