import WeatherService from '#services/WeatherService/WeatherService.js';
import Geolite2Service from '#services/Geolite2Service/Geolite2Service.js';
import express from 'express';

/**
 * Контроллер, отвечающий за запрос данных о погоде.
 * Получает долготу и широту через query параметры, при отсутствии их используется Geolite2Service для получения.
 * * @example
 * // Использование в коде
 * const geoController = new GeoController();
 * const geoRoutes = express.Router();
 * geoRoutes.get('/location', geoController.getLocationByIp);
 */

export default class WeatherController {
  /**
   * Пытается получить геоданные из QueryParams, если они отсутствуют, получает их по ip через Geolite2Service
   * С помощью них возвращает данные о текущей погоде.
   * @param req
   * @param res
   * @returns Возвращает данные о погоде в формате JSON или ошибку, при невозможности получить точное местоположение.
   */
  getCurrentWeatherByIp = async (
    req: express.Request,
    res: express.Response,
  ) => {
    let latitude!: number;
    let longitude!: number;

    if (req.query.latitude !== undefined && req.query.longitude !== undefined) {
      latitude = Number(req.query.latitude);
      longitude = Number(req.query.longitude);
    } else {
      const geoService = Geolite2Service.getInstance();
      if (req.ip === undefined) {
        return res.status(500).json({ error: 'Айпи не найден' });
      }
      const geoData = geoService.lookupIp(req.ip);
      if (
        geoData?.location?.latitude === undefined ||
        geoData?.location?.longitude === undefined
      ) {
        return res
          .status(500)
          .json({ error: 'Невозможно определить местоположение по ip' });
      }

      latitude = geoData?.location?.latitude;
      longitude = geoData?.location?.longitude;
    }

    const weatherService = WeatherService.getInstance();
    const weatherInfo = await weatherService.fetchWeatherInfo({
      longitude: longitude,
      latitude: latitude,
      current: ['temperature_2m'],
      temperature_unit: 'celsius',
    });
    return res.status(200).json(weatherInfo);
  };
}
