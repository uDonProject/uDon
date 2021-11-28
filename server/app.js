import express from 'express';
import cors from 'cors';
import mainRouter from './router/mainRouter.js'

const app = express();

app.use(cors());

app.use('/',mainRouter)

app.listen(3001, ()=> {
    console.log('server running port:3001');
})