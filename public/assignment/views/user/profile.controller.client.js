(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    //$routeParams is a map of all the path parameters or query strings in the URL which can be retrieved by name.
    function ProfileController($routeParams, UserService) {
        var vm = this;

        vm.updateUser = updateUser;

        var id = $routeParams.uid;

        function init() {
            UserService
                .findUserById(id)
                .then(function(response) {
                    vm.user = response.data;
                });
        }
        init();



        function updateUser(newUser) {
            UserService
                .updateUser(id, newUser)
                .then(function(response) {
                    vm.success = "Success! Your profile was updated successfully"

                }, function(error) {
                    vm.error = "Unable to update user";
                })

        }
    }
})();