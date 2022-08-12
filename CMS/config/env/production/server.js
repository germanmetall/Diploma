module.exports = ({ env }) => ({
    url: env('MY_HEROKU_URL'),
    host: env('HOST', 'polonska-diploma.herokuapp.com'),
    port: env.int('PORT', 1337),
});