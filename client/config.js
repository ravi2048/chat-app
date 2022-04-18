const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    env: {
        REACT_APP_API_HOST: process.env.REACT_APP_API_HOST,
    }
}