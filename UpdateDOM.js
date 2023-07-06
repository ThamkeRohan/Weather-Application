export class UpdateDOM{
    diplayCitiesList(cities){
      const citiesList = document.querySelector(".cities-list");
      const searchInput = document.querySelector(".search-input");
      if (cities.length == 0) {
        citiesList.style.visibility = "hidden";
        return;
      }
      citiesList.innerHTML = "";
      citiesList.style.visibility = "visible";
      cities.forEach((city) => {
        const div = document.createElement("div");
        div.setAttribute("class", "city");
        div.innerText = city;
        div.addEventListener("click", (e) => {
          searchInput.value = e.target.innerText;
          citiesList.innerHTML = "";
          citiesList.style.visibility = "hidden";
        });
        citiesList.append(div);
      });
    }

    displayCurrentWeather(currentWeather){
      const city = document.querySelector(".current-weather .city");
      const dateAndTime = document.querySelector(".current-weather .date-and-time");
      const temperature = document.querySelector(".current-weather .temperature .number");
      const conditionText = document.querySelector(".current-weather .weather-condition-text");
      const condtionIcon = document.querySelector(".current-weather .weather-condition-icon");
      const windSpeed = document.querySelector(".current-weather .wind-speed .number");
      const humidity = document.querySelector(".current-weather .humidity .number")

      city.innerHTML = currentWeather.city;
      temperature.innerHTML = currentWeather.temperature;
      conditionText.innerHTML = currentWeather.conditionText;
      condtionIcon.setAttribute("src",currentWeather.condtionIcon);
      windSpeed.innerHTML = currentWeather.windSpeed;
      humidity.innerHTML = currentWeather.humidity;
      
      const currentDate = new Date(currentWeather.time);
      const options = {
        weekday: "short",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      const formattedDate = currentDate.toLocaleString("en-US", options);
      dateAndTime.innerHTML = formattedDate;
      
    }

    displayHourlyWeather(hourlyWeather){
      const hourlyWeatherElem = document.querySelector(".hourly-weather");
      let hourlyWeatherString = "";
      hourlyWeather.forEach((hourWeather)=>{
        hourlyWeatherString += `
        <div class="hour">
            <div class="time">${hourWeather.time}</div>
            <img src=${hourWeather.icon} alt="" class="icon">
            <div class="temperature">
                <span class="number">${hourWeather.temperature}</span>
                <span class="unit">&deg;</span>
            </div>
        </div>`
      })
      hourlyWeatherElem.innerHTML = hourlyWeatherString;
    }

    displayDailyWeather(dailyWeather){
      const dailyWeatherElem = document.querySelector(".daily-weather");
      let dailyWeatherString = "";
      dailyWeather.forEach((day)=>{
        dailyWeatherString += `
        <div class="day">
            <div class="date">${new Date(day.date).toLocaleString("en-US",{weekday:"long"})}</div>
            <img src=${day.icon} alt="" class="icon">
            <div class="temperature">
                <span class="number">${day.temperature}</span>
                <span class="unit">&deg;</span>
            </div>
        </div>`;
      })
      dailyWeatherElem.innerHTML = dailyWeatherString;
    }

    showHiddenElements(){
      const currentWeatherElem = document.querySelector(".current-weather");
      const subtitleElems = document.querySelectorAll(".subtitle");
      const hourlyWeatherElem = document.querySelector(".hourly-weather");
      const dailyWeatherElem = document.querySelector(".daily-weather");

      currentWeatherElem.style.display = "flex";
      subtitleElems[0].style.display = "block";
      subtitleElems[1].style.display = "block";
      hourlyWeatherElem.style.display = "block";
      dailyWeatherElem.style.display = "block";
    }

    displayAddedCities(cities){
      const addedCities = document.querySelector(".added-cities");
      let addedCitiesString = "";
      cities.forEach((city)=>{
        addedCitiesString += `
        <div class="city-weather">
            <div>
                <div class="city">${city.city}</div>
                <div class="state">${city.state}</div>
            </div>
            
            <div><img src=${city.icon} alt="" class="icon"></div>
            <span class="temperature">${city.temperature}&deg;</span>
            
        </div>`;
      })
      addedCities.innerHTML = addedCitiesString;
    }
}