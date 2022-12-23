const bookshelf = require('./dbconfig');
const Variants = require('./variants')
const Products = bookshelf.model("Products", {
    tableName : 'products',

    variants : function(){
        return this.hasMany(Variants, 'products_id', 'id')      
    }
})

module.exports = Products;