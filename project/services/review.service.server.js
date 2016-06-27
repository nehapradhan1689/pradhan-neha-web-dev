module.exports = function(app, models) {

    var reviewModel = models.reviewModel;

    app.post("/api/review", createReview); //apiMovieId
    app.get("/api/review/:reviewId", findReviewById);
    app.get("/api/review", getReview);
    app.put("/api/review/:reviewId", updateReview);
    app.delete("/api/review/:reviewId", deleteReview);


    function getReview(request, response) {
        var movieId = request.query['movie_id'];
        var apiMovieId = request.query['api_movie_id'];
        var userId = request.query['user_id'];

        if(movieId) {
            findReviewByMovieId(movieId, response);
        }
        else if(apiMovieId) {
            findReviewByApiMovieId(apiMovieId, response);
        }
        else if(userId) {
            findReviewByUserId(userId, response);
        }
        else {
            findAllReviews(response);
        }
    }

    function createReview(request, response) {
        var review = request.body;
        reviewModel
            .createReview(review)
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

    function findReviewById(request, response) {
        var movieId = request.params.reviewId;

        reviewModel
            .findReviewById(reviewId)
            .then(
                function(review) {
                    response.json(review);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            );
    }

    function findReviewByMovieId(movieId, response) {

        reviewModel
            .findReviewByMovieId(movieId)
            .then(
                function(review) {
                    response.json(review);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            );
    }

    function findReviewByApiMovieId(apiMovieId, response) {

        reviewModel
            .findReviewByApiMovieId(apiMovieId)
            .then(
                function(review) {
                    response.json(review);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            );
    }

    function findReviewByUserId(userId, response) {

        reviewModel
            .findReviewByUserId(userId)
            .then(
                function(review) {
                    response.json(review);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            );
    }

    function findAllReviews(response) {

        reviewModel
            .findAllReviews()
            .then(
                function(movie) {
                    response.json(movie);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            );
    }

    function updateReview(request, response) {
        var reviewId= request.params.reviewId;
        var movieId = request.params.movieId;
        var userId = request.params.userId;
        var updatedMovie = request.body;

        reviewModel
            .updateReview(reviewId, updatedMovie)
            .then(
                function(stat) {
                    response.send(200);
                },
                function(error) {
                    response.statusCode(404).send(error);
                }
            );
    }

    function deleteReview(request, response) {
        var reviewId= request.params.reviewId;

        reviewModel
            .deleteReview(reviewId)
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