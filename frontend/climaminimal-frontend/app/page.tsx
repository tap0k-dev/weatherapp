import CurrentWeather from './_components/Weather/CurrentWeather';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <CurrentWeather
          weatherIcon="cloudy"
          city="London, UK"
          cloudiness="Mostly Cloudy"
          temperature={123}
          temperatureUnit="celsius"
          feelsLike={100}
          humidity={68}
          windSpeed={12}
          windDirection="W"
          updatedTime={new Date()}
        />
      </main>
    </div>
  );
}
