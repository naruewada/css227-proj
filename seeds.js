var mongoose    = require('mongoose');
var Movie       = require('./models/movie');
var Comment     = require('./models/comment');
const User      = require('./models/user');
const Liked     = require('./models/like');

var data = [
    {
        name:'Julassic World', 
        image: 'https://www.123-hd.com/wp-content/uploads/2019/12/Jurassic-World-2-Fallen-Kingdom-2018-%E0%B8%88%E0%B8%B9%E0%B8%A3%E0%B8%B2%E0%B8%AA%E0%B8%AA%E0%B8%B4%E0%B8%84-%E0%B9%80%E0%B8%A7%E0%B8%B4%E0%B8%A5%E0%B8%94%E0%B9%8C-%E0%B8%AD%E0%B8%B2%E0%B8%93%E0%B8%B2%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%A3%E0%B8%A5%E0%B9%88%E0%B8%A1%E0%B8%AA%E0%B8%A5%E0%B8%B2%E0%B8%A2.png',
        date: '16 APR 2021',
        rating: '7.5',
        actor: 'Chris Pratt, Nick Robinson',
        rate:' PG-13',
        time:'128',
        trailer:'https://www.youtube.com/embed/RFinNxS5KN4',
        genre: 'Action / Adventure',
        type: 'nowshowing'
    },
    {
        name:'Wonder Women', 
        image: 'https://touchphoneview.com/wp-content/uploads/2021/04/A1wxXiiMuYL._AC_SY679_-402x603.jpg',
        date: '12 MAY 2021',
        rating: '6.0',
        actor: 'Chris Pine, Robin Wright',
        rate:' PG-13',
        time:'112',
        trailer:'https://www.youtube.com/embed/1Q8fG0TtVAY',
        genre: 'Action / Adventure / Fantasy',
        type: 'nowshowing'
    },
    {
        name:'Resident Evil', 
        image: 'https://m.media-amazon.com/images/I/51bzUdFKxRL._AC_.jpg',
        date: '10 MAY 2022',
        rating: '0',
        actor: 'Milla Jovovich, Michelle Rodriguez',
        rate:' PG-13',
        time:'140 ',
        trailer:'https://www.youtube.com/embed/kEutwdia8n0',
        genre: 'Action/ horror',
        type: 'comingsoon'

    },
    {
        name:'The Con-Heartist', 
        image: 'https://www.siamzone.com/movie/pic/2020/theconheartist/poster1.jpg',
        date: '10 MAY 2022',
        rating: '0',
        actor: 'Nadech Kugimiya, Pimchanok Luevisadpaibul',
        rate:' PG-13',
        time:'149',
        trailer:'https://www.youtube.com/embed/lRifyR1jrHw',
        genre: 'comedy',
        type: 'comingsoon'
    },
    {
        name:'Mortal Kombat', 
        image: 'https://m.media-amazon.com/images/M/MV5BY2ZlNWIxODMtN2YwZi00ZjNmLWIyN2UtZTFkYmZkNDQyNTAyXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_.jpg',
        date: '9 JUNE 2021',
        rating: '0.0',
        actor: 'Jessica McNamee, Lewis Tan',
        rate:' PG-13',
        time:'163 ',
        trailer:'https://www.youtube.com/embed/e0fy8aqe4Aw',
        genre: 'Scifi/ Action',
        type: 'comingsoon'
    },
    {
        name:'Wish Dragon', 
        image: 'https://www.whats-on-netflix.com/wp-content/uploads/2021/06/animated-adventure-wish-dragon-is-coming-to-netflix-in-july-2021-poster-png-copy.png',
        date: '10 MAY 2021',
        rating: '7.2',
        actor: 'Jimmy Wong, John Wong',
        rate:' General',
        time:'98 ',
        trailer:'https://www.youtube.com/embed/uWIRyU5fuzU',
        genre: 'Comedy/Adventure ',
        type: 'nowshowing'
    },
    {
        name:'The Witches', 
        image: 'https://s359.kapook.com/rq/450/auto/50/pagebuilder/424246e4-6c9e-4da8-b6c6-d3f83e9bcaef.jpg',
        date: '19 JUNE 2021',
        rating: '0.0',
        actor: 'Anne Hathaway, Octavia Spencer',
        rate:' PG-13',
        time:'106 ',
        trailer:'https://www.youtube.com/embed/9nlhmJF5FNI',
        genre: 'Comedy/Fantasy',
        type: 'comingsoon'
    },
    {
        name:'Promising Young Woman', 
        image: 'https://369movies.com/wp-content/uploads/2021/03/Promising-Young-Woman-2020.jpg',
        date: '22 APR 2021',
        rating: '4.0',
        actor: 'Carey Mulligan, Bo Burnham',
        rate:' PG-13',
        time:'163 ',
        trailer:'https://www.youtube.com/embed/7i5kiFDunk8',
        genre: 'Comedy/Crime/Drama',
        type: 'nowshowing'
    },
    {
        name:'Collectors, The', 
        image: 'https://commercialauthority.com/wp-content/uploads/2021/04/1.jpg',
        date: '26 APR 2021',
        rating: '4.4',
        actor: 'Jo Woo-Jin, Lee Je-Hoon',
        rate:' All',
        time:'115 ',
        trailer:'https://www.youtube.com/embed/0LPzL4MozM4',
        genre: 'Crime',
        type: 'nowshowing'
    },
    {
        name:'The Lord of the Rings', 
        image: 'https://images.fandango.com/ImageRenderer/0/0/redesign/static/img/default_poster.png/0/images/masterrepository/fandango/223969/LOTR_TTT_4K_V_DD_KA_TT_2000x3000_EN.jpg',
        date: '10 June 2021',
        rating: '9.1',
        actor: 'Cate Blanchett, Orlando Bloom',
        rate:' General',
        time:'180 ',
        trailer:'https://www.youtube.com/embed/WGAuIniKeEU',
        genre: 'Action, Adventure, Drama',
        type: 'nowshowing'
    },
    {
        name:'Courier, The', 
        image: 'https://www.i-moviehd.com/wp-content/uploads/2020/01/The-Courier-2019.png',
        date: '12 April 2021',
        rating: '5.2',
        actor: 'Benedict Cumberbatch, Vladimir Chuprikov',
        rate:' General',
        time:'115',
        trailer:'https://www.youtube.com/embed/Qeo8qs9xohM',
        genre: 'Thriller',
        type: 'nowshowing'
    },
    {
        name:'Seobok', 
        image: 'https://cdn.majorcineplex.com/uploads/movie/3092/thumb_3092.jpg',
        date: '12 APR 2021',
        rating: '6.0',
        actor: 'Gong Yoo, Park Bo-Gum',
        rate:' PG-15',
        time:'163 mins',
        trailer:'https://www.youtube.com/embed/5vSr2TPr6w8',
        genre: ' Action',
        type: 'nowshowing'
    }                                                                                                                   
];

