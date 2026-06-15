import * as geolite2 from 'geolite2-redist';
import { GeoIpDbName } from 'geolite2-redist';
import maxmind from 'maxmind';

/**
 * Сервис для определения местоположения по IP-адресу
 * Использует базу данных GeoLite2 и Singleton
 * * @example
 * // Инициализация при старте
 * await Geolite2Service.init();
 * // Использлвание в коде
 * const geoService = Geolite2Service.getInstance();
 * const data = geoService.lookupIp('8.8.8.8');
 */

export default class Geolite2Service {
  private _reader: maxmind.Reader<maxmind.CityResponse>;
  private static _instance: Geolite2Service | null = null;

  /**
   * Приватный конструктор не позволяет создать объект через `new .
   * @param reader - Инициализированный выше maxmind.Reader.
   */
  private constructor(reader: maxmind.Reader<maxmind.CityResponse>) {
    this._reader = reader;
  }

  /**
   * Загружает единожды базу данных GeoLite2 City.
   * @throws {Error} Если иниацилизация невозможна.
   */
  static async init(): Promise<void> {
    if (!Geolite2Service._instance) {
      try {
        const reader = await geolite2.open(GeoIpDbName.City, (path) =>
          maxmind.open<maxmind.CityResponse>(path),
        );
        Geolite2Service._instance = new Geolite2Service(reader);
      } catch (e) {
        throw new Error('Невозможно инициализировать БД GeoLite2 City');
      }
    }
  }

  /**
   * Singleton, который позволяет получить сущность Geolite2Service
   * * @returns Текущий экземпляр `Geolite2Service`.
   * @throws {Error} Если метод вызван до инициализации сервиса через `init()`.
   */
  public static getInstance(): Geolite2Service {
    if (!Geolite2Service._instance) {
      throw new Error('Geolite2Service ещё не инициализирован!');
    }
    return Geolite2Service._instance;
  }

  /**
   * Метод, выдающий информацию об IP-адресе
   * @param ipAddress - IPv4-адресс в формате 'x.x.x.x'
   * @returns Данные о городе, стране, долготе, широте
   */
  lookupIp(ipAddress: string): maxmind.CityResponse | null {
    return this._reader.get(ipAddress);
  }
}
