import axios from 'axios';
const getProducts = (callback, limit, callback2) => {
    axios.get("http://localhost:3001/products/limit/" + limit).then(response => {
        console.log(response.data)
        if(response.data === " "){
            callback2(false)
            limit = 0;
            return;
        }
        callback(response.data);
    })
}

export {getProducts} ;