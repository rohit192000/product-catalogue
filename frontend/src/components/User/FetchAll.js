import axios from 'axios';
const getProducts = (callback) => {
    axios.get("http://localhost:3001/products").then(response => {
        callback(response.data);
    })
}

export {getProducts} ;