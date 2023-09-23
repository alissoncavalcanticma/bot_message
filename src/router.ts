import { Router, Request, Response } from "express";
//import lib streams para leitura dos dados do arquivo no buffer
import { Readable } from "stream";
//import lib para leitura de linha a linha
import readline from "readline";
//import lib Multer para manipulação de arquivos
import multer from "multer";


const router = Router();
const multerConfig = multer();

router.post('/people', multerConfig.single("file"), async (req: Request, res: Response)=>{
    //console.log(req.file);
    //console.log(req.file?.buffer.toString('utf-8'));

    //pegando o buffer numa constante
    const {file} = req;
    const buffer = file?.buffer;
    
    //Instanciando o Readable
    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    //implementando interface de leitura da lib readline
    //Interface permite dividir o arquivo por leitura de cada linha
    const peopleline = readline.createInterface({
        input: readableFile
    });

    //listando linhas lidas
    for await(let line of peopleline){
        console.log(line)
    }

    res.status(200).json({people: true});
})

router.get('/ping', (req: Request, res: Response)=>{
    res.status(200).json({pong: true});
})

export default router;