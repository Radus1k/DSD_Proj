import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {BASE_URL, CONNECTION_STR} from './env';
import {auctionsRouter} from "./src/routes/auction";
import {offerRouter} from "./src/routes/offer";

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use(`${BASE_URL}/auctions`, auctionsRouter);
app.use(`${BASE_URL}/offers`, offerRouter);

mongoose.connect(CONNECTION_STR)
    .then(() => {
        // tslint:disable-next-line:no-console
        console.log('Connection opened')
    }).catch((e) => {
    // tslint:disable-next-line:no-console
    console.log('error', e)
});


app.listen(3000, () => {
    // tslint:disable-next-line:no-console
    console.log('server running on http://localhost:3000');
});

