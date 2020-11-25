const passport= require('passport');


module.exports = app => {
//app.get : express module
// go to the passport authentication flow:
  app.get(
    '/auth/google',passport.authenticate('google',{
    scope:['profile','email']
    })
  );
  //code available :
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout',(req,res) => {
    req.logout();
    res.redirect('/');
    }
  );

  app.get('/api/current_user', (req,res) => {
    res.send(req.user);
    }
  );
};
