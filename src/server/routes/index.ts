import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CidadesController } from '../controllers';

const router = Router();

router.get('/', (_, res) => {
    res.status(StatusCodes.OK).json({ message: 'Hello World!' });
});

router.post('/cidades', CidadesController.create);


export { router };
