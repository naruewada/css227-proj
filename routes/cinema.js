var express = require('express'),
    router  = express.Router(),
    multer = require('multer'),
    path = require('path'),
    middleware = require('../middleware'),

    storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/picture/cinema/');
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        },
    }),
    imageFilter = function (req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
            return callback(new Error('Only JPG, jpeg, PNG and GIF image files are allowed!'), false);
        }
        callback(null, true);
    },
    upload = multer({
        storage: storage,
        fileFilter: imageFilter,
    }),

    Movies  = require('../models/movie')
    Cinemas = require('../models/cinema');
    User    = require('../models/user');

router.get('/', function(req,res){
    Cinemas.find({branch: 'bangkok'}, function(err, bkkCinemas){
        if(err){
            console.log(err);
        } else {
            Cinemas.find({branch: 'central'}, function(err, cenCinemas){
                if(err){
                    console.log(err);
                } else {
                    res.render('cinema/index.ejs', {bkk: bkkCinemas, cen: cenCinemas});
                }
            });
        }
    });
});

//  New
router.get('/new', middleware.checkAdmin, function(req,res){
    res.render('cinema/new.ejs');
});

router.post('/new', upload.fields([{ name: 'image' }, { name: 'logo' } ]), function(req, res){
    req.body.cinema.image = '/picture/cinema/' + req.files['image'][0].filename;
    req.body.cinema.logo = '/picture/cinema/' + req.files['logo'][0].filename;
    Cinemas.create(req.body.cinema, function(err, newCinemas){
        if(err){
            console.log(err);
        } else {
            res.redirect('/cinemas');
        }
    });
});
//  End of New

//  Edit
router.get('/:id/edit', middleware.checkAdmin,  function(req, res){
    Cinemas.findById(req.params.id, function( err, foundCinemas ){
        if(err) {
            console.log(err);
        } else {
            res.render('cinema/edit.ejs', {Cinemas: foundCinemas})
        }
    });
});

router.put('/:id', upload.fields([{ name: 'image' }, { name: 'logo' }]), function(req, res){
    if ( req.files['image'] ){
        req.body.cinema.image = '/picture/cinema/' + req.files['image'][0].filename;
    }
    if ( req.files['logo'] ){
        req.body.cinema.logo = '/picture/cinema/' + req.files['logo'][0].filename;
    }
    Cinemas.findByIdAndUpdate(req.params.id, req.body.cinema, function( err, updatedCinemas ){
        if(err) {
            console.log(err);
            res.redirect('/cinemas/')
        } else {
            res.redirect('/cinemas/' + req.params.id);
        }
    });
});
//  End of Edit

//  Delete
router.delete('/:id', function(req, res){
    Cinemas.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect('/cinemas');
        }
    })
});
//  End of delete

//  Show
router.get('/:id', function(req,res){

    Cinemas.findById(req.params.id).exec(function(err, foundCinemas){
        if(err){
            console.log(err);
        } else {
            Movies.find({type: 'nowshowing'}, function(err, allMovies){
                if(err){
                    console.log(err);
                } else {
                    res.render('cinema/show.ejs', {Movies: allMovies, Cinemas: foundCinemas});
                }
            });
        }
    });
});

module.exports = router;