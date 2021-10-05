import * as express from 'express';
import * as admin from 'firebase-admin';
import BaseRouter from './routes';

const app = express();

const serviceAccount = require('./theretos-firebase-credentials.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Add APIs
app.use('/api', BaseRouter);
 
app.listen(5000);