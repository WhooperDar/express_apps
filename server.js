const express = require('express');
const morgan = require('morgan'); 
const mongoose = require('mongoose'); 
const blogRoutes = require("./routes/blogRoutes");
const Blog = require('./models/blog'); 


// express app 
const app = express();

// connect to mongoDB 
const dbConnection = 'mongodb+srv://gigagbyte:Megabyte.panis101@cluster0.fitqhah.mongodb.net/BlogDB?retryWrites=true&w=majority';
mongoose.connect(dbConnection, { useNewUrlParser: true, useUnifiedTopology: true} ) // db connection to avoid deprecation 
    .then(() => { 
        // server listen after db connection
        app.listen(4000); 
        console.log('connected to db')
    })
    .catch((err) => console.log(err))

// register view engine 
app.set('view engine', 'ejs'); 

// middlewares and static files
app.use(morgan('dev')); 
app.use(express.static('public')); // use static files 
app.use(express.urlencoded({extended: true})); // like a body-parser 

const blogs = [ 
    {title: 'Yoshi finds eggs', snippet: "Lorem ipsum dolor sit amet consectetur"}, 
    {title: 'Mario finds stars', snippet: "Lorem ipsum dolor sit amet consectetur"}, 
    {title: 'How to defeat bowser', snippet: "Lorem ipsum dolor sit amet consectetur"},
    {title: 'How to train your monster', snippet: "Lorem ipsum dolor sit emet consectetur"} 
];


// routing html 
app.get('/', (req, res) => {
    // redirect index. ejs 
    res.redirect('/blogs'); 
});

app.get('/about', (req, res) => {
    // sends about.html relative to ./views
    res.render("about", { title: 'About'} ); 
});


// redirects 
 // redirects from /about-us to /about
app.get("/about-us", (req, res) =>{
    res.redirect("/about"); 
});

 // redirects from /home to / 
app.get("/home", (req, res) => {
    res.redirect("/"); 
})


// mongoose and mongo sandbox routes 
    // save db blog .save()
    app.get('/add-blog', (req, res) => { 
        const blog = new Blog({
            title: "New blog 2", 
            snippet: 'about my new blog.', 
            body: "more about my new blog."
        }); 
    
        blog.save()
            .then((result) => res.send(result))
            .catch((err) => console.log(err))
    });
    
    
    // fetch all blogs (data) using .find()
    app.get('/all-blogs', (req, res) => { 
        Blog.find()
            .then((result) => { res.send(`<h1> ${result[0]} </h1>
                <h1> ${result[1]}</h1>`)})
            .catch((err) => console.log(err)); 
    }); 
    
    app.get('/single-blog', (req, res) => { 
        Blog.findById('6306cac470740f0392062579')
            .then((result) => { res.send(result)})
            .catch((err) => console.log(err)); 
    })
    

// blog routes (with scoping out the route)
app.use("/blogs", blogRoutes); 

// 404 page 
app.use((req, res) => {
    res.status(404).render("404", { title: "Content Not Found"});
}); 

