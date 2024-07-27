// Variables

const inputSearch = document.querySelector('.input');
const searchButton = document.querySelector('.searchButton');
const currentLoc = document.querySelector('.currentLoc');
const h1Tempera = document.querySelector('.Temperature');
const h4Date = document.querySelector('.date');
const Location = document.querySelector('.Location');
const error = document.querySelector('.erro');

// Proximos dias

const day1 = document.getElementById('day1');
const day2 = document.getElementById('day2');
const day3 = document.getElementById('day3');
const day4 = document.getElementById('day4');
const day5 = document.getElementById('day5');

// API key

const apiKey = '0ffa9e86aa6b4dc7620871c4474251aa';



inputSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        cliquesearchButton();
        displayWeatherDetails(data);
    }
});



searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    cliquesearchButton();
    displayWeatherDetails(data);

});

currentLoc.addEventListener('click', (e) => {
    e.preventDefault();
    getLocation();
    displayWeatherDetails(data);
    

});

// Current Date

const date = new Date();

//              O parametro se espera ser um numero inteiro entre 0 e 11
function getNomeMes(mes) {
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return meses[mes];
}

function getNomeDia(dia) {
    const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return dias[dia];
}

function createDate() {
    const dia = getNomeDia(date.getDay()); //obtem o dia da semana em numero, e parte para o array e tranforma em string
    const mes = getNomeMes(date.getMonth()); //obtem o mes em numero, e parte para o array e tranforma em string
    const diaMes = date.getDate(); // obtem o dia do mes em numero inteiro
    const ano = date.getFullYear(); // obtem o ano em numero inteiro

    h4Date.innerHTML = `${dia}, ${diaMes} de ${mes} de ${ano}`;

    function getNextDays() {
        for (let i = 1; i <= 5; i++) {
            const nextDate = new Date(date);
            nextDate.setDate(date.getDate() + i);
            const nextDay = getNomeDia(nextDate.getDay());
            
            document.getElementById(`day${i}`).innerHTML = nextDay;
            
        }
        
    }

    getNextDays();
}


createDate();

// Get Weather

function cliquesearchButton() {
    if (inputSearch.value === '') {
        error.innerHTML = 'Digite uma cidade';
        error.style.color = 'red';
        error.style.fontWeight = 'bolder';
        error.style.fontSize = '15px';
        error.style.justifyContent = 'center';
        error.style.textAlign = 'center';
    } else {
        getWeather(inputSearch.value);
        getForecast(inputSearch.value);
    }

    removeError();
}

function removeError() {
    if (inputSearch.value !== '') {
        error.innerHTML = '';

    } 
    
   return;
}


