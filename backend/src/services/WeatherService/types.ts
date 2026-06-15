export type WeatherRequestType = {
  latitude: number | number[];
  longitude: number | number[];
  elevation?: number | number[] | 'nan';
  current?: string[];
  hourly?: string[];
  daily?: string[];
  temperature_unit?: 'celsius' | 'fahrenheit';
  wind_speed_unit?: 'kmh' | 'ms' | 'mph' | 'kn';
  precipitation_unit?: 'mm' | 'inch';
  timeformat?: 'iso8601' | 'unixtime';
  timezone?: string;
  past_days?: number; // от 0 до 92
  forecast_days?: number; // от 0 до 16
  models?: string[];
  cell_selection?: 'land' | 'sea' | 'nearest';
  apikey?: string; // необязательно, так как api открытый
};

export type WeatherResponseType = {
  latitude: number;
  longitude: number;
  elevation: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  current?: {
    time: string;
    interval: number;
    [key: string]: number | string;
  };
  current_units?: {
    time: string;
    interval: string;
    [key: string]: string;
  };
  hourly?: {
    time: string[];
    [key: string]: (number | string)[];
  };
  hourly_units?: {
    [key: string]: string;
  };
  daily?: {
    time: string[];
    [key: string]: (number | string)[];
  };
  daily_units?: {
    [key: string]: string;
  };
};
