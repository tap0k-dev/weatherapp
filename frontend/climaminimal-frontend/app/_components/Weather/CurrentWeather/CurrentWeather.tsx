import styles from './CurrentWeather.module.css';
import WeatherIcon from '../WeatherIcon';

interface CurrentWeatherProps {
  weatherIcon: string;
  cloudiness?: string;
  city: string;
  temperature: number;
  temperatureUnit?: 'celsius' | 'farenheit';
  feelsLike?: number;
  humidity?: number;
  windSpeed?: number;
  windDirection?: 'N' | 'S' | 'W' | 'E';
  updatedTime?: Date;
}

export function CurrentWeather(props: CurrentWeatherProps) {
  const temperatureSymbol = props.temperatureUnit === 'celsius' ? '°C' : '°F';
  const formattedTime = props.updatedTime?.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className={styles['weather-container']}>
      <p className={styles['sub']}>Current Weather</p>
      <p className={styles['main']}>{props.city}</p>
      <p className={styles['sub']}>{props.cloudiness}</p>
      <div className={styles['temperature-container']}>
        <p className={styles['main']}>
          {props.temperature}
          {temperatureSymbol}
        </p>
        <WeatherIcon wmoCode={95} size={80} />
      </div>
      <p className={styles['info']}>
        Feels like {props.feelsLike}
        {temperatureSymbol}
      </p>
      <p className={styles['info']}>Humidity {props.humidity}%</p>
      <p className={styles['info']}>
        Wind {props.windSpeed} km/h {props.windDirection}
      </p>
      <p className={styles['time']}>Updated {formattedTime}</p>
    </div>
  );
}
