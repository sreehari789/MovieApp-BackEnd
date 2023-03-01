// import db.js
const db=require('./db')

// register

const register=(mailId,uname,pswd)=>{
// checking uname in mongodb
return db.User.findOne({
    username:uname
}).then((result)=>{
console.log(result);
if(result){
    return{
        statusCode:401,
        message:'Account Already exist!'
    }
}else{
    const newUser= new db.User({
        mailId,
    username:uname,
    password:pswd,
    transation:[]
    })
    // to save new user in mongodb
    newUser.save()
    return{
        statusCode:200,
        message:'Registeration successfull'
   
   }
}
})

}
// login

const login =(uname,pswd)=>{
// checking uname,pswd in mongodb
return db.User.findOne({
    username:uname,
    password:pswd
}).then(
    (result)=>{
        if(result){
            return{
                statusCode:200,
                message:'Login successfull',
                username:result.username,
            }
        }else{
            return{
                statusCode:404,
                message:'Invalid username or password'
            }
        }
    }
)
}

// get all movies
const allmovies=()=>{
    return db.Movie.find().then(
        (result)=>{
            if(result){
                return {
                    statusCode:200,
                    movies:result
                }
            }
            else{
                return{
                    statusCode:404,
                    message:'No movies at present'
                }
            }
        }
    )
    }
// view movie
    const viewMovie =(id)=>{
      return db.Movie.findOne({
        id
      }).then(
        (result)=>{
            if(result){
                return{
                    statusCode:200,
                    movie:result
                }
            }
            else{
                return{
                    statusCode:404,
                    message:'movie not found'
                }
            }
        }
      )
        }
// addToWishlist
const addToWishlist=(user,movie)=>{
    return db.User.findOne({
        username:user
    }).then(
        (result)=>{
            if(result){
                result.wishlist.push(
                    { 
                       Title: movie.Title,
                       Year: movie.Year,
                       Rated: movie.Rated,
                       Released: movie.Released,
                       Runtime: movie.Runtime,
                       Genre: movie.Genre,
                       Director: movie.Director,
                       Writer: movie.Writer,
                       Actors: movie.Actors,
                       Plot: movie.Plot,
                       Language: movie.Language,
                       Country:movie.Country,
                       Awards: movie.Awards,
                       Poster: movie.Poster,
                       Ratings: [
                         {
                           Source: movie.Source,
                           Value: movie.Value
                         },
                         {
                           Source: movie.Source,
                           Value: movie.Value
                         },
                         {
                           Source: movie.Source,
                           Value: movie.Value
                         }
                       ],
                       Metascore: movie.Metascore,
                       imdbRating: movie.imdbRating,
                       imdbVotes: movie.imdbVotes,
                       imdbID: movie.imdbID,
                       Type: movie.Type,
                       DVD: movie.DVD,
                       BoxOffice: movie.BoxOffice,
                       Production: movie.Production,
                       Website: movie.Website,
                       Response: movie.Response
                     
               }
                )
                result.save()
                return{
                    statusCode:200,
                    message:`${movie.Title} (${movie.Year}) added to your watchlist`
                }
            }else{
                return{
                    statusCode:404,
                    message:'Invalid username or password'
                }
            }
        }
    )
}

// getWatchlist
const getWatchlist=(user)=>{
    return db.User.findOne({
     username:user
    }).then(
      (result)=>{
          if(result){
              return{
                  statusCode:200,
                  movie:result.wishlist
              }
          }
          else{
              return{
                  statusCode:404,
                  message:'watchlist not found'
              }
          }
      }
    )
      }

// removeWatchlist
const removeWatchlist=(user,title)=>{
return db.User.findOne({
    username:user
}
).then(
    (result)=>{
        if(result){
           return db.User.updateMany(
            {}, { $pull: {wishlist: {Title:title} } }, { multi: true }
           ).then(
            (result)=>{
                if(result){
                    return db.User.findOne({
                        username:user
                       }).then(
                         (result)=>{
                             if(result){
                                 return{
                                     statusCode:200,
                                     movie:result.wishlist
                                 }
                             }
                             else{
                                 return{
                                     statusCode:404,
                                     message:'watchlist not found'
                                 }
                             }
                         }
                       )
                }else{
                    return{
                        statusCode:404,
                 message:"movie not found"
                    }
                }
            }
           )

        }else{
            return{
                statusCode:404,
                message:'user not found'
            }
        }
    }
)
}   

// postReview
const postReview=(user,mtitle,review,currentRate,reviewDate)=>{
    // checking review in mongodb
    return db.Review.findOne({
        username:user,
        movieName:mtitle
    }).then((result)=>{
    console.log(result);
    if(result){
        return{
            statusCode:401,
            message:'you already reviewed this film!'
        }
    }else{
        const newReview= new db.Review({
            username:user,
            movieName:mtitle,
            review,
            rating:currentRate,
            date:reviewDate
        })
        // to save new review in mongodb
        newReview.save()
        return{
            statusCode:200,
            message:'your review posted successfully',
       
       }
    }
    })
    
    }

// getAllreview
const getAllreview =(movieTitle)=>{
    return db.Review.find({
        movieName:movieTitle
    }).then(
      (result)=>{
          if(result){
              return{
                  statusCode:200,
                  message:'review found',
                  review:result
              }
          }
          else{
              return{
                  statusCode:404,
                  message:'movie not found'
              }
          }
      }
    )
      }

// WatchedHistory   
const WatchedHistory =(user)=>{
    return db.Review.find({
        username:user
    }).then(
      (result)=>{
          if(result){
              return{
                  statusCode:200,
                  message:'review found',
                  review:result
              }
          }
          else{
              return{
                  statusCode:404,
                  message:'movie not found'
              }
          }
      }
    )
      }

      
// export
module.exports={ register,login,allmovies,viewMovie,addToWishlist,getWatchlist,removeWatchlist,postReview,getAllreview,WatchedHistory }