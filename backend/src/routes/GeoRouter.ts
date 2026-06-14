import express from 'express';
import GeoController from '#controllers/GeoController.js';

const geoController = new GeoController();
export const geoRoutes = express.Router();

geoRoutes.get('/location', geoController.getLocationByIp);
