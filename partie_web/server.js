var Tracker = require('./server/model/TrackerModel');
var Position = require('./server/model/positionModel');
var Helper = require('./server/model/HelperModel');

const express = require('express');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const path = require('path');
const connectDB = require('./server/database/connection');

const app = express();
const PORT = 3700;
app.use(require('body-parser').urlencoded({
  extended: true
}))

app.use(express.json())

connectDB();

app.use(express.static(path.join(__dirname, '/assets')));

app.set("view engine", "ejs")

app.use('/', require('./server/routes/router'));

//app.listen(PORT,()=>{console.log(`Server running on http://localhost:${PORT}` )});
const socket = require('socket.io');
var server = require('http').createServer(app);
var io = socket(server);




server.listen(PORT)





io.on("connection", (socket) => {
  console.log('connected');
  socket.on("position-change", (data) => {
    positionflutter = JSON.parse(data);
    Tracker.findOne({adressemac : positionflutter.id})
    .then(dd =>{
      if(!dd){
         console.log({ message : "Not found user with id "+  positionflutter.id})
      }else{
          Helper.findOne( {tracker_id : dd.id , fin: { $exists: false }})
          .then(data =>{
            if(!data){
               console.log({ message : "Tracker innactive "+ dd.id})
            }else{
              const position = new Position ({
                vehicule_id : data.vehicule_id,
                lat : positionflutter.lat,
                long :positionflutter.lng
                
                
             })
             
             // save user in the database
             position
                 .save(position)
                 .then(data => {
                     console.log(position)
                    
                 })
                 .catch(err =>{
                     res.status(500).send({
                         message : err.message || "Some error occurred while creating a create operation"
                     });
                     
                 });
            }
        })
        .catch(err =>{
            console.log({ message: "Erro retrieving helper with tracker_id " + dd.id})
        })



      }
  })
    .catch(err =>{
        res.status(500).send({ message: "Erro retrieving user with id " +  position.id})
    })


  })
  socket.on("disconnect", () => {
    console.log('diconnected');

  })

});
