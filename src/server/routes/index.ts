import { Router } from 'express';
import { StatusCodes } from 'http-status-codes'

const router = Router();

router.get('/teste', (req, res) => {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Hello World!' });
  });

export { router };
