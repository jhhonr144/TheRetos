import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import * as admin from 'firebase-admin';


import { paramMissingError } from 'shared/constants';
import Participate from 'entities/participate';

const { BAD_REQUEST, CREATED, OK } = StatusCodes;
const collection:string = "Tck_Participations";
const collection2:string = "Challenges";
const collection3:string = "Tickets"

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
   // console.log(`Created a new ${collection}: ${newDoc.id}`);
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

export async function getDetails(req: Request, res: Response) {

    const id_Challenges = req.body.id_Challenges
    const result = await admin.firestore().collection(collection).where("id_Challenges","==",id_Challenges).get();
    const list: any[] = [];
   
    var count = 0; 

    result.forEach(doc => { 
        list.push({
            id: doc.id, 
            data: doc.data()
        });
    });
    for(let dato of list){
        count +=dato.data.total_ticket
        
    }
    var respon = {
        players : list.length,
        count : count

    }
    

    return res.status(OK).json(respon);

}




//verificamos los ticket que tiene con los del reto para comprar si puede o no participar 
export async function participate(req: Request, res) {
    try {
        let person_tck :any;
        let challengs_tck :any;
        let participations : any;
        let validation : any;
        let response : String;
        let count: any;
        let date: Date = new Date();


        const uid = req.body.uid;
        const id_Challenges = req.body.id_Challenges
        const answer = req.body.answer


    
        const query = await admin.firestore().collection(collection3).where("uid","==",uid).get();
        const queryy = await admin.firestore().collection(collection3).where("uid","==",uid);
        const query2 = await admin.firestore().collection(collection2).where("id_challengs","==",id_Challenges).get();
        const query3 = await admin.firestore().collection(collection).where("id_Challenges","==",id_Challenges).get();
           //tenemos los dos Id a comparar 
        const validations = await admin.firestore().collection(collection).where("id_Challenges","==",id_Challenges).where("uid","==",uid).get();

            
        //consultar los datos reales del ticket 
        query.forEach(querySnapshot =>{
            person_tck = querySnapshot.data();
            //console.log(querySnapshot.data())
        }      
        );  

        //consultar el ticket donde esta participando
        query2.forEach(querySnapshot =>{
            challengs_tck = querySnapshot.data();
           // console.log(querySnapshot.data())
        }        
        );

        //para usar luego en un count
        query3.forEach(querySnapshot =>{
            participations = querySnapshot.data();
            count = querySnapshot.data()
            //console.log(querySnapshot.data())
        }        
        );

        //verificamos que no participando en el reto anterior
        validations.forEach(querySnapshot =>{
            validation = querySnapshot.data();
            count = querySnapshot.data()
           // console.log(querySnapshot.data())
        }        
        );

        //Validamos si ya se registro en este reto
        if(!validation){
            if(person_tck.state_ticket = 0){
                response = 'TKBLOQUEADO'
    
            }else{
                
                //validamos si tiene ticket suficientes
               if(person_tck.total_ticket < challengs_tck.token_in){
                    response = 'INSUFICIENTE'
               }else{
                    
                      let Tickets = {
                   
                        id_Challenges :id_Challenges,
                        uid: uid,
                        total_ticket: challengs_tck.token_in,
                        date_Participate: date.toLocaleDateString()   ,
                        hour_Participate:date.toLocaleTimeString(),
                        state_Participate: "1",
                        answer : answer,
                        number_participate : 0,
                        is_win: 0,
                      } 

                      const resp = await queryy.limit(1).get();
                      var tk_id= !resp.empty ? resp.docs[0].id:"";
                      console.log(tk_id)

 
                      const newItem1: Participate = {...person_tck};

                      newItem1.total_ticket = person_tck.total_ticket - challengs_tck.token_in
                      const ref = await admin.firestore().collection(collection3).doc(tk_id);
                      // actualizamos
                     const result = await ref.update(newItem1); 

 

                         


                      //creamos la participacion 
                          const newItem: Participate = {...Tickets};
                          const newDoc = await admin.firestore().collection(collection).add(newItem);
                        response = 'SUFICIENTE'
                    
               }
    
            }
            
           }else{
             response = 'YA'
           }

        
        return res.status(OK).json(response);
       
    } catch (err) {
        return handleError(res, err)
    }
 }
