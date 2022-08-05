module.exports = (sequalize, DataTypes)=>{
    const Deposit = sequalize.define('deposit',{
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        account:DataTypes.INTEGER,
        amount:DataTypes.STRING, 
    },{
        freezeTablename:true,
    });

    return  Deposit;
}