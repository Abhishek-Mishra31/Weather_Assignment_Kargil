import { React, useState } from "react";
import axios from "axios";

const apiClint = axios.create({
  baseURL: "http://api.weatherapi.com/v1",
  timeout: 5000,
});

apiClint.interceptors.request.use(null, async (error) => {
  const config = error.config;
  if (!error.response && config && !config.__isRetryRequest) {
    config.__isRetryRequest = true;
    console.log("Retrying the request");
    return apiClint(config);
  }
  return Promise.reject(error);
});

function Section() {
  // const [count, setCount] = React.useState(0);
  async function fetchWeather() {
    const city = document.getElementById("cityInput").value;
    const cityname = document.getElementById("city");
    const temp = document.getElementById("temp");
    const cond = document.getElementById("cond");
    const apiKey = "986e5092237842a59b891533251909";
    function incrementCount() {
      setCount(count + 1);
    }

    try {
      const response = await apiClint.get("/current.json", {
        params: {
          key: apiKey,
          q: city,
        },
      });
      const data = response.data;
      cityname.innerText = `City: ${data.location.name}`;
      temp.innerText = `Temperature: ${data.current.temp_c} °C`;
      cond.innerText = `Condition: ${data.current.condition.text}`;
    } catch (error) {
      console.log("Error fetching weather data:", error);
    }
  }

  return (
    <>
      <div style={{ marginTop: "50px" }}>
        <h2>Counter App</h2>
        <p>Simple Counter App using useState Hook</p>
        <h3>Count: </h3>
        {/* <button
          onClick={(e) => {
            e.preventDefault(); incrementCount();
          }}
        >
          click me to increase counter
        </button> */}
      </div>

      <div style={{ marginTop: "80px" }}>
        <h2>Weather App</h2>
        <p>Simple Weather App using fetch API</p>
        <div style={{ marginTop: "50px" }}>
          <input type="text" placeholder="Enter city name" id="cityInput" />
          <button
            onClick={(e) => {
              e.preventDefault();
              fetchWeather();
            }}
          >
            Get Weather
          </button>
        </div>
        <div style={{ marginTop: "50px" }} id="weatherResult">
          <p id="city">City: </p>
          <p id="temp">Temperature: </p>
          <p id="cond">Condition: </p>
        </div>
      </div>
    </>
  );
}

export default Section;
