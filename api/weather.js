export default async function handler(req, res) {
    const city = req.query.city;
    const apiKey = process.env.WEATHER_API_KEY;

    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);

    const weatherData = await weatherResponse.json();
    const forecastData = await forecastResponse.json();

    res.status(200).json({ weather: weatherData, forecast: forecastData });
}
