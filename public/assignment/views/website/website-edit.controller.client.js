(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function updateWebsite(updatedWebsite) {
            var result = WebsiteService.updateWebsite(vm.websiteId, updatedWebsite);
            $location.url("/user/"+vm.userId+"/website");
        }

        function deleteWebsite(websiteId) {
            var result = WebsiteService.deleteWebsite(websiteId);
            if(result) {
                $location.url("/user/"+vm.userId+"/website");
            }
            else {
                vm.error = "Unable to delete website";
            }
        }


    }
})();