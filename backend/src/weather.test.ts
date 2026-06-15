import request from 'supertest';
import { App } from './app.js';
import { type Application } from 'express';

describe('GET /api/weather/current', () => {
  describe('Получение текущей погоды в Amsterdam', () => {
    let app: Application;
    beforeAll(async () => {
      const instance = new App();
      await instance.init();
      app = instance.app;
    });

    it('Подстановка ip 146.103.101.173', async () => {
      const response = await request(app)
        .get('/api/weather/current')
        .set('X-Forwarded-For', '146.103.101.173')
        .expect(200);

      expect(response.body).not.toBeNull();

      expect(response.body?.current?.temperature_2m).not.toBeUndefined();
      const temp = response.body?.current?.temperature_2m;
      expect(typeof temp === 'number' && -50 <= temp && temp <= 50).toBe(true);
    });

    it('Подстановка широты и долготы', async () => {
      const response = await request(app)
        .get('/api/weather/current?longitude=4.89&latitude=52.37')
        .expect(200);

      expect(response.body).not.toBeNull();

      expect(response.body?.current?.temperature_2m).not.toBeUndefined();
      const temp = response.body?.current?.temperature_2m;
      expect(typeof temp === 'number' && -50 <= temp && temp <= 50).toBe(true);
    });
  });
});
