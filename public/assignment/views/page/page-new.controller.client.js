(function() {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.createPage = createPage;

        function createPage(name, title) {
            var page = {
                name: name,
                title: title,
                websiteId: vm.websiteId
            }
            var newPage = PageService.createPage(vm.websiteId, page);
            if(newPage) {
                //console.log("Hello from page controller");
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            }
            else {
                vm.error = "Unable to create page";
            }
        }


    }
})();