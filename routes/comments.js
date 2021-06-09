var express     = require('express'),
    router      = express.Router({mergeParams: true}),
    Movie       = require('../models/movie'),
    middleware  = require('../middleware'),
    Comment     = require('../models/comment');

router.get('/new',middleware.isLoggedIn, function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new.ejs", {movie: foundMovie});
        }
    });    
});

router.post('/', middleware.isLoggedIn, function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
            res.redirect('/Movie');
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.author.firstname = req.user.firstname;
                    comment.save();
                    foundMovie.comments.push(comment);
                    foundMovie.save();
                    req.flash('success', "Your comment is added.");
                    res.redirect('/movie/'+ foundMovie._id);
                }
            });
        }
    });
});

// router.get('/:comment_id/edit', middleware.checkCommentOwner, function(req, res){
//     Comment.findById(req.params.comment_id, function(err, foundComment){
//         if(err){
//             res.redirect('back');
//         } else {
//             res.render('comments/edit.ejs', {movie_id: req.params.id, comment: foundComment});
//         }
//     });
// });

router.put('/:comment_id', middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComment){
        if(err){
            res.redirect('back');
        } else{
            res.redirect('/movie/' + req.params.id);
        }
    });
});

router.delete('/:comment_id', middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect('back');
        } else{
            req.flash('success', "Your Movie is created.");
            res.redirect('/movie/'  + req.params.id);
        }
    });
})


module.exports = router;