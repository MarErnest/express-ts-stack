import { Router } from 'express';

class BaseController {

    public prefix: string;
    public router: Router;

    constructor() {
        this.router = Router();
    }

}

export default BaseController;