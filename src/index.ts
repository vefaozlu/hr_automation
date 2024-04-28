import app from './server/server';
import { configDotenv } from 'dotenv';
configDotenv();

app.listen(3000, () => {       
    console.log('Server listening on port 3000');
});
