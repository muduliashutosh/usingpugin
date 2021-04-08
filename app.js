//const { urlencoded } = require("express");
const express = require("express");
const app = express();
const path = require("path");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contact',{useNewUrlParser: true, useUnifiedTopology:true});
const port = 80;
//define mongoose schema
var contactschema = new mongoose.Schema({name:String,
phone:String,
email:String,
adddress:String,
desc:String});
var contacttable = mongoose.model('contacttable',contactschema);
//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'));
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'))

//ENDPOINTS
app.get('/', (req, res)=> {
  const params={};
  res.status(200).render('home.pug',params);
});
app.get('/contact', (req, res)=> {
  const params={};
  res.status(200).render('contact.pug',params);
});
app.get('/service', (req, res)=> {
  const params={};
  res.status(200).render('services.pug',params);
});
app.post('/contact', (req, res)=> {
  var mydata = new contacttable(req.body);
  mydata.save().then(()=>{
    res.send("this item has been saved to database ")
  }).catch(()=>{
    res.status(400).send(" item has not been saved to database")
  })
 //res.status(200).render('contact.pug');
}); 

//START THE SERVER
app.listen(port,()=>{
    console.log(`this app is started sussecfully on ${port}`);
});