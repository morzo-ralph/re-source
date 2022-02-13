const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/application',
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
