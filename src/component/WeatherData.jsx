import { useState, useEffect } from 'react';
import axios from 'axios';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

const WeatherData = () => {
    const [weatherInfo, setWeatherInfo] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/jhapa?unitGroup=metric&key=U46X9V9CJGBXHWEM6AUG9G3NJ&contentType=json');
                const data = response.data;
                console.log(data);
                const weatherInfo = {
                    city: data.resolvedAddress,
                    current: {
                        description: data.currentConditions.conditions,
                        temperature: data.currentConditions.temp,
                        humidity: data.currentConditions.humidity,
                        windSpeed: data.currentConditions.windspeed,
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
    }, []);

    const getWeatherIcon = (description) => {
        if (description.includes('Sunny')) return <WiDaySunny className="text-4xl" />;
        if (description.includes('Cloudy')) return <WiCloudy className="text-4xl" />;
        if (description.includes('Rain')) return <WiRain className="text-4xl" />;
        if (description.includes('Snow')) return <WiSnow className="text-4xl" />;
        if (description.includes('Thunderstorm')) return <WiThunderstorm className="text-4xl" />;
        return <WiDaySunny className="text-4xl" />; // default icon
    };

    return (
        <div className="flex flex-col items-center mt-8 p-4 border border-gray-300 rounded-lg shadow-lg max-w-md mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            {weatherInfo ? (
                <>
                    <h2 className="text-3xl font-bold mb-4">{weatherInfo.city}</h2>
                    <div className="flex flex-col items-center mb-4">
                        {getWeatherIcon(weatherInfo.current.description)}
                        <p className="text-xl">{weatherInfo.current.description}</p>
                        <p className="text-2xl">{weatherInfo.current.temperature}°C</p>
                        <p className="text-lg">Humidity: {weatherInfo.current.humidity}%</p>
                        <p className="text-lg">Wind Speed: {weatherInfo.current.windSpeed} m/s</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {weatherInfo.forecast.map((day, index) => (
                            <div key={index} className="flex flex-col items-center bg-white text-gray-800 p-2 rounded-md">
                                <p className="text-lg font-semibold">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                                {getWeatherIcon(day.description)}
                                <p className="text-md">{day.description}</p>
                                <p>{day.temperature}°C</p>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default WeatherData;
