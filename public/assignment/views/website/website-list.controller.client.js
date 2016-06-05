(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);
    
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function(response) {
                    //console.log(response.data);
                    vm.websites = response.data;
                });
        }
        init();
    }
})();