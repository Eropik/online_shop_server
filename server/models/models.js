
const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email:{type: DataTypes.STRING, unique: true},
    password:{type: DataTypes.STRING},
    role:{type: DataTypes.STRING,defaultValue:"USER"},
})

const Basket = sequelize.define('basket',{  //basket
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const BasketDevice = sequelize.define('basket_device',{   //basket_device
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    state:{type: DataTypes.STRING, defaultValue:"Processed" },
    isDelivered:{type: DataTypes.BOOLEAN, defaultValue: false},
    isBought:{type: DataTypes.BOOLEAN, defaultValue: false},
    //isReceived: {type: DataTypes.BOOLEAN, defaultValue: false},
})

const Device = sequelize.define('device',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name:{type: DataTypes.STRING, unique: true,allowNull: false },
    price:{type: DataTypes.INTEGER,allowNull: false },
    img:{type: DataTypes.STRING,allowNull: false },

    rating:{type: DataTypes.DOUBLE,defaultValue:0},
})


const Type = sequelize.define('type',
    {id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
        name:{type: DataTypes.STRING, unique: true, allowNull: false}
    })

const Brand = sequelize.define('brand',
    {id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
        name:{type: DataTypes.STRING, unique: true, allowNull: false}
    })

const Rating = sequelize.define('rating',
    {id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
        rate:{type: DataTypes.DOUBLE, allowNull: false}
    })

const DeviceInfo = sequelize.define('device_info',
    {id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
        title:{type: DataTypes.STRING, allowNull: false},
        description:{type: DataTypes.STRING, allowNull: false}
    })

const TypeBrand = sequelize.define('type_brand',
    {id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    })

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo,{as:'info'})
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand,  {through: TypeBrand} )
Brand.belongsToMany(Type, {through: TypeBrand})

module.exports= {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    TypeBrand,
    DeviceInfo
}









