import { Router } from 'express';
import * as ticketsCtrl from './controllers/ticketsCtrl';

const TicketsRouters = Router();
TicketsRouters.get('/', ticketsCtrl.getAll);
TicketsRouters.get('/:id', ticketsCtrl.get);
TicketsRouters.post('/', ticketsCtrl.add);
TicketsRouters.put('/:id', ticketsCtrl.update);
TicketsRouters.delete('/:id', ticketsCtrl.remove);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/tickets', TicketsRouters);
export default baseRouter;