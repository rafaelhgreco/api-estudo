import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
interface ICidade {
    name: string;
};

const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
    name: yup.string().required().min(3),
});

export const create = async (req: Request<{},{},ICidade>, res: Response) => {
    let validatedAData: ICidade | undefined = undefined;  
    try {
        validatedAData = await bodyValidation.validate(req.body, { abortEarly: false });
    }
    catch (err) {
        const yupError = err as yup.ValidationError
        const errors: Record<string, string> = {};
        yupError.inner.forEach(error => {
            if (!error.path) return;
            errors[error.path!] = error.message;
        });
        return res.status(StatusCodes.BAD_REQUEST).json({errors});
    }
    console.log(validatedAData);
    
};
