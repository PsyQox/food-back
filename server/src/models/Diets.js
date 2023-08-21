const {DataTypes} = require('sequelize')

module.exports = (sequelize)=> {
    sequelize.define('tbl_diet',{
        id:{
            type:DataTypes.UUID,
            allowNull:false,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4
        },
        name:{
            type:DataTypes.TEXT,
            allowNull:false
        }
    },{timestamps:false})
}