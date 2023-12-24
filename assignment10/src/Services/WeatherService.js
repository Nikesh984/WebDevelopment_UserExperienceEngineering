const API_KEY = ''; //REPLACE WITH YOUR TOKEN

const getWeatherData = async (city) => {
  const api_call = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  return api_call.json();
};

export { getWeatherData };
