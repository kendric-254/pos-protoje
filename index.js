const express = require('express');
const app = express();
const adminRoute = require('./routes/adminRoute'); // Admin routes
const userRoute = require('./routes/userRoute'); // User routes
const saleRoute = require('./routes/saleRoute'); // Sales routes
const productRoute = require('./routes/productRoute'); // Product routes
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
require('./model/dbConnect'); // Database connection

const limiter = rateLimit({
    max: 300,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(helmet());
app.use('/api', limiter);
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/admin', adminRoute); // Admin routes
app.use('/api/user', userRoute); // User routes
app.use('/api/sale', saleRoute); // Sales routes
app.use('/api/product', productRoute); // Product routes

// Error Handling Middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        error: {
            status: err.status || 500,
            message: err.message || 'Internal Server Error'
        }
    });
});

// 404 Handler
app.use((req, res, next) => {
    res.status(404).send({ error: 'Not Found' });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Now listening for requests on: http://localhost:${PORT}`);
});
