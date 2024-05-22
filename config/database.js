const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/User');
        console.log("conectado a la base de datos");
    }catch(err){
        console.error('Coneccion a la base de datos fallido');
        process.exit(1);
    }
};

module.exports = connectDB;