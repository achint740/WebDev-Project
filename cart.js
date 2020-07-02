const Sequelize = require('sequelize');

const cart_db = new Sequelize({
    dialect : 'sqlite',
    storage : __dirname + '/cart.db',
});

const Cart = cart_db.define('cart',{
    cart_id : {
        type : Sequelize.INTEGER,
        allowNull : false,
    },
    order : {
        type : Sequelize.JSON,
    }
});

cart_db.sync().then(()=>{
    console.log('Cart Database Ready!!');
});

module.exports = {
    cart_db,
    Cart
}