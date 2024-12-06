import { RequestHandler } from "express";
import { Schema } from 'yup';
import { StatusCodes } from "http-status-codes";
import { ValidationError } from "yup";

type TProperty = 'body' | 'header' | 'params' | 'query';

type TAllSchemas = Record<TProperty, Schema<any>>;

type Tvalidation = (schemas:Partial<TAllSchemas>) => RequestHandler;

export const validation: Tvalidation = (schemas) => async (req, res, next) => {
    console.log(schemas);

    const errorsResult: Record<string, Record<string, string>> = {};



    Object.entries(schemas).forEach(([key, schema]) =>{
        try {
            schema.validateSync(req[key as TProperty], { abortEarly: false });
            // return next();
        }catch (err) {
            const yupError = err as ValidationError;
            const errors: Record<string, string> = {};
        
            yupError.inner.forEach(error => {
            if (error.path === undefined) return;
            errors[error.path] = error.message;
            });

            errorsResult[key] = errors;
        
            // res.status(StatusCodes.BAD_REQUEST).json({ errors });
        }
    }); 
    if (Object.entries(errorsResult).length === 0) {
        return next();
    } else{
        res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
    }
};
