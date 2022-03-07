const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/application',
mongoose.connect( `${process.env.MONGO_URI}` ,
{
    //promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    useUnifiedTopology: true
    //useFindAndModify: false,
    //retryWrites: true,
    //w: "majority",
})
    .then(() => console.log("Database Connected"))
    .catch((error) => console.log(error));

module.exports = mongoose;
