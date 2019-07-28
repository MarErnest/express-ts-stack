import { Response, NextFunction } from 'express';
import IRequest from '../../application/interfaces/IRequest';
import AuthHelper from '../helpers/AuthHelper';

const authUser = async (request: IRequest, response: Response, next: NextFunction) => {
    if (request.headers && !request.headers.token) {
        return response.status(401).send('Unauthorized');
    }
    const token = request.headers.token as string;
    try {
        const parsedToken = await AuthHelper.verify(token);
        request.user = parsedToken;
    } catch (error) {
        return response.status(401).send('Unauthorized');
    }
    await next();
};

export default authUser;