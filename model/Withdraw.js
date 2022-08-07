module.exports = (sequalize, DataTypes)=>{
    const Withdraw = sequalize.define('withdraw',{
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        account:DataTypes.INTEGER,
        amount:DataTypes.INTEGER, 
        paymentmethod:DataTypes.STRING
    },{
        freezeTablename:true,
    });

    return  Withdraw
}