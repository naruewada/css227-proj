var express     = require('express'),
    router      = express.Router(),
    Comment     = require('../models/comment'),
    Movie       = require('../models/movie'),
    Cinema      = require('../models/cinema'),
    Liked       = require('../models/like'),
    User        = require('../models/user'),
    multer      = require('multer'),
    middleware  = require('../middleware'),
    path        = require('path');
    storage =  multer.diskStorage({
        destination: function(req, file, callback){
            callback(null, './public/picture/movies');
        },
        filename: function(req, file, callback){
            callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    }),
    imageFilter = function(req, file, callback){
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
            return callback(new Error('Only JPG JPEG PNG and GIF images files are allowed!'), false);
        }
        callback(null, true);
    },
    upload = multer({storage: storage, fileFilter: imageFilter}), 


router.get('/', function(req, res){
    Movie.find({}, function(err, allMovies){
        if(err){
            console.log(err);
        } else {
            res.render('movies/index.ejs', {movie: allMovies});
        }
    });
});

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

router.post('/',middleware.isLoggedIn, upload.single('image'), function(req, res){
    req.body.movie.image = '/picture/movies/' + req.file.filename;
    req.body.movie.author = {
            id: req.user._id,
            username: req.user.username
    };
    // var name        = req.body.name;
    // var image       = req.body.image;
    // var date        = req.body.date;
    // var rating      = req.body.rating;
    // var actor       = req.body.director;
    // var rate        = req.body.rate;
    // var time        = req.body.time;
    // var genre       = req.body.genre;
    // var trailer     = req.body.trailer;
    // var type        = req.body.type;
    // var author  = {
    //     id: req.user._id,
    //     username: req.user.username
    // };
    // var newMovie = {name:name, image:image, date: date, rating:rating,director:director, rate:rate, time:time, trailer:trailer, author: author, genre: genre, type: type};
   Movie.create(req.body.movie, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            req.flash('success', "Your Movie is created.");
            res.redirect('/movie');
        }
    });
});

router.get('/new', middleware.checkAdmin, function(req,res){
    res.render('movies/new.ejs');
});

// show detail

// router.get("/:id", function(req, res){
//     Movie.findById(req.params.id).populate('comments').exec(function(err, foundMovie){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("movies/show.ejs", {movie: foundMovie});
//         }
//     });
// });

router.get("/:id", function(req, res){
    Movie.findById(req.params.id).populate('comments').exec(function(err, foundMovie){
        if(err){
            console.log(err);
        } else {
            Cinema.find({}, function(err, allCinemas){
                if(err){
                    console.log(err);
                } else {
                    res.render('movies/show.ejs', { movie: foundMovie, Cinema: allCinemas });
                }
            });
        }
    });
});

// router.get("/:id/showtime", function(req, res){
//     Movie.findById(req.params.id).populate('comments').exec(function(err, foundMovie){
//         if(err){
//             console.log(err);
//         } else {
//             Cinema.find({}, function(err, allCinemas){
//                 if(err){
//                     console.log(err);
//                 } else {
//                     res.render('movies/showtime.ejs', { movie: foundMovie, Cinema: allCinemas });
//                 }
//             });
//         }
//     });
// });

// router.get("/:id/showtime", function(req, res){
//     Movie.findById(req.params.id).populate('comments').exec(function(err, foundMovie){
//         if(err){
//             console.log(err);
//         } else {
//             Cinema.find({}, function(err, allCinema){
//                 if(err){
//                     console.log(err);
//                 } else {
//                     Cinemas.findById(req.params.id, function(err, foundCinemas){
//                         if(err){
//                             console.log(err);
//                         } else {
//                             Movie.findById(req.params.id, function(err, foundMovies){
//                                 if(err){
//                                     console.log(err);
//                                 } else {
//                                     res.render('movies/showtime.ejs', {movie: foundMovie, Cinema: allCinema, Cinemas: foundCinemas, Movies: foundMovies});
//                                 }
//                             });
//                         }
//                     });
//                 }
//             });
//         }
//     });
// });


// router.get("/:id", function(req, res){
//     Movie.findById(req.params.id).populate('comments').exec(function(err, foundMovie){
//         if(err){
//             console.log(err);
//         } else {
//             Cinema.find({}, function(err, allCinema){
//                 if(err){
//                     console.log(err);
//                 } else {
//                     Cinema.findById(req.params.id, function(err, foundCinemas){
//                         if(err){
//                             console.log(err);
//                         } else {
//                             res.render('movies/show.ejs', { movie: foundMovie, Cinema: allCinema, Cinemas: foundCinemas });
//                         }
//                     });
//                 }
//             });
//         }
//     });
// });




