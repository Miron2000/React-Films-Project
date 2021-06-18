require('dotenv').config();
const {User} = require('./models/models');
const filmRouter = require('./routes/filmRoutes');
const dataBaseRouter = require('./routes/dataBaseRoutes');
const authRouter = require('./routes/authRoutes');
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const initializePassport = require('./passport-config');
const methodOverride = require('method-override');
const morgan = require('morgan');
const fs = require('fs');
const PORT = process.env.PORT || 5000;

const app = express();

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`SERVER IS RUNNING ON THE ${PORT} PORT`));
    } catch (err) {
        console.log(err);
    }
}
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('combined'));
//для аунтификации
app.use(flash());
app.use(session({
    secret: 'Miron',
    resave: false,
    saveUninitialized: false
}));

initializePassport(
    passport,
    email => User.findOne({where: {email: email}}),
    id => User.findOne({where: {id: id}})
)
app.use(passport.initialize());
app.use(passport.session());



app.use(express.static(path.join(__dirname, "/../build")));

app.use('/api', filmRouter);
app.use(dataBaseRouter);
//для аунтификации
app.use(authRouter);

//для виходу з аккаунту
app.use(methodOverride('_method'))
//Обработка ошибок
app.use(errorHandler);

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});

app.get('/film/:id', function (req, res) {
    res.redirect('/');
})

app.get('*', function (req, res) {
    // res.sendFile(path.join(__dirname, '..', "build", "index.html"));

    const indexFile = path.resolve('../build/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send(err.message);
        }

        let user = JSON.stringify({userId: null});
        if(req.session.passport){
            user = JSON.stringify({userId: req.session.passport.user});
        }

        return res.send(
            data.replace('<div id="root"></div>', `<div id="root"></div> <script>window.USER_DATA=JSON.parse('${user}')</script>`)
        );
    });
})

start();
