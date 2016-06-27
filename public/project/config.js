(function() {
    //In app.js this statement creates the application and here this loads the application so that we can work with it.
    //If [] is not provided thenit indicates that this is a read operation.
    angular
        .module("Flix")
        .config(Config); //This is called chaining of function calls

    //$routeProvider object indicates to the framework what we need to configure. In this case - routing
    function Config($routeProvider) {
        $routeProvider
            .when ("/", {
                redirectTo: "/home"
            })
            .when("/home",{
                templateUrl: "client/views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "client/views/user/login.view.client.html",
                //To make the controller and the corresponding HTML aware that they are associated with each other.
                controller: "LoginController",
                //To access the instance of the LoginController in the view. Binds the controller instance to a name
                //which is used in the view.
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "client/views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "client/views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:uid", {
                templateUrl: "client/views/user/other-profile.view.client.html",
                controller: "OtherProfileController",
                controllerAs: "model"
                // resolve: {
                //     loggedIn: checkLoggedIn
                // }
            })
            .when("/search/:searchText", {
                    templateUrl: "client/views/movie/search-result.view.client.html",
                    controller: "SearchResultController",
                    controllerAs: "model"
            })
            .when("/movie/:movieId", {
                templateUrl: "client/views/movie/movie-details.view.client.html",
                controller: "MovieDetailsController",
                controllerAs: "model"
            })
            .when("/cast/:castId", {
                templateUrl: "client/views/movie/cast-profile.view.client.html",
                controller: "CastProfileController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });

        //$q allows to work with promises and asynchronous call
        function checkLoggedIn(FlixUserService, $location, $q, $rootScope) {

            var deferred = $q.defer();

            FlixUserService
                .loggedIn()
                .then(
                    function(response) {
                        var user = response.data;
                        if(user == '0') {
                            $rootScope.currentUser = null;
                            deferred.reject();
                            $location.url("/login");
                        }
                        else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function(error) {
                        $location.url("/login");
                    }
                );

            return deferred.promise;
        }

    }
})();