import express from 'express';
import WeatherController from '#controllers/WeatherController.js';

const weatherController = new WeatherController();
export const weatherRoutes = express.Router();

weatherRoutes.get('/current', weatherController.getCurrentWeatherByIp);
