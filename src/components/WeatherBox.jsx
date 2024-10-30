import styles from '@/styles/Home.module.css';

export default function WeatherBox({weatherData}) {

    return (
        <div className={styles.weatherBox}>
            <h2>{weatherData.city}</h2>
            <img src={weatherData.icon} alt="weather icon" />
            <p>Temperature: {weatherData.temp}°C</p>
            <p>Wind: {weatherData.wind} km/h</p>
            <p>Precipitation: {weatherData.precip} mm</p>
        </div>
    )
}