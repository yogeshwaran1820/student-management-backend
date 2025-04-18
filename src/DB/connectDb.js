const mongoose = require('mongoose');

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.DB, {
            dbName: 'student-management'
        });
        console.log('successfully connected to DB')
    } catch(err){
        console.log('error:', err)
    }
   
}

module.exports = connectDb