(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function createWebsite(name, description) {
            var newWebsite = WebsiteService.createWebsite(name, description, vm.userId);
            if(newWebsite) {
                $location.url("/user/"+vm.userId+"/website");
            }
            else {
                vm.error = "Unable to create website";
            }
        }


    }
})();