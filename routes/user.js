var express     = require('express'),
    router      = express.Router(),
    multer      = require('multer'),
    middleware  = require('../middleware'),
    path        = require('path');
    storage =  multer.diskStorage({
        destination: function(req, file, callback){
            callback(null, './public/picture/users');
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

    User    = require('../models/user');
    Booking = require('../models/booking');




    router.get('/admin', middleware.checkAdmin, function (req, res) {
        User.find({state: 'member'}, function (err, allUser) {
            if (err) {
                console.log(err);
            } else {
                User.find({ state: 'admin' }, function (err, allAdmin) {
                    if(err) {
                        console.log(err);
                    } else {
                        res.render('admin.ejs', { User: allUser, Admin: allAdmin });
                    }
                });
            }
        });
    });
    
    router.post('/admin/grant/:id', middleware.checkAdmin, function (req, res) {
        User.findByIdAndUpdate(req.params.id,{state: 'admin'},function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("Updated User : ", result);
                res.redirect('back');
            }
        });
    });
    
    router.post('/admin/forfeit/:id', middleware.checkAdmin, function (req, res) {
        User.findByIdAndUpdate(req.params.id,{state: 'member'},function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("Updated User : ", result);
                res.redirect('back');
            }
        });
    });
    
    
    router.post('/admin/delete/:id', middleware.checkAdmin, function (req, res) {
        User.findByIdAndDelete(req.params.id, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("Deleted User : ", result);
                res.redirect('back');
            }
        });
    });





router.get('/:id',middleware.isLoggedIn, function (req, res) {
    User.findById(req.params.id).exec(function (err, foundUsers) {
        if (err) {
            console.log(err);
        } else {
            User.findById(req.params.id).populate('likes').exec(function(err, likedMovies){
                if (err) {
                    console.log(err);
                } else {
                    Booking.find({'user.id': req.params.id}).exec(function(err, foundBooking){
                        if (err) {
                            console.log(err);
                        } else {
                            res.render('mypage.ejs', { User: foundUsers, movie: likedMovies, Booking: foundBooking });
                        }
                    });
                }
            });
        }
    });
});


router.post('/:id', middleware.isLoggedIn, upload.single('image'), function (req, res){
    User.findByIdAndUpdate(req.params.id,
        {
            picture: '/picture/users/' + req.file.filename
        },
        function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('back');
            }
        });
});








module.exports = router;