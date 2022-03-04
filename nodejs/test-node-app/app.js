const express = require('express')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')


app.set('view engine', 'ejs'); // set render dạng ejs
const dbURI = 'mongodb+srv://admin:test123@test-nodejs.duwgr.mongodb.net/test-nodejs?retryWrites=true&w=majority'
mongoose.connect(dbURI , {useNewUrlParser : true , useUnifiedTopology : true} )
.then((res)=> app.listen(3000) )
.catch((err) => console.log(err))


// app.listen(3000)

// app.use((req,res ,next )=>{
//     console.log('new request made');
//     console.log('host' , req.hostname);
//     console.log('path' , req.path)
//     console.log('method' , req.method)
//     next();
// })

app.use(morgan('dev')) // hiện 

app.use(express.static('public')) // đường dẫn tới public 
app.use(express.urlencoded({extended : true}))



// app.get('/single-blog' , (request , res)=>{
//     Blog.findById('61fdc5482fe7d009049d8f39')
//     .then((result)=>{
//         res.send(result)
//     }).catch((err)=>{
//         console.error(err)
//     })
// })

// app.get('/all-blog' , (request , res)=>{
//     Blog.find()
//     .then((result)=>{
//         res.send(result) //trả về dạng json ở view
//     }).catch((err)=>{
//         console.error(err)
//     })
//     // console.log(Blog.find())
// })



app.use(require('./routes/blogRoutes'))
//404
app.use((request ,res)=>{
    // res.status(404).sendFile('./views/404.html' , {root : __dirname})
    res.status(404).render('404' , {title : '404'})
})














