module.exports = function() {
    //MongoDB has no notion of what schemas are. This is enforced in the application.
    var mongoose = require('mongoose');
    //var ReviewSchema = require("../review/review.schema.server")();

    //Good practice to declare one schema per file
    //Primary key is by default managed by the DB.
    var FlixSchema = mongoose.Schema({
        apiMovieId: String,
        movieTitle: String,
        moviePoster: String,
        reviews: [{reviewId: String}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.flix"});

    return FlixSchema;

};