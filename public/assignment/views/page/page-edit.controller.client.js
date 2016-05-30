(function() {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function updatePage(updatedPage) {
            
            var result = PageService.updatePage(vm.pageId, updatedPage);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

        function deletePage(pageId) {
            var result = PageService.deletePage(pageId);
            if(result) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            }
            else {
                vm.error = "Unable to delete page";
            }
        }


    }
})();