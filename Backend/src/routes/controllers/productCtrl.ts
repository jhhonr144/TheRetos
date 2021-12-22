import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

import { paramMissingError } from 'shared/constants';
import Products from 'entities/Products';


const { BAD_REQUEST, CREATED, OK } = StatusCodes;
const collection:string = "Products";

export async function getAll(req: Request, res: Response) {
    const result = await admin.firestore().collection(collection).get();
    const list: any[] = [];

    result.forEach(doc => { 
        list.push({
            id: doc.id, 
            data: doc.data()
        });
    });
    
    return res.status(OK).json(list);
}

//buscar por producto individual
export async function get(req: Request, res) {
    try {
        let obj:any;
        const id_product = req.params.id_product;
        const query = await admin.firestore().collection(collection).where("id_product","==",id_product).get();

        query.forEach(querySnapshot =>{
            obj = querySnapshot.data();
            //console.log(querySnapshot.data())
        } 
           
        );
           
            
        return res.status(OK).json(obj);
       
      
    } catch (err) {
        return handleError(res, err)
    }
 }



export async function add(req: Request, res: Response) {
    const newItem: Products = {...req.body};
    const newDoc = await admin.firestore().collection(collection).add(newItem);
    //console.log(`Created a new ${collection}: ${newDoc.id}`);
    newItem.id_product = newDoc.id
    return res.status(CREATED).send(newItem);
}


export async function update(req: Request, res: Response) {
    try{
        const { id } = req.params
        const newItem: Products = {...req.body};

        const ref = admin.firestore().collection(collection).doc(id);

        // Set the 'capital' field of the city
        const result = await ref.update(newItem);

        return res.status(OK).json({message:"Ticket updated!"});
    } catch (error) {
        res.status(400).send(JSON.stringify(error));
    }
}

export async function remove(req: Request, res: Response) {
    try {
        const { id } = req.params;
        await admin.firestore().collection(collection).doc(id).delete();
        return res.status(OK).end()
    } catch (err) {
        return handleError(res, err)
    }
}

function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
}

