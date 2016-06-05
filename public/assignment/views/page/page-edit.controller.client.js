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
            PageService
                .findPageById(vm.pageId)
                .then(function(response) {
                    vm.page = response.data;
                });
        }
        init();

        function updatePage(updatedPage) {
            if(updatedPage.name == null || updatedPage.name == "") {
                vm.error = "Please enter a valid page name";
            }
            else {
                PageService
                    .updatePage(vm.pageId, updatedPage)
                    .then(function (response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    }, function(error) {
                        vm.error = "Unable to update page";
                    });
            }
        }

        function deletePage(pageId) {
            //console.log(pageId);
            PageService
                .deletePage(pageId)
                .then(function(response) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                }, function(error) {
                    vm.error = "Unable to delete page";
                });
        }


    }
})();