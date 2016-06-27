(function() {
    angular
        .module("Flix")
        .controller("RegisterController", RegisterController);

    //$routeParams is a map of all the path parameters or query strings in the URL which can be retrieved by name.
    function RegisterController($routeParams, FlixUserService, $location) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(username, password, verifypassword) {
            // console.log("Register Controller");
            // console.log(username+" " + password + " " + verifypassword);
            if (username == null || username == "") {}
            else if(password == null || password == "") {}
            else if(verifypassword == null || verifypassword == "") {}
            if(password != verifypassword) {
                vm.error = "Passwords do not match";
            }
            else {
                var user = {
                    username: username,
                    password: password
                };
                FlixUserService
                    .register(user)
                    .then(
                        function(response) {
                            var newUser = response.data;
                            // $location.url("/user/"+newUser._id);
                            $location.url("/user");
                        },
                        function(error) {
                            vm.error = "Sorry! User could not be registered";
                        });
            }
        }
    }
})();