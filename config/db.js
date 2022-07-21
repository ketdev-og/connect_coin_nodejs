const MySql= {
  HOST: process.env.MYSQL_HOST,
  PORT: process.env.MYSQL_PORT,
  USERNAME: process.env.MYSQL_USERNAME,
  PASSWORD: process.env.MYSQL_PASSWORD,
  DB_NAME: process.env.MYSQL_DATABASE,
  DIALECT: 'mysql',
  POOL: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    }
};

module.exports = {MySql}