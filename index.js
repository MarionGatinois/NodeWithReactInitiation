//60
//pas fait 63 et 48

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
//juste executer le file passport :
//pas besoin de ca : const passportCongig = car le file ne retourne rien
require('./models/User');
require('./models/Survey');
require('./services/passport');
///attention à l'ordre !! car on utilise le user dans le password
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express(); //generate app

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000, //temps d'expiration, 30 jours en millisecondes
    keys : [keys.cookieKey] //sign, encript cookies
  })
);
app.use(passport.initialize()); //says to use cookies
app.use(passport.session());

//1:const authRoutes = require('./routes/authRoutes');
//2:authRoutes(app);
//1+2 devient :
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if(process.env.NODE_ENV === 'production'){
  //express will serve up production assets
  //like our main.js file or main.css file
  app.use(express.static('client/build'));//seach here il searching for
  //express will serve up the index.html file assets
  //if it doesn't recogniza the route
  const path = require('path');
  app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  }); //ici si rien dans authRoutes/ billingRoutes et build !
}

const PORT = process.env.PORT || 5000;
//ca va nous donner un port ou sinon par default le port 5000
app.listen(PORT);
//if PORT=5000 : internet : localhost:5000
