(function() {
    angular
        .module("Flix")
        .controller("SearchResultController", SearchResultController);

    //$routeParams is a map of all the path parameters or query strings in the URL which can be retrieved by name.
    function SearchResultController($routeParams, FlixService, $location, $rootScope, FlixUserService) {
        var vm = this;
        vm.query = $routeParams.searchText;
        var movies = [];
        vm.getGenreName = getGenreName;
        vm.getMovieDetails = getMovieDetails;
        vm.searchMovies = searchMovies;
        vm.logout = logout;

        
        function init() {
            FlixService
                .searchMovies(vm.query)
                .then(
                    function(response) {
                        var resultSet = response.data.results;
                        vm.length = resultSet.length;
                        for(var i in resultSet) {
                            if(resultSet[i].poster_path != null){
                                var imageURL = "https://image.tmdb.org/t/p/w500" + resultSet[i].poster_path;
                            }
                            else {
                                var imageURL = "http://www.baxter.com/assets/images/products/Renal/thumb_image_not_available.png";
                            }

                            resultSet[i].poster_path = imageURL;
                            movies.push(resultSet[i]);
                        }
                        vm.movies = movies;
                    },
                    function(error) {
                        vm.error = "Sorry! An error was encountered";
                    }
                );
            FlixService
                .getAllGenres()
                .then(
                    function(response) {
                        vm.genres = response.data.genres;
                    },
                    function(error) {
                        vm.error = "Unable to retrieve genres";
                    }
                );
            FlixUserService
                .loggedIn()
                .then(
                    function(response) {
                        var user = response.data;
                        if(user._id) {
                            vm.user = user;
                        }
                        else {
                            vm.user = null;
                        }
                    },
                    function(error) {
                        vm.error = "Could not check if user is logged in";
                    }
                );
            console.log(vm.user);
        }
        init();

        function logout() {

            FlixUserService
                .logout()
                .then(
                    function(response){
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function(error) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                );
        }

        function getGenreName(genreId) {
            for(var i in vm.genres) {
                if(vm.genres[i].id == genreId) {
                    return vm.genres[i].name;
                }
            }
        }
        
        function getMovieDetails(movieId) {
            $location.url("/movie/" + movieId);
        }

        function searchMovies(searchText) {
            $location.url("/search/" + searchText);
        }

    }
})();
