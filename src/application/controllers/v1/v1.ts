import BaseController from '../../../core/BaseController';
import Test from './testCtrl';
import Auth from './auth';

class V1 extends BaseController {
    
    constructor() {
        super();
        this.prefix = '/v1';
        this.registerRoutes();
    }

    private registerRoutes() {
        this.router.use(this.prefix, new Test().router);
        this.router.use(this.prefix, new Auth().router);
    }

}

export default V1;