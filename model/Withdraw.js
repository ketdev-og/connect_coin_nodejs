module.exports = (sequalize, DataTypes)=>{
    const Withdraw = sequalize.define('witdraw',{
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        account:DataTypes.STRING,
        amount:DataTypes.INTEGER, 
        paymentmethod:DataTypes.STRING
    },{
        freezeTablename:true,
    });

    return  Withdraw
}