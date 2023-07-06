import { DataFetch } from "./DataFetch.js";
import { LocalStorage } from "./LocalStorage.js";
import { UpdateDOM } from "./UpdateDOM.js";

const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".form");
const addBtn = document.querySelector(".add-btn");
// const addedCities = document.querySelector(".added-cities");


const dataFetch = new DataFetch();
const updateDom = new UpdateDOM();
const localStorage = new LocalStorage();

localStorage.initializeLocalStorage();
const addedCities = localStorage.fetchFromLocalStorage();
let addedCitiesWeather;
dataFetch.getCitiesWeather(addedCities).then((weather)=>{
    addedCitiesWeather = weather;
    updateDom.displayAddedCities(addedCitiesWeather);
})


searchInput.addEventListener("input",async(e)=>{
    const cities = await dataFetch.getLocation(e.target.value);
    updateDom.diplayCitiesList(cities);
})

form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    updateDom.showHiddenElements();
    const {currentWeather,hourlyWeather,dailyWeather} = await dataFetch.getWeather(searchInput.value);
    updateDom.displayCurrentWeather(currentWeather);
    updateDom.displayHourlyWeather(hourlyWeather);
    updateDom.displayDailyWeather(dailyWeather);
})

addBtn.addEventListener("click",async(e)=>{
    const addedCities = localStorage.addToLocalStorage(searchInput.value);
    const citiesWeather = await dataFetch.getCitiesWeather(addedCities);
    updateDom.displayAddedCities(citiesWeather);
})


