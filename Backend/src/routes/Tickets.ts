import * as admin from 'firebase-admin';
const collection:string = "Tickets";

export const findAll = async (): Promise<any[]> => {
    try {
      const userQuerySnapshot = await admin.firestore().collection(collection).get();
      const users: any[] = [];
      userQuerySnapshot.forEach(
            (doc)=>{
                users.push({
                    id: doc.id,
                    data:doc.data()
            });
            }
        );
        return users;
    } catch (error) {
      throw new Error("");
    }
  };