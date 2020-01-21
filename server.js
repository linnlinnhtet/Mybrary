if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

//Import index route from router folder
const indexRouter = require('./routes/index');

//Ejs Setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layouts', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

//Mongoose connection
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
});
const db = mongoose.connection
db.on('error', (error) => {
    console.error(error);
});
db.once('open', () => {
    console.log("Connected to mongoose");
})

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000);