(function() {
    angular
        .module("Flix")
        .controller("MovieDetailsController", MovieDetailsController);

    //$routeParams is a map of all the path parameters or query strings in the URL which can be retrieved by name.
    function MovieDetailsController($routeParams, $sce, FlixService, FlixUserService, ReviewService, $location, $rootScope) {
        var vm = this;
        vm.movieId = $routeParams.movieId;
        var movie;
        var videoURL = [];
        var embedUrl = "https://www.youtube.com/embed/";
        vm.getMovieInfo = getMovieInfo;
        vm.getCastProfile = getCastProfile;
        vm.searchMovies = searchMovies;
        vm.createReview = createReview;
        vm.updateReview = updateReview;
        vm.deleteReview = deleteReview;
        var userReviewExists = false;
        vm.editReview = editReview;
        vm.cancelReview = cancelReview;
        vm.getUserProfile = getUserProfile;
        // vm.isInWatchList = false;
        vm.addMovieToWatchList = addMovieToWatchList;
        vm.removeMovieFromWatchList = removeMovieFromWatchList;
        vm.logout = logout;

        vm.edit = false;

        function init() {
            vm.defReview = {
                title: "",
                comment: ""
            };
            vm.isInWatchList = false;
            FlixService
                .getMovieInfo(vm.movieId)
                .then(
                    function(response) {
                        if(response.data.poster_path != null) {
                            var imageURL = "https://image.tmdb.org/t/p/w500" + response.data.poster_path;
                        }
                        else {
                            var imageURL =
                                "http://www.baxter.com/assets/images/products/Renal/thumb_image_not_available.png";
                        }
                        response.data.poster_path = imageURL;
                        if(response.data.videos != null) {
                            for(var i in response.data.videos.results) {
                                var url = embedUrl + response.data.videos.results[i].key;
                                //console.log($sce.trustAsResourceUrl(url));
                                videoURL.push($sce.trustAsResourceUrl(url));
                            }
                            response.data.videoURL = videoURL;
                        }
                        response.data.credits.cast.splice(10, response.data.credits.cast.length - 10);
                        for(var j in response.data.credits.cast){
                            response.data.credits.cast[j].castImageURL =
                                "https://image.tmdb.org/t/p/w92" + response.data.credits.cast[j].profile_path;
                        }
                        response.data.similar.results.splice(10, response.data.similar.results.length - 10);
                        for(var k in response.data.similar.results){
                            response.data.similar.results[k].similarImageURL =
                                "https://image.tmdb.org/t/p/w500" + response.data.similar.results[k].poster_path;
                        }

                        response.data.appReviews = response.data.reviews.results;
                        response.data.similarMovies = response.data.similar.results;

                        //--------------------------Assigning movie instance to this object--------------------------//
                        vm.movie = response.data;


                        //console.log(vm.movie);
                        //console.log(vm.movie);


                    },
                    function(error) {
                        vm.error = "Sorry! Couldn't find movie details"
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

            ReviewService
                .findReviewByApiMovieId(vm.movieId)
                .then(
                    function(response) {
                        vm.reviews = response.data;
                        //console.log(vm.reviews);
                        // var reviews = response.data;
                        // if(reviews!=null) {
                        //     vm.reviews = reviews;
                        // }
                        // else {
                        //     vm.error = "Error in finding reviews for movie";
                        // }
                },
                function(error) {
                    vm.error = "Error in finding reviews for movie";
                });

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

        function getMovieInfo(movieId) {
            $location.url("/movie/" + movieId);
        }

        function getCastProfile(castId) {
            $location.url("/cast/" + castId);
        }

        function searchMovies(searchText) {
            $location.url("/movie/" + searchText);
        }

        function createReview(reviewTitle, reviewComment) {
            //console.log(reviewComment);
            if(reviewComment == null || reviewComment == "") {
                vm.error = "Please enter review comment";
            }
            else {
                //Check if user is logged in, if user is logged in, allow to comment
                //console.log(vm.user);
                if(vm.user) {
                    var moviesReviewed = vm.user.moviesReviewed;
                    for(var i in moviesReviewed) {
                        //Check if user has already reviewed the movie, if yes then do not allow
                        if(moviesReviewed[i].movieId == vm.movieId) {
                            userReviewExists = true;
                            break;
                        }
                    }
                    if(userReviewExists) {
                        vm.error = "You have already reviewed this movie. Please update posted review";
                        //return;
                    }
                    else {
                        //If this is his first review for the movie, create new review and update
                        //user's list of reviewed movies

                        // console.log(vm.user);

                        var reviewToCreate = {
                            title: reviewTitle,
                            description: reviewComment,
                            apiMovieId: vm.movieId,
                            movieTitle:vm.movie.title,
                            moviePoster: vm.movie.poster_path,
                            user: {
                                userId: vm.user._id,
                                username: vm.user.username
                            }
                    };
                        createNewUserReview(reviewToCreate);
                    }
                }
                //If user is not logged in, prompt for login
                else {
                    vm.error = "Please login to review";
                }
            }
        }

        function createNewUserReview(reviewToCreate) {
            //console.log(reviewToCreate);
            ReviewService
                .createReview(reviewToCreate)
                .then(
                    function(response) {
                        var review = response.data;
                        // console.log(review);
                        if(review._id) {
                            console.log("hello");
                            createOrUpdateReviewInMovie(review);
                            updateReviewsInUser();
                            console.log("hello1");
                            init();
                        }
                        else {
                            vm.error = "Error in creating review";
                        }
                    },
                    function(error) {
                        vm.error = "Could not create review";
                    }
                );
        }

        function createOrUpdateReviewInMovie(review) {

            var newReview = {
                reviewId: review._id
            }

            //Check if movie instance is present in DB
            FlixService
                .findMovieByApiMovieId(vm.movieId)
                .then(
                    function(response) {
                        var movieCheck = response.data;
                        //If movie is already in DB, update the reviews field
                        if(movieCheck != null) {
                            movieCheck.reviews.push(newReview);
                            FlixService
                                .updateMovie(movieCheck._id, movieCheck)
                                .then(
                                    function(response) {},
                                    function(error) {
                                        vm.error = "Error in updating review details in movie";
                                    }
                                );
                        }
                        //If movie is not present in the DB create a new entry for the movie
                        else {
                            var newMovieEntry ={
                                apiMovieId: vm.movieId,
                                movieTitle: vm.movie.title,
                                moviePoster: vm.movie.moviePoster,
                                reviews: newReview
                            }
                            FlixService
                                .addMovie(newMovieEntry)
                                .then(
                                    function(response) {},
                                    function(error) {
                                        vm.error = "Could not create new movie entry";
                                    }
                                );
                        }
                    },
                    function(error) {
                        vm.error = "Error in find operation";
                    }
                );
        }

        function updateReviewsInUser(){
            var updatedUser = vm.user;
            var movieReviewed = {
                movieId: vm.movieId,
                movieTitle: vm.movie.title,
                moviePoster: vm.movie.poster_path
            };
            updatedUser.moviesReviewed.push(movieReviewed);
            //Update user's list of reviewed movies
            FlixUserService
                .updateUser(updatedUser._id, updatedUser)
                .then(
                    function(response) {
                        var afterReviewedUser = response.data;
                        if(afterReviewedUser) {
                            init();
                        }
                        else {
                            vm.error = "Could not update review for user";
                        }
                    },
                    function(error) {
                        vm.error = "Could not update review for user due to server error";
                    }
                );
        }

        function updateReview(reviewId, reviewTitle, reviewComment) {
            if(reviewComment == null || reviewComment == "") {
                vm.error = "Please enter review comment";
            }
            else {
                var updatedReview = {
                    title: reviewTitle,
                    description: reviewComment,
                    apiMovieId: vm.movieId,
                    movieTitle: vm.movie.title,
                    moviePoster: vm.movie.poster_path,
                    user: {
                        userId: vm.user._id,
                        username: vm.user.username
                    }
                }
                ReviewService
                    .updateReview(reviewId, updatedReview)
                    .then(
                        function(stat) {
                            init();
                        },
                        function(error) {
                            vm.error = "Error in updating review";
                        }
                    );
                vm.edit = false;
            }
        }

        function deleteReview(reviewId) {
            ReviewService
                .deleteReview(reviewId)
                .then(
                    function(stat) {
                        //Delete from user and movie too
                        deleteReviewFromMovie(reviewId);
                        //init();
                    },
                    function(error) {
                        vm.error = "Error in deleting review";
                    }
                )
        }

        function deleteReviewFromMovie(reviewId) {
            FlixService
                .findMovieByApiMovieId(vm.movieId)
                .then(
                    function(response){
                        var localMovieObj = response.data;
                        if(localMovieObj._id) {
                            for(var i in localMovieObj.reviews) {
                                if(localMovieObj.reviews[i].reviewId == reviewId) {
                                    localMovieObj.reviews.splice(i, 1);
                                }
                            }
                            FlixService
                                .updateMovie(localMovieObj._id, localMovieObj)
                                .then(
                                    function(stat) {
                                        deleteReviewFromUser(localMovieObj.apiMovieId);
                                    },
                                    function(error) {
                                        vm.error = "Error in updating movie details";
                                    }
                                );
                        }
                        else {
                            vm.error = "Error in retrieving movie";
                        }
                    },
                    function(error) {
                        vm.error = "Error in finding movie by API id";
                    }
                );
        }

        function deleteReviewFromUser(movieId) {

            var userForReviewDelete = vm.user;
            for(var i in userForReviewDelete.moviesReviewed) {
                if(userForReviewDelete.moviesReviewed[i].movieId == movieId) {
                    userForReviewDelete.moviesReviewed.splice(i, 1);
                }
            }
            //console.log(userForReviewDelete);

            FlixUserService
                .updateUser(userForReviewDelete._id, userForReviewDelete)
                .then(
                    function(stat){
                        init();
                    },
                    function(error) {
                        vm.error = "Error in updating movie review";
                    }
                );
        }

        function editReview() {
            vm.edit = true;
            return;
        }

        function cancelReview() {
            vm.edit = false;
            return;
        }

        function getUserProfile(userId) {
            if(!vm.user) {
               vm.alertToLogin = "Login to view user profile";
            }
            else if(vm.user._id == userId) {
                $location.url("/user");
            }
            else {
                $location.url("/user/" + userId);
            }
        }
        
        function addMovieToWatchList() {
            if(!vm.user) {
                vm.addToWLMessage = "Please login to add to watchlist";
            }
            else {
                //console.log("Hello in watchlist");
                var newMovieEntry ={
                    apiMovieId: vm.movieId,
                    movieTitle: vm.movie.title,
                    moviePoster: vm.movie.poster_path
                };
                vm.user.watchlist.push(newMovieEntry);

                FlixUserService
                    .updateUser(vm.user._id, vm.user)
                    .then(
                        function(stat){
                            init();
                        },
                        function(error) {
                            vm.error = "Error in updating user";
                        }
                    );
            }

        }

        function removeMovieFromWatchList() {

            for(var i in vm.user.watchlist) {
                if(vm.user.watchlist[i].apiMovieId == vm.movieId) {
                    vm.user.watchlist.splice(i, 1);
                }
            }

            FlixUserService
                .updateUser(vm.user._id, vm.user)
                .then(
                    function(stat){
                        init();
                    },
                    function(error) {
                        vm.error = "Error in updating user";
                    }
                );

        }
    }
})();

