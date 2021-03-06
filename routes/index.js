var express  = require('express'),
    router   = express.Router(),
    passport = require('passport'),
    User     = require('../models/user')

// root route
router.get('/',(req,res) => {
    res.render('landing')
})

// show register form
router.get('/register',(req,res)=>{
    res.render('register')
})

// handle signup logic
router.post('/register',(req,res)=>{
    var newUser=new User({username: req.body.username})
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            req.flash('error',err.message)
            return res.redirect('/register')
        }
        passport.authenticate('local')(req,res,function(){
            req.flash('success','Welcome to Delhi'+ user.username)
            res.redirect('/places')
        })
    })
})

// show login form
router.get('/login',(req,res)=>{
    res.render('login')
})

// handling login logic
router.post('/login', passport.authenticate('local',
    {
        successRedirect:'/places',
        failureRedirect:'/login',
        failureFlash: true,
        successFlash: 'Welcome to Delhi!'
    }) , (req,res)=>{

})

// logout logic route
router.get('/logout',(req,res)=>{
    req.logout()
    req.flash('success','Logged you out!')
    res.redirect('/places')
})

module.exports=router