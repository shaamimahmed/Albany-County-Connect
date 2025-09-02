
import React, { useState, useEffect } from 'react';
import { WeatherData, ForecastApiResponse } from '../types';
import { SunIcon, CloudIcon, ZapIcon } from './icons/WeatherIcons';

const RealTimeInfoBar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      const lat = 42.6526;
      const lon = -73.7562;
      const apiKey = 'db1f5ce51f4ebeb26b4258a3c2ebf8ab';
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
      
      try {
        setWeatherError(null);
        const response = await fetch(url);
        const data: ForecastApiResponse = await response.json();
        
        if (!response.ok) {
          console.error("OpenWeatherMap API Error:", data);
          throw new Error((data as any).message || 'Failed to fetch weather data');
        }

        const current = {
          temp: data.list[0].main.temp,
          weather: data.list[0].weather,
        };

        const dailyForecasts: WeatherData['daily'] = [];
        const processedDays = new Set<string>();
        const today = new Date().toISOString().split('T')[0];

        for (const item of data.list) {
          const itemDate = new Date(item.dt * 1000).toISOString().split('T')[0];
          
          if (itemDate !== today && !processedDays.has(itemDate) && item.dt_txt.includes("12:00:00")) {
            dailyForecasts.push({
              dt: item.dt,
              temp: { day: item.main.temp },
              weather: item.weather,
            });
            processedDays.add(itemDate);
          }
          
          if (dailyForecasts.length >= 3) break;
        }

        const transformedWeather: WeatherData = { current, daily: dailyForecasts };
        setWeather(transformedWeather);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        setWeatherError("Weather unavailable");
      }
    };
    fetchWeather();
  }, []);

  const getWeatherIcon = (condition: string | undefined, className: string) => {
    if (!condition) return <SunIcon className={className} />;
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) return <SunIcon className={`${className} text-yellow-300`} />;
    if (lowerCondition.includes('cloud')) return <CloudIcon className={`${className} text-gray-300`} />;
    if (lowerCondition.includes('rain') || lowerCondition.includes('storm') || lowerCondition.includes('drizzle')) return <ZapIcon className={`${className} text-blue-300`} />;
    return <SunIcon className={className} />;
  };

  const timeZone = 'America/New_York';
  const formattedDate = time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone });
  const formattedTime = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short', timeZone });

  return (
    <div className="info-bar-bg text-white shadow-inner overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 flex justify-between items-center">
            <div className="text-left">
                <p className="font-bold text-lg md:text-xl">{formattedTime}</p>
                <p className="text-xs md:text-sm text-gray-300">{formattedDate}</p>
            </div>
            <div>
                {weather ? (
                     <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 border-r border-white/30 pr-4">
                            {getWeatherIcon(weather.current.weather[0]?.main, "w-8 h-8")}
                            <div>
                                <p className="font-semibold text-lg">{Math.round(weather.current.temp)}°F</p>
                                <p className="text-sm text-gray-300 -mt-1">{weather.current.weather[0]?.main}</p>
                            </div>
                        </div>
                        <div className="hidden sm:flex space-x-3">
                        {weather.daily.slice(0, 3).map(day => (
                            <div key={day.dt} className="flex flex-col items-center">
                            <p className="text-sm font-semibold">{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                            {getWeatherIcon(day.weather[0]?.main, "w-6 h-6 my-1")}
                            <p className="text-sm font-bold">{Math.round(day.temp.day)}°</p>
                            </div>
                        ))}
                        </div>
                    </div>
                ) : (
                    <div className="px-4">
                        <p className="text-sm">{weatherError || 'Loading weather...'}</p>
                    </div>
                )}
            </div>
        </div>
         <style>{`
            .info-bar-bg {
              background-color: #333333;
            }
        `}</style>
    </div>
  );
};

export default RealTimeInfoBar;
