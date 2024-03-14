const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click',() =>{
	const APIKey = '26e95a14f224109a61d1f6e9a29303d6';
	const city = document.getElementById('search-btn').value;
	if(city==''){
		return ;
	}

	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
	
	if(json.cod == '404'){
		container.style.height = '450px';
		weatherBox.classList.remove('active');
		weatherDetails.classList.remove('active');
		error404.classList.add('active');
		return;
	}

	container.style.height = '560px';
	weatherBox.classList.add('active');
	weatherDetails.classList.add('active');
	error404.classList.remove('active');

	const image = document.querySelector('.weather-box img');
	const temperature = document.querySelector('.weather-box .temperature');
	const description = document.querySelector('.weather-box .description');
	const humidity = document.querySelector('.weather-details .humidity span');
	const wind = document.querySelector('.weather-details .wind span');

		switch(json.weather[0].main){
			case 'Clear':
				image.src = 'img/clear-sky.png';
				break;
			case 'Rain':
				image.src = 'img/rain.png';
				break;
			case 'Snow':
				image.src = 'img/snow.png';
				break;
			case 'Clouds':
				image.src = 'img/clouds.png';
				break; 
			case 'Mist':
				image.src = 'img/fog.png';
				break;				 
			case 'Haze':
				image.src = 'img/fog.png';
				break;	 
			default:
				image.src = 'img/clear-sky.png';
		}
		temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
		description.innerHTML = `${json.weather[0].description}`;
		humidity.innerHTML = `${json.main.humidity}%`;
		wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
	});

});
