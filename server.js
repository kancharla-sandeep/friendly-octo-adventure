const express = require('express');

const hbs = require('hbs');

const fs = require('fs');

var app = express();

// registerpartials are like components which written can be used at many places
hbs.registerPartials(__dirname + '/views/partials');

//registerHelpers are functions which can be called from hbs files
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

//app.use is used to set middleware 
// next is used to tell when ur midddleware function is done if next is not specified then the next functionality gets stopped
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) console.log('Unable to append to server.log');
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'welcome to my website',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
})

app.listen(8080);