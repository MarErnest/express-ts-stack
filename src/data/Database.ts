import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { logger } from '../application/middlewares/MyLogger';

interface IDatabase {
    mysqlCon: Connection;
    getConnection(): Promise<Connection>;
    disconnect(): void;
}

class Database implements IDatabase {

    public mysqlCon: Connection;

    public async getConnection(): Promise<Connection> {
        try {
            if (!this.mysqlCon) { this.mysqlCon = await createConnection(); }
            logger.info('[INFO] MySQL connected');
        } catch (err) {
            logger.error(err);
        }
        return this.mysqlCon;
    }

    public disconnect(): void {
        try {
            if (!this.mysqlCon) { this.mysqlCon.close(); }
        } catch (err) {
            logger.error(JSON.stringify(err));
        }
    }

    public async deleteAll() {
        try {
            for (const meta of this.mysqlCon.entityMetadatas) {
                await this.mysqlCon.manager.delete(meta.name, {});
             }
        } catch (err) {
            logger.error(err);
        }
    }

}

export default new Database();