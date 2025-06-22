import {Router} from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => res.send({title:'GET All Users'}));

userRouter.get('/:id', (req, res) => res.send({title:'GET User Users'}));

userRouter.post('/', (req, res) => res.send({title:'Create a User'}));

userRouter.put('/:id', (req, res) => res.send({title:'Update a user'}));

userRouter.delete('/:id', (req, res) => res.send({title:'Delete a User'}));

export default userRouter;