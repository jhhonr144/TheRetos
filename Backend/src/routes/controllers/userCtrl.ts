import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

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

 function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
 }