import dotenv from 'dotenv';
dotenv.config()
import { configs } from '@/configs/env.config';
import app from '@/app';

async function startServer() {
    try {

        // dotenv.config({
        //     path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
        // });


        app.listen(configs.url.port, () => {
            console.log(`Listening on port ${configs.url.port}`);
        });
    } catch (err) {
        console.error("server running error --->", err);
    }
}

startServer();