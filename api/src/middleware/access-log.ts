import { NextFunction, Request, Response } from 'express';

const accessLog = (req: Request, res: Response, next: NextFunction) => {
    const { method, originalUrl } = req;
    let logMessage = `${method} ${originalUrl}`;
    console.log(logMessage);

    next();
}

export default accessLog;
