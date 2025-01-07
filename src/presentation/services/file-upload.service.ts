import { UploadedFile } from 'express-fileupload';
import fs from 'fs';
import path from 'path';

export class FileUploadService {

    constructor(){}

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
            const fileExtension = file.mimetype.split('/').at(1);
            const destination = path.resolve(__dirname, '../../../')
            this.checkFolder(destination)
    
            file.mv(destination + `/mi-imagen.${fileExtension}`)
            
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