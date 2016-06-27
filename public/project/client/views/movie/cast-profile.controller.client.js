(function() {
    angular
        .module("Flix")
        .controller("CastProfileController", CastProfileController);

    //$routeParams is a map of all the path parameters or query strings in the URL which can be retrieved by name.
    function CastProfileController($routeParams, $sce, FlixService, $location, $rootScope, FlixUserService) {
        var vm = this;
        vm.castId = $routeParams.castId;
        vm.getMovieInfo = getMovieInfo;
        vm.searchMovies = searchMovies;
        vm.logout = logout;

        function init() {
            FlixService
                .getCastProfile(vm.castId)
                .then(
                    function(response) {
                        if(response.data.profile_path != null) {
                            response.data.profile_path =
                                "https://image.tmdb.org/t/p/w500" + response.data.profile_path;
                        }
                        else {
                            response.data.profile_path =
                                "http://www.baxter.com/assets/images/products/Renal/thumb_image_not_available.png";
                        }
                        response.data.movie_credits.cast.splice(10, response.data.movie_credits.cast.length - 10);
                        for(var i in response.data.movie_credits.cast) {
                            response.data.movie_credits.cast[i].poster_path = 
                                "https://image.tmdb.org/t/p/w500" + response.data.movie_credits.cast[i].poster_path;
                        }

                        vm.person = response.data;
                        console.log(vm.person);
                    },
                    function(error) {
                        vm.error = "Sorry! Couldn't find person details";
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
                    }
                );
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

        // function getSafeUrl(url) {
        //     return $sce.trustAsResourceUrl(url);
        // }

        function searchMovies(searchText) {
            $location.url("/search/" + searchText);
        }

        function getMovieInfo(movieId) {
            $location.url("/movie/" + movieId);
        }
    }
})();

