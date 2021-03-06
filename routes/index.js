var express     = require('express'),
    router      = express.Router(),
    User        = require('../models/user'),
    passport    =  require('passport'),
    Movie       = require('../models/movie');


router.get('/', function(req, res){
    Movie.find({type:'nowshowing'}, function(err, allMovies){
        if(err){
            console.log(err);
        } else {
            Movie.find().sort({rating: -1}).limit(3).exec(function(err, rankMovies){
                if(err){
                    console.log.apply(err);
                } else {
                    Movie.find({type:'comingsoon'}, function(err, allMovies_coming){
                        if(err){
                            console.log(err);
                        } else {
                            res.render('index/home.ejs', {movie: allMovies, Ranks: rankMovies, moviecom: allMovies_coming});
                        }
                    });
                }
            });
        }
    });
}); 

// router.get('/movie', function(req, res){
//     Movie.find({}, function(err, allMovies){
//         if(err){
//             console.log(err);
//         } else {
//             res.render('movies/index.ejs', {movie: allMovies, sort: 'All'});
//         }
//     });
// });

router.get('/movie', function(req, res){
    Movie.find({type:'nowshowing'}, function(err, allMovies){
        if(err){
            console.log(err);
        } else {
            Movie.find({type:'comingsoon'}, function(err, allMovies_coming){
                if(err){
                    console.log(err);
                } else {
                    res.render('movies/index.ejs', {movie: allMovies, moviecom: allMovies_coming, sort: 'All'});
                }
            });
           
        }
    });
});


router.get('/register', function(req, res){
    res.render('index/register.ejs');
});

router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username, firstname: req.body.firstname,  lastname: req.body.lastname});
    if(req.body.isAdmin === 'top secret') {
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            req.flash("error", err.message);
            return res.render('index/register');
        }
        passport.authenticate('local')(req, res, function(){
            req.flash("success", "Welcome to Nmovie" + user.firstname);
            res.redirect('/');
        });
    });
});




router.get('/login', function(req, res){
    res.render('index/login.ejs');
});

router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/',
        failureRedirect: '/login',
        successFlash: true,
        failureFlash: true,
        successFlash: 'successfully log in',
        failureFlash: 'Invalid username or password'
    }), function(res, res){ 
           
});


router.get('/logout', function(req, res){
    req.logout();
    req.flash("success", "Logged you out successly");
    res.redirect('/');
});

module.exports = router;