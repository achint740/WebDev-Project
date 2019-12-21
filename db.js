const Sequelize = require('sequelize');

const db = new Sequelize({
    dialect : 'sqlite',
    storage : __dirname + '/datauser.db',
});

const Users = db.define('users',{
    username : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    },
    contact : Sequelize.INTEGER,
    email : Sequelize.STRING,
});

db.sync().then(()=>{
    console.log('Database Ready!!');
});

module.exports = {
    db,
    Users
}