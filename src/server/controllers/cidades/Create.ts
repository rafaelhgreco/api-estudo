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
        await bodyValidation.validateSync(req.body);
    }
    catch (error) {
        const yupError = error as yup.ValidationError
        res.status(StatusCodes.BAD_REQUEST).json({ message: yupError.message });
    }
    console.log(validatedAData);
    
};
