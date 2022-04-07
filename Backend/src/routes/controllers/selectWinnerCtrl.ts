import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import Participate from 'entities/participate';
import { paramMissingError } from 'shared/constants';
import Tickets from 'entities/Tickets';
import Challenges from 'entities/Challenges';

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

const collection:string = "Tck_Participations";
const collection2:string = "Challenges";
const collection3:string = "Tickets"

export async function award(req: Request, res: Response) {
    const id_Challenges = req.body.id_Challenges
    const Participate  = req.body.uids
    const countPartici = Participate.length
    let person_tck :any;
    let response : String;

    //buscamos todos los participantes para ese ticket 
    const result = await admin.firestore().collection(collection).where("id_Challenges","==",id_Challenges).get();

    const list: any[] = [];
    const list2: any[] = [];
   
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
    const ganancias = (count / countPartici)
    
    for(let dato of Participate){
        const query = await admin.firestore().collection(collection3).where("uid","==",dato).get();
        const queryy = await admin.firestore().collection(collection3).where("uid","==",dato);
        //consultar los datos reales del ticket 
        query.forEach(querySnapshot =>{
            person_tck = querySnapshot.data();
                   }      
        );  
   
        if(person_tck.state_ticket == 0){
            response = 'TKBLOQUEADO'

        }else{
          

            let id = '';
            let tck : any;
            const docRef =  await admin.firestore().collection(collection).where("id_Challenges","==",id_Challenges).where("uid","==",dato).get();
            docRef.forEach(doc => { 
               id = doc.id    
               tck = doc.data();  
            });
          
            if(tck.is_win == 1 ){
                response = 'CANCELAR'
            }else{
                //actualizo tickets de persona
                const resp = await queryy.limit(1).get();
                var tk_id= !resp.empty ? resp.docs[0].id:"";   
                const newItem1: Participate = {...person_tck};
                newItem1.total_ticket = person_tck.total_ticket + ganancias
                const ref = await admin.firestore().collection(collection3).doc(tk_id);
                const result = await ref.update(newItem1); 

                
                //actualizo el estado de la participacion a que gano 
                const newItem2: Participate = {...tck};
                newItem2.is_win = 1
                const ref2 = await admin.firestore().collection(collection).doc(id);
                const result2 = await ref2.update(newItem2); 

                //actualizo estado del reto para que no se muestre
                let challenges : any; 
                const query2 = await admin.firestore().collection(collection2).where("id_challengs","==",id_Challenges).get();

                query2.forEach(doc => { 
                    id = doc.id    
                    challenges = doc.data();  
                 });
                 console.log(challenges)
                const newItem3: Challenges = {...challenges};
                newItem3.state_game = "1"
                const ref3 = await admin.firestore().collection(collection2).doc(id);
                const result3 = await ref3.update(newItem3); 


                response = 'GANO'
            }




        }

       
    }
  
    return res.status(OK).json(response);

}

 
function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
}
