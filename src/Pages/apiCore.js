import {API} from "../config";

export const getProducts = () => {
    return fetch(`${API}/products`, {
        method: 'GET'
    }).then(response => {
            return response.json();
        }).catch(err => console.log(err));
};

export const listCategories = () => {
    return fetch(`${API}/category`, {
        method: 'GET'
    }).then(response => {
            return response.json();
        }).catch(err => console.log(err));
};