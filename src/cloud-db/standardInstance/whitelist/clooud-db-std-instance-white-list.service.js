angular.module("ovh-api-services").service("OvhApiCloudDbStdInstanceWhiteListLexi", function ($resource, $cacheFactory) {
    "use strict";

    var cache = $cacheFactory("OvhApiCloudDbStdInstanceWhiteListLexi");
    var queryCache = $cacheFactory("OvhApiCloudDbStdInstanceWhiteListLexiQuery");
    var interceptor = {
        response: function (response) {
            cache.removeAll();
            queryCache.removeAll();
            return response.data;
        }
    };

    var resource = $resource("/cloudDB/:projectId/standard/instance/:instanceId/whitelist/:networkId", {
        projectId: "@projectId",
        instanceId: "@instanceId",
        networkId: "@networkId"
    }, {
        query: { method: "GET", isArray: true },
        get: { method: "GET", cache: cache },
        edit: { method: "PUT", interceptor: interceptor },
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
