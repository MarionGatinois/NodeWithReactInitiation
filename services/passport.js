const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require ('mongoose');
const keys = require('../config/keys')
//./ -> current directory
//../remonter d'un fichier (ici, projet_test, puis confiG..)

//on essaye de recuperer qqc de mongoose
//si 2 arguments, on essaye de charger qqc dedans
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
  //null : tout va bien, pas d'erreur normalement
  //user.id : celui de la database quand creation, generata by mango
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
});

passport.use(
  new GoogleStrategy(
    {
      clientID : keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL : '/auth/google/callback',
      proxy : true
      //confiance; https au lieu de http
    },
    //recupere les infos de la personne avec compte google :
    //call back function
    async (accessToken, refreshToken, profile, done)=>{ //async => .then
      //on check si le user n'existe pas deja
      //"une promesse"
      //await= async, promesse qu'il recupere
      const existingUser = await User.findOne({ googleId:profile.id })
      if(existingUser){
        //already exist
        return done(null,existingUser);
        //tell password, we're finished here
      }
      //create a model instance:
      //save : save in database
      const user = await new User({ googleId: profile.id }).save()
      done(null, user); //user : 2nd instance  
    }
  )
  );
