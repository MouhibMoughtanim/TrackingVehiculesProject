const axios = require('axios');


 
exports.positionPage = (req,res)=>{
    
    const vehicule_id = req.params.vehicule_id;
    axios.get('http://localhost:3700/api/positions?vehicule_id='+vehicule_id)
    .then(function(response){
    res.render('indexPosition.ejs',{positions : response.data.locations,vehicule : response.data.vehicule})
})
    .catch(err=>{
        res.send(err);
    })
};

exports.filtredPositionPage = (req,res)=>{
    
    const debut = req.params.debut;
    const fin = req.params.fin;
    const vehicule_id = req.params.vehicule_id;
    axios.get('http://localhost:3700/api/positions/filter/'+debut+'/'+fin+'/'+vehicule_id )
    .then(function(response){
        res.render('indexPositionFiltred.ejs',{positions : response.data})
})
    .catch(err=>{
        res.send(err);
    })
};

