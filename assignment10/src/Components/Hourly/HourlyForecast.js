import React from "react";
// import './HourlyForecast.css';

class HourlyForecast extends React.Component {

  render() {
    var time = this.props.hourwisetempdata.time;
    var hourTime = time.substring(11, 16);
    var temp = Math.round(this.props.hourwisetempdata.temp);
    return (
      <div className="main-hourly">
        <div className="hourly">
          <div>
            <br/>
            <p>{hourTime}</p>
            <img src={this.props.hourwisetempdata.icon} alt="" />
            <p>{temp}°C</p>
            <p className="text-capitalize">{this.props.hourwisetempdata.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default HourlyForecast;
