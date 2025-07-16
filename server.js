require('dotenv').config({path: './config.env'});
const app = require('./app');

const PORT = process.env.PORT_NUMBER;

app.listen(PORT, () => {
    console.log('Listening to requests on PORT:' + PORT);
})