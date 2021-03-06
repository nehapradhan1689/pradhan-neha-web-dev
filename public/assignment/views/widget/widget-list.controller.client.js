(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);
    
    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.reorderWidget = reorderWidget;

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function(response) {
                    vm.widgets = response.data;
                });
        }
        init();
        
        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            var urlTokens = widget.url.split("/");
            var id = urlTokens[urlTokens.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function reorderWidget(start, end) {
            WidgetService
                .reorderWidget(vm.pageId, start, end)
                .then(
                    function(response) {
                        //init();
                        //console.log("ping!!");
                    },
                    function(error) {
                        vm.error = "Unable to preserve order of widgets";
                    }
                );
        }
    }
})();