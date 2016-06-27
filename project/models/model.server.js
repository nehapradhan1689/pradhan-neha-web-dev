//Entry point for interacting with the DB
module.exports = function() {

    var connectionString = 'mongodb://127.0.0.1:27017/test';

    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    var mongoose = require("mongoose");
    mongoose.createConnection(connectionString);

    var models = {
        flixUserModel: require("./user/flixuser.model.server.js")(),
        flixMovieModel: require("./movie/flix.model.server.js")(),
        reviewModel: require("./review/review.model.server.js")()
    };
    return models;
};