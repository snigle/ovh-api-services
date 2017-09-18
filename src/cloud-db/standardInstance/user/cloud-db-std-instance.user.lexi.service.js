angular.module("ovh-api-services").service("OvhApiCloudDbStdInstanceUserLexi", function ($resource, $cacheFactory) {
    "use strict";

    var cache = $cacheFactory("OvhApiCloudDbStdInstanceUserLexi");
    var queryCache = $cacheFactory("OvhApiCloudDbStdInstanceUserLexiQuery");
    var interceptor = {
        response: function (response) {
            cache.removeAll();
            queryCache.removeAll();
            return response.data;
        }
    };

    var resource = $resource("/cloudDB/:projectId/standard/instance/:instanceId/user/:userId", {
        projectId: "@projectId",
        instanceId: "@instanceId",
        userId: "@userId"
    }, {
        query: { method: "GET", isArray: true },
        get: { method: "GET", cache: cache },
        post: { method: "POST", interceptor: interceptor },
        remove: { method: "DELETE", interceptor: interceptor }
    });

    resource.resetCache = function () {
        cache.removeAll();
    };

    resource.resetQueryCache = function () {
        queryCache.removeAll();
    };

    return resource;
});
