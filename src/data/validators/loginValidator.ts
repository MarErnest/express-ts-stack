import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { User } from '../models/User';
import AuthHelper from '../../application/helpers/AuthHelper';
import Database from '../Database';

@ValidatorConstraint({ name: 'loginValidator', async: true })
export class LoginValidator implements ValidatorConstraintInterface {

    public validate(text: string, args: ValidationArguments): Promise<boolean> | boolean {
        return new Promise(async (resolve, reject) => {
            const user = (args.object as User);
            if (user.username && user.password) {
                const connection = await Database.getConnection();
                const userExists = await connection.manager.findOne(User, { username: user.username });
                if (!userExists) { return resolve(false); }
                const isPasswordMatch = await AuthHelper.isPasswordMatched(user.password, userExists.password);
                if (!isPasswordMatch) { return resolve(false); }
            }
            return resolve(true);
        });
    }

    public defaultMessage(args: ValidationArguments) {
        return 'You entered invalid Username or Password.';
    }

}