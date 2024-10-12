import { Router } from 'express';

import * as TodoController from '../controllers/todo.controller';
import { privateRequest } from '../middleware/auth';
import { localStrategyAuth } from '../libs/passport-local';
import { localStrategyAuthJWT } from '../libs/passport-local-jwt';
import { bearerStrategyAuth } from '../libs/passport-bearer';
import { jwtStrategyAuth } from '../libs/passport-jwt';

const router = Router();

router.get('/todo', privateRequest, TodoController.all)

router.post('/todo', localStrategyAuth, TodoController.add)

router.put('/todo/:id', bearerStrategyAuth, TodoController.update)

router.post('/todo/jwt', localStrategyAuthJWT, async (req, res) => {
    res.json({
        auth: req.authInfo
    })
})

router.delete('/todo/:id', jwtStrategyAuth, TodoController.remove)

export default router;