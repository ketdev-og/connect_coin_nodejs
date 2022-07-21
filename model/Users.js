module.exports = (sequalize, DataTypes)=>{
    const User = sequalize.define('user',{
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        first_name:DataTypes.STRING,
        last_name:DataTypes.STRING,
        email:DataTypes.STRING,
        country:DataTypes.STRING,
        state:DataTypes.STRING,
        city:DataTypes.STRING,
        phone:DataTypes.STRING,
        account:DataTypes.STRING,
        password:DataTypes.STRING
    },{
        freezeTablename:true,
    });

    return  User;
}