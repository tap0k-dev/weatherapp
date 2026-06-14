import express, { type Application } from 'express';
import Geolite2Service from '#services/Geolite2Service.js';
import { geoRoutes } from '#routes/GeoRouter.js';

export class App {
  private _app: Application;

  constructor() {
    this._app = express();
    this._app.set('trust proxy', true);
  }

  public get app(): Application {
    return this._app;
  }

  private async initServices() {
    await Geolite2Service.init();
  }

  private initRoutes() {
    this._app.use('/api/geo', geoRoutes);
  }

  public async init() {
    await this.initServices();
    this.initRoutes();
  }
}
