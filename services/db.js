// import mongoose in db.js

const mongoose=require('mongoose')

// using mongoose difine a connection string

mongoose.connect('mongodb://localhost:27017/movieApp',()=>{
    console.log('mongodb connected successfully');
})

// create model for users

const User= mongoose.model('User',{
    mailId:String,
    username:String,
    password:String,
    wishlist:[]
})

// create model for movies

const Movie =mongoose.model('Movie',{
         id:Number, 
        Title: String,
        Year: String,
        Rated: String,
        Released: String,
        Runtime: String,
        Genre: String,
        Director: String,
        Writer: String,
        Actors: String,
        Plot: String,
        Language: String,
        Country:String,
        Awards: String,
        Poster: String,
        Ratings: [
          {
            Source: String,
            Value: String
          },
          {
            Source: String,
            Value: String
          },
          {
            Source: String,
            Value: String
          }
        ],
        Metascore: String,
        imdbRating: String,
        imdbVotes: String,
        imdbID: String,
        Type: String,
        DVD: String,
        BoxOffice: String,
        Production: String,
        Website: String,
        Response: String
      
})



const Review=mongoose.model('Review',{
  username:String,
  movieName:String,
  review:String,
  rating:String,
  date:String

}) 

module.exports={
    User,Movie,Review
}