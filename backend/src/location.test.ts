import request from 'supertest';
import { App } from './app.js';
import { type Application } from 'express';

describe('GET /api/geo/location', () => {
  describe('Подстановка ip 146.103.101.173', () => {
    let app: Application;
    beforeAll(async () => {
      const instance = new App();
      await instance.init();
      app = instance.app;
    });

    it('должно вернуть Amsterdam', async () => {
      const response = await request(app)
        .get('/api/geo/location')
        .set('X-Forwarded-For', '146.103.101.173')
        .expect(200);
      expect(response.body?.city?.names.en).toBe('Amsterdam');
    });
  });
});
