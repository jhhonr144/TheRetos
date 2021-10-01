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

// app.get('/', (request, response) => {
//   response.send('Hello world!');
// });

// app.get('/tickets', async (request, response) => {
//   const collections  = await admin.firestore().listCollections();
//   collections.forEach(collection => {
//     console.log('Found subcollection with id:', collection.id);
//   });
//   response.send('Hello world!');
// });
 
app.listen(5000);