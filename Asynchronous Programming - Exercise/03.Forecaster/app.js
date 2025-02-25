async function attachEvents() {
    const getWeatherButtonElement = document.getElementById('submit');
    const locationInputElement = document.getElementById('location');
    const forecastDivElement = document.getElementById('forecast');
    const currentWeatherConditionsElement = document.getElementById('current');
    const upcomingWeatherConditionsElement = document.getElementById('upcoming');

    const response = await fetch('http://localhost:3030/jsonstore/forecaster/locations');
    const data = await response.json();
    let cityCode = '';

    const forecastsDivElement = document.createElement('div');
        forecastsDivElement.classList.add('forecasts');
        forecastsDivElement.innerHTML = '';

        const conditionSymbolSpanElement = document.createElement('span');
        conditionSymbolSpanElement.classList.add('condition');
        conditionSymbolSpanElement.classList.add('symbol');

        const conditionSpanElement = document.createElement('span');
        conditionSpanElement.classList.add('condition');

        const forecastDataSpanElement1 = document.createElement('span');
        forecastDataSpanElement1.classList.add('forecast-data');

        const forecastDataSpanElement2 = document.createElement('span');
        forecastDataSpanElement2.classList.add('forecast-data');

        const forecastDataSpanElement3 = document.createElement('span');
        forecastDataSpanElement3.classList.add('forecast-data');

        const divForecastInfoElement = document.createElement('div');
        divForecastInfoElement.classList.add('forecast-info');

        

    getWeatherButtonElement.addEventListener('click', async () => {

        
        Object.entries(data).forEach(([index, city]) => {
            if(locationInputElement.value === city.name){
                cityCode = city.code;    
            }
        });

        const responseTodayForecast = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${cityCode}`);
        const dataTodayForecast = await responseTodayForecast.json();
        const { name, forecast } = dataTodayForecast; 


        const responseThreeDayForecast = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${cityCode}`);
        const dataThreeDayForecast = await responseThreeDayForecast.json();
        const threeDayforecast = dataThreeDayForecast.forecast; 

        if(forecast.condition === 'Rain'){
            conditionSymbolSpanElement.textContent = '☂';
        } else if (forecast.condition === 'Sunny'){
            conditionSymbolSpanElement.textContent = '☀';
        } else if (forecast.condition === 'Partly sunny'){
            conditionSymbolSpanElement.textContent = '⛅';
        } else if (forecast.condition === 'Overcast'){
            conditionSymbolSpanElement.textContent = '☁';
        } 
        
        
        forecastDataSpanElement1.textContent = name;
        forecastDataSpanElement2.textContent = `${forecast.low}°/${forecast.high}°` ;
        forecastDataSpanElement3.textContent = forecast.condition;

        divForecastInfoElement.innerHTML = '';


        threeDayforecast.forEach(forecastThreeDays => {

            const upcomingSpanElement = document.createElement('span');
            upcomingSpanElement.classList.add('upcoming');

            const upcomingSymbolElement = document.createElement('span');
            upcomingSymbolElement.classList.add('symbol');
            
            const forecastDataSpanElement4 = document.createElement('span');
            forecastDataSpanElement4.classList.add('forecast-data');

            const forecastDataSpanElement5 = document.createElement('span');
            forecastDataSpanElement5.classList.add('forecast-data');


            if(forecastThreeDays.condition === 'Rain'){
                upcomingSymbolElement.textContent = '☂';
            } else if (forecastThreeDays.condition === 'Sunny'){
                upcomingSymbolElement.textContent = '☀';
            } else if (forecastThreeDays.condition === 'Partly sunny'){
                upcomingSymbolElement.textContent = '⛅';
            } else if (forecastThreeDays.condition === 'Overcast'){
                upcomingSymbolElement.textContent = '☁';
            } 

            forecastDataSpanElement4.textContent = `${forecastThreeDays.low}°/${forecastThreeDays.high}°` ;
            forecastDataSpanElement5.textContent = forecastThreeDays.condition;

            upcomingSpanElement.appendChild(upcomingSymbolElement);
            upcomingSpanElement.appendChild(forecastDataSpanElement4);
            upcomingSpanElement.appendChild(forecastDataSpanElement5);

            
            divForecastInfoElement.appendChild(upcomingSpanElement);
            upcomingWeatherConditionsElement.appendChild(divForecastInfoElement);
      
        })

        
        conditionSpanElement.appendChild(forecastDataSpanElement1);
        conditionSpanElement.appendChild(forecastDataSpanElement2);
        conditionSpanElement.appendChild(forecastDataSpanElement3);

        forecastsDivElement.appendChild(conditionSymbolSpanElement);
        forecastsDivElement.appendChild(conditionSpanElement);

        currentWeatherConditionsElement.appendChild(forecastsDivElement);
        forecastDivElement.style.display = "block";

    })
  

}

attachEvents();