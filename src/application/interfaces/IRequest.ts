import { Request } from 'express';
import { User } from '../../data/models/User';

export default interface IRequest extends Request {
    user?: User;
}