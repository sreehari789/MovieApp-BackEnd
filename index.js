const express=require('express')

// import dataservice

const dataService=require('./services/dataService')

// create server app
const server=express()

const cors=require('cors')


// use cors to define origin
server.use(cors({
    origin:'http://localhost:4200'
    }))

    
server.use(express.json())

// setup port for server app
server.listen(3000,()=>{
    console.log('server started at 3000');
})
// register api
server.post('/register',(req,res)=>{
    console.log('Inside register Api');
    console.log(req.body);
  dataService.register(req.body.mailId,req.body.uname,req.body.pswd)
  .then((result)=>{
res.status(result.statusCode).json(result)
  })
})

// login api call resolving
server.post('/login',(req,res)=>{
  console.log('Inside login Api');
  console.log(req.body);
dataService.login(req.body.uname,req.body.pswd)
.then((result)=>{
res.status(result.statusCode).json(result)
})
})

// get all movies api
server.get('/all-movies',(req,res)=>{
  dataService.allmovies()
  .then((result)=>{
      res.status(result.statusCode).json(result)
  })
  })

  // view movie api
server.get('/view-movie/:movieId',(req,res)=>{
  dataService.viewMovie(req.params.movieId)
  .then((result)=>{
      res.status(result.statusCode).json(result)
  })
  })

  // add to wishlist
  server.post('/addToWishlist',(req,res)=>{
    dataService.addToWishlist(req.body.user,req.body.movie)
    .then((result)=>{
      res.status(result.statusCode).json(result)

    })
  })

  // getWatchlist
  server.get('/get-Watchlist/:user',(req,res)=>{
    dataService.getWatchlist(req.params.user)
    .then((result)=>{
      res.status(result.statusCode).json(result)
    })
  })

  // RemoveMovieFromWatchlist
  server.post('/remove-Watchlist',(req,res)=>{
    dataService.removeWatchlist(req.body.user,req.body.title)
    .then((result)=>{
      res.status(result.statusCode).json(result)
    })
  })

  //post review api
server.post('/post-review',(req,res)=>{
  console.log('Inside review Api');
  console.log(req.body);
dataService.postReview(req.body.user,req.body.mtitle,req.body.review,req.body.currentRate,req.body.reviewDate)
.then((result)=>{
res.status(result.statusCode).json(result)
})
})

// get all review
server.put('/getAll-review',(req,res)=>{
dataService.getAllreview(req.body.movieTitle)
.then((result)=>{
res.status(result.statusCode).json(result)
})
})

// watched History
server.get('/Watched-history/:user',(req,res)=>{
  dataService.WatchedHistory(req.params.user)
  .then((result)=>{
    res.status(result.statusCode).json(result)
  })
})