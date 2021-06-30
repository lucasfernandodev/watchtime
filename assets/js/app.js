// Projeto weather

const form = document.querySelector('.form');

const weather = document.querySelector('.weather-wrapper');
const weather__cityName = weather.querySelector('.weather-wrapper__city h3')
const weather__temperatura = weather.querySelector('.weather-wrapper__temperatura h2')
const weather__min = weather.querySelector('.weather-wrapper__minmax .min span')
const weather__max = weather.querySelector('.weather-wrapper__minmax .max span')
const weather__humidity = weather.querySelector('.weather-wrapper__umidade .value');
const weather__sensation = weather.querySelector('.weather-wrapper__sensacao .value');
const weather__wind = weather.querySelector('.weather-wrapper__wind .value');

const weather__weekday = weather.querySelectorAll('.weather-wrapper__dia');

async function searchWeather(event) {
    event.preventDefault();

    let city = form.querySelector('input').value;

    city = city.replace(' ', '_')

    const result = await (await fetch(`https://api.hgbrasil.com/weather?format=json-cors&key=e35e4608&city_name=${city}`)).json();
    const response = result.results;

    console.log(response)
    if (response) {

        weather__cityName.innerHTML = response.city;
        weather__temperatura.innerHTML = `${response.temp}ºC ${response.description}`;
        weather__humidity.innerHTML = `${response.humidity}%`;
        weather__sensation.innerHTML = `${response.date}`
        weather__wind.innerHTML = `${response.wind_speedy}`

        const { forecast } = response;

        weather__min.innerHTML = `${forecast[0].min}º`;
        weather__max.innerHTML = `${forecast[0].max}º`;





        for (let i = 0; i < weather__weekday.length; i++) {

            const countWeekDay = i + 1; // Como o primeiro elemento do array retornado da api é o próprio dia, ele soma +1 pra mostrar o proximo dia 
            const weekDayHTML = weather__weekday[i];
            const weekDay = forecast[countWeekDay];

            const dayName = weekDayHTML.querySelector('.dayName');
            const min = weekDayHTML.querySelector('.min');
            const max = weekDayHTML.querySelector('.max');

            dayName.innerHTML = `${weekDay.weekday}`;
            min.innerHTML = `${weekDay.min}º`;
            max.innerHTML = `${weekDay.max}º`;
          
        }

        console.log(forecast)
    }

}

form.addEventListener('submit', event => searchWeather(event));