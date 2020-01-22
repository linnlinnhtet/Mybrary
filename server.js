if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

//Import index route from router folder
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/author');

//Ejs Setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layouts', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

//Mongoose connection
const mongoose = require('mongoose');
// mongoose.connect(process.env.DATABASE_URL, {
//     useNewUrlParser: true
// });
// const db = mongoose.connection
// db.on('error', (error) => {
//     console.error(error);
// });
// db.once('open', () => {
//     console.log("Connected to mongoose");
// })
mongoose.connect('mongodb+srv://MyMongoDBUser:MyMongoDBUser1995@gettingstarted-v1ey5.mongodb.net/mybrary', {
    useNewUrlParser: true
});

app.use('/', indexRouter);
app.use('/authors', authorRouter);

app.listen(process.env.PORT || 3000);