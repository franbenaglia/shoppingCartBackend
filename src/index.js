
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');

const productRoute = require('./routes/product');
const itemProductRoute = require('./routes/itemsProduct');
const salesRoute = require('./routes/sales');

const stockRoute = require('./routes/stock');

const emailRoute = require('./routes/email');
const stripeRoute = require('./routes/stripe');
const googleOauth2Route = require('./routes/googleoauth2.js');
const authRouter = require('./security/auth.js');
const dotenv = require('dotenv');
const cookieSession = require('cookie-session');
const passport = require('./security/passport.js');
const PORT = require('./config/constants').PORT;
const session = require('express-session');

//const job = require('./process/scheduledTask');


dotenv.config();

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const whitelist = ['http://localhost:3100', 'http://localhost:4200', 'http://localhost:8500', 'http://localhost:8100',];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    //credentials: true
}

app.use(cors(corsOptions));
//app.use(cors());

app.use(session({
    secret: 'thesessionsecret',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Mongodb database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.use((req, res, next) => {
    //res.append('Access-Control-Allow-Credentials', true);
    //res.header('Access-Control-Allow-Credentials', true);
    //res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//job.job();

app.use('/user', userRoute);

app.use('/sales', salesRoute);

app.use('/product', productRoute);

app.use('/stock', stockRoute);

app.use('/itemproduct', itemProductRoute);

app.use('/payment', stripeRoute);

app.use('/email', emailRoute);

app.use("/api/v1/auth", authRouter);

app.use('/googleoauth2', googleOauth2Route);

app.get('/', (req, res) => {
    res.json({ "message": "Hello appointment client" });
});

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});