function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                // Atualizar temperatura e localização
                h1Tempera.innerHTML = `${data.main.temp.toFixed(0)}°C`;
                Location.innerHTML = `${data.name}, ${data.sys.country}`;

                // Remover ícones existentes de condição climática
                const existingIcons = document.querySelectorAll('#h1Tempera img');
                existingIcons.forEach(icon => icon.remove());

                // Analisar as condições climáticas e adicionar ícone apropriado
                const weatherCondition = data.weather[0].main.toLowerCase();

                if (weatherCondition.includes('clear')) {
                    const sunIcon = document.createElement('img');
                    sunIcon.src = 'assets/imagens/sunny.png';
                    sunIcon.alt = 'Sun Icon';
                    sunIcon.style.width = '30px';
                    h1Tempera.appendChild(sunIcon);

                } else if (weatherCondition.includes('clouds')) {
                    const cloudsIcon = document.createElement('img');
                    cloudsIcon.src = 'assets/imagens/clouds.png';
                    cloudsIcon.alt = 'Clouds Icon';
                    cloudsIcon.style.width = '30px';
                    h1Tempera.appendChild(cloudsIcon);

                } else if (weatherCondition.includes('rain')) {
                    const rainIcon = document.createElement('img');
                    rainIcon.src = 'assets/imagens/rainy.png';
                    rainIcon.id = 'rain-icon';
                    rainIcon.alt = 'Rain Icon';
                    rainIcon.style.width = '30px';
                    h1Tempera.appendChild(rainIcon);

                } else if (weatherCondition.includes('snow')) {
                    const snowIcon = document.createElement('img');
                    snowIcon.src = 'assets/imagens/snow.png';
                    snowIcon.id = 'snow-icon';
                    snowIcon.alt = 'Snow Icon';
                    snowIcon.style.width = '30px';
                    h1Tempera.appendChild(snowIcon);
                }
                

            } 
        })
        .catch(() => {
            alert('Cidade não encontrada');
        });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    h1Tempera.innerHTML = `${data.main.temp.toFixed(0)}°C`;
                    Location.innerHTML = `${data.name}, ${data.sys.country}`;

                    // Remover ícones existentes de condição climática
                    const existingIcons = document.querySelectorAll('#h1Tempera img');
                    existingIcons.forEach(icon => icon.remove());

                    // Analisar as condições climáticas e adicionar ícone apropriado
                    const weatherCondition = data.weather[0].main.toLowerCase();

                    if (weatherCondition.includes('clear')) {
                        const sunIcon = document.createElement('img');
                        sunIcon.src = 'assets/imagens/sunny.png';
                        sunIcon.alt = 'Sun Icon';
                        sunIcon.style.width = '30px';
                        h1Tempera.appendChild(sunIcon);

                    } else if (weatherCondition.includes('clouds')) {
                        const cloudsIcon = document.createElement('img');
                        cloudsIcon.src = 'assets/imagens/clouds.png';
                        cloudsIcon.alt = 'Clouds Icon';
                        cloudsIcon.style.width = '30px';
                        h1Tempera.appendChild(cloudsIcon);

                    } else if (weatherCondition.includes('rain')) {
                        const rainIcon = document.createElement('img');
                        rainIcon.src = 'assets/imagens/rainy.png';
                        rainIcon.id = 'rain-icon';
                        rainIcon.alt = 'Rain Icon';
                        rainIcon.style.width = '30px';
                        h1Tempera.appendChild(rainIcon);

                    } else if (weatherCondition.includes('snow')) {
                        const snowIcon = document.createElement('img');
                        snowIcon.src = 'assets/imagens/snow.png';
                        snowIcon.id = 'snow-icon';
                        snowIcon.alt = 'Snow Icon';
                        snowIcon.style.width = '30px';
                        h1Tempera.appendChild(snowIcon);
                    }

                    getForecast(data.name);

                    displayWeatherDetails(data);

                    // Chamar detalhes do clima com coordenadas atuais
                });
        });

    } else {
        alert('Geolocalização não suportada');
    }
}

function getForecast(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "200") {
                const dailyForecasts = {};

                data.list.forEach(forecast => {
                    const date = new Date(forecast.dt * 1000);
                    const day = date.getDate();

                    if (!dailyForecasts[day]) {
                        dailyForecasts[day] = {
                            temps: [],
                            min: Number.MAX_VALUE,
                            max: Number.MIN_VALUE
                        };
                    }

                    dailyForecasts[day].temps.push(forecast.main.temp);
                    dailyForecasts[day].min = Math.min(dailyForecasts[day].min, forecast.main.temp);
                    dailyForecasts[day].max = Math.max(dailyForecasts[day].max, forecast.main.temp);
                });

                const dayElements = [day1, day2, day3, day4, day5];

                dayElements.forEach((dayElem, index) => {
                    const nextDate = new Date(date);
                    nextDate.setDate(date.getDate() + index + 1);
                    const day = nextDate.getDate();
                    const forecast = dailyForecasts[day];

                    if (forecast) {
                        dayElem.innerHTML = `${getNomeDia(nextDate.getDay())} Max: ${forecast.max.toFixed(0)}°C/Min: ${forecast.min.toFixed(0)}°C`;
                    } else {
                        dayElem.innerHTML = `${getNomeDia(nextDate.getDay())} - Sem dados`;
                    }
                });
            } else {
                alert('Previsão não encontrada');
            }
        })
        .catch(() => {
            alert('Erro ao obter previsão');
        });
}

// API key

// Variáveis para exibir detalhes do clima
const humidityElem = document.getElementById('humidity');
const visibilityElem = document.getElementById('visibility');
const pressureElem = document.getElementById('pressure');
const sunriseElem = document.getElementById('sunrise');
const sunsetElem = document.getElementById('sunset');
const airQualityElem = document.getElementById('airQuality');

