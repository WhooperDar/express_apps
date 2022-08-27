const express = require('express')
const mongoose = require('mongoose'); 
const { articleData, teamData } = require("./blogData") 
const LoginRoutes = require("./routes/loginRoutes"); 

const app = express();
// register view engine 
app.set('view engine', 'ejs');

// db URI 
const dbResto = "mongodb+srv://gigagbyte:Megabyte.panis101@cluster0.fitqhah.mongodb.net/RestoDB?retryWrites=true&w=majority";
mongoose.connect(dbResto, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {   
        // listen to port:2000 
        app.listen(2000);
        console.log("connected to dB"); 
    })
    .catch((err) => { 
        console.log(err); 
    })

 


// routes 
    // root dir
    
    app.get('/', (req, res) => { 
        res.render('home', { articleData, title: "Home"})
    })

    // about dir 
    app.get('/about', (req, res) => {
        res.render('about', { teamData, title: "About Me"})
    })

    // recipes dir
    app.get('/recipes', (req, res) => {
        res.render('recipes', { title: "Recipes"})
    })

    // start here dir 
    app.get('/start-here', (req, res) => {
        res.render('startHere', { title: "Start Here"})
    })
    // blog dir 
    app.get('/blogs', (req, res) => {
        res.render('blogs', {title: "Blogs"})  
    })


app.use(LoginRoutes); 
// 404 
app.use((req, res) => { 
    res.render('404'); 
})

// redirectories 
app.get('/home', (req, res) => {
    res.setHeader('Location', '/'); 
})