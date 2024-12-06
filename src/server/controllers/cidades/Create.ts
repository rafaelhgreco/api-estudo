import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
interface ICidade {
    name: string;
};
const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
    name: yup.string().required().min(3),
});
export const createBodyValidator:RequestHandler = async (req: Request, res: Response,next: NextFunction) =>  {
    try {
        await bodyValidation.validate(req.body, { abortEarly: false });
        return next();
    }catch (err) {
        const yupError = err as yup.ValidationError;
        const errors: Record<string, string> = {};
    
        yupError.inner.forEach(error => {
        if (error.path === undefined) return;
        errors[error.path] = error.message;
        });
    
        res.status(StatusCodes.BAD_REQUEST).json({ errors });
    }
};


interface IFilter {
    filter: string;
};
const queryValidation: yup.Schema<IFilter> = yup.object().shape({
    filter: yup.string().required().min(3),
});
export const createQueryValidator:RequestHandler = async (req: Request, res: Response,next: NextFunction) =>  {
    try {
        await queryValidation.validate(req.query, { abortEarly: false });
        return next();
    }catch (err) {
        const yupError = err as yup.ValidationError;
        const errors: Record<string, string> = {};
    
        yupError.inner.forEach(error => {
        if (error.path === undefined) return;
        errors[error.path] = error.message;
        });
    
        res.status(StatusCodes.BAD_REQUEST).json({ errors });
    }
};
export const create = async (req: Request<{},{},ICidade>, res: Response) => {
    console.log(req.body);

    res.send('Create!');
};
