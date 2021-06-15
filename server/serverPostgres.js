require('dotenv').config();
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
//для аунтификации
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "/../build")));

app.use('/api', filmRouter);
app.use(dataBaseRouter);
//для аунтификации
app.use(authRouter);
//Обработка ошибок
app.use(errorHandler);

app.get('/redirectme', function (req, res) {
    res.redirect('/');
})

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', "build", "index.html"))
})

start();
