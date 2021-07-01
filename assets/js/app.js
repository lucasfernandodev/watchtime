// Projeto weather

const form = document.querySelector('.form');
const main = document.querySelector('main')
const sectionWeather = document.querySelector('.section-weather');
const weather = document.querySelector('.weather-wrapper');
const _close = weather.querySelector('.weather-wrapper__close')
const weather__cityName = weather.querySelector('.weather-wrapper__city h3')
const weather__temperatura = weather.querySelector('.weather-wrapper__temperatura h2')
const weather__min = weather.querySelector('.weather-wrapper__minmax .min span')
const weather__max = weather.querySelector('.weather-wrapper__minmax .max span')
const weather__humidity = weather.querySelector('.weather-wrapper__umidade .value');
const weather__data = weather.querySelector('.weather-wrapper__data .value');
const weather__wind = weather.querySelector('.weather-wrapper__wind .value');

const weather__weekday = weather.querySelectorAll('.weather-wrapper__dia');


function closeSectionResultWeather(){
    sectionWeather.style.display = 'none'
    if(!main.classList.contains('loading')){
        main.classList.add('loading')
    }
}

async function searchWeather(event) {
    event.preventDefault();
    if(!main.classList.contains('loading')){
        main.classList.add('loading');
    }

    sectionWeather.style.display = 'flex';

    let city = form.querySelector('input').value;

    city = city.replace(' ', '_')


    const result = await (await fetch(`https://api.hgbrasil.com/weather?format=json-cors&key=15486a1a&city_name=${city}`)).json();

    if(result.error === true){
        closeSectionResultWeather()
        alert('Erro ao fazer busca')
        return ;
    }

    const response =  result.results;


    if (result !== 'undefined' || result.length > 0) {

        main.classList.remove('loading');

        weather__cityName.innerHTML = response.city;
        weather__temperatura.innerHTML = `${response.temp}ºC ${response.description}`;
        weather__humidity.innerHTML = `${response.humidity}%`;
        weather__data.innerHTML = `${response.date}`
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

    }
    else{
        alert('erro ao fazer busca')
    }

}



_close.addEventListener('click', closeSectionResultWeather);
form.addEventListener('submit', event => searchWeather(event));