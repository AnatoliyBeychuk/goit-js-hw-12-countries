import CountriesService from "./countries.service";
import CountriesRenderer from './countries.renderer';
import debounce from 'lodash.debounce';

const searchInput = document.querySelector('.js-search-input');

searchInput.addEventListener('input', debounce((event) =>
{
    //Очищаю список
    CountriesRenderer.clearCountriesList();
    CountriesRenderer.clearCountryCard();
    if(event.target.value.trim() === '') return;
    //Сервис для получения данных с сервера
    CountriesService.fetchCountries(event.target.value)
    .then(countries => CountriesRenderer.makeCountriesList(countries))
    .catch(error => console.log(error));
}, 500));