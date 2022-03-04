const express = require('express');
const router = express.Router();
const Blog  =  require('../model/blog')

router.get('/blog' , (request, res)=>{
    Blog.find().sort({createdAt : -1})
    .then((result)=>{
        res.render('index' , {title : 'All blog' , blogs : result})
    }).catch((err)=>{
        console.error(err)
    })
})

router.post('/blog' , (request, res)=>{
    const blog = new Blog(request.body)
    blog.save()
    .then((result)=>{
        res.redirect('/blog')
    }).catch((err)=>{
        console.error(err)
    })
    // console.log(request.body)
})
router.get('/blog/:id' , (request, res)=>{
    // const  id = request.params.id
    const  id  = "123456789123"
    Blog.findById(id)
    .then((result)=>{
        res.render('detail', {blog : result , title : 'Blog detail'})
    }).catch((err)=>{
        console.error(err)
    })
})

// router.delete('/blog/:id' , (request, res)=>{
//     const id = request.params.id
//     Blog.findByIdAndDelete(id)
//     .then((result)=>{
//         res.json({ redirect : '/blog' })
//     }).catch((err)=>{
//         console.error(err)
//     })
// })

//get req
router.get('/' , (request , res)=>{
    const blogs = [
        // {title : 'doremon' , snippet :  'hoat hinh'},
        // {title : 'dienquang' , snippet :  'siu nhan'},
        // {title : 'xmen' , snippet :  'ao tuong'},
    ]
    // res.render('index' , {title : 'Home' , blogs}); // truyểnn như props
    // res.send('<p>home page</p>')
    // res.sendFile('./views/index.html' , {root : __dirname}) // dạng sendfile
    res.redirect('/blog')
})
router.get('/add-blog' , (request , res)=>{
    const blog =  new Blog({
        title : 'test blog',
        snippet : 'about blog',
        body : 'more about'    
    })
    blog.save()
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.error(err)
    })
    console.log(blog)
})
// app.use((req,res ,next )=>{ ///dùng để hiển thị sau khi tới trang index
//     console.log('middleware');
//     next();
// })

router.get('/about' , (request , res)=>{
    // res.sendFile('./views/about.html' , {root : __dirname})
    res.render('about' , {title : 'About'});
})
//redirect
// app.get('/about-us' , (request , res)=>{
//     res.redirect('/about')
// })
router.get('/blog/create' , (request , res)=>{
    res.render('create' , { title : 'Create'})
})


module.exports = router