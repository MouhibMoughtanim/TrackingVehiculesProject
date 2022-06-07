const mongoose = require('mongoose');


var schema = new mongoose.Schema({
    type : {
        type : String,
        required: true
    },
    matricule : {
        type: String,
        required: true,
        unique: true
    },
    marque : String
    
})

const Vehicule= mongoose.model('Vehicule', schema);


module.exports = Vehicule;
