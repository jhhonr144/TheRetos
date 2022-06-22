import { Router } from 'express';
import * as ticketsCtrl from './controllers/ticketsCtrl';
import * as participateCtrl from './controllers/participateCtrl';
import * as userCtrl from './controllers/userCtrl';
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";
import * as productCtrl from './controllers/productCtrl';
import * as selectWinnerCtrl from './controllers/selectWinnerCtrl';


//gestion de tickets
const TicketsRouters = Router();
TicketsRouters.get('/',
   isAuthenticated,
   isAuthorized({ hasRole: ['admin'] }),
    ticketsCtrl.getAll);
TicketsRouters.get('/get/:uid',
    isAuthenticated,
    isAuthorized({ hasRole: ['admin', 'user','validator'] }),
     ticketsCtrl.get);
TicketsRouters.post('/',
   isAuthenticated,
   isAuthorized({ hasRole: ['admin', 'user'] }),
     ticketsCtrl.add);
TicketsRouters.put('/:id',
    isAuthenticated,
    isAuthorized({ hasRole: ['admin', 'user','validator'] }),
     ticketsCtrl.update);
TicketsRouters.delete('/:id',
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'] }),
     ticketsCtrl.remove);

//gestion de participacion a retos
const ParticipationsRouters = Router();
ParticipationsRouters.get('/',
    isAuthenticated,
    isAuthorized({ hasRole: ['admin','validator'] }), 
    participateCtrl.getAll);   
ParticipationsRouters.post('/participate/',
     isAuthenticated,
     isAuthorized({ hasRole: ['user'] }),
     participateCtrl.participate);
ParticipationsRouters.post('/details/',
   isAuthenticated,
   isAuthorized({ hasRole: ['admin', 'user','validator'] }), 
    participateCtrl.getDetails);
ParticipationsRouters.post('/view/',
   isAuthenticated,
   isAuthorized({ hasRole: ['admin','validator'] }),
    participateCtrl.getDetailsAll);
ParticipationsRouters.post('/',
    isAuthenticated,
    isAuthorized({ hasRole: ['admin', 'user'] }),
     participateCtrl.add);
ParticipationsRouters.put('/:id',
  isAuthenticated,
  isAuthorized({ hasRole: ['admin', 'user'] }), 
    participateCtrl.update);

//gestion usuario
const UserRouters = Router();
UserRouters.post('/',
   isAuthenticated,
   isAuthorized({ hasRole: ['admin'] }),
    userCtrl.create);
UserRouters.get('/',
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'] }),
    userCtrl.all);

//gestion productos
const ProductsRouters = Router();
ProductsRouters.get('/', productCtrl.getAll);
ProductsRouters.get('/:id', productCtrl.get);
ProductsRouters.post('/',
  isAuthenticated,
  isAuthorized({ hasRole: ['admin'] }),
    productCtrl.add);
ProductsRouters.delete('/:id',
  isAuthenticated,
  isAuthorized({ hasRole: ['admin'] }),
    productCtrl.remove);
ProductsRouters.put('/:id',
  isAuthenticated,
  isAuthorized({ hasRole: ['admin'] }),
    productCtrl.update);

const WinnerRouters = Router();
WinnerRouters.post('/',
   isAuthenticated,
   isAuthorized({ hasRole: ['admin', 'validator'] }), 
   selectWinnerCtrl.award);


//Export the base-router
const baseRouter = Router();
baseRouter.use('/tickets', TicketsRouters);
baseRouter.use('/participe', ParticipationsRouters);
baseRouter.use('/products', ProductsRouters);
baseRouter.use('/users', UserRouters);
baseRouter.use('/award', WinnerRouters);

export default baseRouter;