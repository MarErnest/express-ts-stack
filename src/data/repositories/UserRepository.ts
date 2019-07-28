import { EntityRepository, Repository } from 'typeorm';
import { User } from '../models/User';
import IResponse from '../../application/interfaces/IResponse';
import { validate } from 'class-validator';
import AuthHelper from '../../application/helpers/AuthHelper';
import { classToPlain } from 'class-transformer';

@EntityRepository(User)
class UserRepository extends Repository<User> {

    // Login User
    public login = async (user: User): Promise<IResponse> => {

        const response: IResponse = {};

        // Check Errors
        const errors = await validate(user, { groups: ['login'] });
        if (errors.length > 0) {
            response.errors = errors;
            response.status = 'FAILED';
            return response;
        }

        // User
        const userData = await User.findOne({ username: user.username }, {
            select: ['username', 'id'],
            relations: ['roles']
         });

        // Token
        const token = await AuthHelper.sign(classToPlain(userData));
        response.data = { token };
        response.status = 'SUCCESS';
        return response;
    }

}

export default UserRepository;
