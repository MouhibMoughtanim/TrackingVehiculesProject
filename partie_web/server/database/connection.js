const mongoose = require('mongoose');

const connectDB = async()=>{
   const con = await mongoose.connect('mongodb://localhost/Projet')
.then(()=>(console.log('mongodb connacted succesfully...')))
.catch((err)=>(console.log(err.message)))
}
module.exports = connectDB ;