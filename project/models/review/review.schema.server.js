module.exports = function() {
    //MongoDB has no notion of what schemas are. This is enforced in the application.
    var mongoose = require('mongoose');
    var FlixSchema = require("../movie/flix.schema.server")();
    var FlixUserSchema = require("../user/flixuser.schema.server")();

    //Good practice to declare one schema per file
    //Primary key is by default managed by the DB.
    var ReviewSchema = mongoose.Schema({
        title: String,
        description: String,
        apiMovieId: String,
        movieTitle: String,
        moviePoster: String,
        user: {
            userId:String,
            username: String
        },
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.review"});

    return ReviewSchema;

};