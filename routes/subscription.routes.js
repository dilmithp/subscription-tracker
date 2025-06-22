import {Router} from 'express';

const subscriptionRouter = Router();
subscriptionRouter.get('/', (req, res) => res.send({title:'Get all Subscription'}));
subscriptionRouter.get('/:id', (req, res) => res.send({title:'Get Subscription by ID'}));
subscriptionRouter.post('/', (req, res) => res.send({title:'Create a Subscription'}));
subscriptionRouter.put('/:id', (req, res) => res.send({title:'Update a Subscription'}));
subscriptionRouter.delete('/:id', (req, res) => res.send({title:'Delete a Subscription'}));

subscriptionRouter.get('/user/:id',(req,res)=>res.send({title:'Get all user subscription'}));
subscriptionRouter.put('/:id/cancel',(req,res)=>res.send({title:'Cancel a subscription'}));
subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({title:'Get all upcoming renewals'}));

export default subscriptionRouter;