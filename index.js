const express = require('express')
const app = express();
const adminRoute = require('./routes/adminRoute')

require('./model/dbConnect')
require('dotenv').config()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/admin', adminRoute)


app.use((err, req, res, next) => {
    if (err.status === 401) {
        res.status(401).send({
            error: {
                status: 401,
                message: 'Unauthorized invalid username/password'
            }
        })
    } else {
        res.status(err.status || 500).send({
            error: {
                status: err.status || 500,
                message: err.message || 'Internal Server Error'
            }
        });
    }
});

app.use(async(req, res, next)=> {
    next(createHttpError.NotFound())
})



app.listen(process.env.port || 4000, function () {
    console.log('Now listening for requests on : http://localhost:4000');
});