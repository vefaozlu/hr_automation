import app from './server/server';
import { configDotenv } from 'dotenv';
configDotenv();
import { pgInit } from './database/models/init';

app.listen(process.env.PORT, () => {
    console.log(`Connecting to database...`);
    pgInit();
    console.log(`Database connected!`);

    console.log(`Server listening on port ${process.env.PORT}`);
});
