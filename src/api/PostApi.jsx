import axios from 'axios'

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com' // actual api whaere data is present or get data
});


//get method
export const getPost = () => {
    return api.get('/posts');
}

//delete method

export const deletePost = (id) => {
    return api.delete(`/posts/${id}`);
}


export const addPost = (post) => {
    return api.post('/posts', post);   // jab bhi aap post method use karte ho tb aapko  "route" comma "payload" dena padta hai

}