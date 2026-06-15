import Geolite2Service from '#services/Geolite2Service/Geolite2Service.js';
import express from 'express';

/**
 * Контроллер, отвечающий за запрос данных о местоположении.
 * Получает IP-адрес с запроса, выполняет поиск в базе данных GeoLite2 City.
 * * @example
 * // Использование в коде
 * const geoController = new GeoController();
 * const geoRoutes = express.Router();
 * geoRoutes.get('/location', geoController.getLocationByIp);
 */

export default class GeoController {
  /**
   *
   * @param req
   * @param res
   * @returns Возвращает данные о местоположении в формате JSON или ошибку, при невозможности получить IP-адрес.
   */
  getLocationByIp = (req: express.Request, res: express.Response) => {
    const geoService = Geolite2Service.getInstance();
    if (req.ip === undefined) {
      return res.status(500).json({ error: 'Айпи не найден' });
    }
    const geoData = geoService.lookupIp(req.ip);
    if (!geoData) {
      return res
        .status(500)
        .json({ error: 'Невозможно определить местоположение по ip' });
    }
    return res.status(200).json(geoData);
  };
}
