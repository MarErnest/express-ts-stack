import BaseController from '../../../core/BaseController';
import { Request, Response } from 'express';
import UserRepository from '../../../data/repositories/UserRepository';
import { getCustomRepository } from 'typeorm';
import { User } from '../../../data/models/User';
import { plainToClass } from 'class-transformer';

class Auth extends BaseController {

    // User Repository
    private userRepository = getCustomRepository(UserRepository);

    // Constructor
    constructor() {
        super();
        this.prefix = '/auth';
        this.registerRoutes();
    }

    // Register Routes
    private registerRoutes = () => {
        this.router.post(`${this.prefix}/sign-in`, this.signIn);
    }

    // Sign In
    public  signIn = async (request: Request, response: Response) => {
        const userObject = plainToClass(User, request.body);
        const result = await this.userRepository.login(userObject);
        response.json(result);
    }

}

export default Auth;