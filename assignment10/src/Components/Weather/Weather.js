import React from "react";
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import Form from "../Form/Form";
import { getWeatherData } from "../../Services/WeatherService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class Weather extends React.Component {
  state = {
    city: undefined,
    daywiseWeatherForecast: undefined,
    error: undefined,
  };

  getWeatherForecast = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    if (city) {

      try {
        const data = await getWeatherData(city);
        const formattedData = this.formatWeatherData(data);
        
        this.setState({
          city: data.city.name,
          country: data.city.country,
          daywiseWeatherForecast: formattedData,
          error: ""
        });

      } catch (error) {
        console.error("Error fetching weather data", error);
        this.setState({
          city: undefined,
          country: undefined,
          daywiseWeatherForecast: undefined,
          error: "Error Fetching Weather Data"
        });

       
        toast.error("Error fetching weather data. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      }
    } else {
      this.setState({
        city: undefined,
        country: undefined,
        daywiseWeatherForecast: undefined,
        error: "Empty Fields"
      });
      

      toast.error("Please Enter City to Search", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  formatWeatherData = (data) => {
    var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var imageApi = "https://openweathermap.org/img/w/";

    var daywiseWeatherForecast = [];
    for (var i = 0; i <= 32; i += 8) {
      var dailyTempMin = data.list[i].main.temp_min;
      var dailyTempMax = data.list[i].main.temp_max;
      var hourwiseForecast = [];

      for (var j = i; j < i + 7; j++) {
        hourwiseForecast.push({
          time: data.list[j].dt_txt.substring(0, 19),
          temp: data.list[j].main.temp,
          temp_min: data.list[j].main.temp_min,
          temp_max: data.list[j].main.temp_max,
          description: data.list[j].weather[0].description,
          icon: imageApi + data.list[j].weather[0].icon + ".png"
        });

        if (data.list[j].main.temp_min < dailyTempMin) {
          dailyTempMin = data.list[j].main.temp_min;
        }
        if (data.list[j].main.temp_max > dailyTempMax) {
          dailyTempMax = data.list[j].main.temp_max;
        }
      }

      daywiseWeatherForecast.push({
        day: weekdays[new Date(data.list[i].dt_txt.substring(0, 10)).getDay()],
        time: data.list[i].dt_txt,
        temp: data.list[i].main.temp,
        temp_min: Math.round(dailyTempMin),
        temp_max: Math.round(dailyTempMax),
        description: data.list[i].weather[0].description,
        icon: imageApi + data.list[i].weather[0].icon + ".png",
        hourwiseForecast: hourwiseForecast
      });
    }

    return daywiseWeatherForecast;
  };

  render() {

    return (
      <div>
        <br />
        <Form getWeatherForecast={this.getWeatherForecast} />
        {/* {this.state.error && <p className="text-danger">{this.state.error}</p>} */}

        <div>
          {this.state.daywiseWeatherForecast &&
            this.state.daywiseWeatherForecast.map(
              ({
                day,
                time,
                temp,
                temp_min,
                temp_max,
                description,
                icon,
                hourwiseForecast,
              }) => {
                return (
                  <WeatherForecast
                    icon={icon}
                    day={day}
                    time={time}
                    temp={temp}
                    temp_min={temp_min}
                    temp_max={temp_max}
                    description={description}
                    hourwiseForecast={hourwiseForecast}
                  />
                );
              }
            )}
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default Weather;