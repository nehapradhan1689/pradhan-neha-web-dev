(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    

    function WebsiteService($http) {
        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        }
        return api;

        function createWebsite(name, description, developerId) {
            var newWebsite = {
                name: name,
                description: description,
                developerId: developerId
            };
            // websites.push(newWebsite);
            // return newWebsite;

            var url = "/api/user/" + developerId + "/website";
            return $http.post(url, newWebsite);

        }

        function findWebsitesByUser(userId) {
            // var resultSet = [];
            // for(var i in websites) {
            //     if(websites[i].developerId === userId) {
            //         resultSet.push(websites[i]);
            //     }
            // }
            // return resultSet;

            var url = "/api/user/" + userId + "/website";
            return $http.get(url);
        }

        function findWebsiteById(websiteId) {
            // for(var i in websites) {
            //     if(websites[i]._id === websiteId) {
            //         return websites[i];
            //     }
            // }
            // return null;
            var url = "/api/website/" + websiteId;
            return $http.get(url);
        }
        
        function updateWebsite(websiteId, website) {
            // for(var i in websites) {
            //     if(websites[i]._id === websiteId) {
            //         websites[i].name = website.name;
            //         websites[i].description = website.description;
            //         return true;
            //     }
            // }
            // return false;

            var url = "/api/website/" + websiteId;
            return $http.put(url, website);
        }

        function deleteWebsite(websiteId) {
            // for(var i in websites) {
            //     if(websites[i]._id === websiteId) {
            //         websites.splice(i, 1);
            //         return true;
            //     }
            // }
            // return false;

            var url = "/api/website/" + websiteId;
            return $http.delete(url);
        }
    }


})();