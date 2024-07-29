import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';
import { FiSunrise, FiSunset } from "react-icons/fi";

const WeatherData = () => {
    const [weatherInfo, setWeatherInfo] = useState(null);
    const { location } = useParams(); 

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=U46X9V9CJGBXHWEM6AUG9G3NJ&contentType=json`);
                const data = response.data;
                const weatherInfo = {
                    city: data.resolvedAddress,
                    current: {
                        description: data.currentConditions.conditions,
                        temperature: data.currentConditions.temp,
                        humidity: data.currentConditions.humidity,
                        windSpeed: data.currentConditions.windspeed,
                        sunrise: data.currentConditions.sunrise,
                        sunset: data.currentConditions.sunset
                    },
                    forecast: data.days.slice(1, 6).map(day => ({
                        date: day.datetime,
                        description: day.conditions,
                        temperature: day.temp,
                    }))
                };
                setWeatherInfo(weatherInfo);
            } catch (error) {
                console.error("Error while fetching data", error);
            }
        };
        fetchWeather();
    }, [location]);

    const getWeatherIcon = (description) => {
        if (description.includes('Sunny')) return <WiDaySunny className="text-4xl" />;
        if (description.includes('Cloudy')) return <WiCloudy className="text-4xl" />;
        if (description.includes('Rain')) return <WiRain className="text-4xl" />;
        if (description.includes('Snow')) return <WiSnow className="text-4xl" />;
        if (description.includes('Thunderstorm')) return <WiThunderstorm className="text-4xl" />;
        return <WiDaySunny className="text-4xl" />; // default icon
    };

    return (
        <div className="flex flex-col items-center mt-8 p-6 border border-gray-300 rounded-lg shadow-lg max-w-7xl w-full mx-auto bg-white text-gray-800">
            {weatherInfo ? (
                <>
                    <h2 className="text-4xl font-bold mb-4 text-gray-900">{weatherInfo.city}</h2>
                    <div className="flex flex-col sm:flex-row items-center justify-around mb-6 bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-lg shadow-md w-full">
                        <div className="flex flex-col items-center mb-4 sm:mb-0">
                            {getWeatherIcon(weatherInfo.current.description)}
                            <p className="text-xl text-gray-200">{weatherInfo.current.description}</p>
                            <p className="text-3xl text-gray-100">{weatherInfo.current.temperature}°C</p>
                        </div>
                        <div className="flex flex-col items-center mb-4 sm:mb-0">
                            <p className="text-lg text-gray-300"><FiSunrise className="text-2xl inline text-yellow-500" />Sunrise: {weatherInfo.current.sunrise} am</p>
                            <p className="text-lg text-gray-300"><FiSunset className="text-2xl inline text-yellow-500" />Sunset: {weatherInfo.current.sunset} pm</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-lg text-gray-300">Humidity: {weatherInfo.current.humidity}%</p>
                            <p className="text-lg text-gray-300">Wind Speed: {weatherInfo.current.windSpeed} m/s</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full">
                        {weatherInfo.forecast.map((day, index) => (
                            <div key={index} className="flex flex-col items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-md shadow-md">
                                <p className="text-lg font-semibold">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                                {getWeatherIcon(day.description)}
                                <p className="text-md">{day.description}</p>
                                <p className="text-xl">{day.temperature}°C</p>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p className="text-2xl text-white">Loading...</p>
            )}
        </div>
    );
};

export default WeatherData;
