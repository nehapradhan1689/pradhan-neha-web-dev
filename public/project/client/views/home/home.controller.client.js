(function() {
    angular
        .module("Flix")
        .controller("HomeController", HomeController);

    //$routeParams is a map of all the path parameters or query strings in the URL which can be retrieved by name.
    function HomeController($routeParams, FlixService, $location, $rootScope, FlixUserService) {
        var vm = this;
        vm.searchMovies = searchMovies;
        vm.getMovieDetails = getMovieDetails;
        vm.getGenreName = getGenreName;
        vm.logout = logout;


        var movieImages = [];
        var upComingMovies = [];


        function init() {
            FlixService
                .getUpcomingMovies("movie/upcoming")
                .then(
                    function(response) {
                        var resultSet = response.data.results;
                        for(var i in resultSet) {
                            if(resultSet[i].poster_path != null) {
                                var imageURL = "https://image.tmdb.org/t/p/w500" + resultSet[i].poster_path;
                            }
                            else {
                                var imageURL = "http://www.baxter.com/assets/images/products/Renal/thumb_image_not_available.png";
                            }
                            resultSet[i].poster_path = imageURL;
                            upComingMovies.push(resultSet[i]);
                        }
                        vm.upcomingMovies = upComingMovies;
                        //console.log(vm.upcomingMovies);
                    }
                );

            FlixService
                .getNowPlaying("movie/now_playing")
                .then(
                    function(response) {
                        var resultSet = response.data.results;
                        for(var i in resultSet) {
                            if(resultSet[i].backdrop_path != null) {
                                movieImages.push("https://image.tmdb.org/t/p/w500" + resultSet[i].backdrop_path);
                            }
                        }
                        vm.movieImages=movieImages;
                    },
                    function(error) {
                        vm.error = "Unable to retrive movies"
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
                            for(var i in vm.user.watchlist) {
                                if(vm.user.watchlist[i].apiMovieId == vm.movieId) {
                                    vm.isInWatchList = true;
                                    break;
                                }
                            }
                        }
                        else {
                            vm.user = null;
                        }
                    },
                    function(error) {
                        vm.error = "Could not check if user is logged in";
                    }
                );



            $('.carousel').carousel({
                interval: 4000
            });
            $('.carousel-control.left').click(function() {
                $('#myCarousel').carousel('prev');
            });
            $('.carousel-control.right').click(function() {
                $('#myCarousel').carousel('next');
            });
        }
        init();

        function searchMovies(searchText) {
            $location.url("/search/" + searchText);
        }
        
        function getMovieDetails(movieId) {
            $location.url("/movie/" + movieId)
        }

        function getGenreName(genreId) {
            for(var i in vm.genres) {
                if(vm.genres[i].id == genreId) {
                    return vm.genres[i].name;
                }
            }
        }

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

    }
})();