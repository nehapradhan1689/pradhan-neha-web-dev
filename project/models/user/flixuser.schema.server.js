module.exports = function() {
    //MongoDB has no notion of what schemas are. This is enforced in the application.
    var mongoose = require('mongoose');

    //Good practice to declare one schema per file
    //Primary key is by default managed by the DB.
    var FlixUserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        facebook: {
            token: String,
            id: String,
            displayName: String
        },
        google:{
            id: String,
            token: String
        },
        email: String,
        phone: String,
        dob: Date,
        //Creates a Date object out of the CPU time
        url: String,
        followers:[{userId:String, username:String}],
        following:[{userId:String, username:String}],
        moviesReviewed: [{
            movieId: String,
            movieTitle: String,
            moviePoster: String}],
        watchlist:[{
            apiMovieId: String,
            movieTitle: String,
            moviePoster: String}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.flixuser"});

    return FlixUserSchema;

};