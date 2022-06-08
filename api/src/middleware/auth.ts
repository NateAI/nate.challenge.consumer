import { Request, Response, NextFunction } from 'express';
import { authUser } from '../lib/auth-api';

const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { body: { token, userId }} = req;
    const authToken: string | false = await authUser(userId, token);
    if (!authToken) {
        return res.sendStatus(401);
    }
    next();
};

export default authenticateUser;
