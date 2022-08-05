const {MySql}  = require('../../../config/db')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(MySql.DB_NAME,MySql.USERNAME,MySql.PASSWORD,{
    host:MySql.HOST,
    dialect:MySql.DIALECT,
    operationsAliases: false,
    pool: { 
        max: MySql.POOL.max,
        min: MySql.POOL.min,
        acquire: MySql.POOL.acquire,
        idle: MySql.POOL.idle
        }
});

sequelize.authenticate().then(()=>{
    console.log("mysql connected")
}).catch((err)=>{
    console.log(err, "error connecting to my sql");
})

const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.User = require('../../../model/Users')(sequelize,Sequelize.DataTypes);
db.models.Deposit = require('../../../model/Deposit')(sequelize,Sequelize.DataTypes);
db.models.Withdraw = require('../../../model/Withdraw')(sequelize,Sequelize.DataTypes);

db.models.User.hasMany(db.models.Deposit,{ as: "deposits" });
db.models.Deposit.belongsTo(db.models.User,{
    as: "user",
})

db.models.User.hasMany(db.models.Withdraw,{ as: "withdraws" });
db.models.Withdraw.belongsTo(db.models.User,{
    as: "user",
})
module.exports = db