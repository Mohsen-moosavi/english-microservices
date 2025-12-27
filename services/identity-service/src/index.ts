import dotenv from 'dotenv';
dotenv.config()
import { configs } from '@/configs/env.config';
import { db } from '@/configs/database';
import app from '@/app';

async function startServer() {
    try {

        // dotenv.config({
        //     path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
        // });

        await db.authenticate();


        app.listen(configs.url.port, () => {
            console.log(`Listening on port ${configs.url.port}`);
        });
    } catch (err) {
        console.error("server running error --->", err);
        await db.close();

    }
}

startServer();