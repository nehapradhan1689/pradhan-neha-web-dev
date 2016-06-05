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
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function(response) {
                    vm.website = response.data;
                })
        }
        init();

        function updateWebsite(updatedWebsite) {
            if(updatedWebsite.name == null || updatedWebsite.name == "") {
                //console.log("Inside update website");
                vm.error = "Please enter a valid website name";
            }
            else {
                WebsiteService
                    .updateWebsite(vm.websiteId, updatedWebsite)
                    .then(function(response) {
                        $location.url("/user/"+vm.userId+"/website");
                    }, function(error) {
                        vm.error = "Unable to update website";
                    });
            }
        }

        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsite(websiteId)
                .then(function(response) {
                    $location.url("/user/"+vm.userId+"/website");
                }, function(error) {
                    vm.error = "Unable to delete website";
                });
        }


    }
})();