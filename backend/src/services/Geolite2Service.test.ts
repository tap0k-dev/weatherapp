import Geolite2Service from './Geolite2Service.js';

describe('Тестирование Geolite2Service', () => {
  describe('Инициализация базы данных geolite2', () => {
    it('должно вернуть не null', async () => {
      await Geolite2Service.init();
      const geoService = Geolite2Service.getInstance();
      expect(geoService).not.toBeNull();
    });
  });

  describe('Проверка местоположения по ip 8.8.8.8', () => {
    it('должно вернуть United States', () => {
      const geoService = Geolite2Service.getInstance();
      expect(geoService.lookupIp('8.8.8.8')?.country?.names.en).toBe(
        'United States',
      );
    });
  });
});
