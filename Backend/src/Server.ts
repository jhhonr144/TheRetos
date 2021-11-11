import * as cors from 'cors';
import * as express from 'express';
import * as admin from 'firebase-admin';
import BaseRouter from './routes';
import * as bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true }));

const serviceAccount = require('./theretos-firebase-credentials.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Add APIs
app.use('/api', BaseRouter);
 
app.listen(5000);