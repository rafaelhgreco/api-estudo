import { Request, Response } from "express";
interface ICidade {
    name: string;
    state: string;
};

export const create =(req: Request<{},{},ICidade>, res: Response) => {
    console.log(req.body);
    res.status(200).json({ message: 'Create!' });
};
