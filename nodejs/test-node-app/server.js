const http = require('http')
const fs = require('fs')
const _ = require('lodash')


const server =http.createServer((request,res)=>{
    // console.log(request.url  , request.method)
    // res.setHeader('Content-Type' ,'text/plain' )
    res.setHeader('Content-Type' ,'text/html' )
    // res.write('<p>helo</p>' )
    // res.end()
    const num =_.random(0,20)
    console.log(num)

    const great = _.once(()=>{
        console.log('ssbc')
    })
    great()

    let path = './views/'
    switch(request.url){
        case '/':
            path += 'index.html'
            res.statusCode = 200
            break;
        case '/about':
            path += 'about.html'
            res.statusCode = 200
            break;
        case '/about-me':
            res.statusCode = 301
            res.setHeader('Location' , '/about')
            res.end()
            break;
        default :
            path += '404.html'
            res.statusCode = 404
            break;
            
    }

    fs.readFile(path , (err,data)=>{
        if(err){
            // console.log(err)
            res.end(err)
        }else{
            res.statusCode = 200
            // res.write(data)
            res.end(data)
        }
    })
})
server.listen(3000 , 'localhost' , ()=>{
    console.log('listening')
})










