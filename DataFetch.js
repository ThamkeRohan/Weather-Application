export class DataFetch{
    apiKey = "8759d4de57714e8386d60557230105";
    async getLocation(input){
        if(input == ""){
             return [];
        }
        try {
            const url = `https://api.weatherapi.com/v1/search.json?key=${this.apiKey}&q=${input}`;
            const response = await fetch(url);
            const data = await response.json();
            const cities = data.map((city)=>{
                return city.name+","+city.region;
            })
            return cities;
        } catch (error) {
            console.log("Some Error Occured: "+error.message);
        }
    }

    async getWeather(city){
        try {
            const url = `https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${city}&days=3&aqi=no&alerts=no`;
            const response = await fetch(url);
            const data = await response.json();
            
            const currentWeather = {};
            currentWeather.city = data.location.name;
            currentWeather.temperature = data.current.temp_c;
            currentWeather.conditionText = data.current.condition.text;
            currentWeather.condtionIcon = data.current.condition.icon;
            currentWeather.windSpeed = data.current.wind_kph;
            currentWeather.humidity = data.current.humidity;
            currentWeather.time = data.location.localtime;

            let hourlyWeather = [];
            const currentHour = new Date(currentWeather.time).getHours();
            for(let i=0; i<2; i++){
                for(let j=0; j<24; j++){
                    let hour = parseInt(data.forecast.forecastday[i].hour[j].time.split(" ")[1].split(":")[0]);
                    let time;
                    if(hour == 0){
                        time = 12 + " " + "AM";
                    }
                    else if(hour == 12){
                        time = 12 + " " + "PM"; 
                    }
                    else if(hour > 12){
                        time = hour-12 + " " + "PM";
                    }
                    else{
                        time = hour + " " + "AM";
                    }
                    hourlyWeather.push({
                      time: time,
                      icon: data.forecast.forecastday[i].hour[j].condition.icon,
                      temperature: data.forecast.forecastday[i].hour[j].temp_c,
                    });
                }
            }
            hourlyWeather = hourlyWeather.splice(currentHour,24);

            const dailyWeather = [];
            let count =0;
            for(let i=1; i<3; i++){
                dailyWeather.push({
                    date : data.forecast.forecastday[i].date,
                    temperature : data.forecast.forecastday[i].day.avgtemp_c,
                    icon : data.forecast.forecastday[i].day.condition.icon
                })
            }
            return {currentWeather,hourlyWeather,dailyWeather};

        } catch (error) {
            console.log("Some Error Occured : " + error );
        }
    }

    async getCitiesWeather(cities){
        const citiesWeather = [];
        for(let city of cities){
            let weather = {};
            let url = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${city}&aqi=no`;
            const response = await fetch(url);
            const data = await response.json();
            weather.city = data.location.name;
            weather.state = data.location.region;
            weather.temperature = data.current.temp_c;
            weather.icon = data.current.condition.icon;
            citiesWeather.push(weather);
        }
        return citiesWeather;
    }
}