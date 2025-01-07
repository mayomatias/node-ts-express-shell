import { Response, Request } from 'express';
import { CustomError } from '../../domain';
import { FileUploadService } from '../services';
import { UploadedFile } from 'express-fileupload';


export class FileUploadController {

  // DI
  constructor(
    private readonly fileUploadService: FileUploadService,
  ) { }


  private handleError = ( error: unknown, res: Response ) => {
    if ( error instanceof CustomError ) {
      return res.status( error.statusCode ).json( { error: error.message } );
    }

    console.log( `${ error }` );
    return res.status( 500 ).json( { error: 'Internal server error' } );
  };

  uploadFile = ( req: Request, res: Response ) => {

    const files = req.files;
    if( !req.files || Object.keys(req.files).length === 0){
      return res.status(400).json({error: 'no files were selected'})
    }

    const file = req.files.file as UploadedFile

    
    this.fileUploadService.uploadSingle( file )
      .then( uploaded => res.json(uploaded) )
      .catch(  error => this.handleError( error, res ) )

    

  };

  uploadMultipleFiles = async ( req: Request, res: Response ) => {

    res.json('uploadMultipleFiles')

  };
}