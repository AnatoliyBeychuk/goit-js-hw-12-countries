import countryCardTpl from '../template/country-card';
import searchCountriesListTpl from '../template/search-countries-list';
import { error, defaultModules, defaults } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import * as PNotifyDesktop from '@pnotify/desktop';
 
defaults.delay = 2000;
defaults.closer = false;
defaults.sticker = false;
defaultModules.set(PNotifyDesktop, {});


/**
 * Класс который рендерит разметку на основе полученных
 * данных о стране или странах
 */

class CountriesRenderer
{
    constructor()
    {
        //список под инпутом
        this.countriesList = document.querySelector('.js-countries-list');
        //карточка страны
        this.countryCard = document.querySelector('.js-country-card-container');
    }

    makeCountriesList(data)
    {
        this.clearCountriesList();
        this.clearCountryCard();
        /**
         * Если бекенд вернул массив с одной страной, в интерфейсе 
         * рендерится разметка с данными о стране: название, столица, 
         * население, языки и флаг.
         */
        if(data.length === 1)
        {
            this.countryCard.insertAdjacentHTML('beforeend', countryCardTpl(data));
        }
        /**
         * Если бекенд вернул от 2-х до 10-х стран, под инпутом 
         * отображается список имен найденных стран.
         */
        else if(data.length < 10)
        {
            this.countriesList.insertAdjacentHTML('beforeend', searchCountriesListTpl(data));
        }
        else
        {
            /**
             * Если бекенд вернул больше чем 10 стран подошедших 
             * под критерий введенный пользователем, в интерфейсе 
             * отображается нотификация о том, что необходимо сделать 
             * запрос более специфичным.
             */
            error({
                text: 'Too many matches found. Please enter a more specific query!',
              });
        }
    }

    /**
     * Очищает список под инпутом
     */
    clearCountriesList()
    {
        this.countriesList.innerHTML = '';
    }

    /**
     * очищает карточку страны
     */
    clearCountryCard()
    {
        this.countryCard.innerHTML = '';
    }
}

export default new CountriesRenderer();