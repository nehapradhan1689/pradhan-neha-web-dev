(function() {
    angular
        .module("Flix")
        .factory("FlixService", FlixService);

    //var apiKey = process.env.TMDB_API_KEY;
    var urlBase = "https://api.themoviedb.org/3/SEARCH_TERM?api_key=d7ea3d2369812580c63ec5118566acd1"

    function FlixService($http) {
        var api = {
            getUpcomingMovies: getUpcomingMovies,
            getNowPlaying: getNowPlaying,
            getAllGenres: getAllGenres,
            searchMovies: searchMovies,
            getMovieInfo: getMovieInfo,
            getCastProfile: getCastProfile,
            addMovie: addMovie,
            findMovieById: findMovieById,
            findMovieByApiMovieId: findMovieByApiMovieId,
            findMovieByTitle: findMovieByTitle,
            findAllMovies: findAllMovies,
            updateMovie: updateMovie,
            deleteMovie: deleteMovie
        };
        return api;

        function getUpcomingMovies(searchTerm) {

            var url = urlBase.replace("SEARCH_TERM", searchTerm);
            return $http.get(url);
        }

        function getNowPlaying(searchTerm) {
            var url = urlBase.replace("SEARCH_TERM", searchTerm);
            //console.log(url);
            return $http.get(url);
        }

        function getAllGenres() {
            var url = urlBase.replace("SEARCH_TERM", "genre/movie/list");
            return $http.get(url);
        }

        function searchMovies(queryTerm) {
            var url = urlBase.replace("SEARCH_TERM", "search/movie") + "&query=" + queryTerm;
            return $http.get(url);

        }

        function getMovieInfo(movieId) {
            var url =
                urlBase
                    .replace("SEARCH_TERM", "movie/" + movieId) + "&append_to_response=videos,credits,reviews,similar";
            return $http.get(url);
        }

        function getCastProfile(castId) {
            var url =
                urlBase
                    .replace("SEARCH_TERM", "person/" + castId) + "&append_to_response=movie_credits";
            return $http.get(url);
        }

        function addMovie(movie) {
            var url = "/api/movie";
            return $http.post(url, movie);
        }

        function findMovieById(movieId) {
            var url = "/api/movie/" + movieId;
            return $http.get(url);
        }

        function findMovieByApiMovieId(apiMovieId) {
            var url = "/api/movie?api_movie_id=" + apiMovieId;
            return $http.get(url);
        }

        function findMovieByTitle(title) {
            var url = "/api/movie?title=" + title;
            return $http.get(url);
        }

        function findAllMovies() {
            var url = "/api/movie"
            return $http.get(url);
        }

        function updateMovie(movieId, movie) {
            var url = "/api/movie/" + movieId;
            return $http.put(url, movie);
        }

        function deleteMovie(request, response) {
            var url = "/api/movie"
            return $http.delete(url, movie);
        }
    }
})();