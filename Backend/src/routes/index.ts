import { Router } from 'express';
import * as ticketsCtrl from './controllers/ticketsCtrl';
import * as participateCtrl from './controllers/participateCtrl';
import * as userCtrl from './controllers/userCtrl';
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";

const TicketsRouters = Router();
TicketsRouters.get('/',
                    isAuthenticated, 
                    isAuthorized({ hasRole: ['admin', 'user'] }), 
                    ticketsCtrl.getAll);
TicketsRouters.get('/get/:uid', ticketsCtrl.get);
TicketsRouters.post('/', ticketsCtrl.add);
TicketsRouters.put('/:id', ticketsCtrl.update);
TicketsRouters.delete('/:id', ticketsCtrl.remove);

const ChallengesRouters = Router();


const ParticipationsRouters = Router();
ParticipationsRouters.get('/', participateCtrl.getAll);
ParticipationsRouters.post('/participate/', participateCtrl.participate);
ParticipationsRouters.post('/details/', participateCtrl.getDetails);
ParticipationsRouters.post('/', participateCtrl.add);
ParticipationsRouters.put('/:id', participateCtrl.update);

const UserRouters = Router();
UserRouters.post('/', userCtrl.create);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/tickets', TicketsRouters);
baseRouter.use('/participe', ParticipationsRouters);
baseRouter.use('/challenges', ChallengesRouters);
baseRouter.use('/users', UserRouters);

export default baseRouter;