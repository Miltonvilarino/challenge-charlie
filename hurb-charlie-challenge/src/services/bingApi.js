<<<<<<< Updated upstream
=======
import axios from 'axios';

const bingApi = axios.create({
    baseURL: 'https://www.bing.com',
    corsAnyWhere: 'https://cors-anywhere.herokuapp.com/',
    headers: { 'X-Requested-With': 'Charllie Chalenge' }
});

export default bingApi;
>>>>>>> Stashed changes
