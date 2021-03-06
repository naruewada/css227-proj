var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    state:{ 
        type: String, 
        default: 'member'
    },

    picture: {
        type: String,
        default: '/picture/users/default.JPG'
    },

    likes : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Liked',
            autopopulate: true
        }
       
    ],
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('User', UserSchema);