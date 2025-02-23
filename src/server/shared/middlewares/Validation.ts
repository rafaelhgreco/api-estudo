import { RequestHandler } from "express";
import { Schema } from 'yup';
import { StatusCodes } from "http-status-codes";
import { ObjectSchema, ValidationError } from "yup";

type TProperty = 'body' | 'header' | 'params' | 'query';

type TGetSchema = <T>(schema: Schema<T>) => Schema<any>;

type TAllSchemas = Record<TProperty, Schema<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type Tvalidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: Tvalidation = (getAllSchemas) => async (req, res, next) => {
   const schemas = getAllSchemas(schema => schema);
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
