const bookshelf = require('./dbconfig');

const Products = bookshelf.model("Products", {
    tableName : 'products',

    variants : function(){
        return this.hasMany('Variants')      
    }
})

module.exports = Products;