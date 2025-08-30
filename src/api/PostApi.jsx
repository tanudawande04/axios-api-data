import axios from 'axios'

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com' // actual api whaere data is present or get data
});


//get method
export const getPost = () => {
    return api.get('/posts');
}