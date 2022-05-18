import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

const ticketsCollection:string = "Tickets";

export async function create(req: Request, res: Response) {
    try {
        const { displayName, password, email, role } = req.body;
 
        if (!displayName || !password || !email || !role) {
            return res.status(400).send({ message: 'Missing fields' })
        }
 
        const { uid } = await admin.auth().createUser({
            displayName,
            password,
            email
        });
        await admin.auth().setCustomUserClaims(uid, { role:role });
        return res.status(CREATED).send({ uid });
    } catch (err) {
        return handleError(res, err);
    }
 }

 export async function all(req: Request, res: Response) {
    try {
        const listUsers = await admin.auth().listUsers()
        const users = listUsers.users.map(mapUser);
        await Promise.all(users.map(async (user) => {
            user.tickets = await getTickets(user.uid);
        }));
        return res.status(200).send({ users })
    } catch (err) {
        return handleError(res, err)
    }
}

function mapUser(user: admin.auth.UserRecord) {
    const customClaims = (user.customClaims || { role: '' }) as { role?: string };
    const role = customClaims.role ? customClaims.role : '';
    //let ticket = getTickets(user.uid);
    
    return {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        role,
        lastSignInTime: user.metadata.lastSignInTime,
        creationTime: user.metadata.creationTime,
        tickets: {}
    }
}

const getTickets = async uid => {
    const query = await admin.firestore().collection(ticketsCollection)
                       .where("uid","==", uid)
                       .orderBy('date_creation','desc')
                       .limit(1)
                       .get();
    let ticket = {};
    if (!query.empty) ticket = {...query.docs[0].data()};
    return ticket;
}

 function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
 }