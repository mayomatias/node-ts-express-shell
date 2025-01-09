import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { FileUploadController } from './controller';
import { FileUploadService } from '../services';
import { Uuid } from '../../config';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';


export class FileUploadRoutes {

  static get routes(): Router {

    const router = Router();
    const controller = new FileUploadController(new FileUploadService);

    //middleware de archivos
    router.use( FileUploadMiddleware.containFiles );

    // Definir las rutas
    // api/upload/single/<user|category|product>/
    // api/upload/multiple/<user|category|product>/
    router.post( '/single/:type',[ AuthMiddleware.validateJWT ], controller.uploadFile );
    router.post( '/multiple/:type',[ AuthMiddleware.validateJWT ], controller.uploadMultipleFiles );

    return router;
  }
}

