import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';

const DB = 'mongodb+srv://sunidhibhagat13112002:zJ6Z5p7KoewFw1xv@cluster0.aw6mw72.mongodb.net/travel-world-db?retryWrites=true&w=majority'


dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// CORS options
const corsOptions = {
    origin: 'http://localhost:3000', // or your client-side address
    credentials: true
};

// Database connection
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false 
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoute);
app.use('/api/v1/tours', tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);

// Start server
app.listen(port, () => {
    console.log('Server listening on port', port);
});
