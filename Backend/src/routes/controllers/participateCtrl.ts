import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

import { paramMissingError } from 'shared/constants';
import Participate from 'entities/participate';

const { BAD_REQUEST, CREATED, OK } = StatusCodes;
const collection:string = "Tck_Participations";
const collection2:string = "Challenges";

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

export async function add(req: Request, res: Response) {
    const newItem: Participate = {...req.body};
    const newDoc = await admin.firestore().collection(collection).add(newItem);
    console.log(`Created a new ${collection}: ${newDoc.id}`);
    newItem.id = newDoc.id
    return res.status(CREATED).send(newItem);
}

export async function update(req: Request, res: Response) {
    try{
        const { id } = req.params
        const newItem: Participate = {...req.body};

        const ref = admin.firestore().collection(collection).doc(id);

        // Set the 'capital' field of the city
        const result = await ref.update(newItem);

        return res.status(OK).json({message:"Participate updated!"});
    } catch (error) {
        res.status(400).send(JSON.stringify(error));
    }
}

function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
}


//verificamos los ticket que tiene con los del reto para comprar si puede o no participar 
export async function participate(req: Request, res) {
    try {
        let person_tck :any;
        let challengs_tck :any;
        let response : String;

     /*    person_tck = 5
        challengs_tck = 6; */

        const uid = req.params.uid;
        const id_Challenges = req.params.id_Challenges


    /*     //tenemos los dos Id a comparar 
        const uid = req.params.uid;
        const id_Challenges = req.params.id_Challenges

        const query = await admin.firestore().collection(collection).where("uid","==",uid).get();
        const query2 = await admin.firestore().collection(collection2).where("id_challengs","==",id_Challenges).get();

        query.forEach(querySnapshot =>{
            person_tck = querySnapshot.data();
            console.log(querySnapshot.data())
        }      
        );    
        query2.forEach(querySnapshot =>{
            challengs_tck = querySnapshot.data();
            console.log(querySnapshot.data())
        }        
        );

        if(person_tck.total_ticket < challengs_tck.token_in){
             response = 'INSUFICIENTE'
        }else{
             response = 'SUFICIENTE'
        }


 */
     
        return res.status(OK).json(req);
       
      



    } catch (err) {
        return handleError(res, err)
    }
 }