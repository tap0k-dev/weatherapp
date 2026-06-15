import WeatherService from './WeatherService.js';

describe('Тестирование WeatherService', () => {
  describe('Инициализация WeatherService', () => {
    it('должно вернуть не null', () => {
      WeatherService.init();
      const weatherService = WeatherService.getInstance();
      expect(weatherService).not.toBeNull();
    });
  });

  describe('Проверка погоды по местоположению', () => {
    it('проверка на корректность погоды (от -50 до +50 градусов по Цельсию)', async () => {
      const weatherService = WeatherService.getInstance();
      const weatherInfo = await weatherService.fetchWeatherInfo({
        longitude: 42,
        latitude: 67,
        current: ['temperature_2m'],
        temperature_unit: 'celsius',
      });

      expect(weatherInfo?.current?.temperature_2m).not.toBeUndefined();
      const temp = weatherInfo?.current?.temperature_2m;
      expect(typeof temp === 'number' && -50 <= temp && temp <= 50).toBe(true);
    });
  });
});
