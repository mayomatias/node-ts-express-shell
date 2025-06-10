import { Router } from 'express';
import { AuthController } from './auth.controller';

import { envs } from '../../config/envs';


export class AuthRoutes {
  static get routes(): Router {

    const router = Router();
    const controller = new AuthController()


    // Definir las rutas
    router.post('/login', controller.loginUser );
    router.post('/register', controller.registrerUser );
    router.get('/validate-email/:token', controller.validateMail );


    return router;
  }
}