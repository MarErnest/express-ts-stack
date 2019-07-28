import BaseController from '../../../core/BaseController';
import { Response } from 'express';
import IRequest from '../../interfaces/IRequest';

class Test extends BaseController {

    constructor() {
        super();
        this.prefix = '/test';
        this.router.get(`${this.prefix}`, this.index);
    }

    private index(request: IRequest, response: Response) {
        response.json({ t: 1 });
    }

}

export default Test;