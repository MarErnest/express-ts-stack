import App from '../application/app';
import request from 'supertest';
import Database from '../data/Database';


describe('Health', () => {
    let app: any = null;
    beforeAll(async () => {
        await Database.getConnection();
        app = new App();
    });

    test('/v1/test', async () => {
        const result = await request(app.instance).get('/v1/test');
        expect(result.status).toBe(200);
    });
});