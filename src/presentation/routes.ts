import { Router } from 'express';
import { AuthRoutes } from './controller/auth/auth.routes';
import { ExpenseRoutes } from './controller/expense/expense.routes';
import { AuthMiddleware } from './middlewares/auth.middleware';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/expense', [AuthMiddleware.validateJWT],ExpenseRoutes.routes);
    


    return router;
  }


}

