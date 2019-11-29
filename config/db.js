const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async() => {
    try {
        // await mongoose.connect(db, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true
        // });
        await mongoose.connect('mongodb://localhost:27017/myapp', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false

        });
        console.log('Mongodb Connected..');
    } catch(err) {
        console.log(err.message);
        //exit process with failure
        // process.exit(1);
    }
}

module.exports = connectDB;