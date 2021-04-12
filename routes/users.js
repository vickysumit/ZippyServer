var express = require('express');
var router = express.Router();
var passport = require('passport');
var authenticate = require('../authenticate');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const User = require('../models/user');
const cors = require('./cors')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    }
  });
});



router.route('/login')
.options(cors.corsWithOptions,(req,res) =>{
    res.statusCode(200);
})
.post(cors.corsWithOptions,(req, res,next) => {

  passport.authenticate('local',(err,user,info)=>{
    if(err)
      return next(err);

    if(!user){
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false, status: 'Login Unsuccessful',err:info});
    }
    req.logIn(user, (err)=>{
      if(err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, status: 'Login Unsuccessful',err:'Could not log in user!'});
      }
    

    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, status: 'Login Successful',token:token}
    );
    });
  }) (req,res,next);
})
module.exports = router;