var cinema = [
    {
        name: "Silver",
        image: "http://www.engtest.net/UserFiles/Image/25782572575785785757575/cinema-Maroc.jpg",
        logo: "https://cdn.pixabay.com/photo/2018/03/21/13/50/the-letters-of-the-alphabet-3246743_960_720.png",
        branch: 'central',
        slogan: "Exclusive for you.",
        seat: [ [0, 0, 0 ,0] , [0, 0, 0, 0] , [0, 0, 0, 0] , [0, 0, 0, 0] ],
        time: [11,14,17,20],
    },
    {
        name: "Blonzer",
        image: "https://www.michiganradio.org/sites/michigan/files/styles/medium/public/201808/ss_theatre_curtain_flickr.jpg",
        logo: "http://assets.stickpng.com/images/5f480a49554fc70004db57e1.png",
        branch: 'bangkok',
        slogan: "The Best cinema.",
        seat: [ [0, 0, 0 ,0] , [0, 0, 0, 0] , [0, 0, 0, 0] , [0, 0, 0, 0] ],
        time: [10,13,16,19,22],
    },
    {
        name: "Plattinum",
        image: "https://www.the-bigger-picture.com/wp-content/uploads/2021/01/odeon-bluescreen1-crop.jpeg",
        logo: "https://freesvg.org/img/GoldTypographyP.png",
        branch: 'bangkok',
        slogan: "The Best cinema for you. ",
        seat: [ [0, 0, 0 ,0] , [0, 0, 0, 0] , [0, 0, 0, 0] , [0, 0, 0, 0] ],
        time: [10,13,16,19,22]
    }
]

function seedDB(){
    Movie.remove({}, function(err){
        if(err) {
            console.log(err);
        }
        console.log("Remove DB completed");
        data.forEach(function(seed){
            Movie.create(seed, function(err, movie){
                if(err) {
                    console.log(err);
                } else {
                    console.log('New data added');
                }
            });
        });
    });

    Cinemas.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Remove Cinemas Complete");
            cinema.forEach(function(seed){
                Cinemas.create(seed, function(err, cinema){
                    if(err){
                        console.log(err);
                    } else {
                        console.log('Cinemas data added');
                    }
                });
            });
        }
    });

    Liked.remove({}, function(err){
        if(err){
            console.log(err);
        }else{
            User.updateMany({likes: []}, function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("remove liked complete");
                }
            })
        }
    })
}


module.exports = seedDB;