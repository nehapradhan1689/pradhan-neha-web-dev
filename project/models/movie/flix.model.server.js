//Gives a high level API to interact with the DB. Only DB operations should be done here.
module.exports = function() {

    var mongoose = require('mongoose');

    var FlixSchema = require("./flix.schema.server.js")();

    //This User object is the one that allows to actually create an instance of a User to write to the DB.
    var FlixMovie = mongoose.model("FlixMovie", FlixSchema);

    var api = {
        addMovie: addMovie,
        findAllMovies: findAllMovies,
        findMovieById: findMovieById,
        findMovieByApiMovieId: findMovieByApiMovieId,
        findMovieByTitle: findMovieByTitle,
        updateMovie: updateMovie,
        deleteMovie: deleteMovie

    };
    return api;

    function addMovie(movie) {
        return FlixMovie.create(movie);
    }

    function findAllMovies() {
        return FlixMovie.find();
    }
    
    function findMovieById(movieId) {
        return FlixMovie.findById(movieId);
    }

    function findMovieByApiMovieId(apiMovieId) {
        return FlixMovie.findOne({apiMovieId: apiMovieId});
    }

    function findMovieByTitle(movieTitle) {
        return FlixMovie.findOne({movieTitle: movieTitle});
    }

    // function findFacebookUser(id) {
    //     return User.findOne({"facebook.id": id});
    // }

    function updateMovie(movieId, updatedMovie) {
        delete updatedMovie._id;
        return FlixMovie.update({"_id": movieId}, {
            $set: updatedMovie
        });
    }

    function deleteMovie(movieId) {
        return FlixMovie.remove({_id: movieId});
    }
};