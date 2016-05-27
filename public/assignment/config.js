/**
 * Created by Neha Pradhan on 5/24/2016.
 */
(function() {
    //In app.js this statement creates the application and here this loads the application so that we can work with it.
    //If [] is not provided thenit indicates that this is a read operation.
    angular
        .module("WebAppMaker")
        .config(Config); //This is called chaining of function calls

    //$routeProvider object indicates to the framework what we need to configure. In this case - routing
    function Config($routeProvider) {
        $routeProvider
            //.when("/", {templateUrl: "views/user/login.view.client.html"})
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                //To make the controller and the corresponding HTML aware that they are associated with each other.
                controller: "LoginController",
                //To access the instance of the LoginController in the view. Binds the controller instance to a name
                //which is used in the view.
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html"
            })
            .when("/profile/:id", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/login"
            });

    }
})();