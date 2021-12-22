import { Router } from 'express';
import * as ticketsCtrl from './controllers/ticketsCtrl';
import * as participateCtrl from './controllers/participateCtrl';
import * as userCtrl from './controllers/userCtrl';
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";
import * as productCtrl from './controllers/productCtrl';

const TicketsRouters = Router();
TicketsRouters.get('/',
                    isAuthenticated, 
                    isAuthorized({ hasRole: ['admin', 'user'] }), 
                    ticketsCtrl.getAll);
TicketsRouters.get('/get/:uid', ticketsCtrl.get);
TicketsRouters.post('/', ticketsCtrl.add);
TicketsRouters.put('/:id', ticketsCtrl.update);
TicketsRouters.delete('/:id', ticketsCtrl.remove);

const ParticipationsRouters = Router();
ParticipationsRouters.get('/', participateCtrl.getAll);
ParticipationsRouters.post('/participate/', participateCtrl.participate);
ParticipationsRouters.post('/details/', participateCtrl.getDetails);
ParticipationsRouters.post('/view/', participateCtrl.getDetailsAll);
ParticipationsRouters.post('/', participateCtrl.add);
ParticipationsRouters.put('/:id', participateCtrl.update);

const UserRouters = Router();
UserRouters.post('/', userCtrl.create);

const ProductsRouters = Router();
ProductsRouters.get('/', productCtrl.getAll);
ProductsRouters.put('/:id', productCtrl.get);
ProductsRouters.post('/', productCtrl.add);
ProductsRouters.put('/:id', productCtrl.remove);
ProductsRouters.put('/:id', productCtrl.update);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/tickets', TicketsRouters);
baseRouter.use('/participe', ParticipationsRouters);
baseRouter.use('/products', ProductsRouters);
baseRouter.use('/users', UserRouters);

export default baseRouter;