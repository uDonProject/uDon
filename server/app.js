import express from 'express';
import cors from 'cors';
import mainRouter from './router/mainRouter.js'
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session'
import bodyParser from 'body-parser'
import passportInput from './passportConfig.js';

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));


app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: false,
    maxAge: 24 * 60 * 60 * 1000,
}))


app.use(cookieParser("secretcode"))

app.use(passport.initialize())
app.use(passport.session())
app.use('/', mainRouter)

passportInput(passport)

app.listen(3001, () => {
    console.log('server running port:3001');
})

