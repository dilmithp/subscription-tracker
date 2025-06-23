import {Router} from 'express';
import authorize from "../middlewares/auth.middleware.js";
import {
    createSubscription,
    getAllSubscriptions,
    getSubscriptionById,
    getUserSubscriptions
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();
subscriptionRouter.get('/', getAllSubscriptions);
subscriptionRouter.get('/:id', getSubscriptionById);
subscriptionRouter.post('/', authorize,createSubscription);
subscriptionRouter.put('/:id', (req, res) => res.send({title:'Update a Subscription'}));
subscriptionRouter.delete('/:id', (req, res) => res.send({title:'Delete a Subscription'}));

subscriptionRouter.get('/user/:id',authorize,getUserSubscriptions);
subscriptionRouter.put('/:id/cancel',(req,res)=>res.send({title:'Cancel a subscription'}));
subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({title:'Get all upcoming renewals'}));

export default subscriptionRouter;