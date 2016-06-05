(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        }
        return api;

        function createPage(websiteId, page) {
            // var newPage = {
            //     _id: (new Date()).getTime()+"",
            //     name: page.name,
            //     title: page.title,
            //     websiteId: page.websiteId
            // };
            // pages.push(newPage);
            // return newPage;

            var url = "/api/website/" + websiteId + "/page";
            return $http.post(url, page);
        }

        function findPageByWebsiteId(websiteId) {
            // var resultSet = [];
            // for(var i in pages) {
            //     if(pages[i].websiteId === websiteId) {
            //         resultSet.push(pages[i]);
            //     }
            // }
            // return resultSet;

            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url);
        }

        function findPageById(pageId) {
            // for(var i in pages) {
            //     if(pages[i]._id === pageId) {
            //         return pages[i];
            //     }
            // }
            // return null;

            var url = "/api/page/" + pageId;
            return $http.get(url);
        }

        function updatePage(pageId, page) {
            // for(var i in pages) {
            //     if(pages[i]._id === pageId) {
            //         pages[i].name = page.name;
            //         pages[i].title = page.title;
            //         return true;
            //     }
            // }
            // return false;

            var url = "/api/page/" + pageId;
            return $http.put(url, page);
        }

        function deletePage(pageId) {
            // for(var i in pages) {
            //     if(pages[i]._id === pageId) {
            //         pages.splice(i, 1);
            //         return true;
            //     }
            // }
            // return false;

            var url = "/api/page/" + pageId;
            return $http.delete(url);
        }
    }


})();