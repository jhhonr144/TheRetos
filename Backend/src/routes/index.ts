import { Router } from 'express';
import * as ticketsCtrl from './controllers/ticketsCtrl';
import * as participateCtrl from './controllers/participateCtrl';


const TicketsRouters = Router();
TicketsRouters.get('/', ticketsCtrl.getAll);
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

// Export the base-router
const baseRouter = Router();
baseRouter.use('/tickets', TicketsRouters);
baseRouter.use('/participe', ParticipationsRouters);
baseRouter.use('/challenges', ChallengesRouters);
export default baseRouter;