import Geolite2Service from '#services/Geolite2Service.js';
import express from 'express';

export default class GeoController {
  getLocationByIp = (req: express.Request, res: express.Response) => {
    const geoService = Geolite2Service.getInstance();
    if (req.ip === undefined) {
      return res.status(500).json({ error: 'Айпи не найден' });
    }
    return res.json(geoService.lookupIp(req.ip ?? ''));
  };
}
