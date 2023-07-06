export class LocalStorage{
    addToLocalStorage(input){
        let cities = localStorage.getItem("CITIES-WEATHER");
        cities = JSON.parse(cities);
        if (cities.includes(input)) {
          return;
        }
        localStorage.setItem("CITIES-WEATHER", JSON.stringify([...cities, input]));
        return JSON.parse(localStorage.getItem("CITIES-WEATHER"));
    }
    fetchFromLocalStorage(){
        let cities = localStorage.getItem("CITIES-WEATHER");
        cities = JSON.parse(cities);
        return cities;
    }
    initializeLocalStorage(){
        let cities = localStorage.getItem("CITIES-WEATHER");
        if(cities == null){
            localStorage.setItem(
              "CITIES-WEATHER",
              JSON.stringify([])
            );
        }
    }
}