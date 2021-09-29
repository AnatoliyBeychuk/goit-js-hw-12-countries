const BASE_URL = 'https://restcountries.com/v2/name/';

/**
 * Сделал класс, чтобы в дальнейшем было удобнее 
 * масштабировать и добавлять функционал.
 * Пока что сервис умеет получать строку (searchQuery),
 * делать запрос на сервер и возвращать полученные данные
 */
class CountriesService
{
    fetchCountries(searchQuery)
    {
        return fetch(`${BASE_URL}${searchQuery}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => `Ошибка при загрузке данных: ${error}`);
    }
}

export default new CountriesService();