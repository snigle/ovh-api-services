angular.module("ovh-api-services").service("OvhApiCloudDbLexi", function ($resource, $cacheFactory) {
    "use strict";

    var cache = $cacheFactory("OvhApiCloudDbLexi");
    var queryCache = $cacheFactory("OvhApiCloudDbLexiQuery");
    var interceptor = {
        response: function (response) {
            cache.removeAll();
            queryCache.removeAll();
            return response.data;
        }
    };

    var resource = $resource("/cloudDB/:projectId", {
        projectId: "@projectId"
    }, {
        query: { method: "GET", isArray: true },
        get: { method: "GET", cache: cache },
        edit: { method: "PUT", interceptor: interceptor },
        getServiceInfos: {
            url: "/cloudDB/:projectId/serviceInfos",
            method: "GET",
            cache: cache
        }
    });

    resource.resetCache = function () {
        cache.removeAll();
    };

    resource.resetQueryCache = function () {
        queryCache.removeAll();
    };

    return resource;
});