router.get("/:id/comments/:comment_id/edit", middleware.checkCommentOwner, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err) {
            res.redirect('back');
        } else {
            Movie.findById(req.params.id).populate('comments').exec(function(err, foundMovie){
                if(err){
                    console.log(err);
                } else {
        
                    res.render("comments/edit.ejs", { comment: foundComment, movie: foundMovie});
                }
            });
        }
    })
    
});




router.post('/search-movie',function(req,res){
    console.log("Trying to search movie... " + req.body.search);
    var name = req.body.search;
    res.redirect('/movie/search-movie/' + name);
});

router.get('/search-movie/:name', function(req,res){
    Movie.find({name: new RegExp(req.params.name, 'i')}, function(err, foundMovie){
        if(err){
            console.log(err);
        } else {
            Movie.find({name: new RegExp(req.params.name, 'i')}, function(err, foundMovie_com){
                if(err){
                    console.log(err);
                } else {
                    res.render('movies/index.ejs', {movie: foundMovie, moviecom: foundMovie_com, sort: 'All'});
                }
            })
        }
    });
});

router.get('/genre-nowshowing/:genre', function(req, res){

    Movie.find({type: 'comingsoon'}, function(err, foundMovie_com){
        if(err){
            console.log(err);
        } else {
            Movie.find({type: 'nowshowing', genre: new RegExp(req.params.genre, 'i')}, function(err, foundMovie){
                if(err){
                    console.log(err);
                } else {
                        res.render('movies/index.ejs',{movie: foundMovie, moviecom: foundMovie_com, sort: req.params.genre});
                }
                   
            });
        }
    });
});

router.get('/genre-comingsoon/:genre', function(req, res){

    Movie.find({type: 'nowshowing'}, function(err, foundMovie){
        if(err){
            console.log(err);
        } else {
            Movie.find({type: 'comingsoon', genre: new RegExp(req.params.genre, 'i')}, function(err, foundMovie_com){
                if(err){
                    console.log(err);
                } else {
                        res.render('movies/index.ejs',{movie: foundMovie, moviecom: foundMovie_com, sort: req.params.genre});
                }
                   
            });
        }
    });
});

                   
               
  



router.post('/:id/like',middleware.isLoggedIn, function(req, res){
    User.findById(req.user._id, function(err, foundUsers){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            Liked.create({}, function(err, like){
                if(err){
                    console.log(err);
                } else {
                    Movie.findById(req.params.id, function(err, foundMovie){
                        if(err){
                            console.log(err);
                        } else {
                            like.movies.id      = req.params.id;
                            like.movies.image   = foundMovie.image;
                            like.movies.name    = foundMovie.name;
                            like.save();
                            foundUsers.likes.push(like);
                            foundUsers.save();
                            res.redirect('back');
                        }
                    });
                }
            });
        }
    });
});

router.post('/:id/unlike',middleware.isLoggedIn, function(req, res){
    User.update( {_id: req.user._id}, { $pull: { likes: req.params.id } } ).exec(function(err){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            Liked.findByIdAndRemove(req.params.id, function(err){
                if(err){
                    console.log(err);
                } else {
                    res.redirect('back');
                }
            });
        }
    });
});

router.get('/:id/edit',middleware.checkAdmin, function(req,res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
        } else{
            res.render('movies/edit.ejs', {movie: foundMovie})
        }
    });
});


router.put('/:id', upload.single('image'), function(req, res){
    if(req.file){
        req.body.movie.image = '/picture/movies/' + req.file.filename;
    }
    Movie.findByIdAndUpdate(req.params.id, req.body.movie, function(err, updatedMovie){
        if(err){
            res.redirect('/movie/');
        } else{
            res.redirect('/movie/' +req.params.id);
        }
    });
});
// router.get('/sort/coming-soon', function(req, res){
//     Movie.find({}, function(err, allMovies){
//         if(err){
//             console.log(err);
//         } else {
//             res.render('movies/index.ejs', {movie: allMovies});
//         }
//     }).sort({'name': 1});
// });


// router.get('/sort-genre/coming-soon', function(req, res){
//     Movie.find({}, function(err, allMovies){
//         if(err){
//             console.log(err);
//         } else {
//             res.render('movies/index.ejs', {movie: allMovies});
//         }
//     }).sort({'genre': 1});
// });

router.delete('/:id', middleware.checkAdmin, function(req, res){
    Movie.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/movie/');
        } else{
            req.flash('success', "You delete your movie.");
            res.redirect('/');
        }
    });
});



module.exports = router;