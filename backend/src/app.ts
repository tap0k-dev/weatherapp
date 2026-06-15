import express, { type Application } from 'express';
import Geolite2Service from '#services/Geolite2Service/Geolite2Service.js';
import WeatherService from '#services/WeatherService/WeatherService.js';
import { geoRoutes } from '#routes/GeoRouter.js';
import { weatherRoutes } from '#routes/WeatherRouter.js';

/**
 * Главное Express приложение.
 * * @example
 * const application = new App();
 * // Инициализация (поднятие различных бд и т.д.)
 * await application.init();
 * // Запуск сервера
 * application.app.listen("3000");
 */
export class App {
  private _app: Application;

  constructor() {
    this._app = express();
    this._app.set('trust proxy', true); // Необходимо для работы с X-Forwaded-For
  }

  public get app(): Application {
    return this._app;
  }

  private async initServices() {
    await Geolite2Service.init();
    WeatherService.init();
  }

  private initRoutes() {
    this._app.use('/api/geo', geoRoutes);
    this._app.use('/api/weather', weatherRoutes);
  }

  public async init() {
    await this.initServices();
    this.initRoutes();
  }
}
