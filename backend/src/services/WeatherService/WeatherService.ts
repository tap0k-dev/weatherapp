import type { WeatherRequestType, WeatherResponseType } from './types.js';
import axios, { Axios, AxiosError, type AxiosInstance } from 'axios';

/**
 * Сервис для получения данных о текущей погоде по указанному местоположению с помощью OpenMeteoAPI
 * @tutorial https://open-meteo.com/en/docs - ссылка на оффициальную документацию api
 * @example
 * // Инициализация (timeout по умолчанию 3000 мс, apiKey не обязателен)
 * WeatherService.init(3000, 'rickAstley');
 * // Использование в коде
 * const weatherService = WeatherService.getInstance();
 * const weatherInfo = weatherService.fetchWeatherInfo({ latitude: 52, longitude: 67 });
 */
export default class WeatherService {
  private _baseApiUrl: string | null = null;
  private _apiClient: AxiosInstance | null = null;
  private static _instance: WeatherService | null = null;

  /**
   * При наличии api ключа подключает interceptor, который подставляет его в запрос.
   * Приватный конструктор не позволяет создать объект через `new `.
   * @param timeout - время ожидания запроса (по умолчанию 3000 мс).
   * @param apiKey - api ключ, возможно использование без ключа, но с ограничением 10,000 запросов в день.
   */
  private constructor(timeout: number = 3000, apiKey?: string) {
    this._baseApiUrl = 'https://api.open-meteo.com/v1';

    let axiosConfig = {
      baseURL: this._baseApiUrl,
      timeout: timeout,
    };
    this._apiClient = axios.create(axiosConfig);

    if (apiKey !== undefined) {
      this._apiClient.interceptors.request.use(
        function (config) {
          if (config.method?.toLowerCase() === 'get') {
            config.params = config.params ?? {};

            if (config.params.apikey === undefined) {
              config.params.apikey = apiKey;
            }
          }
          return config;
        },
        function (error: Error) {
          console.log(
            `Возникла ошибка при работе interceptor'а: ${error.message}`,
            `Работа через api ключ невозможна`,
          );
          return Promise.reject(error);
        },
      );
    }
  }

  /**
   * При наличии api ключа, он будет автоматически добавляться в каждый запрос.
   * @param timeout - время ожидания запроса (по умолчанию 3000 мс).
   * @param apiKey - api ключ, возможно использование без ключа, но с ограничением 10,000 запросов в день.
   */
  public static init(timeout: number = 3000, apiKey?: string) {
    if (!WeatherService._instance) {
      WeatherService._instance = new WeatherService(timeout, apiKey);
    }
  }

  /**
   * Singleton, который позволяет получить сущность WeatherService
   * * @returns Текущий экземпляр `WeatherService`.
   * @throws {Error} Если метод вызван до инициализации сервиса через `init()`.
   */
  public static getInstance(): WeatherService {
    if (!WeatherService._instance) {
      throw new Error('WeatherService ещё не инициализирован!');
    }
    return WeatherService._instance;
  }

  /**
   * Получает информацию о текущей погоде по широте и долготе.
   * Если в `weatherRequest` присутствует apiKey, он НЕ заменяется api ключом, указанным в `init()`
   * @param weatherRequest - данные для запроса.
   * @returns возвращает информацию о текущей погоде, при неудаче null.
   */
  public async fetchWeatherInfo(
    weatherRequest: WeatherRequestType,
  ): Promise<WeatherResponseType | null> {
    if (this._apiClient === null) {
      return null;
    }
    try {
      const response = await this._apiClient.get('/forecast', {
        params: weatherRequest,
      });

      if (response.status !== 200 || !response.data) {
        return null;
      }

      const weatherResponse: WeatherResponseType = response.data;
      return weatherResponse;
    } catch (e) {
      const error = e as AxiosError;
      if (error.response) {
        console.log('Сервер вернул ошибку');
        console.log(`Статус: ${error.response.status}`);
        console.log(`Данные ответа: `, error.response.data);
        console.log(`Заголовки: ${error.response.headers}`);
      } else if (error.request) {
        console.log(`Сервер не ответил: ${error.request}`);
      } else {
        console.log(`Ошибка настройки: ${error.message}`);
      }
    }
    return null;
  }
}
