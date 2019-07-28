import 'reflect-metadata';
import Database from '../data/Database';
import { Role, Roles } from '../data/models/Role';
import { User } from '../data/models/User';
import AuthHelper from '../application/helpers/AuthHelper';

class InitialSeed {

    public static run = async () => {
        await Database.getConnection();
        const manager = Database.mysqlCon.manager;

        // Check Guest
        const hasSeeded = await manager.findAndCount(Role, {});
        if (hasSeeded.length > 0) {
            await Database.deleteAll();
        }

        // Guest Role
        const guestRole = Role.create();
        guestRole.name = Roles.GUEST;
        await manager.save(guestRole);

        // Guest User
        const guestUser = User.create();
        guestUser.username = 'GUEST';
        guestUser.password = await AuthHelper.hashPassword('GUEST');
        guestUser.roles = [guestRole];
        await manager.save(guestUser);

    }

}

(async () => {
    await InitialSeed.run();
    process.exit(0);
})();