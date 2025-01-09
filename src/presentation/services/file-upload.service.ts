import { UploadedFile } from 'express-fileupload';
import fs from 'fs';
import path from 'path';
import { Uuid } from '../../config';
import { CustomError } from '../../domain';

export class FileUploadService {

    constructor(
        private readonly uuid = Uuid.v4,
    ){}

    private checkFolder(url: string){
        if(!fs.existsSync(url)){
            fs.mkdirSync(url)
        }
    }

    public async uploadSingle(
        file: UploadedFile,
        folder: string = 'uploads',
        validExtensions: string[] = ['png','gif', 'jpg','jpeg']
    ) {
        try {
            
            const fileExtension = file.mimetype.split('/').at(1) ?? '';

            if ( !validExtensions.includes(fileExtension) ) {
                throw CustomError.badRequest(`Invalid extension: ${ fileExtension }, valid ones ${ validExtensions }`);
              }

            const destination = path.resolve(__dirname, '../../../', folder)
            this.checkFolder(destination)

            const fileName = `${ this.uuid() }.${ fileExtension }`;

            file.mv(`${destination}/${ fileName }`);

            return {fileName}
    
            
        } catch (error) {
            console.log(error);
            
        }
    }

    public uploadMultiple(
        file: any[],
        folder: string = 'uploads',
        validExtensions: string[] = ['png','gif', 'jpg','jpeg']
    ){
        
    }
}