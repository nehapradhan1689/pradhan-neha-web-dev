(function() {
    angular
        .module("Flix")
        .controller("LoginController", LoginController);

    //Controller handles the js part of the login page
    //LoginController is a constructor that creates an instance of the Controller.
    function LoginController($location, FlixUserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            FlixUserService
                    .login(username, password)
                    .then(
                        function(response) {
                            //console.log(response);
                            var user = response.data;
                            //console.log(response);
                            if(user._id) {
                                //$location.url("/user/"+user._id);
                                $location.url("/user");
                            }
                            else {
                                vm.error = "User not found";
                            }
                        },
                        function(error) {
                            vm.error = "Username and password do not match";
                        });

        }
    }
})();