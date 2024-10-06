document.addEventListener('DOMContentLoaded', function() {

    const places = [
        {name: 'Tohoku, Japan', latitude: 38.253703, longitude: 140.874137},
        {name: 'Deajeon, South Korea', latitude: 36.372443, longitude: 127.360620},
        {name: 'Geneva, Switzerland', latitude: 46.233212, longitude:  6.055322},
        {name: 'Boston, USA', latitude: 42.358624, longitude: -71.094390},
        {name: 'Melbourne, Australia', latitude: -37.808612, longitude: 144.963433},
        {name: 'Funafati, Tuvalu', latitude: -8.564560, longitude: 179.133800}
    ];

    async function fetchWeather() {
        const weatherContainer = document.getElementById('weatherData');
        weatherContainer.innerHTML = ''; 

        for (const place of places) {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current_weather=true`;
                                    //PS for myself:
                                    //Remember to use ` and not ' when using template literals
            try {
                const response = await fetch(url);
                const data = await response.json();

                const weather = data.current_weather;

                const displayBox = document.createElement("div");
                displayBox.className = "weather-box";

                const city = document.createElement("h3");
                city.textContent = place.name;

                const temperature = document.createElement("p");
                temperature.innerHTML = `<strong>Temperature:</strong> ${weather.temperature}°C`;

                const windSpeed = document.createElement("p");
                windSpeed.innerHTML = `<strong>Wind Speed:</strong> ${weather.windspeed} km/h`; 
                
                //Appending all elements to the display box
                displayBox.appendChild(city);
                displayBox.appendChild(temperature);
                displayBox.appendChild(windSpeed);
                weatherContainer.appendChild(displayBox);
            } catch (e) {
                console.error("Error fetching weather data", e);
            }
        }
    }

    fetchWeather();
    setInterval(fetchWeather, 60000); // updates every minute
});
