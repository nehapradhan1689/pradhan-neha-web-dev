(function() {
    angular
        .module("Flix")
        .factory("ReviewService", ReviewService);

    //var apiKey = process.env.TMDB_API_KEY;


    function ReviewService($http) {
        var api = {
            createReview: createReview,
            findReviewById: findReviewById,
            findReviewByMovieId: findReviewByMovieId,
            findReviewByApiMovieId: findReviewByApiMovieId,
            findReviewByUserId: findReviewByUserId,
            findAllReviews: findAllReviews,
            updateReview: updateReview,
            deleteReview: deleteReview
        };
        return api;

        function createReview(review) {
            var url = "/api/review";
            //console.log(review);
            return $http.post(url, review);
        }

        function findReviewById(reviewId) {
            var url = "/api/review/" + reviewId;
            return $http.get(url);
        }

        function findReviewByMovieId(movieId) {
            var url = "/api/review?movie_id" + movieId;
            return $http.get(url);
        }

        function findReviewByApiMovieId(apiMovieId) {
            var url = "/api/review?api_movie_id=" + apiMovieId;
            return $http.get(url);
        }

        function findReviewByUserId(userId) {
            var url = "/api/review?user_id=" + userId;
            return $http.get(url);
        }

        function findAllReviews() {
            var url = "/api/review";
            return $http.get(url);
        }

        function updateReview(reviewId, review) {
            var url = "/api/review/" + reviewId;
            return $http.put(url, review);
        }

        function deleteReview(reviewId) {
            var url = "/api/review/" + reviewId;
            return $http.delete(url);
        }
    }
})();