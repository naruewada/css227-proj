var Movie       = require('../models/movie'),
    Comment     = require('../models/comment');

var middlewareObj = {};

middlewareObj.checkMovieOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Movie.findById(req.params.id, function(err, foundMovie){
            if(err){
                res.redirect('back');
            } else{
                if(foundMovie.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect('back');
                }
            } 
        });

    } else{
        res.redirect('back');
    }
}

middlewareObj.checkCommentOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect('back');
            } else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect('back');
                }
            } 
        });

    } else{
        res.redirect('back');
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = middlewareObj;