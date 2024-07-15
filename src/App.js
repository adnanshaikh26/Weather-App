import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
function App() {
  const [data, setData] = useState({});
  const [backgroundImg, setBackgroundImg] = useState("default-bg");
  const [location, setLocation] = useState("");
  const key = process.env.REACT_APP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${key}`;

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setLocation("");
      } catch (e) {
        console.log(e);
        setData({});
        Swal.fire({
          icon: "error",
          title: "Please try again.",
          text: "Incorrect city name",
        });
      }
    }
  };

  useEffect(() => {
    if (data.weather) {
      setBackgroundImg(data.weather[0].main);
    } else {
      setBackgroundImg("default-bg");
    }
  }, [data]);

  return (
    <div className={`app ${backgroundImg}`}>
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter the Location"
          onKeyPress={searchLocation}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            {data.name ? <p>{data.name}</p> : <p>City</p>}
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : <h1>--°F</h1>}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : <p></p>}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? (
              <p>{data.main.feels_like.toFixed()}°F</p>
            ) : (
              <p>-- °F</p>
            )}
            <p>Feels like</p>
          </div>
          <div className="humidity">
            {data.main ? <p>{data.main.humidity}%</p> : <p>-- %</p>}

            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p>{data.wind.speed} MPH</p> : <p>-- MPH</p>}

            <p>Wind</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
