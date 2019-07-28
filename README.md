# Express JS Best Practices

1) Project Structure
    Place Holder
2) Check List
   * [x] Setup **.npmrc**
        ```npm config set save=true``` & ```npm config set save-exact=true```
   * [x] Use **helmet** ```npm install helmet```, [Link](https://github.com/helmetjs/helmet)
   * [x] Use **Environment Variables** ```npm install dotenv --save```, [Link](https://github.com/motdotla/dotenv)
   * [x] Handle CORS ```npm install cors --save```, [Link](https://github.com/expressjs/cors)
   * [x] Use mature logger **winston**, ```npm install winston express-winston```, [Link](https://github.com/bithavoc/express-winston)
   * [x] Use **rate-limiter** for _Brute force attacks_, ```npm i --save rate-limiter-flexible```,[Link](https://github.com/animir/node-rate-limiter-flexible) 
   * [x] Implement Graceful shutdowns/exit
   * [x] Use **pm2** in production, [Link](http://pm2.keymetrics.io/)
        ```
        process.on('SIGTERM', () => {
        console.info('SIGTERM signal received.');
        console.log('Closing http server.');
            server.close(() => {
                console.log('Http server closed.');
                mongoose.connection.close(false, () => {
                console.log('MongoDb connection closed.');
                process.exit(0);
                });
            });
        });
        ```
    
