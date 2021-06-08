var mongoose    = require('mongoose');
var Movie       = require('./models/movie');
var Comment     = require('./models/comment');
const User      = require('./models/user');
const Liked     = require('./models/like');

var data = [
    // {
    //     name:'Julassic World', 
    //     image: 'https://www.123-hd.com/wp-content/uploads/2019/12/Jurassic-World-2-Fallen-Kingdom-2018-%E0%B8%88%E0%B8%B9%E0%B8%A3%E0%B8%B2%E0%B8%AA%E0%B8%AA%E0%B8%B4%E0%B8%84-%E0%B9%80%E0%B8%A7%E0%B8%B4%E0%B8%A5%E0%B8%94%E0%B9%8C-%E0%B8%AD%E0%B8%B2%E0%B8%93%E0%B8%B2%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%A3%E0%B8%A5%E0%B9%88%E0%B8%A1%E0%B8%AA%E0%B8%A5%E0%B8%B2%E0%B8%A2.png',
    //     date: '16 APR 2021',
    //     rating: '7.5',
    //     actor: 'Chris Pratt, Nick Robinson',
    //     rate:' PG-13',
    //     time:'128 mins',
    //     trailer:'https://www.youtube.com/embed/RFinNxS5KN4',
    //     genre: 'Action / Adventure',
    //     type: 'nowshowing'
    // },
    // {
    //     name:'Wonder Women', 
    //     image: 'https://touchphoneview.com/wp-content/uploads/2021/04/A1wxXiiMuYL._AC_SY679_-402x603.jpg',
    //     date: '12 MAY 2021',
    //     rating: '6.0',
    //     actor: 'Chris Pine, Robin Wright',
    //     rate:' PG-13',
    //     time:'112 mins',
    //     trailer:'https://www.youtube.com/embed/1Q8fG0TtVAY',
    //     genre: 'Action / Adventure / Fantasy',
    //     type: 'nowshowing'
    // },
    // {
    //     name:'Resident Evil', 
    //     image: 'https://m.media-amazon.com/images/I/51bzUdFKxRL._AC_.jpg',
    //     date: '10 MAY 2022',
    //     rating: '0',
    //     actor: 'Milla Jovovich, Michelle Rodriguez',
    //     rate:' PG-13',
    //     time:'140 mins',
    //     trailer:'https://www.youtube.com/embed/kEutwdia8n0',
    //     genre: 'Action/ horror',
    //     type: 'comingsoon'

    // },
    // {
    //     name:'The Con-Heartist', 
    //     image: 'https://www.siamzone.com/movie/pic/2020/theconheartist/poster1.jpg',
    //     date: '10 MAY 2022',
    //     rating: '0',
    //     actor: 'Nadech Kugimiya, Pimchanok Luevisadpaibul',
    //     rate:' PG-13',
    //     time:'149 mins',
    //     trailer:'https://www.youtube.com/embed/lRifyR1jrHw',
    //     genre: 'comedy',
    //     type: 'comingsoon'
    // },
    // {
    //     name:'Mortal Kombat', 
    //     image: 'https://m.media-amazon.com/images/M/MV5BY2ZlNWIxODMtN2YwZi00ZjNmLWIyN2UtZTFkYmZkNDQyNTAyXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_.jpg',
    //     date: '9 MAY 2021',
    //     rating: '9.0',
    //     actor: 'Jessica McNamee, Lewis Tan',
    //     rate:' PG-13',
    //     time:'163 mins',
    //     trailer:'https://www.youtube.com/embed/e0fy8aqe4Aw',
    //     genre: 'Scifi/ Action',
    //     type: 'nowshowing'
    // }                
];

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