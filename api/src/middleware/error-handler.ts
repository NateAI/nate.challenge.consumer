import { Request, Response } from 'express';

const internalServerError = (req: Request, res: Response) => {
    const { method, originalUrl, body, params, query } = req;
    let logMessage = `${method} ${originalUrl} => ${ Object.keys(params) ? JSON.stringify(params) : ''} ${ Object.keys(query) ? JSON.stringify(query) : ''}`;
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
        logMessage = `${logMessage} => body: ${JSON.stringify(body)}`;
    }
    console.error(logMessage);
    res.status(500).send({ status: 'failed' });
}

export default internalServerError;
