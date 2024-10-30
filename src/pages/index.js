import WeatherBox from "@/components/WeatherBox";
import styles from "@/styles/Home.module.css";
import { useState } from "react";

export default function Home() {

  const [inputText, setInputText] = useState("");
  const [fetchedCities, setFetchedCities] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  function handleInputChange(e){
    setInputText(e.target.value);
  }

  async function handleClick(){
    console.log(inputText);
    setErrorMsg("");

    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=e295db6c8eec430c958173916240810&q=${inputText}&aqi=no`)
    const data = await response.json();
    console.log(data);
    if(data.error){

      setErrorMsg(data.error.message);
    }
    else{
      const temp = data.current.temp_c
      const wind = data.current.wind_kph;
      const precip = data.current.precip_mm;
      const icon = data.current.condition.icon;
      const city = data.location.name;
      const pickedData = {
        temp,
        wind,
        precip,
        icon,
        city
      } 
      setFetchedCities([...fetchedCities, pickedData])
    }

  }

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Weather app</h1>
        <div className={styles.inputBox}>
          <input type="text" placeholder="Enter city name" className={errorMsg ? [styles.input, styles.inputError].join(" ") : styles.input} value={inputText} onChange={handleInputChange}/>
          {errorMsg ? <p className={styles.error}>{errorMsg}</p> : null}
          <button className={styles.button} onClick={handleClick}>Search</button>
        </div>
        {fetchedCities.map((city, index) => <WeatherBox key={index} weatherData={city}/>)}
    </div>
  );
}
