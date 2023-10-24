const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI; // ตรวจสอบว่าตัวแปร MONGODB_URI ถูกต้องหรือไม่
        if (!uri) {
            throw new Error('Missing MongoDB URI');
        }
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database Connected');
    } catch (error) {
        console.error('Error connecting to database:', error.message);
    }
};

module.exports = connectDB;