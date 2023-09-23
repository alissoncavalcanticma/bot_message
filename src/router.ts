import { Router, Request, Response } from "express";
//import lib streams para leitura dos dados do arquivo no buffer
import { Readable } from "stream";
//import lib para leitura de linha a linha
import readline from "readline";
//import lib Multer para manipulação de arquivos
import multer from "multer";
//import client do banco de dados
import {client} from "./database/client" ;

//Definição das constantes principais
const router = Router();
const multerConfig = multer();

//Definição da interface
interface People{
    cod: number;
    name: string;
    age: number;
}


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

    //Instanciando array
    const peoples: People [] = [];

    //listando linhas lidas, separando por virgula(separador) e criado um array
    for await(let line of peopleline){
        //console.log(line)
        //
        const peoplelinesplit = line.split(",");
        //console.log(peoplelinesplit[1]);
        peoples.push({
            cod:    Number(peoplelinesplit[0]),
            name:   peoplelinesplit[1],
            age:    Number(peoplelinesplit[2])
        });
    }

    //Inserindo cada linha no banco de dados
    for await (let { cod, name, age } of peoples){
        await client.peoples.create({
            data:{
                cod,
                name,
                age
            }
        });
    }

    res.status(200).json(peoples);
})

router.get('/ping', (req: Request, res: Response)=>{
    res.status(200).json({pong: true});
})

export default router;