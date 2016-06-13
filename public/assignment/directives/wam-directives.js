(function() {
    angular
        .module("wamDirectives", [])
        .directive("wamSortable", wamSortable);

    function wamSortable() {
        function linker(scope, element, attributes){
            var startIndex = -1;
            var endIndex = -1;
            $(element)
            .find(".container")
                .sortable({
                    axis: "y",
                    start: function(event, ui) {
                        //console.log("Sorting started");
                        startIndex = ui.item.index();
                    },
                    stop: function(event, ui) {
                        //console.log("Sorting stopped");
                        endIndex = ui.item.index();
                        scope.callback({start: startIndex, end: endIndex});

                    }
                });
        }
        return {
            templateUrl: "views/widget/wam-directives.view.client.html",
            scope: {
                model: "=",
                callback: '&'
            },
            link: linker
        }
    }
})();