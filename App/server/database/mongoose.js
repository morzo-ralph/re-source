const mongoose = require('mongoose');

const uri = "mongodb+srv://Dev1:Dev1@resourcecluster.7j9mt.mongodb.net/MSSE_db"
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/application',
mongoose.connect(uri,
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
