const   express         = require('express'),
        app             = express(),
        bodyParser      = require('body-parser'),
        mongoose        = require('mongoose'),
        flash           = require('connect-flash'),
        passport        = require('passport'),
        methodOverride  = require('method-override'),
        LocalStrategy   = require('passport-local'),
        Movie           = require('./models/movie'),
        Comment         = require('./models/comment'),
        User            = require('./models/user'),
        seedDB          =  require('./seeds');

       

var movieRoutes         = require('./routes/movies'),
    commentRoutes       = require('./routes/comments'),
    indexRoutes         = require('./routes/index'),
    userRoutes          = require('./routes/user');


app.use(express.static('public'));
mongoose.connect('mongodb://localhost/Project1');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(methodOverride('_method'));
app.use(express.static(__dirname + 'public'));
app.use(flash());
// app.use(express.static( './public'));
// seedDB();


app.use(require('express-session')({
    secret: 'secret is always secret.',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});



app.get('/cinemas', function(req, res){
    res.render('cinema.ejs');
});


app.get('/seat', function(req, res){
    res.render('seat.ejs');
});

app.use('/', indexRoutes);
app.use('/movie', movieRoutes);
app.use('/movie/:id/comments', commentRoutes);
app.use('/user', userRoutes);

app.listen(3000, function(){
    console.log('NMovie is started.');
});    