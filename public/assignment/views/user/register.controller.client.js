(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    //$routeParams is a map of all the path parameters or query strings in the URL which can be retrieved by name.
    function RegisterController($routeParams, UserService, $location) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(username, password, verifypassword) {
            if (username == null || username == "") {
                vm.error = "Please enter username";
            }
            else if(password == null || password == "") {
                vm.error = "Please enter a valid password";
            }
            else if(verifypassword == null || verifypassword == "") {
                vm.error = "Please verify password";
            }
            else if(password != verifypassword) {
                vm.error = "Passwords do not match";
            }
            else {
                var user = {
                    username: username,
                    password: password
                };
                UserService
                   .register(user)
                   .then(
                       function(response) {
                       var newUser = response.data;
                       $location.url("/user/"+newUser._id);
                       },
                       function(error) {
                       vm.error = error.data;
                       });
            }
        }
    }
})();