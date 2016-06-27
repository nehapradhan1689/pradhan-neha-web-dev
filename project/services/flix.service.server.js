module.exports = function(app, models) {

    var flixMovieModel = models.flixMovieModel;

    app.post("/api/movie", addMovie);
    app.get("/api/movie/:movieId", findMovieById);
    app.get("/api/movie", getMovie);
    app.put("/api/movie/:movieId", updateMovie);
    app.delete("/api/movie/:movieId", deleteMovie);


    function getMovie(request, response) {
        var apiMovieId = request.query['api_movie_id'];
        var title = request.query['title'];

        if(apiMovieId) {
            findMovieByApiMovieId(apiMovieId, response);
        }
        else if(title) {
            findMovieByTitle(title, response);
        }
        else {
            findAllMovies(response);
        }
    }

    function addMovie(request, response) {
        var movie = request.body;
        
        flixMovieModel
            .addMovie(movie)
            .then(
                function(movie) {
                    // console.log(user);
                    response.json(movie);
                },
                function(error) {
                    response.statusCode(400).send(error);
                }
            );
    }

    function findMovieById(request, response) {
        var movieId = request.params.movieId;

        flixMovieModel
            .findMovieById(movieId)
            .then(
                function(movie) {
                    response.json(movie);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            );
    }

    function findMovieByApiMovieId(apiMovieId, response) {

        flixMovieModel
            .findMovieByApiMovieId(apiMovieId)
            .then(
                function(movie) {
                    response.json(movie);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            );
    }

    function findMovieByTitle(title, response) {

        flixMovieModel
            .findMovieByTitle(title)
            .then(
                function(movie) {
                    response.json(movie);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            );
    }

    function findAllMovies(response) {

        flixMovieModel
            .findAllMovies()
            .then(
                function(movie) {
                    response.json(movie);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            );
    }

    function updateMovie(request, response) {
        var movieId = request.params.movieId;
        var updatedMovie = request.body;

        flixMovieModel
            .updateMovie(movieId, updatedMovie)
            .then(
                function(stat) {
                    response.send(200);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            );
    }

    function deleteMovie(request, response) {
        var movieId = request.params.movieId;

        flixMovieModel
            .deleteMovie(movieId)
            .then(
                function(stats) {
                    //console.log(stats);
                    response.send(200);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            );
    }
};