// Função para converter timestamp em horário legível
function convertTimestampToTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Função para exibir detalhes do clima
function displayWeatherDetails(data) {
    const windSpeed = document.createElement('img');
    windSpeed.src = 'assets/imagens/wind.png';
    windSpeed.style.width = '30px';
    windSpeed.style.margin = '0px 20px';

    const pressure = document.createElement('img');
    pressure.src = 'assets/imagens/plessure.png';
    pressure.style.width = '30px';
    pressure.style.margin = '0px 20px';


    const visibility = document.createElement('img');
    visibility.src = 'assets/imagens/glasses.png';
    visibility.style.width = '30px';
    visibility.style.margin = '0px 20px';


    const sunset = document.createElement('img');
    sunset.src = 'assets/imagens/sunset-.png';
    sunset.style.width = '30px';
    sunset.style.margin = '0px 20px';


    const sunrise = document.createElement('img');
    sunrise.src = 'assets/imagens/sunrise.png';
    sunrise.style.width = '30px';
    sunrise.style.margin = '0px 20px';


    humidityElem.innerHTML = `Umidade: ${data.main.humidity}%`;
    humidityElem.appendChild(windSpeed);
    visibilityElem.innerHTML = `Visibilidade: ${data.visibility / 1000} km`;
    visibilityElem.appendChild(visibility);
    pressureElem.innerHTML = `Pressão: ${data.main.pressure} hPa`;
    pressureElem.appendChild(pressure);
    sunriseElem.innerHTML = `Nascer do sol: ${convertTimestampToTime(data.sys.sunrise)}`;
    sunriseElem.appendChild(sunrise);
    sunsetElem.innerHTML = `Pôr do sol: ${convertTimestampToTime(data.sys.sunset)}`;
    sunsetElem.appendChild(sunset);

    // Adicionar chamada para a API de qualidade do ar
    fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}`)
        .then(response => response.json())
        .then(airData => {
            const boa = document.createElement('img');
            boa.src = 'assets/imagens/check.png';
            boa.style.width = '30px';
            boa.style.margin = '0px 20px';
            const moderada = document.createElement('img');
            moderada.src = 'assets/imagens/delete.png';
            moderada.style.width = '30px';
            moderada.style.margin = '0px 20px';
            const ruim = document.createElement('img');
            ruim.src = 'assets/imagens/red.png';
            ruim.style.width = '30px';
            ruim.style.margin = '0px 20px';
            const aqi = airData.list[0].main.aqi;
            const airQuality = [boa, moderada, ruim];
            airQualityElem.innerHTML = 'Qualidade do Ar ';
            airQualityElem.appendChild(airQuality[aqi - 1]);
        })
        .catch(() => {
            airQualityElem.innerHTML = 'Qualidade do Ar: Não disponível';
            airQualityElem.style.margin = '0px 20px';
        });
}


// Atualizar a função getWeather para chamar displayWeatherDetails
function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                // Atualizar temperatura e localização
                h1Tempera.innerHTML = `${data.main.temp.toFixed(0)}°C`;
                Location.innerHTML = `${data.name}, ${data.sys.country}`;

                // Remover ícones existentes de condição climática
                const existingIcons = document.querySelectorAll('#h1Tempera img');
                existingIcons.forEach(icon => icon.remove());

                // Analisar as condições climáticas e adicionar ícone apropriado
                const weatherCondition = data.weather[0].main.toLowerCase();

                if (weatherCondition.includes('clear')) {
                    const sunIcon = document.createElement('img');
                    sunIcon.src = 'assets/imagens/sunny.png';
                    sunIcon.alt = 'Sun Icon';
                    sunIcon.style.width = '30px';
                    h1Tempera.appendChild(sunIcon);

                } else if (weatherCondition.includes('clouds')) {
                    const cloudsIcon = document.createElement('img');
                    cloudsIcon.src = 'assets/imagens/clouds.png';
                    cloudsIcon.alt = 'Clouds Icon';
                    cloudsIcon.style.width = '30px';
                    h1Tempera.appendChild(cloudsIcon);

                } else if (weatherCondition.includes('rain')) {
                    const rainIcon = document.createElement('img');
                    rainIcon.src = 'assets/imagens/rainy.png';
                    rainIcon.id = 'rain-icon';
                    rainIcon.alt = 'Rain Icon';
                    rainIcon.style.width = '30px';
                    h1Tempera.appendChild(rainIcon);

                } else if (weatherCondition.includes('snow')) {
                    const snowIcon = document.createElement('img');
                    snowIcon.src = 'assets/imagens/snow.png';
                    snowIcon.id = 'snow-icon';
                    snowIcon.alt = 'Snow Icon';
                    snowIcon.style.width = '30px';
                    h1Tempera.appendChild(snowIcon);
                }

                // Chamar função para exibir detalhes do clima
                displayWeatherDetails(data);

            } 
        })
        .catch(() => {
            alert('Cidade não encontrada');
        });
}



getLocation();
